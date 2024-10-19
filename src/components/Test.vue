<template>
  <div class="bg-white p-6 h-screen overflow-auto">
    <h1 class="text-2xl font-semibold mb-4 text-center">ТЕСТ</h1>

    <div v-if="questions.length" class="mb-8">
      <h2 class="text-lg font-medium mb-4">
        {{ currentQuestionIndex + 1 }}. {{ questions[currentQuestionIndex].text }}
      </h2>

      <div
        v-for="(option, index) in questions[currentQuestionIndex].options"
        :key="index"
        class="mb-2"
      >
        <label class="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg shadow-sm cursor-pointer">
          <input
            type="radio"
            :value="option"
            v-model="answers[questions[currentQuestionIndex].id]"
            :name="'question-' + questions[currentQuestionIndex].id" 
            class="form-radio"
          />
          <span>{{ option }}</span>
        </label>
      </div>
    </div>

    <div v-else>
      <p>Загрузка вопросов...</p>
    </div>

    <div class="flex justify-between mt-6" v-if="questions.length">
      <button
        @click="skipQuestion"
        class="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300"
      >
        Пропустить
      </button>
      <button
        @click="submitAnswer"
        class="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
      >
        Ответить
      </button>
    </div>
  </div>
</template>
<script>
import axios from '../axios'; // Подключение axios

export default {
  name: 'Test',
  props: ['id'], // Принимаем id теста из маршрута или родительского компонента
  data() {
    return {
      answers: {}, // Храним ответы в формате { questionId: selectedOption }
      currentQuestionIndex: 0,
      questions: [], // Вопросы загружаются из API
    };
  },
  async mounted() {
    await this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get(`/lessons/${this.id}`);
        this.questions = response.data.questions.map((question) => ({
          ...question,
          options: JSON.parse(question.options).options, // Парсим JSON из строки
        }));
      } catch (error) {
        console.error('Ошибка при загрузке вопросов:', error);
      }
    },
    submitAnswer() {
      if (this.answers[this.questions[this.currentQuestionIndex].id]) {
        // Если ответ выбран, переходим к следующему вопросу
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
        } else {
          this.sendAnswers(); // Если вопросов больше нет, отправляем ответы
        }
      } else {
        alert('Пожалуйста, выберите ответ.'); // Если не выбран ответ
      }
    },
    skipQuestion() {
      // Пропускаем вопрос и переходим к следующему
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.sendAnswers(); // Если вопросов больше нет, отправляем ответы
      }
    },
    async sendAnswers() {
      try {
        await axios.post(`/lessons/${this.id}/sendAnswers`, {
          answers: this.answers, // Отправляем ответы пользователя
        });
        alert('Ответы успешно отправлены!');
        this.$router.push(`/bonus-points`); // Переход на страницу урока

      } catch (error) {
        console.error('Ошибка при отправке ответов:', error);
        alert('Произошла ошибка при отправке ответов.');
      }
    },
  },
};
</script>