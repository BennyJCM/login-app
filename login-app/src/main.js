import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './App.vue';
import router from './router'; // Asegúrate de que el router esté correctamente importado

const app = createApp(App);

app.use(Quasar, { plugins: {} });
app.use(router); // Registrar el router
app.mount('#app');