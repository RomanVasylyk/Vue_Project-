<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" v-for="meal in meals" :key="meal.idMeal">
        <v-card @click.stop="mealSelected(meal.idMeal)">
          <v-img :src="meal.strMealThumb" :alt="meal.strMeal" height="200px" class="image-container"></v-img>
          <v-card-title>

            <v-btn icon @click.stop="toggleFavorite(meal.idMeal)" v-if="authStore.user">
              <v-icon>
                {{ isFavorite(meal.idMeal) ? 'mdi-heart' : 'mdi-heart-outline' }}
              </v-icon>
            </v-btn>
            {{ meal.strMeal }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import { useAuthStore } from '@/stores/auth';
export default {
  name: 'SearchDisplay',
  props: {
    meals: Array
  },
  methods: {
    mealSelected(mealId) {
      this.$emit('mealSelected', mealId);
    },
    toggleFavorite(mealId) {
      const authStore = useAuthStore();
      if (this.isFavorite(mealId)) {
        authStore.removeFavorite(mealId);
      } else {
        authStore.addFavorite(mealId);
      }
    },
    isFavorite(mealId) {
      const authStore = useAuthStore();
      return authStore.favorites.includes(mealId);
    }
  },
  computed: {
    authStore() {
      return useAuthStore();
    }
  },
};
</script>

<style scoped>
.image-container {
  background-color: rgb(229, 127, 127);
}
</style>
