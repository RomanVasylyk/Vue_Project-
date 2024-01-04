<script setup>

</script>

<template>

  <header class="container main-header">
    <a><img class="img" src="/img/images.jpeg" alt="Logo"></a>
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
    <div class="hero-img">
      <img style="width: 100%;" src="../../public/img/image.jpeg" alt="">
    </div>

    <div class="hero-text">
      <h1 class="hh1" style="font-size:50px;font-family: fantasy;">Vitajte</h1><br>
      <p style="font-family: fantasy;">v</p><br>
      <p style="font-family: fantasy;"> Našej reštaurácii</p>
    </div>
    <div>
      <a href="https://karaoke-k3.ru/uk/cakes/kratkoe-opisanie-kafe-restoran-shantil-opisanie-menyu-otzyvy-poleznaya.html"><button class="button" style="font-family: fantasy;">Hire me</button></a>
    </div>


  </main>

  <section class="container s fo">
    <div class="row">
      <div class="col-50">
        <h4>Interiér</h4>
        <p>Vo vnútri reštaurácie Mriya je všetko veľmi dobre organizované. Aj preto sa do jej sál zmestí naraz 500 ľudí. Sály reštaurácie sú zariadené mäkkým nábytkom a podlaha je pokrytá kobercami. V hlavnej sále reštaurácie je inštalovaný malý funkčný krb, ktorý je nielen miestnou dekoráciou, ale v chladnom období zohrieva návštevníkov podniku a vytvára atmosféru domácej pohody. V tejto hale sa nachádza vonkajší gril, kde sa pripravujú niektoré jedlá z jedálneho lístka.
          Vo veľkej sále reštaurácie "Mriya" je karaoke, kde môžu hostia predviesť svoje schopnosti. Má tiež vynikajúce zvukové vybavenie, vďaka ktorému je hlas znieť ešte jasnejší. Hostia zariadenia môžu sedieť na farebných mäkkých pohovkách stojacich za stolmi vyrobenými z dreva. Interiér reštaurácie je zariadený v klasickom štýle: podlaha je vyrobená z prírodných dubových dosiek a steny sú zdobené tehlovým murivom.</p>
      </div>
      <div class="col-50">
        <img style="width: 100%;" src="/img/1.avif" alt="">
      </div>
    </div>


  </section>
  <section class="container s fo">
    <div class="row">
      <div class="col-50">
        <img style="width: 100%;" src="/img/2.avif" alt="">
      </div>
      <div class="col-50">
        <h4>Kuchyňa</h4>
        <p>V reštaurácii "Mriya" sa podávajú jedlá európskej, japonskej a stredomorskej kuchyne. Jedálny lístok tohto zariadenia je pomerne rozmanitý, plný vynikajúcich európskych jedál. Môžete tu ochutnať zaujímavé studené (tatarák z červeného tuniaka s krutónmi, lososové carpaccio s granulovaným červeným kaviárom, bravčová masť s cesnakom a chlebom Borodino, syr "Pinocchio" s paradajkami) a teplé predjedlá (zapečené krabie falangy, knedle, wasabi krevety) s krabmi s avokádo), šaláty (s vyprážaným lososom, s kuracou pečeňou, "grécky", s grilovanou zeleninou s balzamikovým dresingom a parmezánom). Na začiatok ponúkajú niekoľko možností polievok (šťaveľová polievka, jahňací lagman, slepačia rezancová polievka, hríbová polievka) a ako hlavné jedlo teplé mäsové jedlá (mäso na francúzsky spôsob, kačacie rezne, kuracie filé s orechovou omáčkou, mramor steak so sójovými bôbmi) a jedlá z rýb (rezne zo šťuky, filé z murmanskej tresky, krabie rezne so šalátom chuka a avokádom). Reštaurácia Mriya ponúka aj grilované jedlá (krevety, hrebenatky, chobotnice, dorado, chobotnice, steak z lososa, lyula kebab, ribeye steak).</p>
      </div>
    </div>
  </section>
  <section class="container s fo">
    <div class="row">
      <div class="col-50">
        <h4>Raňajky</h4>
        <p>Každý hosť zariadenia môže využiť špeciálnu ponuku, ktorá platí počas celého dňa a nazýva sa „Raňajky“. Ponuka tejto ponuky obsahuje niekoľko možností na varenie vajec, ktoré sú dodávané z farmy Jevhena Savatova z dediny Orlya (región Kaluga). Aj v tomto malom sortimente je burger s placičkou "Prime", tvarohové cheesecaky, ovsená kaša jogurt s višňovým džemom. Cena kompletnej sady, ktorá môže obsahovať raňajky, je cca 500 eur.</p>
      </div>
      <div class="col-50">
        <img style="width: 100%;" src="/img/3.avif" alt="">
      </div>
    </div>
  </section>

  <section>
    <button class="accordion">Pilaf s baklažánom</button>
    <div class="panel">
      <div class="container row">
        <div class="col-50"><img style="width: 100%;" src="/img/4.png" alt=""></div>
        <div class="col-50"><p style="font-family: fantasy;">Podľa legendy pilaf vynašli kuchári Alexandra Veľkého, pretože miloval horúce a korenené jedlá. Teraz chápem, prečo sa toto jedlo považuje za mužské. Spolu so šéfkuchárom a kvôli kompatibilite aj s kamarátom Dmytrom Kensytkym uvarili na ohni pilaf podľa autorkinho receptu. Ukázalo sa to veľmi pikantné a bohaté na chuť.</p></div>
      </div>
    </div>

    <button class="accordion">Ukrajinský boršč s fazuľou, žihľavou a opitou čerešňou</button>
    <div class="panel">
      <div class="container row">
        <div class="col-50"><img style="width: 100%;" src="/img/5.jpeg" alt=""></div>
        <div class="col-50"><p style="font-family: fantasy;">Existuje názor, že ide o veľmi staré jedlo, ktoré kočovné fínsko-maďarské kmene priniesli na územie moderného Maďarska a nášho ukrajinského Zakarpatska. Prototypom tohto jedla bol recept nomádov, ktorí používali sušené konské mäso, hovädzie mäso varené v kotlíku a pridávali ingrediencie trávy, korienkov a húb, ktoré v tom čase poznali.</p></div>
      </div>
    </div>

    <button class="accordion">Rokotkrumpli</button>
    <div class="panel">
      <div class="container row">
        <div class="col-50"><img style="width: 100%;" src="/img/6.jpeg" alt=""></div>
        <div class="col-50"><p style="font-family: fantasy;">Podivný názov hneď napovedá o cudzom pôvode. Vskutku, ide o maďarské jedlo, ktoré si Ukrajinci osvojili do svojho každodenného života. Koniec koncov, recept nie je vôbec zložitý a obsahuje ingrediencie, ktoré má každá rodina: zemiaky, syr, akékoľvek údené mäso a vajcia. To všetko je rozložené v tenkých vrstvách, ochutené červenou paprikou a zapečené.</p></div>
      </div>
    </div>

    <button class="accordion">Knyshi</button>
    <div class="panel">
      <div class="container row">
        <div class="col-50"><img style="width: 100%;" src="/img/7.jpeg" alt=""></div>
        <div class="col-50"><p style="font-family: fantasy;">O pôvode tohto jedla sa vedú mnohé spory. Podľa jednej verzie pochádza z Bieloruska. Vo veľkej časti severných a stredoukrajinských regiónov sa však tešila veľkej obľube. Knyshy sú okrúhle koláčiky z lístkového cesta, v strede ktorých je pomerne veľa plnky. Náplň môže byť veľmi rôznorodá: kaša, zemiaková kaša, zelenina, syry a zelenina. Takouto pochúťkou bola príloha k polievkam či mäsitým jedlám. Nechýbala ani sladká verzia jedla s ovocím, bobuľami a domácim syrom.</p></div>
      </div>
    </div>

    <button class="accordion">Kotsyurb</button>
    <div class="panel">
      <div class="container row">
        <div class="col-50"><img style="width: 100%;" src="/img/8.jpeg" alt=""></div>
        <div class="col-50"><p style="font-family: fantasy;">Jedlo, ktoré kombinuje zemiakovú kašu a knedľu. Vzdialene pripomínajúca taliansku variáciu cestovín, kde sa podáva aj so zemiakovou kašou. Nemenej chutné je aj ukrajinské tradičné jedlo: malé halušky z cesta, zemiakov, oškvarkov a cesnaku sa zmiešajú v makitre a to všetko sa podáva v jednej nádobe. Ďalšou verziou jedla je zemiaky nerozdrviť a podávať ich v hrubých kúskoch.</p></div>
      </div>
    </div>
  </section>




  <footer class="container">
    <div style="align-items: flex-start;" class="row1">
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
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1350063.94591879!2d16.109879762499993!3d48.631974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714c91b15521805%3A0xcd5863381d254045!2sRestaurace%20Hoffer!5e0!3m2!1sru!2ssk!4v1669385778130!5m2!1sru!2ssk"  style="border:0;width: 100%;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    <div class="row1">
      Created and designed by Roman Vasylyk
    </div>
  </footer>
</template>
<script>
export default {
  name: "HomeView"
}
</script>