<template>
  <div class="animals-page">
    <section class="search-section">
      <div class="search-container">
        <h1>Istražite svijet životinja</h1>
        <p>Pronađite informacije o svojim omiljenim vrstama</p>

        <div class="search-bar">
          <input
              type="text"
              v-model="searchQuery"
              placeholder="Unesite naziv životinje..."
              @input="filterAnimals"
          >
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        </div>

        <div class="filter-tags">
          <button
              v-for="(category, index) in categories"
              :key="index"
              :class="{ active: activeCategory === category.value }"
              @click="filterByCategory(category.value)"
          >
            {{ category.label }}
          </button>
        </div>
      </div>
    </section>

    <section class="animals-grid">
      <div
          class="animal-card"
          v-for="(animal, index) in filteredAnimals"
          :key="index"
          @click="openModal(animal)"
      >
        <div class="card-image">
          <img :src="animal.image" :alt="animal.name">
          <span class="category-badge" :style="{ backgroundColor: getCategoryColor(animal.category) }">
            {{ getCategoryLabel(animal.category) }}
          </span>
        </div>
        <div class="card-content">
          <h3>{{ animal.name }}</h3>
          <p class="scientific-name">{{ animal.scientificName }}</p>
          <div class="card-footer">
            <span class="location">
              <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              {{ animal.location }}
            </span>
            <span class="status" :class="animal.status.toLowerCase()">
              {{ animal.status }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <div v-if="filteredAnimals.length === 0" class="no-results">
      <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" alt="No results">
      <h3>Nema rezultata za vašu pretragu</h3>
      <p>Pokušajte s drugim pojmom ili kategorijom</p>
      <button @click="resetFilters">Poništi filtere</button>
    </div>

    <div class="animal-modal" v-if="selectedAnimal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">×</button>

        <div class="modal-header">
          <div class="animal-image">
            <img :src="selectedAnimal.image" :alt="selectedAnimal.name">
          </div>
          <div class="animal-title">
            <h2>{{ selectedAnimal.name }}</h2>
            <p class="scientific">{{ selectedAnimal.scientificName }}</p>
            <span class="category-tag" :style="{ backgroundColor: getCategoryColor(selectedAnimal.category) }">
              {{ getCategoryLabel(selectedAnimal.category) }}
            </span>
          </div>
        </div>

        <div class="modal-body">
          <div class="info-section">
            <h3>Osnovne informacije</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Status:</span>
                <span class="info-value" :class="selectedAnimal.status.toLowerCase()">{{ selectedAnimal.status }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Stanište:</span>
                <span class="info-value">{{ selectedAnimal.habitat }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Lokacija:</span>
                <span class="info-value">{{ selectedAnimal.location }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Prehrana:</span>
                <span class="info-value">{{ selectedAnimal.diet }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Veličina:</span>
                <span class="info-value">{{ selectedAnimal.size }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Težina:</span>
                <span class="info-value">{{ selectedAnimal.weight }}</span>
              </div>
            </div>
          </div>

          <div class="description-section">
            <h3>Opis</h3>
            <p>{{ selectedAnimal.description }}</p>
          </div>

          <div class="fun-facts">
            <h3>Zanimljivosti</h3>
            <ul>
              <li v-for="(fact, index) in selectedAnimal.funFacts" :key="index">{{ fact }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimalsPage',
  data() {
    return {
      searchQuery: '',
      activeCategory: 'all',
      selectedAnimal: null,
      categories: [
        { value: 'all', label: 'Sve' },
        { value: 'mammal', label: 'Sisavci' },
        { value: 'bird', label: 'Ptice' },
        { value: 'reptile', label: 'Gmazovi' },
        { value: 'fish', label: 'Ribe' },
        { value: 'amphibian', label: 'Vodozemci' }
      ],
      animals: [
        {
          id: 1,
          name: 'Crvena panda',
          scientificName: 'Ailurus fulgens',
          image: './src/images/panda.jpg',
          category: 'mammal',
          location: 'Himalaji',
          status: 'Ugrožena',
          habitat: 'Planinske šume',
          diet: 'Svejedi (biljojedi s tendencijom prema mesojedima)',
          size: '50-64 cm (bez repa)',
          weight: '3-6 kg',
          description: 'Crvena panda, poznata i kao manja panda, je mala životinja nalik na rakuna, crvenkasto-smeđe dlake koja živi u istočnim Himalajima i jugozapadnoj Kini. Iako dijeli ime s velikom pandom, nisu blisko povezane.',
          funFacts: [
            'Imaju "lažni palac" - produženi kost na zapešću koji im pomaže u držanju bambusa',
            'Mogu obaviti 48 različitih glasovnih izraza',
            'Njihov rep može narasti gotovo jednako dug kao i tijelo'
          ]
        },
        {
          id: 2,
          name: 'Sivi vuk',
          scientificName: 'Canis lupus',
          image: './src/images/vuk.jpg',
          category: 'mammal',
          location: 'Sjeverna Amerika, Europa, Azija',
          status: 'Najmanje zabrinjavajuća',
          habitat: 'Raznovrsna - od tundre do šuma i pustinja',
          diet: 'Mesojed',
          size: '105-160 cm (duljina tijela)',
          weight: '30-80 kg',
          description: 'Sivi vuk je najveći pripadnik porodice pasa (Canidae) i najraširenija vrsta vuka. Živi u čoporima s kompleksnom društvenom strukturom i poznat je po svojoj inteligenciji i sposobnosti prilagodbe.',
          funFacts: [
            'Čopori obično imaju 6-10 članova, ali mogu brojati i do 30',
            'Mogu trčati brzinom od 60 km/h u kratkim razdaljinama',
            'Vukovi mogu čuti na udaljenosti od do 10 km u optimalnim uvjetima'
          ]
        },
        {
          id: 3,
          name: 'Sivi ždral',
          scientificName: 'Grus grus',
          image: './src/images/zdral.webp',
          category: 'bird',
          location: 'Europa, Azija, Sjeverna Amerika',
          status: 'Najmanje zabrinjavajuća',
          habitat: 'Močvare, močvarne livade, tundra',
          diet: 'Svejedi (biljke, kukci, male životinje)',
          size: '100-130 cm (visina)',
          weight: '4-6 kg',
          description: 'Sivi ždral je velika ptica selica poznata po svojim složenim plesovima i glasnim trubnim zvucima. Zimi migriraju u velikim jatima, često formirajući karakterističan "V" oblik u letu.',
          funFacts: [
            'Pari se obično vežu za cijeli život',
            'Plesovi ždralova uključuju skokove, trčanje i bacanje biljnog materijala u zrak',
            'Najstariji zabilježeni sivi ždral doživio je 23 godine u divljini'
          ]
        },
        {
          id: 4,
          name: 'Komodski varan',
          scientificName: 'Varanus komodoensis',
          image: './src/images/komodo.webp',
          category: 'reptile',
          location: 'Komodo, Rinca, Flores, Gili Motang (Indonezija)',
          status: 'Ugrožena',
          habitat: 'Tropske suhe šume i savane',
          diet: 'Mesojed',
          size: '2.6-3 m (dužina)',
          weight: '70-90 kg',
          description: 'Komodski varan je najveći živući gušter na svijetu i endemska vrsta za nekoliko indonežanskih otoka. Poznati su po svojoj veličini, moćnim čeljustima i otrovnom ugrizu.',
          funFacts: [
            'Mogu pojesti do 80% vlastite tjelesne težine u jednom obroku',
            'Njihov ugriz sadrži otrov koji sprječava zgrušavanje krvi',
            'Mogu trčati brzinom do 20 km/h u kratkim razdaljinama'
          ]
        },
        {
          id: 5,
          name: 'Orka',
          scientificName: 'Orcinus orca',
          image: './src/images/orka.jpg',
          category: 'mammal',
          location: 'Svi oceani, od Arktika do Antarktika',
          status: 'Podaci nedostaju',
          habitat: 'Oceani, posebno hladnije vode',
          diet: 'Mesojed (specifičan ovisno o populaciji)',
          size: '6-8 m (mužjaci), 5-7 m (ženke)',
          weight: '6-10 tona',
          description: 'Orka, poznata i kao kit ubojica, je najveći pripadnik porodice dupina. Iako se često nazivaju "kitovima ubojicama", zapravo su to najveći oceanski dupini. Žive u složenim društvenim grupama s vlastitim kulturama i dijalektima.',
          funFacts: [
            'Svaka orkina grupa ima jedinstveni "dijalekt" kojim komunicira',
            'Mogu biti desnoruke ili ljevoruke (preferiraju jednu stranu tijela)',
            'Ženke mogu živjeti do 90 godina, a mužjaci do 50-60 godina'
          ]
        },
        {
          id: 6,
          name: 'Klovnovska riba',
          scientificName: 'Amphiprioninae',
          image: './src/images/klaun.jpg',
          category: 'fish',
          location: 'Topli tropski oceani (Indo-Pacifik)',
          status: 'Najmanje zabrinjavajuća',
          habitat: 'Koraljni grebeni, u simbiozi s morskim anemonama',
          diet: 'Sitni planktonski organizmi, alge',
          size: '10-18 cm (ovisno o vrsti)',
          weight: 'Do 200 g',
          description: 'Klovnovske ribe su male, šarene ribe poznate po svom simbiotskom odnosu s morskim anemonama. Zaštićene su posebnim slojem sluzi koji ih čini imunnim na anemonin otrov.',
          funFacts: [
            'Sve klovnovske ribe se rađaju kao mužjaci - neke kasnije postaju ženke',
            'Popularizirane su u animiranom filmu "Potraga za Nemom"',
            'Anemone koriste klovnovske ribe kao "mamac" za privlačenje plijena'
          ]
        },
        {
          id: 7,
          name: 'Crna pantera',
          scientificName: 'Panthera pardus (melanistički oblik)',
          image: './src/images/pantera.jpg',
          category: 'mammal',
          location: 'Azija, Afrika, Amerika (ovisno o vrsti)',
          status: 'Ranjiva',
          habitat: 'Šume, savane, planine',
          diet: 'Mesojed',
          size: '90-190 cm (dužina tijela)',
          weight: '30-90 kg',
          description: 'Crna pantera nije zasebna vrsta, već melanistički oblik leoparda ili jaguara. Njihova crna boja je rezultat genetske mutacije koja uzrokuje prekomjernu proizvodnju melanina. Iako izgledaju potpuno crne, u određenom svjetlu mogu se vidjeti karakteristične pjegove.',
          funFacts: [
            'Melanizam se javlja u oko 11% leoparda i 6% jaguara',
            'Imaju izuzetan noćni vid - 7 puta bolji od ljudskog',
            'Mogu vući plijen teži od sebe u drveće'
          ]
        },
        {
          id: 8,
          name: 'Zelena morska kornjača',
          scientificName: 'Chelonia mydas',
          image: './src/images/kornjaca.jpg',
          category: 'reptile',
          location: 'Tropski i suptropski oceani širom svijeta',
          status: 'Ugrožena',
          habitat: 'Oceani, posebno uz obale s koraljnim grebenima',
          diet: 'Mlade: svejedi; odrasle: biljojedi (uglavnom morske alge)',
          size: '80-120 cm (dužina oklopa)',
          weight: '110-190 kg',
          description: 'Zelena morska kornjača je velika morska kornjača koja dobiva ime po zelenoj masnoj tkivu ispod svog oklopa. One su jedine uglavnom biljojede morske kornjače i igraju ključnu ulogu u održavanju zdravlja koraljnih grebena i morskih trava.',
          funFacts: [
            'Mogu ostati pod vodom i do 5 sati bez udisanja',
            'Ženke se uvijek vraćaju na isto mjesto gdje su se izlegle kako bi položile jaja',
            'Mogu putovati tisućama kilometara između hranilišta i mjesta razmnožavanja'
          ]
        },
        {
          id: 9,
          name: 'Crvenooka žabica',
          scientificName: 'Agalychnis callidryas',
          image: './src/images/zabica.jpeg',
          category: 'amphibian',
          location: 'Srednja Amerika (od Meksika do Kolumbije)',
          status: 'Najmanje zabrinjavajuća',
          habitat: 'Tropske kišne šume',
          diet: 'Insekti (kukci, pauci, muhe)',
          size: '5-7 cm (ženke veće od mužjaka)',
          weight: '15-20 g',
          description: 'Crvenooka žabica je jedna od najprepoznatljivijih vrsta žaba na svijetu, poznata po svojim živim crvenim očima i šarenoj boji. Noćne su životinje koje većinu dana provode skrivene na donjoj strani lišća, a aktivne su noću.',
          funFacts: [
            'Njihove jarke boje upozoravaju grabežljivce da su otrovne',
            'Mogu izbaciti jezik brzinom od 4.5 m/s kako bi uhvatili plijen',
            'Imaju posebne priljubljive prste koji im omogućavaju penjanje po glatkim površinama'
          ]
        },
        {
          id: 10,
          name: 'Tukan',
          scientificName: 'Ramphastos toco',
          image: './src/images/tukan.jpg',
          category: 'bird',
          location: 'Južna Amerika (Amazon, istočna Brazilija)',
          status: 'Najmanje zabrinjavajuća',
          habitat: 'Tropske kišne šume, savane',
          diet: 'Voće, insekti, jaja drugih ptica',
          size: '55-65 cm (dužina tijela)',
          weight: '500-850 g',
          description: 'Toko tukan je najpoznatija vrsta tukana, prepoznatljiv po svom ogromnom, šarenom kljunu koji može narasti do 20 cm. Unatoč veličini, kljun je lagan jer je iznutra šupalj. Tukani su vrlo društvene ptice koje često putuju u malim jatima.',
          funFacts: [
            'Kljun im služi za regulaciju tjelesne temperature',
            'Mogu baciti voće u zrak i uhvatiti ga u kljun dok lete',
            'Imaju neobičan način spavanja - okreću glavu unatrag i stave kljun na leđa'
          ]
        }
      ],
      filteredAnimals: []
    }
  },
  created() {
    this.filteredAnimals = this.animals;
  },
  methods: {
    filterAnimals() {
      if (this.searchQuery === '' && this.activeCategory === 'all') {
        this.filteredAnimals = this.animals;
        return;
      }

      this.filteredAnimals = this.animals.filter(animal => {
        const matchesSearch = animal.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            animal.scientificName.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.activeCategory === 'all' || animal.category === this.activeCategory;
        return matchesSearch && matchesCategory;
      });
    },
    filterByCategory(category) {
      this.activeCategory = category;
      this.filterAnimals();
    },
    resetFilters() {
      this.searchQuery = '';
      this.activeCategory = 'all';
      this.filterAnimals();
    },
    openModal(animal) {
      this.selectedAnimal = animal;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedAnimal = null;
      document.body.style.overflow = 'auto';
    },
    getCategoryLabel(category) {
      const found = this.categories.find(c => c.value === category);
      return found ? found.label : category;
    },
    getCategoryColor(category) {
      const colors = {
        mammal: '#FF7675',
        bird: '#74B9FF',
        reptile: '#55EFC4',
        fish: '#A29BFE',
        amphibian: '#FFEAA7'
      };
      return colors[category] || '#636e72';
    }
  }
}
</script>

<style scoped>

.animals-page {
  font-family: 'Poppins', sans-serif;
  color: #2d3436;
  line-height: 1.6;
  padding-bottom: 60px;
  margin-right: -80px;
}


.search-section {
  background: linear-gradient(135deg, #0984e3 0%, #6c5ce7 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.search-container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.search-section h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.search-section p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 40px;
}

.search-bar {
  display: flex;
  max-width: 600px;
  margin: 0 auto 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 12px 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.search-bar:focus-within {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.search-bar input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  padding: 5px 10px;
  outline: none;
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-bar svg {
  fill: white;
  opacity: 0.7;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.filter-tags button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  backdrop-filter: blur(5px);
}

.filter-tags button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.filter-tags button.active {
  background: white;
  color: #0984e3;
  font-weight: 500;
}

.animals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

.animal-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.animal-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.animal-card:hover .card-image img {
  transform: scale(1.1);
}

.category-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #ff7675;
  color: white;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.scientific-name {
  font-size: 0.85rem;
  color: #636e72;
  font-style: italic;
  margin-bottom: 15px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.location {
  display: flex;
  align-items: center;
  color: #636e72;
}

.location svg {
  fill: #636e72;
  margin-right: 5px;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status {
  background: rgba(255, 118, 117, 0.2);
  color: #d63031;
}

.status {
  background: rgba(85, 239, 196, 0.2);
  color: #00b894;
}

.status {
  background: rgba(253, 203, 110, 0.2);
  color: #fdcb6e;
}

.status {
  background: rgba(116, 185, 255, 0.2);
  color: #0984e3;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  max-width: 500px;
  margin: 0 auto;
}

.no-results img {
  width: 120px;
  opacity: 0.7;
  margin-bottom: 30px;
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.no-results p {
  color: #636e72;
  margin-bottom: 25px;
}

.no-results button {
  background: #0984e3;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 30px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
}

.no-results button:hover {
  background: #0767b3;
  transform: translateY(-2px);
}

.animal-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalFadeIn 0.4s ease;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.close-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #636e72;
  transition: color 0.3s ease;
  z-index: 2;
}

.close-modal:hover {
  color: #2d3436;
}

.modal-header {
  display: flex;
  flex-direction: column;
  position: relative;
}

.animal-image {
  height: 300px;
  overflow: hidden;
}

.animal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.animal-title {
  padding: 30px;
  position: relative;
}

.animal-title h2 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.scientific {
  font-size: 1.1rem;
  color: #636e72;
  font-style: italic;
  margin-bottom: 15px;
}

.category-tag {
  display: inline-block;
  padding: 6px 15px;
  border-radius: 50px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

.modal-body {
  padding: 0 30px 40px;
}

.info-section {
  margin-bottom: 40px;
}

.info-section h3, .description-section h3, .fun-facts h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2d3436;
  position: relative;
  padding-bottom: 10px;
}

.info-section h3::after, .description-section h3::after, .fun-facts h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #0984e3, #6c5ce7);
  border-radius: 3px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.9rem;
  color: #636e72;
  margin-bottom: 5px;
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
}

.description-section {
  margin-bottom: 40px;
}

.description-section p {
  line-height: 1.8;
}

.fun-facts ul {
  list-style: none;
  padding-left: 0;
}

.fun-facts li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  line-height: 1.6;
}

.fun-facts li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #0984e3;
  font-size: 1.5rem;
  line-height: 1;
}
</style>