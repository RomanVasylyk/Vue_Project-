<template>
  <header
      class="container main-header"
  >
    <NavigationBar />
  </header>

  <v-container>
    <v-card
        class="mx-auto my-12"
        max-width="500">
      <v-card-title
          class="justify-center"
      >
        <span
            class="headline"
        >Account Settings</span>
      </v-card-title>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid">
          <v-text-field
              v-model="userForm.name"
              :rules="nameRules"
              label="Full Name"
              outlined
              dense
          ></v-text-field>
          <v-text-field
              v-model="userForm.email"
              :rules="emailRules"
              label="E-mail"
              outlined
              dense
          ></v-text-field>
          <v-text-field
              v-model="userForm.password"
              :rules="passwordRules"
              label="Password"
              type="password"
              outlined
              dense
          ></v-text-field>
          <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="updateUser"
          >Update</v-btn>
          <v-btn
              text
              color="grey"
              class="mr-4"
              @click="resetForm"
          >Cancel</v-btn>
          <v-btn
              color="error"
              @click="deleteAccount"
          >Delete Account</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script>
import NavigationBar from '../components/NavigationBar.vue';
import { useAuthStore } from '@/stores/auth';
export default {
  components: {
    NavigationBar,
  },
    data() {
      return {
        valid: true,
        userForm: {
          name: '',
          email: '',
          password: '',
        },
        nameRules: [
          v => !!v || 'Name is required',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must be at least 8 characters',
        ],
      };
    },
  created() {
    const authStore = useAuthStore();
    authStore.initialize();
  },
    methods: {
      loadUserData() {
        const authStore = useAuthStore();
        if (authStore.user) {
          this.userForm = { ...authStore.user };
        }
      },
      updateUser() {
        if (this.$refs.form.validate()) {
          const authStore = useAuthStore();
          authStore.updateUserDetails(this.userForm);

        }
      },
      resetForm() {
        this.$refs.form.reset();
        this.loadUserData();
      },
      deleteAccount() {
        if (confirm('Naozaj chcete odstrániť svoj účet?')) {
          const authStore = useAuthStore();
          const success = authStore.deleteUser();
          if (success) {
            this.$router.push('/');
          } else {
            this.errorMessage = "Incorrect email or password.";
          }
        }
      },

    },
  mounted() {
    this.loadUserData();
  },

  watch: {
    'authStore.user': {
      handler(newValue) {
        if (newValue) {
          this.userForm = { ...newValue };
        }
      },
      deep: true,
      immediate: true,
    },
  },

};

</script>