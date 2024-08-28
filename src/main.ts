import './assets/css/tailwind.css';
import './assets/css/style.scss';
import 'ant-design-vue/dist/reset.css';

import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import VueTheMask from 'vue-the-mask';

const app = createApp(App)

app.use(router)
app.use(Antd)
app.use(VueTheMask)

app.mount('#app')
