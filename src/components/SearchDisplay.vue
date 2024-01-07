<template>
  <div>
    <v-row>
      <v-col
          cols="12"
          md="4"
          v-for="meal in meals"
          :key="meal.idMeal"
      >
        <v-card @click="$emit('mealSelected', meal.idMeal)">
          <div class="image-container">
            <v-img
                :src="meal.strMealThumb"
                :alt="meal.strMeal"
                height="200px"
            ></v-img>
          </div>
          <v-card-title>{{ meal.strMeal }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'SearchDisplay',
  props: {
    meals: Array
  },
};
</script>

<style scoped>
.image-container {
  background-color: rgb(229, 127, 127);
}
</style>
