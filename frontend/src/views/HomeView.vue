<template>
  <v-container
    fluid
    class="d-flex flex-column justify-center align-center text-center bg-grey-lighten-4"
    style="min-height: 100vh"
  >
    <v-card
      class="pa-8 rounded-xl elevation-12 d-flex flex-column align-center"
      max-width="650"
      width="100%"
    >
      <v-avatar color="primary" size="80" class="mb-4">
        <v-icon size="48" color="white">mdi-book-education-outline</v-icon>
      </v-avatar>

      <h1 class="text-h4 font-weight-bold mb-2">Bem-vindo ao Sistema de Controle de Notas</h1>

      <v-divider class="my-4" />

      <v-row dense class="w-100" align="center" justify="center">
        <v-col cols="12" sm="6" md="4">
          <v-btn color="primary" block rounded @click="$router.push('/disciplinas')">
            Cadastrar Disciplinas
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-btn color="success" block rounded @click="$router.push('/notas')">
            Lançar Notas
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-btn color="deep-purple" block rounded @click="$router.push('/faltas')">
            Registrar Faltas
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
