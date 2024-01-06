// root.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { Category_URL, Meal_By_Category_URL } from '../Constants';

export const useRootStore = defineStore('root', {
    state: () => ({
        Category: [],
        Meal: [],
    }),
    actions: {
        async getCategory() {
            const data = await axios.get(Category_URL);
            this.Category = data?.data?.meals;
        },
        async getMeals(category) {
            const data = await axios.get(`${Meal_By_Category_URL}${category}`);
            this.Meal = data?.data?.meals;
        },
        async getMealsByIngredient(ingredient) {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            this.Meal = response.data.meals;
        },
        async getMealsByCategoryAndIngredient(category, ingredient) {
            let mealsByCategory = [];
            let mealsByIngredient = [];

            if (category) {
                const responseCategory = await axios.get(`${Meal_By_Category_URL}${category}`);
                mealsByCategory = responseCategory.data.meals;
            }

            if (ingredient) {
                const responseIngredient = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
                mealsByIngredient = responseIngredient.data.meals;
            }

            if (category && ingredient) {
                this.Meal = mealsByCategory.filter(mealByCategory =>
                    mealsByIngredient.some(mealByIngredient => mealByIngredient.idMeal === mealByCategory.idMeal));
            } else {
                this.Meal = category ? mealsByCategory : mealsByIngredient;
            }
        },
    },
});
