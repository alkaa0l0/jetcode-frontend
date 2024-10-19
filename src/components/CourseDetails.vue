<template>
    <div class="bg-white p-6 h-screen overflow-auto">
      <h1 class="text-3xl font-semibold mb-6 text-center">{{ course.title }}</h1>
  
      <p class="text-md leading-relaxed mb-6">{{ course.description }}</p>
  
      <h2 class="text-lg font-semibold text-center mb-4">Модули</h2>
  
      <div v-for="(module, index) in course.course_modules" :key="module.id" class="mb-6">
        <button
          class="w-full text-left bg-gray-100 p-4 rounded-lg shadow-sm font-semibold flex items-center justify-between focus:outline-none"
          @click="toggleModule(index)"
        >
          {{ module.title }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transform transition-transform"
            :class="{'rotate-180': activeModule === index}"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
  
        <ul v-if="activeModule === index" class="list-none space-y-2 mt-2">
          <li
            v-for="lesson in module.lessons"
            :key="lesson.id"
            class="bg-gray-50 rounded-lg p-3 shadow-sm cursor-pointer"
            @click="goToLesson(lesson.id)"
          >
            {{ lesson.title }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    name: 'CourseDetails',
    props: ['id'], // Получаем id курса из маршрута
    data() {
      return {
        course: {
          title: '',
          description: '',
          course_modules: [],
        },
        activeModule: null, // Индекс активного модуля
      };
    },
    methods: {
      toggleModule(index) {
        this.activeModule = this.activeModule === index ? null : index;
      },
      goToLesson(lessonId) {
        this.$router.push(`/lesson/${lessonId}`); // Переход на страницу урока
      },
    },
    async mounted() {
      try {
        const response = await axios.get(`/courses/${this.id}`); // Запрос на получение данных курса
        this.course = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке данных курса:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  * {
    font-family: 'Montserrat', sans-serif;
  }
  
  .rotate-180 {
    transform: rotate(180deg);
  }
  </style>
  