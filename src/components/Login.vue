<template>
  <v-container>
    <v-btn
        text color="primary"
        @click="goBack"
    >Back</v-btn>

    <v-row
        justify="center"
    >
      <v-col
          cols="12"
          sm="8"
          md="4"
      >
        <v-card
            class="pa-4"
        >
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="login"
          >
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

            <v-btn
                :disabled="!valid"
                color="primary"
                type="submit"
            >Login</v-btn>

            <div
                v-if="errorMessage"
                class="error-message"
            >{{ errorMessage }}</div>

            <div
                class="text-center mt-3"
            >
              <router-link
                  to="/Register">Need an account? Register
              </router-link>
            </div>
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
      email: '',
      password: '',
      valid: true,
      errorMessage: '',
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
    async login() {
      const authStore = useAuthStore();
      const success = authStore.login(this.email, this.password);
      if (success) {
        this.$router.push({ name: 'home' });
      } else {
        this.errorMessage = "Incorrect email or password.";
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>
<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>