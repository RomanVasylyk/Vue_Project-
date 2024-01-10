<template>
<header class="container main-header">


  <NavigationBar />

</header>

<main class="container">
  <h1 class="hh1">Galeria</h1>
</main>


<section>
  <div class="slideshow-container">

    <div class="mySlides fade">
      <div class="numbertext">1 / 10</div>
      <img src="/img/1883383.webp" style="width:100%">
    </div>

    <div class="mySlides fade">
      <div class="numbertext">2 / 10</div>
      <img src="/img/1883385.webp" style="width:100%">
    </div>

    <div class="mySlides fade">
      <div class="numbertext">3 / 10</div>
      <img src="/img/1883387.webp" style="width:100%">
    </div>
    <div class="mySlides fade">
      <div class="numbertext">4 / 10</div>
      <img src="/img/1883384.webp" style="width:100%">
    </div>
    <div class="mySlides fade">
      <div class="numbertext">5 / 10</div>
      <img src="/img/1883386.webp" style="width:100%">
    </div>
    <div class="mySlides fade">
      <div class="numbertext">6 / 10</div>
      <img src="/img/1883388.webp" style="width:100%">
    </div>
    <div class="mySlides fade">
      <div class="numbertext">7 / 10</div>
      <img src="/img/1883389.webp" style="width:100%">
    </div>
    <div class="mySlides fade">
      <div class="numbertext">8 / 10</div>
      <img src="/img/1883391.webp" style="width:100%">
    </div>
    <div class="mySlides fade">
      <div class="numbertext">9 / 10</div>
      <img src="/img/Tekst-dlya-reklamy-kafe-i-restoranov-primer-.webp" style="width:100%">
    </div>
    <div class="mySlides fade">
      <div class="numbertext">10 / 10</div>
      <img src="/img/Tekst-dlya-reklamy-kafe-i-restoranov-primer-2.webp" style="width:100%">
    </div>
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
  </div>
  <br>

  <div style="text-align:center">
    <span class="dot" onclick="currentSlide(1)"></span>
    <span class="dot" onclick="currentSlide(2)"></span>
    <span class="dot" onclick="currentSlide(3)"></span>
  </div>
</section>
<section class="conteiner">
  <div class="row">
    <div class="col-25 "><img class="i" style="width: 100%;" src="/img/5.jpeg" alt=""></div>
    <div class="col-25 "><img class="i" style="width: 100%;" src="/img/6.jpeg" alt=""></div>
    <div class="col-25 "><img class="i" style="width: 100%;" src="/img/7.jpeg" alt=""></div>
    <div class="col-25 "><img class="i" style="width: 100%;" src="/img/8.jpeg" alt=""></div>
  </div>
</section>
<br>
<section class="conteiner">
  <div class="row">
    <div class="col-25 "><img class="o" style="width: 100%;" src="/img/9.jpeg" alt=""></div>
    <div class="col-25 "><img class="o" style="width: 100%;" src="/img/10.jpeg" alt=""></div>
    <div class="col-25 "><img class="o" style="width: 100%;" src="/img/11.jpeg" alt=""></div>
    <div class="col-25 "><img class="o" style="width: 100%;" src="/img/12.jpeg" alt=""></div>
  </div>
</section>
<br>
<section class="conteiner">
  <div class="row">
    <div class="col-25 "><img class="u" style="width: 100%;" src="/img/13.jpeg" alt=""></div>
    <div class="col-25 "><img class="u" style="width: 100%;" src="/img/14.jpeg" alt=""></div>
    <div class="col-25 "><img class="u" style="width: 100%;" src="/img/15.jpeg" alt=""></div>
    <div class="col-25 "><img class="u" style="width: 100%;" src="/img/16.jpeg" alt=""></div>
  </div>
</section>


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
}
</script>