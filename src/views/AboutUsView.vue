
<script>
import { useRootStore } from "@/stores/root.js";
import axios from 'axios';
import NavigationBar from '../components/NavigationBar.vue';
import FooterComponent from '../components/FooterComponent.vue';
import SearchDisplay from "@/components/SearchDisplay.vue";

export default {
  data() {
    return {
      selectedCategory: null,
      currentMealDetails: null,
      isModalOpen: false,
      ingredients: [],
      selectedIngredient: null,
      countries: [],
      selectedCountry: null,
      allMeals: [],
      currentFilter: 'A',
      randomMeals: [],
    };
  },
  components: {
    NavigationBar,
    FooterComponent,
    SearchDisplay,

  },
  computed: {
    categories() {
      const categoryStore = useRootStore();
      return categoryStore.Category.map(c => c.strCategory);
    },
    meals() {
      const categoryStore = useRootStore();
      return categoryStore.Meal;
    },
    mealIngredients() {
      if (!this.currentMealDetails) {
        return [];
      }
      return Array.from({ length: 20 }, (_, i) => ({
        ingredient: this.currentMealDetails[`strIngredient${i + 1}`],
        measure: this.currentMealDetails[`strMeasure${i + 1}`],
      })).filter(item => item.ingredient && item.ingredient.trim() !== '');
    },
    filteredMeals() {
      return this.allMeals.filter(meal => meal.strMeal.startsWith(this.currentFilter));
    },
  },
  async created() {
    const categoryStore = useRootStore();
    categoryStore.getCategory();
      const ingredientResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      this.ingredients = ingredientResponse.data.meals.map(ingredient => ingredient.strIngredient);

    const countryResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    this.countries = countryResponse.data.meals.map(country => country.strArea);

  },


  watch: {
    selectedCategory(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchMeals();
      }
    },
    selectedIngredient(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchMeals();
      }
    },
    selectedCountry(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchMeals();
      }
    },
  },

  methods: {
    async fetchMealDetails(id) {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      this.currentMealDetails = response.data.meals[0];
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.currentMealDetails = null;
    },
    customFilter(item, queryText) {
      const text = item.toLowerCase();
      const query = queryText.toLowerCase();
      return text.indexOf(query) > -1;
    },
    async fetchMeals() {
      const categoryStore = useRootStore();
      await categoryStore.getMealsByCategoryAndIngredient(this.selectedCategory, this.selectedIngredient, this.selectedCountry);
    },
    async fetchMealsByLetter(letter) {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter.toLowerCase()}`);
      this.allMeals = response.data.meals || [];
    },
    setFilter(letter) {
      this.currentFilter = letter;
      this.fetchMealsByLetter(letter);
    },
    async fetchRandomMeals() {
      this.randomMeals = [];
      for (let i = 0; i < 9; i++) {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        this.randomMeals.push(response.data.meals[0]);
      }
    },


  },
  mounted() {
    this.fetchRandomMeals();
  },
};
</script>


<template>
  <header class="container main-header">
    <a href="#"><img class="img" src="/img/images.jpeg" alt="Logo"></a>

    <NavigationBar />

  </header>

  <section class="header">
    <h1 class="h1">Blog</h1>
    <h1 class="h1">Rôzne recepty</h1>
    <p class="p">Company Mission Statement goes here</p>
    <br>

    <v-autocomplete
        :items="categories"
        v-model="selectedCategory"
        label="Select Category"
        :filter="customFilter"
    ></v-autocomplete>

    <!-- Ingredient Selector -->
    <v-autocomplete
        :items="ingredients"
        v-model="selectedIngredient"
        label="Select Ingredient"
        :filter="customFilter"
    ></v-autocomplete>


    <v-autocomplete
        :items="countries"
        v-model="selectedCountry"
        label="Select Country"
        :filter="customFilter"
    ></v-autocomplete>


  </section>
  <section>
    <SearchDisplay
        :meals="meals"
        @mealSelected="fetchMealDetails"
    />
  </section>
  <v-dialog v-model="isModalOpen" persistent max-width="1200px">
    <v-card v-if="currentMealDetails">
      <v-card-title>
        {{ currentMealDetails?.strMeal }}
        <v-spacer></v-spacer>
        <v-btn icon @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-img :src="currentMealDetails?.strMealThumb" height="600px"></v-img>
        <p><strong>Category:</strong> {{ currentMealDetails?.strCategory }}</p>
        <p><strong>Cuisine:</strong> {{ currentMealDetails?.strArea }}</p>
        <p><strong>Instructions:</strong> {{ currentMealDetails?.strInstructions }}</p>

        <h3>Ingredients:</h3>
        <ul>
          <li v-for="(item, index) in mealIngredients" :key="index">
            {{ item.ingredient }} - {{ item.measure }}
          </li>
        </ul>
        <p v-if="currentMealDetails?.strYoutube">
          <strong>Video Recipe:</strong>
          <a :href="currentMealDetails?.strYoutube" target="_blank">Watch here</a>
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>



  <br>
  <section>
    <v-container>
      <v-row>
        <v-col
            v-for="meal in filteredMeals"
        :key="meal.idMeal"
        cols="12"
        md="4"
        >
        <v-card @click="fetchMealDetails(meal.idMeal)">
          <v-img
              :src="meal.strMealThumb"
              :alt="meal.strMeal"
              height="200px"
              class="image-container"
          ></v-img>
          <v-card-title>{{ meal.strMeal }}</v-card-title>
        </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-chip
          v-for="letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"
          :key="letter"
          class="ma-1"
          outlined
          color="amber darken-2"
          @click="setFilter(letter)"
      >
        {{ letter }}
      </v-chip>
    </v-row>
  </v-container>

  <section class="random-meals-section">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-center my-5" style="color: #FFC107;">Random Meals</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            v-for="meal in randomMeals"
            :key="meal.idMeal"
            cols="12"
            md="4"
        >
          <v-card @click="fetchMealDetails(meal.idMeal)">
            <v-img
                :src="meal.strMealThumb"
                :alt="meal.strMeal"
                height="200px"
                class="image-container"
            ></v-img>
            <v-card-title class="text-center">{{ meal.strMeal }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>


  <section class="v s container">

    <div style="width: 100%;">
      <h1>Recept</h1>
      <h2>Vietnamská polievka PHO BO</h2>
    </div>

  </section>

  <section class="v s container">

    <div class="row">
      <div class="col-75">


        <h3>POSTUP</h3>
        <li>Kosti zalejeme studenou vodou, privedieme k varu a varíme asi 15 minút. Potom ich scedíme a dobre
          opláchneme, opäť zalejeme a dáme variť spolu s celou očistenou cibuľou a sviečkovicou. Pridáme polievkovú
          lyžicu soli a cukru a varíme 2 až tri hodiny v závislosti od veľkosti sviečkovice. Nezakrývame a príležitostne
          zozbierame bielkovinu z povrchu vývaru.
        </li>
        <li>Medzitým pozdĺžne nakrájame zázvor na plátky, cibuľu rozrežeme na polovicu a spolu s škoricou, anízom a
          kardamonom, všetko opečieme na suchej panvici ci platni. Tak dosiahneme efektívnejšie uvoľnenie arómy z
          korenín. Takto pripravené koreniny pridáme k vriacemu vývaru a varíme kým mäsko nezmäkne.
        </li>
        <li>Ryžové rezance namočíme do studenej vody na 30 minút, následne krátko povaríme (postupujeme podľa návodu na
          prípravu) a rozdelíme do misiek. Rezance v miskách zalejeme scedeným vývarom, pridáme na plátky nakrájanú
          sviečkovicu, mungo klíčky, jarné cibuľky, nasekané čili, šalotku, bylinky a tesne pred podávaním pár kvapiek
          limetkovej šťavy.
        </li>

      </div>
      <div class="col-25">
        <ol>
          <h3>INGREDIENCIE</h3>
          <li>2 ks - väčšia špiková kosť</li>
          <li>500 g - hovädzí chvost</li>
          <li>500 g - falošná hovädzia sviečkovica</li>
          <li>1 ks - väčšia cibuľa</li>
        </ol>
        <button class="bat" onclick="myFunction()">Hare me</button>
      </div>
    </div>
  </section>
  <section class="v container">
    <div>
      <table>

        <caption>
          <mark>Nutričných hodnôt</mark>
        </caption>

        <tr>
          <th colspan="5">Porcia (500 ml)</th>
        </tr>

        <tr>
          <th>Energetická hodnota</th>
          <th>Bielkoviny</th>
          <th>Sacharidy</th>
          <th>Tuky</th>
          <th>Vláknina</th>
        </tr>

        <tr>
          <td>362 kcal</td>
          <td>15 g</td>
          <td>40 g</td>
          <td> 15 g</td>
          <td>4 g</td>
        </tr>
      </table>
    </div>
  </section>

  <section>

  </section>

  <footer class="container">

    <FooterComponent />

  </footer>
</template>
<style scoped>
.image-container {
  background-color: rgb(229, 127, 127);
}
</style>
