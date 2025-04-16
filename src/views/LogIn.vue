<template>
  <div class="animal-profile">
    <section class="hero-section">
      <div class="hero-image">
        <img :src="animal.mainImage" :alt="animal.name" loading="lazy">
      </div>
      <div class="hero-content">
        <h1>{{ animal.name }}</h1>
        <p class="scientific-name">{{ animal.scientificName }}</p>
        <div class="status-badge" :class="animal.status.toLowerCase()">
          {{ animal.status }}
        </div>
      </div>
    </section>

    <section class="info-section">
      <div class="container">
        <div class="quick-facts">
          <h2>Brze činjenice</h2>
          <div class="facts-grid">
            <div class="fact-item" v-for="(fact, index) in quickFacts" :key="index">
              <div class="fact-icon">{{ fact.icon }}</div>
              <div class="fact-text">
                <h3>{{ fact.title }}</h3>
                <p>{{ fact.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="description">
          <h2>Opis</h2>
          <p>{{ animal.description }}</p>
        </div>
      </div>
    </section>

    <section class="gallery-section">
      <h2>Galerija</h2>
      <div class="gallery-grid">
        <div class="gallery-item" v-for="(image, index) in animal.gallery" :key="index">
          <img :src="image" :alt="'Slika ' + (index + 1) + ' - ' + animal.name" loading="lazy" @click="openLightbox(index)">
        </div>
      </div>
    </section>

    <section class="report-section">
      <div class="container">
        <h2>Prijavi promatranje</h2>
        <p class="subtitle">Jeste li vidjeli ovu životinju u prirodi? Podijelite svoje zapažanje s nama!</p>

        <form class="report-form" @submit.prevent="submitReport">
          <div class="form-row">
            <div class="form-group">
              <label for="location">Lokacija:</label>
              <div class="input-with-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <input type="text" id="location" v-model="report.location" required placeholder="Unesite lokaciju ili označite na mapi">
              </div>
              <button type="button" class="map-btn" @click="openMapModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                </svg>
                Označi na mapi
              </button>
            </div>

            <div class="form-group">
              <label for="date">Datum promatranja:</label>
              <div class="input-with-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <input type="date" id="date" v-model="report.date" required>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="notes">Detalji promatranja:</label>
            <textarea id="notes" v-model="report.notes" placeholder="Opisite što ste vidjeli, ponašanje životinje, okolnosti..."></textarea>
            <div class="char-count">{{ report.notes.length }}/500</div>
          </div>

          <div class="form-group">
            <label>Dodatni podaci:</label>
            <div class="additional-fields">
              <div class="field-group">
                <label for="quantity">Broj životinja:</label>
                <input type="number" id="quantity" v-model="report.quantity" min="1" placeholder="1">
              </div>
              <div class="field-group">
                <label for="behavior">Ponašanje:</label>
                <select id="behavior" v-model="report.behavior">
                  <option value="">Odaberite</option>
                  <option value="feeding">Hranjenje</option>
                  <option value="resting">Odmor</option>
                  <option value="hunting">Lov</option>
                  <option value="moving">Kretanje</option>
                  <option value="other">Drugo</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-group photo-upload">
            <label for="photo">Dodaj fotografije (maks. 3):</label>
            <div class="upload-area" @click="triggerFileInput" @dragover.prevent="dragOver" @drop.prevent="handleDrop">
              <input type="file" id="photo" ref="fileInput" @change="handleFileUpload" multiple accept="image/*" style="display: none;">
              <div class="upload-content" :class="{ 'drag-active': isDragActive }">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                  <line x1="16" y1="5" x2="22" y2="5"></line>
                  <line x1="19" y1="2" x2="19" y2="8"></line>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
                <p>Povucite i otpustite slike ovdje ili kliknite za odabir</p>
              </div>
            </div>
            <div class="preview-grid" v-if="report.photos && report.photos.length > 0">
              <div class="preview-item" v-for="(photo, index) in report.photos" :key="index">
                <img :src="getPhotoUrl(photo)" alt="Preview slike">
                <button class="remove-btn" @click.stop="removePhoto(index)">
                  &times;
                </button>
              </div>
            </div>
          </div>

          <div class="form-footer">
            <div class="privacy-note">
              <input type="checkbox" id="privacy" v-model="report.privacyConsent" required>
              <label for="privacy">Slažem se s pravilima privatnosti i prikupljanja podataka</label>
            </div>
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Pošalji prijavu</span>
              <span v-else class="loading">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
            Šaljem...
          </span>
            </button>
          </div>
        </form>
      </div>

      <div class="map-modal" v-if="showMapModal" @click.self="closeMapModal">
        <div class="modal-content">
          <button class="close-modal" @click="closeMapModal">&times;</button>
          <h3>Označite lokaciju promatranja</h3>
          <div class="map-container">
            <div class="map-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p>Mapa za označavanje lokacije</p>
            </div>
          </div>
          <button class="confirm-location" @click="confirmLocation">Potvrdi lokaciju</button>
        </div>
      </div>
    </section>

    <section class="related-section">
      <div class="container">
        <h2>Slične životinje</h2>
        <div class="related-animals">
          <div class="animal-card" v-for="related in relatedAnimals" :key="related.id">
            <router-link :to="'/zivotinje/' + related.slug">
              <img :src="related.image" :alt="related.name" loading="lazy">
              <h3>{{ related.name }}</h3>
              <p>{{ related.scientificName }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <div class="lightbox" v-if="lightboxOpen" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">×</button>
      <img :src="animal.gallery[currentImageIndex]" class="lightbox-image">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimalProfile',
  data() {
    return {
      animal: {
        id: 1,
        name: 'Ris',
        scientificName: 'Lynx lynx',
        status: 'Ugrožena',
        mainImage: 'https://images.rewildingbritain.org.uk/images/eurasian-lynx-c-tomas-hulik-shutterstock.jpg?auto=format&crop=focalpoint&domain=images.rewildingbritain.org.uk&fit=crop&fp-x=0.5468&fp-y=0.3143&h=1080&ixlib=php-3.3.1&q=82&usm=20&w=1920',
        description: 'Ris je velika mačka koja nastanjuje šume Evrope i Azije. Prepoznatljiv je po čupercima na ušima i kratkom repu. Risi su samotnjaci i izvrsni lovci, koji se uglavnom hrane zečevima i drugim manjim sisarima. Imaju izuzetno oštar vid i sluh, što im pomaže u lovu noću.',
        gallery: [
          'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1547721064-da6cfb341d50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4MnqP0so-K1Vmo1rAqkWKUYnqzIcjra9KsQ&s',
          'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://t4.ftcdn.net/jpg/05/51/73/07/360_F_551730796_1hsv3NPmpSlhmyWXHtthxK7TfDEka6cQ.jpg',
          'https://t4.ftcdn.net/jpg/06/72/14/97/360_F_672149763_AhUAsQB4RbVxsBBJW3GBhrJX0nvivXJo.jpg',
          'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        ],
        slug: 'ris'
      },
      quickFacts: [
        { icon: '🏠', title: 'Stanište', value: 'Šume, planine' },
        { icon: '🍖', title: 'Prehrana', value: 'Mesojed (zečevi, ptice)' },
        { icon: '📏', title: 'Veličina', value: '80-130 cm (dužina tijela)' },
        { icon: '⚖️', title: 'Težina', value: '18-30 kg' },
        { icon: '👶', title: 'Mladunci', value: '1-4 po leglu' },
        { icon: '⏳', title: 'Životni vijek', value: '10-15 godina u prirodi' }
      ],
      relatedAnimals: [
        {
          id: 2,
          name: 'Iberski ris',
          scientificName: 'Lynx pardinus',
          image: 'https://n1info.si/wp-content/uploads/2024/06/20/1718911067-iberski-ris-3-750x500.jpg',
          slug: 'iberski-ris'
        },
        {
          id: 3,
          name: 'Kanadski ris',
          scientificName: 'Lynx canadensis',
          image: 'https://galerija.nezavisne.rs/v/20200716190917476887.jpg',
          slug: 'kanadski-ris'
        },
        {
          id: 4,
          name: 'Puma',
          scientificName: 'Puma concolor',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2yhTi7fnSO8tNIVAQJeBhqNizJd5dxV74qQ&s',
          slug: 'puma'
        },
        {
          id: 5,
          name: 'Jaguar',
          scientificName: 'Jaguero',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Jaguar_head_shot.jpg/941px-Jaguar_head_shot.jpg',
          slug: 'puma'
        }
      ],
      report: {
        location: '',
        date: '',
        notes: '',
        photo: null
      },
      lightboxOpen: false,
      currentImageIndex: 0
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    handleFileUpload(event) {
      const files = event.target.files;
      if (files.length > 3) {
        alert('Možete dodati najviše 3 fotografije');
        return;
      }

      this.report.photos = Array.from(files);
    },

    getPhotoUrl(file) {
      return URL.createObjectURL(file);
    },

    removePhoto(index) {
      this.report.photos.splice(index, 1);
    },

    dragOver() {
      this.isDragActive = true;
    },

    handleDrop(event) {
      this.isDragActive = false;
      this.handleFileUpload({ target: { files: event.dataTransfer.files } });
    },

    openMapModal() {
      this.showMapModal = true;
    },

    closeMapModal() {
      this.showMapModal = false;
    },

    confirmLocation() {
      this.report.location = "Odabrana lokacija na mapi";
      this.closeMapModal();
    },

    submitReport() {
      this.isSubmitting = true;
      setTimeout(() => {
        alert('Hvala na prijavi! Vaše zapažanje je uspješno zabilježeno.');
        this.resetForm();
        this.isSubmitting = false;
      }, 1500);
    },

    resetForm() {
      this.report = {
        location: '',
        date: '',
        notes: '',
        quantity: 1,
        behavior: '',
        photos: [],
        privacyConsent: false
      };
    }
  }
}


</script>

<style scoped>
/* Osnovni stilovi */
.animal-profile {
  font-family: 'Poppins', sans-serif;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero sekcija */
.hero-section {
  position: relative;
  height: 70vh;
  min-height: 500px;
  display: flex;
  align-items: flex-end;
  margin-bottom: 50px;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.hero-content {
  padding: 40px;
  color: white;
  width: 100%;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.scientific-name {
  font-style: italic;
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.status-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.status-badge.ugrožena {
  background-color: #e74c3c;
  color: white;
}

.status-badge.najmanje {
  background-color: #2ecc71;
  color: white;
}

.status-badge.ranjiva {
  background-color: #f39c12;
  color: white;
}

/* Brze činjenice */
.info-section {
  padding: 60px 0;
}

.quick-facts {
  margin-bottom: 50px;
}

.quick-facts h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #2c3e50;
  position: relative;
  display: inline-block;
}

.quick-facts h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #3498db, #2ecc71);
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.fact-item {
  display: flex;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.fact-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.fact-icon {
  font-size: 2rem;
  margin-right: 20px;
  width: 60px;
  height: 60px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fact-text h3 {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: #2c3e50;
}

.fact-text p {
  color: #7f8c8d;
  font-size: 0.95rem;
}

.description {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  line-height: 1.8;
}

.description h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

/* Galerija */
.gallery-section {
  padding: 60px 0;
  background: #f8f9fa;
}

.gallery-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  color: #2c3e50;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  padding: 0 20px;
}

.gallery-item {
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.03);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

/* Prijava formular */
.report-section {
  padding: 60px 0;
  background: white;
}

.report-section h2 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #2c3e50;
}

.report-section p {
  color: #7f8c8d;
  margin-bottom: 30px;
}

.report-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-btn {
  background: linear-gradient(to right, #3498db, #2ecc71);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
}

/* Slične životinje */
.related-section {
  padding: 60px 0;
  background: #f8f9fa;
}

.related-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  color: #2c3e50;
}

.related-animals {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.animal-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.animal-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.animal-card a {
  text-decoration: none;
  color: inherit;
}

.animal-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.animal-card h3 {
  padding: 15px 20px 5px;
  font-size: 1.2rem;
  color: #2c3e50;
}

.animal-card p {
  padding: 0 20px 15px;
  font-size: 0.9rem;
  color: #7f8c8d;
  font-style: italic;
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-close {
  position: absolute;
  top: 30px;
  right: 30px;
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

.lightbox-image {
  max-height: 80vh;
  max-width: 80vw;
  object-fit: contain;
  border-radius: 5px;
}

/* Responsivnost */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .facts-grid {
    grid-template-columns: 1fr;
  }

  .related-animals {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 60vh;
    min-height: 400px;
  }

  .hero-content {
    padding: 20px;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .related-animals {
    grid-template-columns: 1fr;
  }
}
/* Stilovi za formu */
.report-section {
  padding: 60px 0;
  background-color: #f8fafc;
}

.dark-mode .report-section {
  background-color: #1e293b;
}

.subtitle {
  color: #64748b;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.dark-mode .subtitle {
  color: #94a3b8;
}

.report-form {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.dark-mode .report-form {
  background: #1e293b;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 25px;
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #334155;
}

.dark-mode .form-group label {
  color: #e2e8f0;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-icon svg {
  position: absolute;
  left: 12px;
  color: #64748b;
}

.input-with-icon input {
  padding-left: 40px !important;
}

input, textarea, select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: white;
  color: #334155;
}

.dark-mode input,
.dark-mode textarea,
.dark-mode select {
  background-color: #334155;
  border-color: #475569;
  color: #f8fafc;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.char-count {
  text-align: right;
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 5px;
}

.additional-fields {
  display: flex;
  gap: 15px;
}

.field-group {
  flex: 1;
}

.field-group label {
  font-size: 0.9rem;
  color: #64748b;
}

.map-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 8px;
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 5px 0;
}

.map-btn svg {
  width: 16px;
  height: 16px;
}

.photo-upload label {
  margin-bottom: 15px;
}

.upload-area {
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;
}

.dark-mode .upload-area {
  border-color: #475569;
}

.upload-area:hover, .drag-active {
  border-color: #3b82f6;
  background-color: #f8fafc;
}

.dark-mode .upload-area:hover,
.dark-mode .drag-active {
  background-color: #334155;
}

.upload-content svg {
  margin-bottom: 10px;
  color: #64748b;
}

.upload-content p {
  color: #64748b;
  margin: 0;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.preview-item {
  position: relative;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  background: rgba(220, 38, 38, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.privacy-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #64748b;
}

.privacy-note input {
  width: auto;
}

.submit-btn {
  background: linear-gradient(to right, #3b82f6, #6366f1);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.loading svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Modal za mapu */
.map-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow: auto;
  padding: 25px;
  position: relative;
}

.dark-mode .modal-content {
  background: #1e293b;
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
}

.map-container {
  height: 400px;
  margin: 20px 0;
  background: #f1f5f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode .map-container {
  background: #334155;
}

.map-placeholder {
  text-align: center;
  color: #64748b;
}

.map-placeholder svg {
  margin-bottom: 10px;
}

.confirm-location {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.confirm-location:hover {
  background: #2563eb;
}

/* Responsivnost */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 15px;
  }

  .additional-fields {
    flex-direction: column;
    gap: 15px;
  }

  .form-footer {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .submit-btn {
    width: 100%;
  }
}
</style>