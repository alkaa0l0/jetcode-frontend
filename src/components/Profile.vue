<template>
    <div class="bg-white p-5 h-screen">
      
  
      <main>
        <h1 class="text-2xl font-semibold mb-6">Мой профиль</h1>
  
        <!-- Профиль пользователя -->
        <div class="flex items-center space-x-4 mb-8">
          <img src="https://via.placeholder.com/80" alt="Аватар" class="w-20 h-20 rounded-full object-cover" />
          <div>
            <p class="text-xl font-bold">{{user.name}}</p>
          </div>
        </div>
  
        
      </main>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  export default {
    name: 'Profile',
    data() {
        return {
          user: {},
        };
      },
    async mounted() {
        try {
          const user = await axios.get('/users/me');
          this.user = user.data;
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
  