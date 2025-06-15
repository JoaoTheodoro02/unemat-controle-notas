<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <v-card class="elevation-12 rounded-lg">
          <v-toolbar color="primary" dark flat class="rounded-t-lg">
            <v-toolbar-title class="text-h5 font-weight-bold text-center">Login do Aluno</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-5">
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="E-mail"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                density="compact"
                class="mb-3"
                :rules="[rules.required, rules.email]"
                :disabled="loading"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Senha"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                variant="outlined"
                density="compact"
                @click:append-inner="showPassword = !showPassword"
                :rules="[rules.required]"
                :disabled="loading"
              ></v-text-field>

              <v-btn
                type="submit"
                color="primary"
                block
                class="mt-6 text-capitalize font-weight-bold"
                size="large"
                :loading="loading"
                :disabled="loading"
              >
                Entrar
              </v-btn>
              <v-btn
                text
                block
                class="mt-3 text-capitalize font-weight-bold"
                @click="$router.push('/register')"
                :disabled="loading"
              >
                Não tem conta? Cadastre-se
              </v-btn>

              <v-alert
                v-if="error"
                type="error"
                dense
                closable
                class="mt-5"
                icon="mdi-alert-circle-outline"
                variant="tonal"
              >
                {{ error }}
              </v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);
const showPassword = ref(false);

const rules = {
  required: value => !!value || 'Campo obrigatório.',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido.'
  },
};

const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  try {
    await authStore.login(email.value, password.value);
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao fazer login.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
  background: linear-gradient(to right, #bbdefb, #e3f2fd); /* Gradiente de azul claro */
}
</style>
