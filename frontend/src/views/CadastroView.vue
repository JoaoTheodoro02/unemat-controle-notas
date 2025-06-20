<template>
  <!-- Container principal com fundo cinza claro e altura mínima da tela -->
  <v-container fluid class="pa-0 bg-grey-lighten-5" style="min-height: 100vh">
    <v-row no-gutters class="fill-height">
      <!-- Coluna com imagem lateral (visível apenas em telas médias ou maiores) -->
      <v-col cols="12" md="6" class="d-none d-md-flex align-center justify-center bg-primary">
        <v-img
          src="https://cdn.pixabay.com/photo/2016/03/31/20/11/computer-1294046_960_720.png"
          max-width="70%"
          alt="Cadastro ilustrativo"
          class="fade-in"
        />
      </v-col>

      <!-- Coluna com o formulário de cadastro -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center pa-6">
        <v-fade-transition>
          <!-- Cartão com o formulário -->
          <v-card class="elevation-12 rounded-xl pa-6 w-100" max-width="450">
            <!-- Título do formulário -->
            <v-card-title class="text-center text-h5 font-weight-bold mb-2">
              Crie sua conta
            </v-card-title>

            <!-- Subtítulo descritivo -->
            <p class="text-subtitle-2 text-center text-grey-darken-1 mb-6">
              É rápido, fácil e totalmente gratuito.
            </p>

            <v-card-text>
              <!-- Campo de e-mail -->
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                density="comfortable"
                color="primary"
                clearable
              />

              <!-- Campo de senha -->
              <v-text-field
                v-model="senha"
                label="Senha"
                type="password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                density="comfortable"
                color="primary"
                clearable
              />

              <!-- Botão para cadastrar com email e senha -->
              <v-btn color="primary" class="mt-4" block size="large" @click="cadastrar">
                Cadastrar
              </v-btn>

              <!-- Divisor visual -->
              <v-divider class="my-6" />

              <!-- Botão para login/cadastro com conta Google -->
              <v-btn
                color="red darken-1"
                class="white--text"
                block
                size="large"
                @click="cadastrarComGoogle"
              >
                <v-icon left>mdi-google</v-icon>
                Entrar com Google
              </v-btn>
            </v-card-text>
          </v-card>
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Importações do Vue e Firebase Auth
import { ref } from 'vue'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// Estados reativos para os campos do formulário
const email = ref('')
const senha = ref('')

// Função para cadastrar usando email e senha
const cadastrar = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, senha.value)
    alert('Usuário cadastrado com sucesso!')
  } catch (error) {
    alert('Erro: ' + error.message)
  }
}

// Função para cadastrar usando conta do Google
const cadastrarComGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
    alert('Usuário cadastrado com Google!')
  } catch (error) {
    alert('Erro: ' + error.message)
  }
}
</script>

<style scoped>
/* Animação de fade-in para a imagem lateral */
.fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
