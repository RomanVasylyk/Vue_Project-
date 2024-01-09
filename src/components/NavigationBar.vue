<template>
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
      <v-btn v-if="isLoggedIn" color="error" @click="logout">Logout</v-btn>

    </ul>
    <a class="hamburger" id="hamburger">
      <i class="fa fa-bars"></i>
    </a>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
export default {
  name: 'NavigationBar',
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
  },

};
</script>

