<template>
  <div class="bg-white p-5 h-screen">
    <main>
      <h1 class="text-2xl font-semibold mb-4">Бонусные баллы</h1>

      <!-- Карточка с балансом -->
      <div class="bonus-card rounded-lg p-6 mb-4">
        <p class="text-lg font-medium mb-2">Ваш баланс:</p>
        <p class="text-3xl font-bold">{{ user.tokens }} баллов</p>
        <p class="text-3xl font-bold">{{ user.balance }} тенге</p>
      </div>

      <!-- Кнопка -->
      <button class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600" @click="transfer">
        Перевести на баланс
      </button>
    </main>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import axios from '../axios';

export default {
  data() {
    return {
      user: {},
      successAudio: null, // Аудио объект
    };
  },
  async mounted() {
    try {
      const user = await axios.get('/users/me');
      this.user = user.data;
    } catch (error) {
      ElMessage('Ошибка при загрузке курсов');
    }

    // Загружаем аудио при монтировании компонента
    this.successAudio = new Audio('/sounds/success.mp3');
  },
  methods: {
    async transfer() {
      try {
        const transfer = await axios.post('/users/transfer');
        this.user.tokens = 0;
        this.user.balance = transfer.data.new_balance;

        // Проигрываем звук успеха
        this.successAudio.play();

        ElMessage({
          message: 'Перевод успешно выполнен!',
          type: 'success',
        });
      } catch (error) {
        ElMessage({
          message: 'Ошибка при переводе!',
          type: 'error',
        });
      }
    },
  },
};
</script>

<style scoped>
.bonus-card {
  background: linear-gradient(
    90deg,
    rgba(39, 167, 231, 0.21) 0%,
    rgba(22, 93, 129, 0.0588) 100%
  );
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
}
* {
  font-family: 'Montserrat', sans-serif;
}
</style>
