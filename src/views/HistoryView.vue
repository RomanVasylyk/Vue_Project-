<template>
  <header class="container main-header">

    <NavigationBar />

  </header>
  <main class="container">
    <h1>Your Viewing History</h1>
  </main>
    <v-container>
      <v-row>
        <v-col
            v-for="mealId in userViewHistory"
            :key="mealId"
            cols="12"
            md="4"
        >
          <v-card
              @click="fetchMealDetails(mealId)"
          >
            <v-img
                :src="getMealThumb(mealId)"
                :alt="getMealName(mealId)"
                height="200px"
            ></v-img>
            <v-card-title>
              <v-btn
                  icon @click.stop="toggleFavorite(mealId)"
                  v-if="isUserLoggedIn"
              >
                <v-icon>
                  {{ isFavorite(mealId) ? 'mdi-heart' : 'mdi-heart-outline' }}
                </v-icon>
              </v-btn>
              {{ getMealName(mealId) }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  <v-dialog
      v-model="isModalOpen"
      persistent
      max-width="1200px"
  >
    <v-card
        v-if="currentMealDetails"
    >
      <v-card-title>
        {{ currentMealDetails?.strMeal }}
        <v-spacer></v-spacer>
        <v-btn
            icon @click="closeModal"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-img
            :src="currentMealDetails?.strMealThumb"
            height="600px"
        ></v-img>
        <p><strong>Category:</strong> {{ currentMealDetails?.strCategory }}</p>
        <p><strong>Cuisine:</strong> {{ currentMealDetails?.strArea }}</p>
        <p><strong>Instructions:</strong> {{ currentMealDetails?.strInstructions }}</p>
        <!-- Display ingredients and measures -->
        <h3>Ingredients:</h3>
        <ul>
          <li
              v-for="(item, index) in mealIngredients"
              :key="index"
          >
            {{ item.ingredient }} - {{ item.measure }}
          </li>
        </ul>
        <p
            v-if="currentMealDetails?.strYoutube"
        >
          <strong>Video Recipe:</strong>
          <a
              :href="currentMealDetails?.strYoutube"
              target="_blank"
          >Watch here</a>
        </p>
      </v-card-text>
      <review-component
          :mealId="currentMealDetails?.idMeal"
      ></review-component>

    </v-card>
  </v-dialog>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import ReviewComponent from "@/components/ReviewComponent.vue";
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  data() {
    return {
      currentMealDetails: null,
      isModalOpen: false,
      mealIngredients: [],
      favoriteMealsDetails: [],
      mealDetailsMap: {},
    };
  },
  components: {
    NavigationBar,
    ReviewComponent,
  },
  async created() {
    const searchQuery = this.$route.query.query;
    if (searchQuery) {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      this.searchResults = response.data.meals || [];
    }
  },
  computed: {
    userViewHistory() {
      const authStore = useAuthStore();
      return authStore.viewHistory[authStore.user?.id] || [];
    },
    isUserLoggedIn() {
      const authStore = useAuthStore();
      return !!authStore.user;
    },

  },
  methods: {

    async fetchMealDetails(id) {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      this.currentMealDetails = response.data.meals[0];
      this.mealIngredients = this.parseIngredients(this.currentMealDetails);
      this.isModalOpen = true;

      const authStore = useAuthStore();
      authStore.updateViewHistory(id);
    },
    parseIngredients(meal) {
      return Array.from({length: 20}, (_, i) => ({
        ingredient: meal[`strIngredient${i + 1}`],
        measure: meal[`strMeasure${i + 1}`],
      })).filter(item => item.ingredient && item.ingredient.trim() !== '');
    },
    closeModal() {
      this.isModalOpen = false;
      this.currentMealDetails = null;
      this.mealIngredients = [];
    },
    async toggleFavorite(mealId) {
      const authStore = useAuthStore();
      authStore.initialize();

      if (this.isFavorite(mealId)) {
        authStore.removeFavorite(mealId);
      } else {
        authStore.addFavorite(mealId);
      }
    },
    async fetchFavoriteMealsDetails() {
      const authStore = useAuthStore();
      const mealDetailsPromises = authStore.favorites.map(mealId =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      );

      const mealsResponses = await Promise.all(mealDetailsPromises);
      this.favoriteMealsDetails = mealsResponses.map(response => response.data.meals[0]);

    },
    isFavorite(idMeal) {
      const authStore = useAuthStore();
      return authStore.favorites.includes(idMeal);
    },

    async fetchMealDetailsById(mealId) {
      if (!this.mealDetailsMap[mealId]) {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        this.mealDetailsMap[mealId] = response.data.meals[0];
      }
    },


    getMealThumb(mealId) {
      return this.mealDetailsMap[mealId]?.strMealThumb || '';
    },

    getMealName(mealId) {
      return this.mealDetailsMap[mealId]?.strMeal || '';
    },
  },
  async mounted() {
    const authStore = useAuthStore();
    authStore.initialize();
    await this.fetchFavoriteMealsDetails();

  },
  watch: {
    'userViewHistory': {
      handler(newHistory) {
        newHistory.forEach(mealId => {
          this.fetchMealDetailsById(mealId);
        });
      },
      immediate: true,
    },
  },
};
</script>
