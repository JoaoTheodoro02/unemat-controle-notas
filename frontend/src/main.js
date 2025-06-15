// src/main.js

// Importa a função `createApp` do Vue para criar a instância da sua aplicação.
import { createApp } from 'vue'
// Importa o componente raiz da sua aplicação. É o ponto de entrada visual.
import App from './App.vue'
// Importa o roteador da aplicação, que gerencia as rotas e navegação entre as páginas.
import router from './router'
// Importa `createPinia` do Pinia, que é a biblioteca de gerenciamento de estado da sua aplicação.
import { createPinia } from 'pinia'
// Importa os estilos base do Vuetify. ESSENCIAL para que os componentes tenham a aparência correta.
import 'vuetify/styles'
// Importa `createVuetify` para inicializar o framework de UI Vuetify.
import { createVuetify } from 'vuetify'
// Importa todos os componentes do Vuetify para serem usados na sua aplicação (ex: v-btn, v-card).
import * as components from 'vuetify/components'
// Importa todas as diretivas do Vuetify (ex: v-model, v-show, etc.).
import * as directives from 'vuetify/directives'
// Importa os aliases e o set de ícones `mdi` (Material Design Icons) para uso no Vuetify.
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Cria a instância da sua aplicação Vue, passando o componente raiz `App`.
const app = createApp(App)
// Cria uma instância do Pinia, que será usada para gerenciar o estado global.
const pinia = createPinia()

// Configura e cria uma instância do Vuetify.
const vuetify = createVuetify({
  // Registra todos os componentes do Vuetify para que possam ser usados no template.
  components,
  // Registra todas as diretivas do Vuetify.
  directives,
  // Configuração dos ícones:
  icons: {
    defaultSet: 'mdi', // Define Material Design Icons como o conjunto de ícones padrão.
    aliases, // Inclui aliases de ícones do MDI.
    sets: {
      mdi, // Inclui o conjunto completo de ícones MDI.
    },
  },
  // Configuração do tema da aplicação:
  theme: {
    themes: {
      light: {
        // Define o tema "light" (claro).
        colors: {
          // Define as cores personalizadas para o tema.
          primary: '#42A5F5', // Azul claro (cor principal).
          secondary: '#607D8B', // Azul acinzentado.
          accent: '#FFC107', // Laranja amarelado.
          error: '#EF5350', // Vermelho (para mensagens de erro).
          info: '#2196F3', // Azul (para informações).
          success: '#66BB6A', // Verde (para sucesso).
          warning: '#FF9800', // Laranja (para avisos).
        },
      },
    },
  },
})

// Usa o Pinia na instância da aplicação Vue. Isso torna as stores acessíveis em todos os componentes.
app.use(pinia)
// Usa o Vue Router na instância da aplicação. Isso habilita a navegação baseada em rotas.
app.use(router)
// Usa o Vuetify na instância da aplicação. Isso injeta os componentes e funcionalidades do Vuetify.
app.use(vuetify)
// Monta a aplicação Vue no elemento HTML com o ID 'app'. A partir daqui, a aplicação Vue controla essa parte do DOM.
app.mount('#app')
