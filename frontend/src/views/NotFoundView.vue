<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-icon size="120" color="error" class="mb-4">mdi-alert-octagon</v-icon>
        <h1 class="text-h1 font-weight-bold text-error">404</h1>

        <p class="text-h5 text-grey-darken-1 mb-6">Página Não Encontrada</p>

        <v-btn color="primary" to="/" size="large" prepend-icon="mdi-home">
          Voltar para o Início
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Estilos CSS escopados, aplicados apenas a este componente. */
.fill-height {
  height: 100vh; /* Garante que o elemento ocupe 100% da altura da viewport. */
  /* Define um gradiente de fundo suave, indo de um rosa claro para um rosa mais escuro. */
  background: linear-gradient(to bottom right, #ffebee, #f8bbd0); /* Gradiente suave */
}
</style>
