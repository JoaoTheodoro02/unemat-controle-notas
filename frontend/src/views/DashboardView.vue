<template>
  <!-- Barra de navegação superior -->
  <v-app-bar app color="primary" dark>
    <!-- Título do sistema -->
    <v-toolbar-title class="font-weight-bold">
      Sistema de Controle de Notas e Faltas
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Botão de logout -->
    <v-btn icon @click="authStore.logout()" title="Sair da aplicação">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Conteúdo principal -->
  <v-main class="dashboard-bg">
    <v-container fluid class="fill-height align-start pt-8">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <!-- Cartão de boas-vindas -->
          <v-card class="elevation-6 rounded-lg pa-6">
            <v-card-title class="text-h5 mb-4 text-center text-primary font-weight-bold">
              Bem-vindo(a) ao Dashboard, {{ authStore.user?.email || 'Aluno(a)' }}!
            </v-card-title>

            <v-card-text class="text-center text-body-1">
              Gerencie suas disciplinas, notas e faltas de forma eficiente.
            </v-card-text>

            <v-divider class="my-6"></v-divider>

            <!-- Ações principais -->
            <v-row justify="center" class="mt-4">
              <!-- Card para acessar as disciplinas -->
              <v-col cols="12" sm="6">
                <v-card class="pa-4 text-center rounded-lg hover-card" flat to="/disciplinas">
                  <v-icon size="64" color="indigo-lighten-1">mdi-book-multiple</v-icon>
                  <v-card-title class="text-h6 mt-2">Minhas Disciplinas</v-card-title>
                  <v-card-text>Visualize e gerencie suas disciplinas.</v-card-text>
                </v-card>
              </v-col>

              <!-- Card para funcionalidade futura -->
              <v-col cols="12" sm="6">
                <v-card
                  class="pa-4 text-center rounded-lg hover-card"
                  flat
                  @click="showInfoSnackbar('Funcionalidade em desenvolvimento!')"
                >
                  <v-icon size="64" color="teal-lighten-1">mdi-chart-bar</v-icon>
                  <v-card-title class="text-h6 mt-2">Relatórios de Desempenho</v-card-title>
                  <v-card-text>Acompanhe seu progresso com gráficos.</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Snackbar de informações -->
    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script setup>
// Importa reatividade e store de autenticação
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

// Instancia a store de autenticação
const authStore = useAuthStore()

// Estado do snackbar
const snackbar = ref({
  show: false,
  text: '',
  color: '',
  timeout: 3000,
})

// Função para exibir mensagens informativas
const showInfoSnackbar = (message) => {
  snackbar.value.text = message
  snackbar.value.color = 'info'
  snackbar.value.show = true
}
</script>

<style scoped>
/* Fundo do dashboard com gradiente */
.dashboard-bg {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  min-height: 100vh;
}

/* Garante altura total da tela */
.fill-height {
  height: 100%;
}

/* Estilo de efeito hover nos cards */
.hover-card {
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  cursor: pointer;
  background-color: #ffffff;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
