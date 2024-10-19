<template>
  <div class="bg-white p-6 h-screen overflow-auto">
    <h1 class="text-2xl font-semibold mb-4">{{ lesson.title }}</h1>

    <img
      v-if="lesson.image"
      :src="lesson.image"
      alt="Урок"
      class="w-full h-40 object-cover rounded-lg mb-4"
    />

    <!-- Контейнер для видео -->
    <div v-if="lesson.video_id" class="video-container mb-4">
      <iframe
        :src="`https://www.youtube.com/embed/${lesson.video_id}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>

    <h2 class="text-lg font-semibold mb-2">Урок</h2>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <button 
        class="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600" 
        @click="showModal('questions')">
        Покажи мне тренировочные вопросы
      </button>
      <button 
        class="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600" 
        @click="showModal('simpleExplanation')">
        Объясни эту тему простыми словами
      </button>
      <button 
        class="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600" 
        @click="showModal('summary')">
        Дай краткое описание
      </button>
      <button 
        class="bg-red-500 text-white py-3 rounded-lg hover:bg-red-600" 
        @click="showModal('realLifeExamples')">
        Приведи мне примеры из реальной жизни
      </button>
    </div>

    <p class="mb-4">{{ lesson.content }}</p>

    <button
      v-if="lesson.questions && lesson.questions.length > 0"
      @click="goToTest(lesson.id)"
      class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
    >
      Пройти тест
    </button>

    <!-- Модальное окно -->
    <div 
      v-if="modalVisible" 
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 class="text-xl font-semibold mb-4">{{ modalTitle }}</h2>
        <p class="mb-4">{{ modalContent }}</p>
        <button 
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" 
          @click="closeModal">
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'LessonDetails',
  props: ['id'],
  data() {
    return {
      lesson: {},
      modalVisible: false, // Состояние модального окна
      modalTitle: '', // Заголовок модального окна
      modalContent: '', // Содержимое модального окна
    };
  },
  methods: {
    showModal(type) {
      // Устанавливаем содержимое модального окна в зависимости от типа
      switch (type) {
  case 'questions':
    this.modalTitle = 'Тренировочные вопросы';
    this.modalContent = `
      1. Что такое блокчейн?
      2. Как обеспечивается безопасность данных в блокчейне?
      3. Какие ключевые преимущества использования блокчейна?
      4. Что такое "цепочка блоков" и как она работает?
    `;
    break;
  
  case 'simpleExplanation':
    this.modalTitle = 'Объяснение темы простыми словами';
    this.modalContent = `
      Представьте себе общую таблицу, доступную для всех участников в сети, где каждый имеет копию этой таблицы. Никто не может удалить или изменить предыдущие записи, и все видят, какие изменения происходят. Это и есть блокчейн в простом виде.
    `;
    break;
  
  case 'summary':
    this.modalTitle = 'Краткое описание';
    this.modalContent = `
      Определение: Блокчейн — это распределенный цифровой реестр, который фиксирует транзакции на нескольких компьютерах одновременно. Он обеспечивает безопасность хранения информации, делая её практически невозможной для изменения или подделки.
    `;
    break;

  case 'realLifeExamples':
    this.modalTitle = 'Примеры из реальной жизни';
    this.modalContent = `
      Пример: В биткойне блокчейн используется для того, чтобы гарантировать, что каждый биткойн принадлежит только одному человеку, и никто не может подделать транзакцию. Это делает криптовалюты более безопасными для использования в мире цифровых финансов.
    `;
    break;
}

      this.modalVisible = true; // Открываем модальное окно
    },
    closeModal() {
      this.modalVisible = false; // Закрываем модальное окно
    },
    goToTest(lessonId) {
      this.$router.push(`/test/${lessonId}`); // Переход на страницу теста
    },
  },
  async mounted() {
    try {
      const response = await axios.get(`/lessons/${this.id}`);
      this.lesson = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке данных урока:', error);
    }
  },
};
</script>