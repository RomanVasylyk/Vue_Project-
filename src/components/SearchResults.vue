<template>
  <v-btn color="error" @click="goBack">Back</v-btn>

  <v-container>
    <v-row>
      <v-col
          v-for="meal in searchResults"
          :key="meal.idMeal"
          cols="12"
          md="4"
      >
        <v-card @click="fetchMealDetails(meal.idMeal)">
          <v-img :src="meal.strMealThumb" :alt="meal.strMeal" height="200px"></v-img>
          <v-card-title>
            <v-btn icon @click.stop="toggleFavorite(meal.idMeal)" v-if="isUserLoggedIn">
              <v-icon>
                {{ isFavorite(meal.idMeal) ? 'mdi-heart' : 'mdi-heart-outline' }}
              </v-icon>
            </v-btn>
            {{ meal.strMeal }}

          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Dialog for meal details -->
  <v-dialog v-model="isModalOpen" persistent max-width="1200px">
    <v-card v-if="currentMealDetails">
      <v-card-title>
        {{ currentMealDetails?.strMeal }}
        <v-spacer></v-spacer>
        <v-btn icon @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-img :src="currentMealDetails?.strMealThumb" height="600px"></v-img>
        <p><strong>Category:</strong> {{ currentMealDetails?.strCategory }}</p>
        <p><strong>Cuisine:</strong> {{ currentMealDetails?.strArea }}</p>
        <p><strong>Instructions:</strong> {{ currentMealDetails?.strInstructions }}</p>
        <!-- Display ingredients and measures -->
        <h3>Ingredients:</h3>
        <ul>
          <li v-for="(item, index) in mealIngredients" :key="index">
            {{ item.ingredient }} - {{ item.measure }}
          </li>
        </ul>
        <p v-if="currentMealDetails?.strYoutube">
          <strong>Video Recipe:</strong>
          <a :href="currentMealDetails?.strYoutube" target="_blank">Watch here</a>
        </p>
      </v-card-text>
      <review-component :mealId="currentMealDetails?.idMeal"></review-component>

    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import ReviewComponent from "@/components/ReviewComponent.vue";

export default {
  components: {ReviewComponent},
  data() {
    return {
      searchResults: [],
      currentMealDetails: null,
      isModalOpen: false,
      mealIngredients: [],
    };
  },
  async created() {
    const searchQuery = this.$route.query.query;
    if (searchQuery) {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      this.searchResults = response.data.meals || [];
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchMealDetails(id) {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        this.currentMealDetails = response.data.meals[0];
        this.mealIngredients = this.parseIngredients(this.currentMealDetails);
        this.isModalOpen = true;
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

    isFavorite(idMeal) {
      const authStore = useAuthStore();
      return authStore.favorites.includes(idMeal);
    },
  },
  async mounted() {
    const authStore = useAuthStore();
    authStore.initialize();


  },
  computed: {
    isUserLoggedIn() {
      const authStore = useAuthStore();
      return !!authStore.user;
    },
  },

};
</script>
