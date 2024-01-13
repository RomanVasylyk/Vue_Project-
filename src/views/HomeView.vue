<script>
import NavigationBar from '../components/NavigationBar.vue';
import FooterComponent from "@/components/FooterComponent.vue";
import axios from 'axios';

export default {
  components: {
    NavigationBar,
    FooterComponent,

  },
  data() {
    return {
      sections: [],
      dishes: []
    };
  },
  methods: {
    async fetchData() {
        const response = await axios.get('/data.json');
        this.sections = response.data.sections;
    },
    async fetchDishes() {
        const response = await axios.get('/dishes.json');
        this.dishes = response.data.dishes;
    }
  },
  mounted() {
    this.fetchData();
    this.fetchDishes();
  }
}
</script>



<template>
  <header class="container main-header">
    <NavigationBar />
  </header>
  <main>
    <div class="hero-img">
      <img style="width: 100%;" src="/img/image.jpeg" alt="">
    </div>

    <div class="hero-text">
      <h1 class="hh1" style="font-size:50px;font-family: fantasy;">Vitajte</h1><br>
      <p style="font-family: fantasy;">v</p><br>
      <p style="font-family: fantasy;"> Našej reštaurácii</p>
    </div>
  </main>

    <section
        v-for="section in sections"
        :key="section.id"
        class="s fo"
    >
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <h4>{{ section.title }}</h4>
          <p>{{ section.content }}</p>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-img
              :src="section.image"
              style="width: 100%;"
          ></v-img>
        </v-col>
      </v-row>
    </section>


      <section>
        <v-expansion-panels
            variant="popout"
            class="mb-6"
        >
          <v-expansion-panel
              v-for="dish in dishes"
              :key="dish.id"
              class="salmon-background"
          >
            <v-expansion-panel-title
                expand-icon="mdi-menu-down"
            >
              {{ dish.title }}
            </v-expansion-panel-title>
            <div
                class="d-flex"
            >
              <div
                  style="flex: 1;"
              >
                <v-expansion-panel-text>
                  {{ dish.description }}
                </v-expansion-panel-text>
              </div>
              <div
                  style="flex: 1;"
              >
                <v-expansion-panel-text>
                  <img
                      :src="dish.image"
                      style="width: 100%;"
                      alt=""
                  >
                </v-expansion-panel-text>
              </div>
            </div>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>

  <footer class="container">
    <FooterComponent />
  </footer>
</template>

<style scoped>
.salmon-background {
  background-color: #CC6666 !important;
}

</style>
