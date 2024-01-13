<template>
<header class="container main-header">


  <NavigationBar />

</header>

<main class="container">
  <h1 class="hh1">Galeria</h1>
</main>


  <section>
    <v-carousel hide-delimiters cycle>
      <v-carousel-item v-for="(slide, index) in slides" :key="index">
        <v-img :src="slide.src"></v-img>
      </v-carousel-item>
    </v-carousel>
  </section>

  <v-container>
    <v-row>
      <v-col v-for="(image, index) in imagesRow1" :key="index" cols="12" sm="6" md="3">
        <v-img :src="image" class="i" aspect-ratio="1.5"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(image, index) in imagesRow2" :key="index" cols="12" sm="6" md="3">
        <v-img :src="image" class="o" aspect-ratio="1.5"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(image, index) in imagesRow3" :key="index" cols="12" sm="6" md="3">
        <v-img :src="image" class="u" aspect-ratio="1.5"></v-img>
      </v-col>
    </v-row>
  </v-container>


<footer class="container">

  <FooterComponent />

</footer>
</template>
<script>
import NavigationBar from '../components/NavigationBar.vue';
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  components: {
    NavigationBar,
    FooterComponent,

  },
  data() {
    return {
      slides: [
        { src: '/img/1883383.webp' },
        { src: '/img/1883385.webp' },
        { src: '/img/1883387.webp' },
        { src: '/img/1883384.webp' },
        { src: '/img/1883386.webp' },
        { src: '/img/1883388.webp' },
        { src: '/img/1883389.webp' },
        { src: '/img/1883391.webp' },
        { src: '/img/Tekst-dlya-reklamy-kafe-i-restoranov-primer-.webp' },
        { src: '/img/Tekst-dlya-reklamy-kafe-i-restoranov-primer-2.webp' },
      ],
      imagesRow1: [
        '/img/5.jpeg',
        '/img/6.jpeg',
        '/img/7.jpeg',
        '/img/8.jpeg'
      ],
      imagesRow2: [
        '/img/9.jpeg',
        '/img/10.jpeg',
        '/img/11.jpeg',
        '/img/12.jpeg'
      ],
      imagesRow3: [
        '/img/13.jpeg',
        '/img/14.jpeg',
        '/img/15.jpeg',
        '/img/16.jpeg'
      ]
    };
  }
}
</script>