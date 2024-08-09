import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/routes';
import { createPinia } from 'pinia';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css';



const pinia = createPinia();
createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
