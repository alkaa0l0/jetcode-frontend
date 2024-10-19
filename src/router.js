import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/index.vue';
import Catalog from './components/Catalog.vue';
import MyCourses from './components/MyCourses.vue'; 
import BonusPoints from './components/BonusPoints.vue';
import Profile from './components/Profile.vue';
import CourseDetails from './components/CourseDetails.vue';
import LessonDetails from './components/LessonDetails.vue';
import Test from './components/Test.vue'; // Новый компонент для теста

const routes = [
  { path: '/', name: 'Home', component: Index },
  { path: '/catalog', name: 'Catalog', component: Catalog },
  { path: '/my-courses', name: 'MyCourses', component: MyCourses }, 
  { path: '/bonus-points', name: 'BonusPoints', component: BonusPoints },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/course/:id', name: 'CourseDetails', component: CourseDetails, props: true },
  { path: '/lesson/:id', name: 'LessonDetails', component: LessonDetails, props: true },
  { path: '/test/:id', name: 'Test', component: Test, props: true }, // Новый маршрут для теста
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
