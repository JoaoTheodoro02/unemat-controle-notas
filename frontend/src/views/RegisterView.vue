<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <v-card class="elevation-12 rounded-lg">
          <v-toolbar color="primary" dark flat class="rounded-t-lg">
            <v-toolbar-title class="text-h5 font-weight-bold text-center"
              >Cadastro de Aluno</v-toolbar-title
            >
          </v-toolbar>
          <v-card-text class="pa-5">
            <v-form @submit.prevent="handleRegister">
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
                class="mb-3"
                @click:append-inner="showPassword = !showPassword"
                :rules="[rules.required, rules.minPassword]"
                :disabled="loading"
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                label="Confirmar Senha"
                prepend-inner-icon="mdi-lock-check"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                variant="outlined"
                density="compact"
                class="mb-3"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                :rules="[rules.required, rules.passwordMatch]"
                :disabled="loading"
              ></v-text-field>

              <v-btn
                type="submit"
                color="success"
                block
                class="mt-6 text-capitalize font-weight-bold d-block"
                size="large"
                :loading="loading"
                :disabled="loading"
              >
                Cadastrar
              </v-btn>

              <v-btn
                variant="text"
                block
                class="mt-3 text-capitalize font-weight-bold"
                @click="$router.push('/login')"
                :disabled="loading"
              >
                Já tem conta? Faça login
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
import { ref } from 'vue' // Importa a função `ref` do Vue para criar variáveis reativas.
import { useRouter } from 'vue-router' // Importa o hook `useRouter` para navegação programática.
import { useAuthStore } from '../stores/auth' // Importa a store Pinia `useAuthStore` para gerenciar a autenticação e o registro.

// Instanciação da store de autenticação e do roteador.
const authStore = useAuthStore()
const router = useRouter()

// --- Estados Reativos (ref) ---

// `email`: Armazena o e-mail inserido pelo usuário.
const email = ref('')
// `password`: Armazena a senha inserida pelo usuário.
const password = ref('')
// `confirmPassword`: Armazena a confirmação da senha.
const confirmPassword = ref('')
// `loading`: Indica se uma operação assíncrona (cadastro) está em andamento.
const loading = ref(false)
// `error`: Armazena mensagens de erro a serem exibidas.
const error = ref(null)
// `showPassword`: Controla a visibilidade da senha.
const showPassword = ref(false)
// `showConfirmPassword`: Controla a visibilidade da confirmação de senha.
const showConfirmPassword = ref(false)

// --- Regras de Validação ---
// Objeto que contém funções de validação para os campos do formulário.
const rules = {
  required: (value) => !!value || 'Campo obrigatório.', // Garante que o campo não esteja vazio.
  email: (value) => {
    // Expressão regular para validar o formato de um e-mail.
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido.' // Retorna `true` se válido, ou a mensagem de erro.
  },
  minPassword: (value) => value.length >= 6 || 'A senha deve ter pelo menos 6 caracteres.', // Valida o tamanho mínimo da senha.
  passwordMatch: (value) => value === password.value || 'As senhas não coincidem.', // Verifica se a senha e a confirmação são iguais.
}

// --- Função de Lógica ---

// `handleRegister`: Função assíncrona para lidar com o processo de cadastro.
const handleRegister = async () => {
  // Validações manuais iniciais antes de chamar a store.
  if (!email.value || !password.value || !confirmPassword.value) {
    error.value = 'Preencha todos os campos.'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem.'
    return
  }
  if (password.value.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres.'
    return
  }

  loading.value = true // Ativa o estado de carregamento.
  error.value = null // Limpa mensagens de erro anteriores.
  try {
    // Chama a ação `register` da `authStore` para tentar criar um novo usuário.
    await authStore.register(email.value, password.value)
    // Se o cadastro for bem-sucedido, navega para a página de login.
    router.push('/login')
  } catch (err) {
    // Em caso de erro, armazena a mensagem de erro para exibição.
    error.value = err.message || 'Ocorreu um erro ao cadastrar.'
  } finally {
    loading.value = false // Desativa o estado de carregamento, independentemente do resultado.
  }
}
</script>

<style scoped>
/* Estilos CSS escopados, aplicados apenas a este componente. */
.fill-height {
  height: 100vh; /* Garante que o elemento ocupe 100% da altura da viewport. */
  /* Define um gradiente de fundo suave, indo de um verde muito claro para um verde um pouco mais intenso. */
  background: linear-gradient(to left, #e8f5e9, #c8e6c9); /* Gradiente de verde claro */
}
</style>
