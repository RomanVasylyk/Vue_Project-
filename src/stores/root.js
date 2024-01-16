// root.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useRootStore = defineStore('root', {
    state: () => ({
        Category: [],
        Meal: [],

    }),
    actions: {
        async getCategory() {
            const data = await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
            this.Category = data?.data?.meals;
        },
        async getMealsByCategoryAndIngredient(category, ingredient, country) {
            let mealsByCategory = [];
            let mealsByIngredient = [];
            let mealsByCountry = [];

            if (category) {
                const responseCategory = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
                mealsByCategory = responseCategory.data.meals;
            }

            if (ingredient) {
                const responseIngredient = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
                mealsByIngredient = responseIngredient.data.meals;
            }

            if (country) {
                const responseCountry = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
                mealsByCountry = responseCountry.data.meals;
            }

            // Combine filters
            let combinedMeals = [];
            if (category && ingredient && country) {
                combinedMeals = mealsByCategory.filter(meal =>
                    mealsByIngredient.some(ing => ing.idMeal === meal.idMeal) &&
                    mealsByCountry.some(cou => cou.idMeal === meal.idMeal)
                );
            } else if (category && country) {
                combinedMeals = mealsByCategory.filter(meal =>
                    mealsByCountry.some(cou => cou.idMeal === meal.idMeal)
                );
            } else if (ingredient && country) {
                combinedMeals = mealsByIngredient.filter(meal =>
                    mealsByCountry.some(cou => cou.idMeal === meal.idMeal)
                );
            } else if (country) {
                combinedMeals = mealsByCountry;
            } else if (category && ingredient) {
                combinedMeals = mealsByCategory.filter(meal =>
                    mealsByIngredient.some(ing => ing.idMeal === meal.idMeal)
                );
            } else {
                combinedMeals = category ? mealsByCategory : mealsByIngredient;
            }

            this.Meal = combinedMeals;
        },



    },
});
