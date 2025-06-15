## Código Comentado: Componente "Minhas Disciplinas" --- Aqui está o seu código, com comentários
detalhados adicionados para cada seção, explicando sua função e os elementos utilizados. ```vue
<template>
  <v-app-bar app color="primary" dark>
    <v-btn icon @click="$router.go(-1)" title="Voltar"> <v-icon>mdi-arrow-left</v-icon> </v-btn>
    <v-toolbar-title class="font-weight-bold">Minhas Disciplinas</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      icon
      @click="disciplinasStore.fetchDisciplinas()"
      :loading="disciplinasStore.loading"
      title="Atualizar"
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-btn icon @click="authStore.logout()" title="Sair"> <v-icon>mdi-logout</v-icon> </v-btn>
  </v-app-bar>

  <v-main class="disciplinas-bg">
    <v-container fluid class="pt-8">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-card class="elevation-6 rounded-lg pa-6">
            <v-card-title class="text-h5 mb-4 d-flex justify-space-between align-center">
              <span>Disciplinas Cadastradas</span>
              <v-btn color="primary" @click="openAddDialog" prepend-icon="mdi-plus-circle">
                Nova Disciplina
              </v-btn>
            </v-card-title>
            <v-card-text>
              <div v-if="disciplinasStore.loading" class="text-center py-5">
                <v-progress-circular indeterminate color="primary" size="50"></v-progress-circular>
                <p class="mt-3 text-primary">Carregando disciplinas...</p>
              </div>
              <v-alert
                v-else-if="disciplinasStore.error"
                type="error"
                dense
                closable
                class="mb-4"
                icon="mdi-alert-circle-outline"
                variant="tonal"
              >
                {{ disciplinasStore.error }}
              </v-alert>
              <v-list v-else-if="disciplinasStore.disciplinas.length > 0" lines="two">
                <v-list-item
                  v-for="disciplina in disciplinasStore.disciplinas"
                  :key="disciplina.id"
                  @click="goToDisciplinaDetail(disciplina.id)"
                  class="my-2 py-3 rounded-lg elevation-2 disciplina-item"
                >
                  <template v-slot:prepend>
                    <v-avatar color="blue-grey-lighten-5">
                      <v-icon color="indigo">mdi-book-open-variant</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium text-primary">{{
                      disciplina.nome
                    }}</v-list-item-title>
                    <v-list-item-subtitle class="text-caption"
                      >Professor: {{ disciplina.professor }} | Carga Horária:
                      {{ disciplina.cargaHoraria }}h | Semestre:
                      {{ disciplina.semestre }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <template v-slot:append>
                    <v-btn
                      icon
                      variant="text"
                      color="grey"
                      @click.stop="openEditDialog(disciplina)"
                      title="Editar"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="text"
                      color="red"
                      @click.stop="confirmDelete(disciplina)"
                      title="Excluir"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert v-else type="info" dense variant="outlined" icon="mdi-information-outline">
                Nenhuma disciplina cadastrada ainda. Clique em "Nova Disciplina" para começar!
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" max-width="600px">
        <v-card class="rounded-lg">
          <v-card-title class="headline bg-primary text-white">
            {{ isEditing ? 'Editar Disciplina' : 'Cadastrar Nova Disciplina' }}
          </v-card-title>
          <v-card-text class="py-5">
            <v-form ref="disciplinaForm" @submit.prevent="handleSaveDisciplina">
              <v-text-field
                v-model="currentDisciplina.nome"
                label="Nome da Disciplina"
                variant="outlined"
                density="compact"
                class="mb-3"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="currentDisciplina.professor"
                label="Professor"
                variant="outlined"
                density="compact"
                class="mb-3"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model.number="currentDisciplina.cargaHoraria"
                label="Carga Horária (horas)"
                variant="outlined"
                density="compact"
                type="number"
                :rules="[rules.required, rules.positiveNumber]"
              ></v-text-field>
              <v-text-field
                v-model="currentDisciplina.semestre"
                label="Semestre (Ex: 2025/1)"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
              ></v-text-field>
              <v-alert
                v-if="formError"
                type="error"
                dense
                closable
                class="mt-3"
                icon="mdi-alert-circle-outline"
                variant="tonal"
              >
                {{ formError }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end pa-4 bg-blue-grey-lighten-5">
            <v-btn
              color="grey"
              variant="text"
              @click="dialog = false"
              :disabled="disciplinasStore.loading"
              >Cancelar</v-btn
            >
            <v-btn
              color="primary"
              @click="handleSaveDisciplina"
              :loading="disciplinasStore.loading"
              :disabled="disciplinasStore.loading"
            >
              {{ isEditing ? 'Salvar Alterações' : 'Cadastrar' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteDialog" max-width="400px">
        <v-card class="rounded-lg">
          <v-card-title class="headline bg-error text-white">Confirmar Exclusão</v-card-title>
          <v-card-text class="py-5 text-body-1">
            Tem certeza que deseja excluir a disciplina
            <strong>"{{ disciplinaToDelete?.nome }}"</strong>? Esta ação não pode ser desfeita.
          </v-card-text>
          <v-card-actions class="justify-end pa-4 bg-blue-grey-lighten-5">
            <v-btn
              color="grey"
              variant="text"
              @click="deleteDialog = false"
              :disabled="disciplinasStore.loading"
              >Cancelar</v-btn
            >
            <v-btn
              color="error"
              @click="handleDeleteDisciplina"
              :loading="disciplinasStore.loading"
              :disabled="disciplinasStore.loading"
              >Excluir</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbar.show = false">Fechar</v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue' // Importa funcionalidades reativas do Vue (ref, onMounted).
import { useRouter } from 'vue-router' // Importa o hook `useRouter` para navegação programática.
import { useAuthStore } from '../stores/auth' // Importa a store Pinia `useAuthStore` para gerenciar a autenticação.
import { useDisciplinasStore } from '../stores/disciplinas' // Importa a store Pinia `useDisciplinasStore` para gerenciar os dados das disciplinas.

// Instanciação dos hooks e stores.
const authStore = useAuthStore() // Obtém uma instância da store de autenticação.
const disciplinasStore = useDisciplinasStore() // Obtém uma instância da store de disciplinas.
const router = useRouter() // Obtém uma instância do roteador Vue.

// --- Estados Reativos (ref) ---

// `dialog`: Ref booleana que controla a visibilidade do diálogo de cadastro/edição de disciplina.
const dialog = ref(false)
// `deleteDialog`: Ref booleana que controla a visibilidade do diálogo de confirmação de exclusão.
const deleteDialog = ref(false)
// `isEditing`: Ref booleana que indica se o formulário está em modo de edição (`true`) ou cadastro (`false`).
const isEditing = ref(false)
// `currentDisciplina`: Ref que armazena os dados da disciplina sendo manipulada (cadastrada ou editada).
const currentDisciplina = ref({
  id: null,
  nome: '',
  professor: '',
  cargaHoraria: null,
  semestre: '',
})
// `disciplinaToDelete`: Ref que armazena o objeto da disciplina que o usuário confirmou que deseja excluir.
const disciplinaToDelete = ref(null)

// `formError`: Ref para armazenar mensagens de erro de validação do formulário.
const formError = ref(null)

// `snackbar`: Ref que controla o estado e o conteúdo do componente `v-snackbar` para feedback ao usuário.
const snackbar = ref({
  show: false, // `true` para exibir o snackbar.
  text: '', // Mensagem a ser exibida.
  color: '', // Cor de fundo do snackbar (ex: 'success', 'error').
  timeout: 3000, // Tempo em milissegundos que o snackbar permanece visível.
})

// --- Regras de Validação para o Formulário ---
// Objeto que contém funções de validação reutilizáveis para os campos dos formulários.
const rules = {
  required: (value) => !!value || 'Campo obrigatório.', // Verifica se o campo não está vazio ou nulo.
  positiveNumber: (value) => value > 0 || 'Deve ser um número positivo.', // Verifica se o valor é um número positivo.
}

// --- Hooks do Ciclo de Vida ---

// `onMounted`: Hook que é executado depois que o componente é montado no DOM.
// Aqui, ele é usado para carregar a lista de disciplinas assim que a página é acessada.
onMounted(() => {
  disciplinasStore.fetchDisciplinas() // Chama a ação da store para buscar as disciplinas.
})

// --- Funções de Navegação e Abertura de Diálogos ---

// `goToDisciplinaDetail`: Navega para a página de detalhes de uma disciplina específica.
const goToDisciplinaDetail = (id) => {
  router.push(`/disciplina/${id}`) // Usa o roteador para empurrar uma nova rota para o histórico.
}

// `openAddDialog`: Abre o diálogo de cadastro de nova disciplina.
const openAddDialog = () => {
  isEditing.value = false // Define o modo para "cadastro".
  currentDisciplina.value = { nome: '', professor: '', cargaHoraria: null, semestre: '' } // Limpa os campos do formulário.
  formError.value = null // Limpa qualquer erro anterior.
  dialog.value = true // Exibe o diálogo.
}

// `openEditDialog`: Abre o diálogo de edição de uma disciplina existente.
const openEditDialog = (disciplina) => {
  isEditing.value = true // Define o modo para "edição".
  // Cria uma cópia rasa do objeto `disciplina` para `currentDisciplina`. Isso evita que alterações diretas no formulário
  // afetem o objeto original na store antes que a edição seja salva.
  currentDisciplina.value = { ...disciplina }
  formError.value = null
  dialog.value = true
}

// --- Funções de Manipulação de Dados (Salvar/Excluir) ---

// `handleSaveDisciplina`: Função assíncrona para salvar (cadastrar ou atualizar) uma disciplina.
const handleSaveDisciplina = async () => {
  formError.value = null // Limpa erros de validação anteriores.
  // Validação manual básica dos campos do formulário antes de enviar para a store.
  if (
    !currentDisciplina.value.nome ||
    !currentDisciplina.value.professor ||
    !currentDisciplina.value.cargaHoraria ||
    !currentDisciplina.value.semestre
  ) {
    formError.value = 'Por favor, preencha todos os campos obrigatórios.'
    return
  }
  if (currentDisciplina.value.cargaHoraria <= 0) {
    formError.value = 'A carga horária deve ser um número positivo.'
    return
  }

  try {
    if (isEditing.value) {
      // Se estiver em modo de edição, chama a ação `updateDisciplina` da store.
      await disciplinasStore.updateDisciplina(currentDisciplina.value.id, currentDisciplina.value)
      snackbar.value = {
        show: true,
        text: 'Disciplina atualizada com sucesso!',
        color: 'success',
        timeout: 3000,
      }
    } else {
      // Se estiver em modo de cadastro, chama a ação `addDisciplina` da store.
      await disciplinasStore.addDisciplina(currentDisciplina.value)
      snackbar.value = {
        show: true,
        text: 'Disciplina cadastrada com sucesso!',
        color: 'success',
        timeout: 3000,
      }
    }
    dialog.value = false // Fecha o diálogo após a operação bem-sucedida.
  } catch (err) {
    // Em caso de erro, define a mensagem de erro e exibe no snackbar.
    formError.value = err.message || 'Ocorreu um erro ao salvar a disciplina.'
    snackbar.value = { show: true, text: `Erro: ${formError.value}`, color: 'error', timeout: 5000 }
  }
}

// `confirmDelete`: Abre o diálogo de confirmação de exclusão.
const confirmDelete = (disciplina) => {
  disciplinaToDelete.value = disciplina // Armazena a disciplina que será excluída para uso no diálogo.
  deleteDialog.value = true // Exibe o diálogo de confirmação.
}

// `handleDeleteDisciplina`: Função assíncrona para realmente excluir a disciplina.
const handleDeleteDisciplina = async () => {
  try {
    // Chama a ação `deleteDisciplina` da store, passando o ID da disciplina a ser excluída.
    await disciplinasStore.deleteDisciplina(disciplinaToDelete.value.id)
    snackbar.value = {
      show: true,
      text: 'Disciplina excluída com sucesso!',
      color: 'success',
      timeout: 3000,
    }
    deleteDialog.value = false // Fecha o diálogo de confirmação.
    disciplinaToDelete.value = null // Limpa a referência à disciplina excluída.
  } catch (err) {
    // Em caso de erro, exibe a mensagem no snackbar.
    snackbar.value = {
      show: true,
      text: `Erro ao excluir: ${err.message}`,
      color: 'error',
      timeout: 5000,
    }
  }
}
</script>

<style scoped>
/* --- Estilos CSS Escopados --- */
/* Estes estilos se aplicam apenas a este componente. */

.disciplinas-bg {
  /* Define um gradiente de cor suave como fundo da página, do azul claro ao ciano claro. */
  background: linear-gradient(135deg, #e0f7fa, #b2ebf2); /* Gradiente de azul ciano suave */
  min-height: 100vh; /* Garante que o fundo ocupe toda a altura visível da tela. */
}

.disciplina-item {
  /* Estilos para cada item individual da lista de disciplinas. */
  background-color: #ffffff; /* Fundo branco. */
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out; /* Adiciona uma transição suave para efeitos de hover. */
  cursor: pointer; /* Muda o cursor para indicar que o item é clicável. */
}

.disciplina-item:hover {
  /* Estilos aplicados quando o mouse passa sobre um item da disciplina. */
  transform: translateY(-3px); /* Move o item ligeiramente para cima. */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adiciona uma sombra mais proeminente para criar um efeito de "elevação". */
}
</style>
