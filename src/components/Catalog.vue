<template>
  <div class="bg-white p-5 h-screen">
    <!-- Main Content -->
    <main>
      <h1 class="text-2xl font-semibold mb-4">Каталог</h1>

      <!-- Search Bar -->
      <div class="relative mb-6">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Найти курс"
          class="w-full p-3 pl-10 shadow-custom-input rounded-2xl focus:outline-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <!-- Courses Grid -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Course Card -->
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          v-for="course in filteredCourses"
          :key="course.id"
        >
          <img
            :src="course.cover_url"
            alt="Курс"
            class="w-full h-32 object-cover"
          />
          <div class="p-4">
            <h3
              class="text-lg mb-2 break-words"
              style="font-family: 'TeletactileLatCyr', sans-serif;"
            >
              {{ course.title }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ course.category.title }}
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from '../axios.js';

export default {
  name: 'Catalog',
  props: {
    toggleMenu: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      courses: [], // Все курсы
      searchQuery: '', // Поисковый запрос
    };
  },
  computed: {
    // Фильтрация курсов на основе поискового запроса
    filteredCourses() {
      return this.courses.filter(course =>
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  async mounted() {
    try {
      const response = await axios.get('/courses');
      this.courses = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке курсов:', error);
    }
  },
};
</script>

<style scoped>
.shadow-custom {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}

.shadow-custom-input {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 28px;
}

* {
  font-family: 'Montserrat', sans-serif;
}
</style>
