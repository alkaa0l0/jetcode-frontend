import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/tailwind.css'; 
import router from "./router";
import './assets/css/main.css';
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faBars, faBook, faGraduationCap, faCoins, faTimes } from '@fortawesome/free-solid-svg-icons';


library.add(faUser, faBars, faBook, faGraduationCap, faCoins, faTimes);

const app = createApp(App);


app.component('font-awesome-icon', FontAwesomeIcon);
app.use(ElementPlus)
app.use(router);
app.mount('#app');