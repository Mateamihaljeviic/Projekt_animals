<template>
    <nav class="navbar">
      <div class="navbar__inner">
        <router-link to="/" class="nav-link" exact>
        <span class="nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </span>
          <span class="nav-text">Početna</span>
        </router-link>

        <router-link to="/login" class="nav-link">
        <span class="nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </span>
          <span class="nav-text">Profil</span>
        </router-link>

        <router-link to="/species" class="nav-link">
        <span class="nav-icon">
          <svg xmlns="http://www.w2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        </span>
          <span class="nav-text">Tražilica</span>
        </router-link>

        <router-link to="/gallery" class="nav-link">
        <span class="nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </span>
          <span class="nav-text">Galerija</span>
        </router-link>

        <router-link to="/videos" class="nav-link">
        <span class="nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </span>
          <span class="nav-text">Komentari</span>
        </router-link>
      </div>
    </nav>

    <div class="navbar-footer">
      <button class="theme-toggle" @click="toggleTheme">
        <span class="theme-icon">{{ isDarkMode ? '🌞' : '🌙' }}</span>
      </button>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isDarkMode: false
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-theme', this.isDarkMode);
      localStorage.setItem('darkMode', this.isDarkMode);
    },
    checkTheme() {
      const darkMode = localStorage.getItem('darkMode') === 'true';
      this.isDarkMode = darkMode;
      document.body.classList.toggle('dark-theme', darkMode);
    }
  },
  mounted() {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    this.checkTheme();
  }
}
</script>

<style scoped>

.navbar {
  font-family: 'Poppins', sans-serif;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 180px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}
body.dark-theme .navbar {
  background: linear-gradient(135deg, #2b2d42 0%, #1a1a2e 100%);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.2);
}

.navbar__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 50px 0 30px;
}

.nav-link {
  margin: 10px 0;
  text-decoration: none;
  color: #495057;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 12px 0;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 0;
}

body.dark-theme .nav-link {
  color: #e9ecef;
}

.nav-link:hover {
  background: rgba(255, 107, 107, 0.1);
  transform: translateX(-8px);
  color: #ff6b6b;
}

body.dark-theme .nav-link:hover {
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
}

.nav-link {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  font-weight: 600;
}

body.dark-theme .nav-link {
  background: rgba(255, 107, 107, 0.2);
}

.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 50%;
  width: 4px;
  background: linear-gradient(to bottom, #ff6b6b, #e84393);
  border-radius: 0 4px 4px 0;
  animation: navBorderGrow 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes navBorderGrow {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: 50%;
    opacity: 1;
  }
}

.nav-icon {
  font-size: 1.8rem;
  margin-bottom: 8px;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.nav-link:hover .nav-icon {
  transform: scale(1.2) rotate(-8deg);
}

.nav-text {
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
  font-weight: 500;
}

.navbar-footer {
  padding: 25px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

body.dark-theme .navbar-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.theme-toggle {
  background: rgba(0, 0, 0, 0.05);
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

body.dark-theme .theme-toggle {
  background: rgba(255, 255, 255, 0.1);
}

.theme-toggle:hover {
  transform: scale(1.15);
  background: rgba(255, 107, 107, 0.2);
}

.theme-icon {
  font-size: 1.4rem;
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.theme-toggle:hover .theme-icon {
  transform: rotate(30deg);
}

@media (max-width: 1200px) {
  .navbar {
    width: 160px;
  }
}

@media (max-width: 992px) {
  .navbar {
    width: 140px;
  }

  .nav-icon {
    font-size: 1.6rem;
  }

  .nav-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    width: 100px;
    box-shadow: -2px 0 15px rgba(0, 0, 0, 0.1);
  }

  .nav-text {
    font-size: 0.8rem;
  }

  .nav-icon {
    font-size: 1.4rem;
    margin-bottom: 6px;
  }

  .nav-link {
    padding: 10px 0;
    margin: 8px 0;
  }

  .navbar__inner {
    padding: 40px 0 20px;
  }

  .navbar-footer {
    padding: 20px 0;
  }
}

@media (max-width: 576px) {
  .navbar {
    width: 80px;
  }

  .nav-text {
    display: none;
  }

  .nav-icon {
    margin-bottom: 0;
    font-size: 1.6rem;
  }

  .nav-link {
    padding: 20px 0;
  }

  .theme-toggle {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    position: relative;
    right: 2px;
  }

  .theme-icon {
    font-size: 1.3rem;
  }
}

@media (hover: none) and (max-width: 576px) {
  .nav-link:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    background: #2b2d42;
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    white-space: nowrap;
    margin-right: 15px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .nav-link:hover::before {
    content: '';
    position: absolute;
    right: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent #2b2d42;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .nav-link:active::after,
  .nav-link:active::before {
    opacity: 1;
  }

  body.dark-theme .nav-link:hover::after {
    background: #f8f9fa;
    color: #2b2d42;
  }

  body.dark-theme .nav-link:hover::before {
    border-left-color: #f8f9fa;
  }
}
</style>