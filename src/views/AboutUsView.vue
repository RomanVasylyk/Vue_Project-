
<script>
import { useRootStore } from "@/stores/root.js";
import axios from 'axios';

export default {
  data() {
    return {
      selectedCategory: null,
      currentMealDetails: null,
      isModalOpen: false,
      ingredients: [],
      selectedIngredient: null,

    };
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
  },
  async created() {
    const categoryStore = useRootStore();
    categoryStore.getCategory();
      const ingredientResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      this.ingredients = ingredientResponse.data.meals.map(ingredient => ingredient.strIngredient);
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
    customFilter(item, queryText, itemText) {
      const text = item.toLowerCase();
      const query = queryText.toLowerCase();
      return text.indexOf(query) > -1;
    },
    async fetchMeals() {
      const categoryStore = useRootStore();
      await categoryStore.getMealsByCategoryAndIngredient(this.selectedCategory, this.selectedIngredient);
    },

  },
};
</script>


<template>
  <header class="container main-header">
    <a href="#"><img class="img" src="/img/images.jpeg" alt="Logo"></a>
    <nav class="main-nav">
      <ul class="main-menu" id="main-menu">
        <li>
          <router-link
              to="/">Domov
          </router-link>
        </li>
        <li>
          <router-link
              to="/blog">Blog
          </router-link>
        </li>
        <li>
          <router-link
              to="/galleria">Galeria
          </router-link>
        </li>
        <li>
          <router-link
              to="/contact">Kontakt
          </router-link>
        </li>
      </ul>
      <a class="hamburger" id="hamburger">
        <i class="fa fa-bars"></i>
      </a>
    </nav>
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

  </section>
  <section>
    <v-row>
      <v-col
          cols="12"
          md="4"
          v-for="meal in meals"
          :key="meal.idMeal"
      >
        <v-card @click="fetchMealDetails(meal.idMeal)">
          <div class="image-container">
            <v-img
                :src="meal.strMealThumb"
                :alt="meal.strMeal"
                height="200px"
            ></v-img>
          </div>
          <v-card-title>{{ meal.strMeal }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
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
    <div class="row1">
      <div class="col-25">
        <h4>Kto sme</h4>
        <p>O reštaurácii talianskej kuchyne "Valentino" možno povedať slovami Oscara Wilda: "Chuť je tichá."</p>
        <p>Toto tvrdenie platí pre elitnú reštauráciu, ktorá dokonale zapadá do atmosféry úzkej uličky a sprostredkúva
          čaro a pôvab Talianska.</p>
        <p>Jasné osvetlenie fasády a mramorového schodiska, nádherný kovaný plot, svieže kvety v črepníkoch pozývajú
          alebo dokonca lákajú vojsť dovnútra bez slov. Vládne tu pôvabná aristokracia a diskrétny luxus.</p>
      </div>
      <div class="col-25">
        <h4>Kontaktujte nás</h4>
        <ul>
          <li><i class="fa fa-envelope" aria-hidden="true"><a href="mailto:vasulukroma@gmail.com">
            vasulukroma@gmail.com</a></i></li>
          <li><i class="fa fa-phone" aria-hidden="true"><a href="tel:0909500000"> 0909500000</a></i></li>
        </ul>
      </div>
      <div class="col-25">
        <h4>Rýchle odkazy</h4>
        <ul>
          <li>
            <router-link
                to="/">Domov
            </router-link>
          </li>
          <li>
            <router-link
                to="/blog">Blog
            </router-link>
          </li>
          <li>
            <router-link
                to="/galleria">Galeria
            </router-link>
          </li>
          <li>
            <router-link
                to="/contact">Kontakt
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col-25">
        <h4>Nájdete nás</h4>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1350063.94591879!2d16.109879762499993!3d48.631974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714c91b15521805%3A0xcd5863381d254045!2sRestaurace%20Hoffer!5e0!3m2!1sru!2ssk!4v1669385778130!5m2!1sru!2ssk"
            style="border:0;width: 100%;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    <div class="row1">
      Created and designed by Roman Vasylyk
    </div>
  </footer>
</template>

<style scoped>
.image-container {
  background-color: rgb(229, 127, 127);
}
</style>