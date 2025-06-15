<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

// Garante que o estado de autenticação seja carregado antes de renderizar o app
onMounted(async () => {
  await authStore.initAuth();
});
</script>

<template>
  <v-app>
    <v-main>
      <div v-if="!authStore.authReady" class="d-flex align-center justify-center fill-height">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <span class="ml-4 text-h6 text-primary">Carregando aplicação...</span>
      </div>
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<style scoped>
/* Estilos específicos para o App.vue, se necessário */
.fill-height {
  height: 100vh;
}
</style>
