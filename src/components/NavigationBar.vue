<template>
  <img class="img" src="/img/images.jpeg" alt="Logo">
  <input v-model="searchQuery" @keyup.enter="searchMeal" type="text" placeholder="Search for a meal...">
  <v-btn  icon @click="searchMeal">
    <v-icon>mdi-magnify</v-icon>
  </v-btn>
  <nav class="main-nav">

    <ul class="main-menu" id="main-menu">

      <li>
        <router-link to="/">Domov</router-link>
      </li>
      <li>
        <router-link to="/blog">Blog</router-link>
      </li>
      <li>
        <router-link to="/galleria">Galeria</router-link>
      </li>
      <li>
        <router-link to="/contact">Kontakt</router-link>
      </li>
      <li>
        <router-link v-if="!isLoggedIn" to="/Login">Login</router-link>
      </li>
      <li>
        <router-link v-if="!isLoggedIn" to="/Register">Register</router-link>
      </li>

    </ul>

  </nav>
  <div v-if="isLoggedIn">
    <v-menu open-on-hover >
      <template v-slot:activator="{ props }">
        <v-icon style="font-size: 30px" class="mdi mdi-menu" v-bind="props"></v-icon>
      </template>

      <v-list>
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="item.action ? item.action() : null"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
export default {
  name: 'NavigationBar',
  data() {
    return {
      searchQuery: '',
      items: [
        { title: 'Account', action: () => this.goToAccountPage() },
        { title: 'History', action: () => this.goToHistoryPage() },
        { title: 'Logout', action: this.logout },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('isLoggedIn') === 'true';
    },
  },
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push('/Login');
    },
    searchMeal() {
        if (this.searchQuery.trim()) {
          this.$router.push({ name: 'SearchResults', query: { query: this.searchQuery } });
        }
    },
    goToAccountPage() {
      this.$router.push('/account');
    },
    goToHistoryPage() {
      this.$router.push('/history');
    },
  },

};
</script>

