import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';


const app = createApp(App)

app.use(store)
app.use(router)


app.mount('#app')

const token = localStorage.getItem('authToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

