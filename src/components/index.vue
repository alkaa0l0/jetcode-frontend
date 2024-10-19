<template>
    <div class="bg-white h-screen">
      <div class="max-w-screen-sm mx-auto h-full flex flex-col  rounded-lg">
        
  
        <!-- Контент -->
        <div class="px-4 py-2 flex-grow">
          <!-- Поле поиска -->
          
          <!-- Список курсов -->
          <div class="space-y-4">
        <div class="text-center bg-gradient-to-r from-purple-400 to-blue-500 
                    rounded-lg h-40 flex flex-col items-center justify-center 
                    shadow-lg transform transition-transform duration-300">
          <p class="text-white text-lg font-semibold">
            Получи токены за прохождение тестов!
          </p>
        </div>
        </div>
  
          
      
  
          <h2 class=" text-lg font-medium mt-8 mb-4 "  style="font-family: 'TeletactileLatCyr', sans-serif;">Популярные курсы</h2>

      <!-- Сетка с популярными курсами -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Карточка курса -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200" v-for="course in courses">
          <img :src="course.cover_url" alt="Курс" class="w-full h-32 object-cover" />
          <div class="p-4">
            <h3 class="text-lg mb-2 break-words" style="font-family: 'TeletactileLatCyr', sans-serif;">
                {{course.title}}</h3>
            <p class="text-sm text-gray-500"> {{course.category.title}}</p>
          </div>
        </div>

      


        </div>
        </div>
  
       
      </div>
    </div>
  </template>
  
  <script>
import axios from '../axios.js';
  export default {
    name: 'Index',
    data() {
    return {
      courses: [],
    };
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
  
  * {
    font-family:'Montserrat', sans-serif;
 }
  </style>
  