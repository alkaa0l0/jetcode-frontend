<template>
  <div class="bg-white p-5 h-screen">
    <main>
      <h1 class="text-2xl font-semibold mb-4">Мои курсы</h1>

      
              <div
          class="bg-white shadow-md rounded-lg p-4 mb-4"
          v-if="courses && courses.length > 0"
          v-for="course in courses"
          :key="course.id"
        >
          <p>{{ course.title }}</p>
          <button
            @click="goToCourseDetails(course.id)"
            class="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Перейти к курсу
          </button>
        </div>

          <h1 v-else
            class="text-blue-500 font-bold text-center"
            style="font-family: 'TeletactileLatCyr', sans-serif;"
          >
            Not Found!
          </h1>

    </main>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import axios  from '../axios';
export default {
  name: 'MyCourses',
  data(){
    return{
      courses: []
    }
  },
  methods: {
    goToCourseDetails(courseId) {
      this.$router.push(`/course/${courseId}`);
    },
  },
  async mounted(){
    try {
        const response = await axios.get(`/users/me/courses/`); 
        this.courses = response.data;
      } catch (error) {
        ElMessage({
          message: "Ошибка!",
          type: "error"
        })
      }
  }
};
</script>

<style scoped>
* {
  font-family: 'Montserrat', sans-serif;
}
</style>
