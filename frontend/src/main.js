// src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// ❌ REMOVIDO initializeApp — já é feito em config.js!

const app = createApp(App)
const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#42A5F5',
          secondary: '#607D8B',
          accent: '#FFC107',
          error: '#EF5350',
          info: '#2196F3',
          success: '#66BB6A',
          warning: '#FF9800',
        },
      },
    },
  },
})

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
