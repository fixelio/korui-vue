import './assets/main.css'

import { vueDebounce } from 'vue-debounce'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .directive('debounce', vueDebounce({ lock: true }))
  .mount('#app')
