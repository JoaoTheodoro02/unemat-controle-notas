Ok, aqui está o seu código com os comentários explicativos. --- ```vue
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <v-card class="elevation-12 rounded-lg">
          <v-toolbar color="primary" dark flat class="rounded-t-lg">
            <v-toolbar-title class="text-h5 font-weight-bold text-center"
              >Login do Aluno</v-toolbar-title
            >
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
import { ref } from 'vue' // Importa a função `ref` do Vue para criar variáveis reativas.
import { useAuthStore } from '../stores/auth' // Importa a store Pinia `useAuthStore` para gerenciar a autenticação.

// Instanciação da store de autenticação.
const authStore = useAuthStore()

// --- Estados Reativos (ref) ---

// `email`: Variável reativa que armazena o valor do campo de e-mail.
const email = ref('')
// `password`: Variável reativa que armazena o valor do campo de senha.
const password = ref('')
// `loading`: Variável reativa booleana que indica se uma operação assíncrona (login) está em andamento.
const loading = ref(false)
// `error`: Variável reativa que armazena uma mensagem de erro, caso ocorra.
const error = ref(null)
// `showPassword`: Variável reativa booleana que controla a visibilidade da senha no campo de input.
const showPassword = ref(false)

// --- Regras de Validação ---
// Objeto que contém funções de validação reutilizáveis para os campos do formulário.
const rules = {
  required: (value) => !!value || 'Campo obrigatório.', // Verifica se o campo não está vazio ou nulo.
  email: (value) => {
    // Expressão regular para validar o formato de um e-mail.
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido.' // Retorna `true` se o e-mail for válido, ou a mensagem de erro.
  },
}

// --- Função de Lógica ---

// `handleLogin`: Função assíncrona responsável por tentar realizar o login do usuário.
const handleLogin = async () => {
  loading.value = true // Define `loading` para `true` para indicar que a operação começou.
  error.value = null // Limpa qualquer mensagem de erro anterior.
  try {
    // Chama a ação `login` da `authStore`, passando o e-mail e a senha.
    // Esta chamada é `await` para esperar a conclusão da operação de login.
    await authStore.login(email.value, password.value)
  } catch (err) {
    // Se ocorrer um erro durante o login, captura a exceção.
    error.value = err.message || 'Ocorreu um erro ao fazer login.' // Armazena a mensagem de erro.
  } finally {
    // O bloco `finally` é executado independentemente de ter ocorrido um erro ou não.
    loading.value = false // Define `loading` de volta para `false` ao final da operação.
  }
}
</script>

<style scoped>
/* --- Estilos CSS Escopados --- */
/* Estes estilos se aplicam apenas a este componente. */

.fill-height {
  height: 100vh; /* Define a altura do elemento para 100% da altura da viewport. */
  /* background: linear-gradient(to right, #bbdefb, #e3f2fd);: Define um fundo com gradiente linear. */
  /* De azul claro (#bbdefb) para um azul ainda mais claro (#e3f2fd). */
  background: linear-gradient(to right, #bbdefb, #e3f2fd); /* Gradiente de azul claro */
}
</style>
