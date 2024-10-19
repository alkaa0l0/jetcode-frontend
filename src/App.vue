<template>
  <div class="relative">
    <!-- Основной контент -->
    <div class="bg-white h-screen">
      <div class="max-w-screen-sm mx-auto h-full flex flex-col border-2 border-gray-300 rounded-lg">
        <header class="flex justify-between items-center px-4 py-2">
          <router-link to="/" class="text-blue-500 text-xl font-bold">JetAcademy</router-link>
          <button @click="toggleMenu">
            <font-awesome-icon icon="bars" class="h-6 w-6" />
          </button>
        </header>

        <router-view />
      </div>
    </div>

    <!-- Боковое меню -->
    <transition name="slide">
      <div v-if="isMenuOpen" class="fixed inset-x-0 top-0 bg-gray-100 h-screen z-50 overflow-auto">
        <div class="max-w-screen-sm mx-auto h-full flex flex-col border-b-2 border-gray-300 rounded-lg">
          <header class="flex justify-between items-center px-4 py-2">
            <router-link to="/" class="text-blue-500 text-xl font-bold">LEARN</router-link>
            <button @click="toggleMenu">
              <font-awesome-icon icon="times" class="h-6 w-6 text-blue-500" />
            </button>
          </header>

          <nav class="p-4 space-y-6">
            <div>
              <a @click="goToProfile" class="flex items-center space-x-2 text-gray-800 cursor-pointer">
                <font-awesome-icon icon="user" class="h-5 w-5" />
                <span>Мой профиль</span>
              </a>
              <div class="divider"></div>
            </div>

            <div>
              <a @click="goToCatalog" class="flex items-center space-x-2 text-gray-800 cursor-pointer">
                <font-awesome-icon icon="book" class="h-5 w-5" />
                <span>Каталог</span>
              </a>
              <div class="divider"></div>
            </div>

            <div>
              <a @click="goToMyCourses" class="flex items-center space-x-2 text-gray-800 cursor-pointer">
                <font-awesome-icon icon="graduation-cap" class="h-5 w-5" />
                <span>Мои курсы</span>
              </a>
              <div class="divider"></div>
            </div>

            <div>
              <a @click="goToBonusPoints" class="flex items-center space-x-2 text-gray-800 cursor-pointer">
                <font-awesome-icon icon="coins" class="h-5 w-5" />
                <span>Бонусные баллы</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    goToProfile() {
      this.isMenuOpen = false;
      this.$router.push('/profile');
    },
    goToCatalog() {
      this.isMenuOpen = false;
      this.$router.push('/catalog');
    },
    goToMyCourses() {
      this.isMenuOpen = false;
      this.$router.push('/my-courses');
    },
    goToBonusPoints() {
      this.isMenuOpen = false;
      this.$router.push('/bonus-points');
    },
  },
};
</script>

<style scoped>

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}


.divider {
  height: 1px;
  background-color: #e5e7eb; 
  margin: 12px 0;
}

@media (max-width: 640px) {
  .h-screen {
    height: 100vh;
  }
  .p-4 {
    padding: 1rem;
  }
}

@font-face {
  font-family: 'TeletactileLatCyr';
  src: url('@/assets/fonts/TeletactileLatCyr.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}


body {
  font-family: 'TeletactileLatCyr', sans-serif;
}
</style>
