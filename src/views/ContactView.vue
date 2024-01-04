<script>
export default {
  name: "ContactView"
}
</script>

<template>
  <header class="container main-header">
    <a href="#"><img class="img" src="/img/images.jpeg" alt="Logo"></a>
    <nav class="main-nav">
      <ul class="main-menu" id="main-menu">

        <li>      <router-link
            to="/">Domov
        </router-link></li>
        <li>      <router-link
            to="/blog">Blog
        </router-link></li>
        <li>      <router-link
            to="/galleria">Galeria
        </router-link></li>
        <li>      <router-link
            to="/contact">Kontakt
        </router-link></li>
      </ul>
      <a class="hamburger" id="hamburger">
        <i class="fa fa-bars"></i>
      </a>
    </nav>
  </header>
  <main>
    <h1 class="hh1">Kontakt</h1>
  </main>

  <section class="container">
    <form id="contact" action="thank.html">
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
    <div class="row1">
      <div class="col-25">
        <h4>Kto sme</h4>
        <p>O reštaurácii talianskej kuchyne "Valentino" možno povedať slovami Oscara Wilda: "Chuť je tichá."</p>
        <p>Toto tvrdenie platí pre elitnú reštauráciu, ktorá dokonale zapadá do atmosféry úzkej uličky a sprostredkúva čaro a pôvab Talianska.</p>
        <p>Jasné osvetlenie fasády a mramorového schodiska, nádherný kovaný plot, svieže kvety v črepníkoch pozývajú alebo dokonca lákajú vojsť dovnútra bez slov. Vládne tu pôvabná aristokracia a diskrétny luxus.</p>
      </div>
      <div class="col-25">
        <h4>Kontaktujte nás</h4>
        <ul>
          <li><i class="fa fa-envelope" aria-hidden="true"><a href="mailto:vasulukroma@gmail.com"> vasulukroma@gmail.com</a></i></li>
          <li><i class="fa fa-phone" aria-hidden="true"><a href="tel:0909500000"> 0909500000</a></i></li>
        </ul>
      </div>
      <div class="col-25">
        <h4>Rýchle odkazy</h4>
        <ul>
          <li>      <router-link
              to="/">Domov
          </router-link></li>
          <li>      <router-link
              to="/blog">Blog
          </router-link></li>
          <li>      <router-link
              to="/galleria">Galeria
          </router-link></li>
          <li>      <router-link
              to="/contact">Kontakt
          </router-link></li>
        </ul>
      </div>
      <div class="col-25">
        <h4>Nájdete nás</h4>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1350063.94591879!2d16.109879762499993!3d48.631974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714c91b15521805%3A0xcd5863381d254045!2sRestaurace%20Hoffer!5e0!3m2!1sru!2ssk!4v1669385778130!5m2!1sru!2ssk" style="border:0;width: 100%;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    <div class="row1">
      Created and designed by Roman Vasylyk
    </div>
  </footer>
</template>

<style scoped>

</style>