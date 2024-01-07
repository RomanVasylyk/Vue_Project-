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
    </ul>
    <a class="hamburger" id="hamburger">
      <i class="fa fa-bars"></i>
    </a>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
};
</script>

