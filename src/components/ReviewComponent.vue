<template>
  <v-container>
    <v-row>
      <v-col
          v-for="(review, index) in mealReviews"
          :key="index"
          cols="12"
          md="6"
      >
        <v-card
            class="mb-2"
        >
          <v-card-title>
            <v-icon
                left
            >mdi-account</v-icon>
            {{ getUserById(review.userId).name }}
          </v-card-title>
          <v-card-subtitle>
            <v-icon
                left
            >mdi-star</v-icon>
            Rating: {{ formatRating(review.rating) }} / 5
          </v-card-subtitle>
          <v-card-subtitle>
            <v-icon
                left
            >mdi-calendar</v-icon>
            Date: {{ formatDate(review.date) }}
          </v-card-subtitle>
          <v-card-text>
            {{ review.comment }}
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
    <v-row
        v-if="isUserLoggedIn"
    >
      <v-col
          cols="12"
          md="8"
          offset-md="2"
      >
        <v-form
            @submit.prevent="submitReview"
        >
          <v-textarea
              v-model="newReview.comment"
              label="Your Review"
              outlined
          ></v-textarea>
          <v-slider
              v-model="newReview.rating"
              :max="5" label="Rating"
              thumb-label="always"
              class="my-4"
          ></v-slider>
          <v-btn
              type="submit"
              color="primary"
          >Submit Review</v-btn>
        </v-form>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { useAuthStore } from "@/stores/auth.js";

export default {
  data() {
    return {
      newReview: {
        rating: 0,
        comment: '',
      }
    };
  },
  computed: {
    isUserLoggedIn() {
      const authStore = useAuthStore();
      return !!authStore.user;
    },
    mealReviews() {
      const authStore = useAuthStore();
      return authStore.reviews.filter(review => review.mealId === this.mealId);
    },
  },
  methods: {
    getUserById(userId) {
      const authStore = useAuthStore();
      if (authStore.users) {
        return authStore.users.find(user => user.id === userId) || {};
      }
      return {};
    },
    submitReview() {
      const authStore = useAuthStore();
      authStore.addReview(this.mealId, this.newReview);
      this.newReview = { rating: 0, comment: '' };
    },


    formatRating(rating) {
      return rating.toFixed(1);
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  props: {
    mealId: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    const authStore = useAuthStore();
    authStore.loadReviewsFromLocalStorage();
    authStore.loadUsersFromLocalStorage();
    console.log("Reviews:", authStore.reviews);
    console.log("Current Meal ID:", this.mealId);
  },
};
</script>
