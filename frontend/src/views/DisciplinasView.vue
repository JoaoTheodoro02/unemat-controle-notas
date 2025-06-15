<template>
  <v-app-bar app color="primary" dark>
    <v-btn icon @click="$router.go(-1)" title="Voltar">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title class="font-weight-bold">Minhas Disciplinas</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="disciplinasStore.fetchDisciplinas()" :loading="disciplinasStore.loading" title="Atualizar">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-btn icon @click="authStore.logout()" title="Sair">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
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
                    <v-list-item-title class="font-weight-medium text-primary">{{ disciplina.nome }}</v-list-item-title>
                    <v-list-item-subtitle class="text-caption">Professor: {{ disciplina.professor }} | Carga Horária: {{ disciplina.cargaHoraria }}h | Semestre: {{ disciplina.semestre }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <template v-slot:append>
                    <v-btn icon variant="text" color="grey" @click.stop="openEditDialog(disciplina)" title="Editar">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon variant="text" color="red" @click.stop="confirmDelete(disciplina)" title="Excluir">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert
                v-else
                type="info"
                dense
                variant="outlined"
                icon="mdi-information-outline"
              >
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
            <v-btn color="grey" variant="text" @click="dialog = false" :disabled="disciplinasStore.loading">Cancelar</v-btn>
            <v-btn color="primary" @click="handleSaveDisciplina" :loading="disciplinasStore.loading" :disabled="disciplinasStore.loading">
              {{ isEditing ? 'Salvar Alterações' : 'Cadastrar' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteDialog" max-width="400px">
        <v-card class="rounded-lg">
          <v-card-title class="headline bg-error text-white">Confirmar Exclusão</v-card-title>
          <v-card-text class="py-5 text-body-1">
            Tem certeza que deseja excluir a disciplina <strong>"{{ disciplinaToDelete?.nome }}"</strong>?
            Esta ação não pode ser desfeita.
          </v-card-text>
          <v-card-actions class="justify-end pa-4 bg-blue-grey-lighten-5">
            <v-btn color="grey" variant="text" @click="deleteDialog = false" :disabled="disciplinasStore.loading">Cancelar</v-btn>
            <v-btn color="error" @click="handleDeleteDisciplina" :loading="disciplinasStore.loading" :disabled="disciplinasStore.loading">Excluir</v-btn>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useDisciplinasStore } from '../stores/disciplinas';

const authStore = useAuthStore();
const disciplinasStore = useDisciplinasStore();
const router = useRouter();

const dialog = ref(false); // Controla o diálogo de cadastro/edição
const deleteDialog = ref(false); // Controla o diálogo de exclusão
const isEditing = ref(false); // Indica se está editando ou cadastrando
const currentDisciplina = ref({ // Disciplina sendo editada ou cadastrada
  id: null,
  nome: '',
  professor: '',
  cargaHoraria: null,
  semestre: '',
});
const disciplinaToDelete = ref(null); // Disciplina a ser excluída

const formError = ref(null);

const snackbar = ref({
  show: false,
  text: '',
  color: '',
  timeout: 3000,
});

// Regras de validação para o formulário
const rules = {
  required: value => !!value || 'Campo obrigatório.',
  positiveNumber: value => (value > 0) || 'Deve ser um número positivo.',
};

onMounted(() => {
  disciplinasStore.fetchDisciplinas(); // Carrega as disciplinas ao montar o componente
});

const goToDisciplinaDetail = (id) => {
  router.push(`/disciplina/${id}`);
};

const openAddDialog = () => {
  isEditing.value = false;
  currentDisciplina.value = { nome: '', professor: '', cargaHoraria: null, semestre: '' };
  formError.value = null;
  dialog.value = true;
};

const openEditDialog = (disciplina) => {
  isEditing.value = true;
  // Cria uma cópia para evitar mutação direta do store antes de salvar
  currentDisciplina.value = { ...disciplina };
  formError.value = null;
  dialog.value = true;
};

const handleSaveDisciplina = async () => {
  formError.value = null;
  // Adicione validação básica aqui (Vuetify forms podem ter validação mais robusta)
  if (!currentDisciplina.value.nome || !currentDisciplina.value.professor || !currentDisciplina.value.cargaHoraria || !currentDisciplina.value.semestre) {
    formError.value = 'Por favor, preencha todos os campos obrigatórios.';
    return;
  }
  if (currentDisciplina.value.cargaHoraria <= 0) {
    formError.value = 'A carga horária deve ser um número positivo.';
    return;
  }

  try {
    if (isEditing.value) {
      await disciplinasStore.updateDisciplina(currentDisciplina.value.id, currentDisciplina.value);
      snackbar.value = { show: true, text: 'Disciplina atualizada com sucesso!', color: 'success', timeout: 3000 };
    } else {
      await disciplinasStore.addDisciplina(currentDisciplina.value);
      snackbar.value = { show: true, text: 'Disciplina cadastrada com sucesso!', color: 'success', timeout: 3000 };
    }
    dialog.value = false;
  } catch (err) {
    formError.value = err.message || 'Ocorreu um erro ao salvar a disciplina.';
    snackbar.value = { show: true, text: `Erro: ${formError.value}`, color: 'error', timeout: 5000 };
  }
};

const confirmDelete = (disciplina) => {
  disciplinaToDelete.value = disciplina;
  deleteDialog.value = true;
};

const handleDeleteDisciplina = async () => {
  try {
    await disciplinasStore.deleteDisciplina(disciplinaToDelete.value.id);
    snackbar.value = { show: true, text: 'Disciplina excluída com sucesso!', color: 'success', timeout: 3000 };
    deleteDialog.value = false;
    disciplinaToDelete.value = null;
  } catch (err) {
    snackbar.value = { show: true, text: `Erro ao excluir: ${err.message}`, color: 'error', timeout: 5000 };
  }
};
</script>

<style scoped>
.disciplinas-bg {
  background: linear-gradient(135deg, #e0f7fa, #b2ebf2); /* Gradiente de azul ciano suave */
  min-height: 100vh;
}

.disciplina-item {
  background-color: #ffffff;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
}

.disciplina-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>
