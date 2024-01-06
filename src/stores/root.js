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
    },
});
