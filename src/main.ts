import { createApp } from 'vue';
import App from './App.tsx';
import store from './store';
import router from "@/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
