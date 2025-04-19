import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import feedbackPlugin from './utils/feedBack'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
// app.use(feedbackPlugin)

app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  