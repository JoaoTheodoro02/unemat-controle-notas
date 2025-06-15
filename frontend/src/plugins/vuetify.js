// Importa os estilos padrão do Vuetify
import 'vuetify/styles'

// Importa a função para criar a instância do Vuetify
import { createVuetify } from 'vuetify'

// Importa os ícones do Material Design Icons (MDI)
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Cria e exporta a instância do Vuetify com as configurações de ícones
export default createVuetify({
  icons: {
    defaultSet: 'mdi', // Define o conjunto padrão de ícones como MDI
    aliases, // Usa os aliases padrões do Vuetify
    sets: { mdi }, // Registra o conjunto de ícones MDI
  },
})
