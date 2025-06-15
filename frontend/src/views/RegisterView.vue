<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <v-card class="elevation-12 rounded-lg">
          <v-toolbar color="primary" dark flat class="rounded-t-lg">
            <v-toolbar-title class="text-h5 font-weight-bold text-center">Cadastro de Aluno</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-5">
            <v-form @submit.prevent="handleRegister">
              <v-text-field v-model="email" label="E-mail" prepend-inner-icon="mdi-email" variant="outlined"
                density="compact" class="mb-3" :rules="[rules.required, rules.email]"
                :disabled="loading"></v-text-field>

              <v-text-field v-model="password" label="Senha" prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
                variant="outlined" density="compact" class="mb-3" @click:append-inner="showPassword = !showPassword"
                :rules="[rules.required, rules.minPassword]" :disabled="loading"></v-text-field>

              <v-text-field v-model="confirmPassword" label="Confirmar Senha" prepend-inner-icon="mdi-lock-check"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'" variant="outlined" density="compact" class="mb-3"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                :rules="[rules.required, rules.passwordMatch]" :disabled="loading"></v-text-field>

              <v-btn type="submit" color="success" block class="mt-6 text-capitalize font-weight-bold d-block"
                size="large" :loading="loading" :disabled="loading">
                Cadastrar
              </v-btn>

              <v-btn variant="text" block class="mt-3 text-capitalize font-weight-bold" @click="$router.push('/login')"
                :disabled="loading">
                Já tem conta? Faça login
              </v-btn>

              <v-alert v-if="error" type="error" dense closable class="mt-5" icon="mdi-alert-circle-outline"
                variant="tonal">
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
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref(null);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const rules = {
  required: value => !!value || 'Campo obrigatório.',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'E-mail inválido.';
  },
  minPassword: value => value.length >= 6 || 'A senha deve ter pelo menos 6 caracteres.',
  passwordMatch: value => value === password.value || 'As senhas não coincidem.',
};

const handleRegister = async () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    error.value = "Preencha todos os campos.";
    return;
  }
  if (password.value !== confirmPassword.value) {
    error.value = "As senhas não coincidem.";
    return;
  }
  if (password.value.length < 6) {
    error.value = "A senha deve ter pelo menos 6 caracteres.";
    return;
  }

  loading.value = true;
  error.value = null;
  try {
    await authStore.register(email.value, password.value);
    router.push('/login');
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao cadastrar.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
  background: linear-gradient(to left, #e8f5e9, #c8e6c9);
  /* Gradiente de verde claro */
}
</style>
