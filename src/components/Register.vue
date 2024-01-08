<template>

  <v-container>
    <v-btn color="error" @click="goBack">Back</v-btn>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-4">
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="register">

            <v-text-field
                v-model="name"
                label="Full Name"
                :rules="nameRules"
                required
            ></v-text-field>
            <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                required
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="passwordRules"
                required
            ></v-text-field>
            <v-btn :disabled="!valid" color="success" type="submit">Register</v-btn>

            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

            <p class="mt-3">Already have an account? <router-link to="/login">Log in</router-link></p>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      valid: true,
      errorMessage: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    };
  },
  methods: {
    async register() {
      try {
        const authStore = useAuthStore();
        const success = await authStore.register(this.name, this.email, this.password);
        if (success) {
          this.$router.push({ name: 'home' });
        } else {
          this.errorMessage = 'This mail is already registered';
        }
      } catch (error) {
        if (error.message.includes('Password requirements')) {
          this.errorMessage = 'The password does not meet the requirements';
        } else {
          this.errorMessage = 'Error: ' + error.message;
        }
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>
<style>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>