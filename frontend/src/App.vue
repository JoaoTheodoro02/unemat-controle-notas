<script setup>
import { onMounted } from 'vue' // Importa o hook `onMounted` do Vue, que executa código após o componente ser montado no DOM.
import { useAuthStore } from './stores/auth' // Importa a store Pinia `useAuthStore` para gerenciar o estado de autenticação global da aplicação.

// Instancia a store de autenticação para ter acesso aos seus estados e ações.
const authStore = useAuthStore()

// `onMounted`: Hook de ciclo de vida que é executado depois que o componente `App` é montado no DOM.
// Ele é usado aqui para garantir que o estado de autenticação seja inicializado antes que o restante da aplicação seja renderizado.
onMounted(async () => {
  // Chama a ação `initAuth` da `authStore`. Esta ação provavelmente verifica o status de login do usuário (ex: token persistente)
  // e atualiza o estado `authReady` na store. O `await` garante que a aplicação espere por essa inicialização.
  await authStore.initAuth()
})
</script>

<template>
  <!-- v-app: Componente raiz do Vuetify que envolve toda a aplicação. Fornece a base para o tema e funcionalidades globais. -->
  <v-app>
    <!-- v-main: Área principal de conteúdo da aplicação. O conteúdo dentro de `v-main` será renderizado na área principal da tela. -->
    <v-main>
      <!-- Div de carregamento condicional: É exibida APENAS se `authStore.authReady` for `false`. -->
      <!-- Isso significa que a aplicação está esperando a inicialização da autenticação antes de exibir o conteúdo principal. -->
      <div v-if="!authStore.authReady" class="d-flex align-center justify-center fill-height">
        <!-- v-progress-circular: Um spinner de carregamento que indica que algo está acontecendo. -->
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <!-- Mensagem de carregamento exibida ao lado do spinner. -->
        <span class="ml-4 text-h6 text-primary">Carregando aplicação...</span>
      </div>
      <!-- router-view: Componente do Vue Router que exibe o componente correspondente à rota atual. -->
      <!-- É renderizado APENAS quando `authStore.authReady` é `true`, ou seja, após a autenticação ser inicializada. -->
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<style scoped>
/* Estilos CSS escopados: Estes estilos se aplicam apenas a este componente `App.vue`. */

.fill-height {
  /* Define a altura do elemento para 100% da altura da viewport (tela visível do navegador). */
  /* Isso é crucial para centralizar o conteúdo de carregamento na tela. */
  height: 100vh;
}
</style>
