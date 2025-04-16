<template>
  <div class="home-page">

    <section class="hero">
      <video autoplay muted loop class="hero-video">
        <source src="https://cdn.pixabay.com/video/2024/12/03/244754_tiny.mp4" type="video/mp4">
      </video>
      <div class="hero-content">
        <h1 class="hero-title">Otkrivamo tajne<br>divljine</h1>
        <p class="hero-subtitle">Istražite nevjerojatnu raznolikost životinjskog carstva</p>
        <div class="hero-buttons">
          <button class="btn-primary" @click="scrollToGallery">Istraži galeriju</button>
          <button class="btn-secondary">Video arhiva</button>
        </div>
      </div>
      <div class="hero-scroll-indicator" @click="scrollToContent">
        <span>Scroll down</span>
        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
      </div>
    </section>

    <section class="floating-section" ref="content">
      <div class="floating-cards">
        <div class="floating-card" v-for="(animal, index) in featuredAnimals" :key="index"
             :style="{ '--delay': index * 0.1 + 's' }">
          <div class="card-image">
            <img :src="animal.image" :alt="animal.name" loading="lazy">
          </div>
          <div class="card-content">
            <h3>{{ animal.name }}</h3>
            <p class="animal-scientific">Latinski: <em>{{ animal.scientific }}</em></p>
            <p>{{ animal.shortDesc }}</p>
            <div class="animal-details">
              <p><strong>Stanište:</strong> {{ animal.habitat }}</p>
              <p><strong>Prehrana:</strong> {{ animal.diet }}</p>
              <p><strong>Status:</strong> {{ animal.status }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="split-section">
      <div class="split-video">
        <div class="video-wrapper">
          <video autoplay muted loop class="hero-video">
            <source src="https://cdn.pixabay.com/video/2023/06/30/169471-841382876_tiny.mp4" type="video/mp4">
          </video>
        </div>
      </div>
      <div class="split-content">
        <h2>Zašto su životinje<br>toliko fascinantne?</h2>
        <p>Svaka vrsta nosi jedinstvenu priču evolucije i prilagodbe. Naša misija je dokumentirati i čuvati ove nevjerojatne organizme za buduće generacije.</p>
        <ul class="feature-list">
          <li v-for="(feature, index) in features" :key="index">
            <span class="feature-icon">{{ feature.icon }}</span>
            <span>{{ feature.text }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="gallery-section" ref="gallery">
      <div class="gallery-header">
        <h2>Fotogalerija</h2>
        <p>Pogledajte životinje u njihovom prirodnom staništu</p>
      </div>
      <div class="masonry-grid">
        <div class="masonry-item"
             v-for="(image, index) in galleryImages"
             :key="index"
             :class="'size-' + image.size"
             @click="openLightbox(index)">
          <img :src="image.url" :alt="'Slika ' + (index + 1)" loading="lazy">
          <div class="image-overlay">
            <span class="zoom-icon">+</span>
          </div>
        </div>
      </div>
    </section>

    <section class="facts-section">
      <div class="facts-container">
        <div class="fact-card" v-for="(fact, index) in animalFacts" :key="index">
          <div class="fact-number">{{ index + 1 }}</div>
          <h3>{{ fact.title }}</h3>
          <p>{{ fact.content }}</p>
        </div>
      </div>
    </section>

    <section class="newsletter-section">
      <div class="newsletter-content">
        <h2>Pridružite se našoj zajednici</h2>
        <p>Primajte najnovije vijesti i ekskluzivne sadržaje o životinjama direktno na vaš email</p>
        <form class="newsletter-form">
          <input type="email" placeholder="Vaša email adresa" required>
          <button type="submit">Prijavi se</button>
        </form>
      </div>
      <div class="newsletter-image">
        <img src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Vuk" loading="lazy">
      </div>
    </section>

    <div class="lightbox" v-if="lightboxOpen" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">×</button>
      <button class="lightbox-nav prev" @click="prevImage">‹</button>
      <img :src="galleryImages[currentImageIndex].url" class="lightbox-image">
      <button class="lightbox-nav next" @click="nextImage">›</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      featuredAnimals: [
        {
          name: 'Arktička lisica',
          scientific: 'Vulpes lagopus',
          shortDesc: 'Majstor preživljavanja u ekstremnim uvjetima sa bijelim zimskim krznom koje se ljeti pretvara u smeđe.',
          habitat: 'Arktičke regije, tundra',
          diet: 'Svežder (glodavci, ptice, bobe)',
          status: 'Najmanje zabrinjavajući',
          image: './src/images/lisica.jpg'
        },
        {
          name: 'Morski lav',
          scientific: 'Zalophus californianus',
          shortDesc: 'Izuzetno spretni u vodi, mogu plivati brzinom do 40 km/h i roniti do 300 metara dubine.',
          habitat: 'Kalifornijska obala, Galapagos',
          diet: 'Ribe, lignje, školjke',
          status: 'Najmanje zabrinjavajući',
          image: './src/images/lav.jpg'
        },
        {
          name: 'Crvena panda',
          scientific: 'Ailurus fulgens',
          shortDesc: 'Noćna životinja koja provodi većinu vremena na drveću, hrani se uglavnom bambusom.',
          habitat: 'Himalaji, jugoistočna Azija',
          diet: 'Bambus, voće, jaja',
          status: 'Ugrožena vrsta',
          image: './src/images/panda.jpg'
        },
        {
          name: 'Sivi vuk',
          scientific: 'Canis lupus',
          shortDesc: 'Društvene životinje koje žive u čoporima sa kompleksnom hijerarhijom i komunikacijom.',
          habitat: 'Šume, tundra, pustinje',
          diet: 'Meat (jeleni, losovi, zečevi)',
          status: 'Najmanje zabrinjavajući',
          image: './src/images/vuk.jpg'
        },
        {
          name: 'Sivi ždral',
          scientific: 'Grus grus',
          shortDesc: 'Poznati po svojim složenim plesovima i glasnim trubama koje se čuju na velike udaljenosti.',
          habitat: 'Močvare, livade, tundra',
          diet: 'Biljke, kukci, maleni kralježnjaci',
          status: 'Najmanje zabrinjavajući',
          image: './src/images/zdral.webp',
        }
      ],
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', size: 'medium' },
        { url: 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', size: 'medium' },
        { url: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', size: 'small' },
        { url: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', size: 'small' },
        { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4MnqP0so-K1Vmo1rAqkWKUYnqzIcjra9KsQ&s', size: 'small' },
        { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', size: 'medium' },
        { url: 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', size: 'medium' },
        { url: 'https://t4.ftcdn.net/jpg/05/51/73/07/360_F_551730796_1hsv3NPmpSlhmyWXHtthxK7TfDEka6cQ.jpg', size: "medium"},
        { url: 'https://t4.ftcdn.net/jpg/06/72/14/97/360_F_672149763_AhUAsQB4RbVxsBBJW3GBhrJX0nvivXJo.jpg', size: 'medium' },

      ],
      animalFacts: [
        {
          title: 'Komunikacija',
          content: 'Pčele koriste "plesni jezik" za prenošenje informacija o lokaciji cvijeća.'
        },
        {
          title: 'Inteligencija',
          content: 'Hobotnice imaju 9 mozgova - jedan centralni i po jedan u svakom od 8 krakova.'
        },
        {
          title: 'Prilagodba',
          content: 'Kamile mogu izgubiti do 25% tjelesne tekućine bez dehidracije.'
        }
      ],
      features: [
        { icon: '🌍', text: 'Životinje iz svih kontinenata' },
        { icon: '📹', text: 'Ekskluzivni video sadržaji' },
        { icon: '🔬', text: 'Znanstveno potkrijepljene činjenice' },
        { icon: '🛡️', text: 'Programi zaštite ugroženih vrsta' }
      ],
      lightboxOpen: false,
      currentImageIndex: 0
    }
  },
  methods: {
    scrollToContent() {
      this.$refs.content.scrollIntoView({ behavior: 'smooth' });
    },
    scrollToGallery() {
      this.$refs.gallery.scrollIntoView({ behavior: 'smooth' });
    },
    openLightbox(index) {
      this.currentImageIndex = index;
      this.lightboxOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeLightbox() {
      this.lightboxOpen = false;
      document.body.style.overflow = 'auto';
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
    }
  },
  mounted() {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}
</script>

<style scoped>

.animal-scientific {
  color: #636e72;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.animal-details {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.animal-details p {
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #555;
}

.home-page {
  font-family: 'Poppins', sans-serif;
  color: #2d3436;
  line-height: 1.6;
  overflow-x: hidden;
  margin-right: -100px;
  margin-left: 0;
}
.hero {
  position: relative;
  height: 100vh;
  min-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  padding: 0 40px;
  text-align: center;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  max-width: 700px;
  margin: 0 auto 40px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn-primary, .btn-secondary {
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #ff7675 0%, #e84393 100%);
  color: white;
  box-shadow: 0 8px 24px rgba(232, 67, 147, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(232, 67, 147, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  cursor: pointer;
  z-index: 3;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.hero-scroll-indicator:hover {
  opacity: 1;
}

.hero-scroll-indicator span {
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.hero-scroll-indicator svg {
  fill: white;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.floating-section {
  position: relative;
  padding: 120px 40px;
  background: #f9f9f9;
  margin-top: -80px;
  z-index: 2;
}

.floating-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.floating-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  width: 320px;
  opacity: 0;
  transform: translateY(40px);
  animation: fadeInUp 0.6s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.floating-card:hover {
  transform: translateY(-10px) !important;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
}

.card-image {
  height: 240px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.floating-card:hover .card-image img {
  transform: scale(1.1);
}

.card-content {
  padding: 24px;
}

.card-content h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2d3436;
}

.card-content p {
  color: #636e72;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.card-link svg {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.card-link:hover svg {
  transform: translateX(4px);
}

.split-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
  position: relative;
}

.split-video {
  position: relative;
  overflow: hidden;
}

.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.split-content {
  padding: 100px 60px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

.split-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  line-height: 1.3;
}

.split-content p {
  font-size: 1.1rem;
  margin-bottom: 40px;
  color: #636e72;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 1rem;
}

.feature-icon {
  font-size: 1.5rem;
  margin-right: 15px;
  width: 40px;
  height: 40px;
  background: rgba(255, 118, 117, 0.1);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.gallery-section {
  padding: 120px 40px;
  background: white;
}

.gallery-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
}

.gallery-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.gallery-header p {
  font-size: 1.1rem;
  color: #636e72;
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.masonry-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.masonry-item:hover {
  transform: scale(0.98);
}

.masonry-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.masonry-item:hover .image-overlay {
  opacity: 1;
}

.zoom-icon {
  color: white;
  font-size: 2rem;
  font-weight: 300;
}

.facts-section {
  padding: 80px 40px;
  background: linear-gradient(135deg, #ff7675 0%, #e84393 100%);
  color: white;
}

.facts-container {
  display: flex;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.fact-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px 30px;
  flex: 1;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fact-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.15);
}

.fact-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  opacity: 0.7;
}

.fact-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.fact-card p {
  font-size: 0.95rem;
  opacity: 0.9;
  line-height: 1.7;
}
.newsletter-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;
}

.newsletter-content {
  padding: 80px;
  background: #2d3436;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.newsletter-content h2 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.3;
}

.newsletter-content p {
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 40px;
}

.newsletter-form {
  display: flex;
  max-width: 500px;
}

.newsletter-form input {
  flex: 1;
  padding: 16px 20px;
  border: none;
  border-radius: 8px 0 0 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
}

.newsletter-form button {
  padding: 16px 30px;
  background: linear-gradient(135deg, #ff7675 0%, #e84393 100%);
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  opacity: 0.9;
}

.newsletter-image {
  position: relative;
  overflow: hidden;
}

.newsletter-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-image {
  max-height: 80vh;
  max-width: 80vw;
  object-fit: contain;
  border-radius: 8px;
}

.lightbox-close {
  position: absolute;
  top: 40px;
  right: 40px;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.lightbox-close:hover {
  transform: scale(1.2);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.4);
}

.lightbox-nav.prev {
  left: 40px;
}

.lightbox-nav.next {
  right: 40px;
}

@media (max-width: 1200px) {
  .hero-title {
    font-size: 3.5rem;
  }

  .floating-cards {
    flex-wrap: wrap;
  }

  .floating-card {
    width: calc(50% - 15px);
  }

  .split-content {
    padding: 60px 40px;
  }

  .masonry-grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

@media (max-width: 992px) {
  .split-section {
    grid-template-columns: 1fr;
  }

  .video-wrapper {
    position: relative;
    height: 400px;
    padding: 20px;
  }

  .newsletter-section {
    grid-template-columns: 1fr;
  }

  .newsletter-content {
    padding: 60px 40px;
    order: 2;
  }

  .newsletter-image {
    height: 300px;
    order: 1;
  }

  .masonry-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 700px;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .floating-card {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .facts-container {
    flex-direction: column;
  }

  .masonry-grid {
    grid-template-columns: repeat(4, 1fr);
  }

}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .btn-primary, .btn-secondary {
    padding: 12px 24px;
    font-size: 0.9rem;
  }

  .floating-section, .gallery-section {
    padding: 80px 20px;
  }

  .split-content {
    padding: 40px 20px;
  }

  .split-content h2 {
    font-size: 2rem;
  }

  .masonry-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

}
</style>