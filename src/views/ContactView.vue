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

<template>
  <header class="container main-header">

    <NavigationBar />

  </header>
  <main>
    <h1 class="hh1">Kontakt</h1>
  </main>

  <section class="container">
    <form id="contact" action="../../public/thank.html">
      <input  name="name" type="text" class="feedback-input m" placeholder="Name" required />
      <input  name="email" type="email" class="feedback-input" placeholder="Email" required />
      <textarea  name="text" required class="feedback-input" placeholder="Comment"></textarea>
      <input class="z" maxlength="140" type="checkbox" id="vehicle1" name="vehicle1" required value="Bike">
      <label class="z" for="vehicle1">Súhlas so spracovaním osobných údajov</label>
      <input  type="submit" value="Odoslať" ></input>

    </form>
    <div id= "error" class="text-red">

    </div>
  </section>





  <footer class="container">

    <FooterComponent />

  </footer>
</template>

