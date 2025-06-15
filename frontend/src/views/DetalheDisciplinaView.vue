<template>
  <v-app-bar app color="primary" dark>
    <v-btn icon @click="$router.go(-1)" title="Voltar">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title class="font-weight-bold">Detalhes da Disciplina</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="authStore.logout()" title="Sair">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>

  <v-main class="detail-disciplina-bg">
    <v-container v-if="disciplina" fluid class="pt-8">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-card class="elevation-6 rounded-lg pa-6 mb-8">
            <v-card-title class="text-h4 mb-4 text-primary font-weight-bold d-flex justify-space-between align-center">
              <span>{{ disciplina.nome }}</span>
              <v-btn icon color="secondary" @click="openEditDialog(disciplina)" title="Editar Disciplina">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-list dense class="pa-0">
                <v-list-item class="px-0">
                  <v-list-item-title class="font-weight-medium">Professor:</v-list-item-title>
                  <v-list-item-subtitle>{{ disciplina.professor }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item class="px-0">
                  <v-list-item-title class="font-weight-medium">Carga Horária:</v-list-item-title>
                  <v-list-item-subtitle>{{ disciplina.cargaHoraria }}h</v-list-item-subtitle>
                </v-list-item>
                <v-list-item class="px-0">
                  <v-list-item-title class="font-weight-medium">Semestre:</v-list-item-title>
                  <v-list-item-subtitle>{{ disciplina.semestre }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>

          <v-card class="elevation-6 rounded-lg pa-6 mb-8">
            <v-card-title class="text-h5 mb-3 d-flex justify-space-between align-center">
              <span>Avaliações</span>
              <v-btn color="success" @click="openAddAvaliacaoDialog" prepend-icon="mdi-plus-circle">
                Adicionar Avaliação
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-list v-if="disciplina.avaliacoes && disciplina.avaliacoes.length > 0" lines="two">
                <v-list-item
                  v-for="avaliacao in disciplina.avaliacoes"
                  :key="avaliacao.id"
                  class="my-2 py-3 rounded-lg elevation-1"
                >
                  <template v-slot:prepend>
                    <v-icon color="success">mdi-check-circle</v-icon>
                  </template>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium">{{ avaliacao.nome }}</v-list-item-title>
                    <v-list-item-subtitle>Nota: {{ avaliacao.nota }} | Peso: {{ avaliacao.peso }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <template v-slot:append>
                    <v-btn icon variant="text" color="grey" @click.stop="openEditAvaliacaoDialog(avaliacao)" title="Editar">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon variant="text" color="red" @click.stop="confirmDeleteAvaliacao(avaliacao)" title="Excluir">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert v-else type="info" variant="outlined" icon="mdi-information-outline">
                Nenhuma avaliação registrada para esta disciplina.
              </v-alert>
            </v-card-text>
          </v-card>

          <v-card class="elevation-6 rounded-lg pa-6 mb-8">
            <v-card-title class="text-h5 mb-3 d-flex justify-space-between align-center">
              <span>Faltas</span>
              <v-btn color="warning" @click="openAddFaltaDialog" prepend-icon="mdi-plus-circle">
                Registrar Falta
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-list v-if="disciplina.faltas && disciplina.faltas.length > 0" lines="two">
                <v-list-item
                  v-for="falta in disciplina.faltas"
                  :key="falta.id"
                  class="my-2 py-3 rounded-lg elevation-1"
                >
                  <template v-slot:prepend>
                    <v-icon color="warning">mdi-alert-octagon</v-icon>
                  </template>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium">Data: {{ falta.data }}</v-list-item-title>
                    <v-list-item-subtitle>Quantidade: {{ falta.quantidade }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <template v-slot:append>
                    <v-btn icon variant="text" color="grey" @click.stop="openEditFaltaDialog(falta)" title="Editar">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon variant="text" color="red" @click.stop="confirmDeleteFalta(falta)" title="Excluir">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert v-else type="info" variant="outlined" icon="mdi-information-outline">
                Nenhuma falta registrada para esta disciplina.
              </v-alert>
            </v-card-text>
          </v-card>

          <v-card class="elevation-6 rounded-lg pa-6 mb-8">
            <v-card-title class="text-h5 mb-3">Resumo Acadêmico</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4" class="text-center">
                  <v-card class="pa-3" variant="outlined">
                    <div class="text-caption">Média Final:</div>
                    <div :class="`text-h4 font-weight-bold mt-2 text-${mediaColor}`">{{ mediaFinal }}</div>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <v-card class="pa-3" variant="outlined">
                    <div class="text-caption">Total de Faltas:</div>
                    <div class="text-h4 font-weight-bold mt-2">{{ totalFaltas }}</div>
                    <div class="text-caption">({{ maxFaltasPermitidas }} permitidas)</div>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <v-card class="pa-3" variant="outlined">
                    <div class="text-caption">Status:</div>
                    <div :class="`text-h4 font-weight-bold mt-2 text-${statusColor}`">{{ statusAprovacao }}</div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="elevation-6 rounded-lg pa-6 mb-8">
            <v-card-title class="text-h5 mb-3">Progresso de Notas</v-card-title>
            <v-card-text>
              <NotasChart :avaliacoes="disciplina.avaliacoes" :height="250" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="dialogDisciplina" max-width="600px">
        <v-card class="rounded-lg">
          <v-card-title class="headline bg-primary text-white">
            {{ isEditingDisciplina ? 'Editar Disciplina' : 'Cadastrar Nova Disciplina' }}
          </v-card-title>
          <v-card-text class="py-5">
            <v-form ref="disciplinaForm">
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
                v-if="formErrorDisciplina"
                type="error"
                dense
                closable
                class="mt-3"
                icon="mdi-alert-circle-outline"
                variant="tonal"
              >
                {{ formErrorDisciplina }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end pa-4 bg-blue-grey-lighten-5">
            <v-btn color="grey" variant="text" @click="dialogDisciplina = false" :disabled="disciplinasStore.loading">Cancelar</v-btn>
            <v-btn color="primary" @click="handleSaveDisciplina" :loading="disciplinasStore.loading" :disabled="disciplinasStore.loading">
              {{ isEditingDisciplina ? 'Salvar Alterações' : 'Cadastrar' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogAvaliacao" max-width="500px">
        <v-card class="rounded-lg">
          <v-card-title class="headline bg-success text-white">
            {{ isEditingAvaliacao ? 'Editar Avaliação' : 'Adicionar Nova Avaliação' }}
          </v-card-title>
          <v-card-text class="py-5">
            <v-form ref="avaliacaoForm">
              <v-text-field
                v-model="currentAvaliacao.nome"
                label="Nome da Avaliação"
                variant="outlined"
                density="compact"
                class="mb-3"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model.number="currentAvaliacao.nota"
                label="Nota (0-10)"
                variant="outlined"
                density="compact"
                type="number"
                step="0.1"
                :rules="[rules.required, rules.notaRange]"
              ></v-text-field>
              <v-text-field
                v-model.number="currentAvaliacao.peso"
                label="Peso (0-1)"
                variant="outlined"
                density="compact"
                type="number"
                step="0.01"
                :rules="[rules.required, rules.pesoRange]"
              ></v-text-field>
              <v-alert
                v-if="formErrorAvaliacao"
                type="error"
                dense
                closable
                class="mt-3"
                icon="mdi-alert-circle-outline"
                variant="tonal"
              >
                {{ formErrorAvaliacao }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end pa-4 bg-blue-grey-lighten-5">
            <v-btn color="grey" variant="text" @click="dialogAvaliacao = false" :disabled="disciplinasStore.loading">Cancelar</v-btn>
            <v-btn color="success" @click="handleSaveAvaliacao" :loading="disciplinasStore.loading" :disabled="disciplinasStore.loading">
              {{ isEditingAvaliacao ? 'Salvar Alterações' : 'Adicionar' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogFalta" max-width="500px">
        <v-card class="rounded-lg">
          <v-card-title class="headline bg-warning text-white">
            {{ isEditingFalta ? 'Editar Falta' : 'Registrar Nova Falta' }}
          </v-card-title>
          <v-card-text class="py-5">
            <v-form ref="faltaForm">
              <v-text-field
                v-model="currentFalta.data"
                label="Data da Falta"
                variant="outlined"
                density="compact"
                type="date"
                class="mb-3"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model.number="currentFalta.quantidade"
                label="Quantidade de Aulas Perdidas"
                variant="outlined"
                density="compact"
                type="number"
                :rules="[rules.required, rules.positiveNumber]"
              ></v-text-field>
              <v-alert
                v-if="formErrorFalta"
                type="error"
                dense
                closable
                class="mt-3"
                icon="mdi-alert-circle-outline"
                variant="tonal"
              >
                {{ formErrorFalta }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end pa-4 bg-blue-grey-lighten-5">
            <v-btn color="grey" variant="text" @click="dialogFalta = false" :disabled="disciplinasStore.loading">Cancelar</v-btn>
            <v-btn color="warning" @click="handleSaveFalta" :loading="disciplinasStore.loading" :disabled="disciplinasStore.loading">
              {{ isEditingFalta ? 'Salvar Alterações' : 'Registrar' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteItemDialog" max-width="400px">
        <v-card class="rounded-lg">
          <v-card-title class="headline bg-error text-white">Confirmar Exclusão</v-card-title>
          <v-card-text class="py-5 text-body-1">
            Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.
          </v-card-text>
          <v-card-actions class="justify-end pa-4 bg-blue-grey-lighten-5">
            <v-btn color="grey" variant="text" @click="deleteItemDialog = false" :disabled="disciplinasStore.loading">Cancelar</v-btn>
            <v-btn color="error" @click="confirmDeleteAction" :loading="disciplinasStore.loading" :disabled="disciplinasStore.loading">Excluir</v-btn>
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
    <v-container v-else class="text-center pt-8">
      <v-progress-circular indeterminate color="primary" size="64" v-if="disciplinasStore.loading"></v-progress-circular>
      <v-alert v-else-if="disciplinasStore.error" type="error" dense variant="tonal" icon="mdi-alert-circle-outline">
        Erro ao carregar disciplina: {{ disciplinasStore.error }}
        <v-btn text class="ml-2" @click="disciplinasStore.fetchDisciplinas()">Tentar Novamente</v-btn>
      </v-alert>
      <v-alert v-else type="info" variant="outlined" icon="mdi-information-outline">
        Disciplina não encontrada ou não carregada.
      </v-alert>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useDisciplinasStore } from '../stores/disciplinas';
import NotasChart from '../components/NotasChart.vue'; // Importa o componente do gráfico

const route = useRoute();
const authStore = useAuthStore();
const disciplinasStore = useDisciplinasStore();

// Estado para a disciplina atual
const disciplinaId = ref(route.params.id);
const disciplina = computed(() => disciplinasStore.getDisciplinaById(disciplinaId.value));

// Estados para os diálogos de cadastro/edição
const dialogDisciplina = ref(false);
const isEditingDisciplina = ref(false);
const currentDisciplina = ref({ id: null, nome: '', professor: '', cargaHoraria: null, semestre: '' });
const formErrorDisciplina = ref(null);

const dialogAvaliacao = ref(false);
const isEditingAvaliacao = ref(false);
const currentAvaliacao = ref({ id: null, nome: '', nota: null, peso: null });
const formErrorAvaliacao = ref(null);

const dialogFalta = ref(false);
const isEditingFalta = ref(false);
const currentFalta = ref({ id: null, data: '', quantidade: null });
const formErrorFalta = ref(null);

// Estado para o diálogo de confirmação de exclusão (genérico)
const deleteItemDialog = ref(false);
const itemToDelete = ref(null); // O item (avaliação ou falta) a ser excluído
const itemToDeleteType = ref(null); // 'avaliacao' ou 'falta'

const snackbar = ref({
  show: false,
  text: '',
  color: '',
  timeout: 3000,
});

// Regras de validação
const rules = {
  required: value => !!value || 'Campo obrigatório.',
  positiveNumber: value => (value > 0) || 'Deve ser um número positivo.',
  notaRange: value => (value >= 0 && value <= 10) || 'A nota deve estar entre 0 e 10.',
  pesoRange: value => (value >= 0 && value <= 1) || 'O peso deve estar entre 0 e 1.',
};

// Computed properties para os cálculos e status
const mediaFinal = computed(() => disciplinasStore.calcularMediaFinal(disciplinaId.value));
const totalFaltas = computed(() => disciplinasStore.calcularTotalFaltas(disciplinaId.value));
const maxFaltasPermitidas = computed(() => (disciplina.value?.cargaHoraria || 0) * 0.25);
const statusAprovacao = computed(() => disciplinasStore.getStatusAprovacao(disciplinaId.value));

// Cores baseadas no status
const mediaColor = computed(() => {
  const media = parseFloat(mediaFinal.value);
  if (media >= 7) return 'success';
  if (media >= 5) return 'warning';
  if (media < 5) return 'error';
  return 'grey';
});

const statusColor = computed(() => {
  const status = statusAprovacao.value;
  if (status === 'Aprovado') return 'success';
  if (status === 'Recuperação') return 'warning';
  if (status.includes('Reprovado')) return 'error';
  return 'grey';
});

// Watcher para mudanças no ID da rota (se o usuário navegar entre detalhes de disciplinas)
watch(() => route.params.id, (newId) => {
  disciplinaId.value = newId;
  // O computed property `disciplina` reagirá automaticamente a essa mudança
});

onMounted(() => {
  // O `fetchDisciplinas` é chamado no DisciplinasView, aqui apenas garantimos que está no store
  // se o usuário acessar diretamente por URL.
  if (!disciplina.value) {
    disciplinasStore.fetchDisciplinas();
  }
});

// --- Métodos para Disciplinas (edição via diálogo) ---
const openEditDialog = (disc) => {
  isEditingDisciplina.value = true;
  currentDisciplina.value = { ...disc };
  formErrorDisciplina.value = null;
  dialogDisciplina.value = true;
};

const handleSaveDisciplina = async () => {
  formErrorDisciplina.value = null;
  // Validação simples do formulário de disciplina
  if (!currentDisciplina.value.nome || !currentDisciplina.value.professor || !currentDisciplina.value.cargaHoraria || !currentDisciplina.value.semestre) {
    formErrorDisciplina.value = 'Por favor, preencha todos os campos obrigatórios.';
    return;
  }
  if (currentDisciplina.value.cargaHoraria <= 0) {
    formErrorDisciplina.value = 'A carga horária deve ser um número positivo.';
    return;
  }

  try {
    await disciplinasStore.updateDisciplina(currentDisciplina.value.id, currentDisciplina.value);
    snackbar.value = { show: true, text: 'Disciplina atualizada com sucesso!', color: 'success', timeout: 3000 };
    dialogDisciplina.value = false;
  } catch (err) {
    formErrorDisciplina.value = err.message || 'Erro ao atualizar disciplina.';
    snackbar.value = { show: true, text: `Erro: ${formErrorDisciplina.value}`, color: 'error', timeout: 5000 };
  }
};

// --- Métodos para Avaliações ---
const openAddAvaliacaoDialog = () => {
  isEditingAvaliacao.value = false;
  currentAvaliacao.value = { nome: '', nota: null, peso: null };
  formErrorAvaliacao.value = null;
  dialogAvaliacao.value = true;
};

const openEditAvaliacaoDialog = (avaliacao) => {
  isEditingAvaliacao.value = true;
  currentAvaliacao.value = { ...avaliacao };
  formErrorAvaliacao.value = null;
  dialogAvaliacao.value = true;
};

const handleSaveAvaliacao = async () => {
  formErrorAvaliacao.value = null;
  if (!currentAvaliacao.value.nome || currentAvaliacao.value.nota === null || currentAvaliacao.value.peso === null) {
    formErrorAvaliacao.value = 'Preencha todos os campos.';
    return;
  }
  if (currentAvaliacao.value.nota < 0 || currentAvaliacao.value.nota > 10) {
    formErrorAvaliacao.value = 'A nota deve estar entre 0 e 10.';
    return;
  }
  if (currentAvaliacao.value.peso < 0 || currentAvaliacao.value.peso > 1) {
    formErrorAvaliacao.value = 'O peso deve estar entre 0 e 1.';
    return;
  }

  try {
    if (isEditingAvaliacao.value) {
      await disciplinasStore.updateAvaliacao(disciplinaId.value, currentAvaliacao.value.id, currentAvaliacao.value);
      snackbar.value = { show: true, text: 'Avaliação atualizada com sucesso!', color: 'success', timeout: 3000 };
    } else {
      await disciplinasStore.addAvaliacao(disciplinaId.value, currentAvaliacao.value);
      snackbar.value = { show: true, text: 'Avaliação adicionada com sucesso!', color: 'success', timeout: 3000 };
    }
    dialogAvaliacao.value = false;
  } catch (err) {
    formErrorAvaliacao.value = err.message || 'Erro ao salvar avaliação.';
    snackbar.value = { show: true, text: `Erro: ${formErrorAvaliacao.value}`, color: 'error', timeout: 5000 };
  }
};

const confirmDeleteAvaliacao = (avaliacao) => {
  itemToDelete.value = avaliacao;
  itemToDeleteType.value = 'avaliacao';
  deleteItemDialog.value = true;
};

// --- Métodos para Faltas ---
const openAddFaltaDialog = () => {
  isEditingFalta.value = false;
  currentFalta.value = { data: '', quantidade: null };
  formErrorFalta.value = null;
  dialogFalta.value = true;
};

const openEditFaltaDialog = (falta) => {
  isEditingFalta.value = true;
  currentFalta.value = { ...falta };
  formErrorFalta.value = null;
  dialogFalta.value = true;
};

const handleSaveFalta = async () => {
  formErrorFalta.value = null;
  if (!currentFalta.value.data || currentFalta.value.quantidade === null) {
    formErrorFalta.value = 'Preencha todos os campos.';
    return;
  }
  if (currentFalta.value.quantidade <= 0) {
    formErrorFalta.value = 'A quantidade de aulas perdidas deve ser um número positivo.';
    return;
  }

  try {
    if (isEditingFalta.value) {
      await disciplinasStore.updateFalta(disciplinaId.value, currentFalta.value.id, currentFalta.value);
      snackbar.value = { show: true, text: 'Falta atualizada com sucesso!', color: 'success', timeout: 3000 };
    } else {
      await disciplinasStore.addFalta(disciplinaId.value, currentFalta.value);
      snackbar.value = { show: true, text: 'Falta registrada com sucesso!', color: 'success', timeout: 3000 };
    }
    dialogFalta.value = false;
  } catch (err) {
    formErrorFalta.value = err.message || 'Erro ao registrar falta.';
    snackbar.value = { show: true, text: `Erro: ${formErrorFalta.value}`, color: 'error', timeout: 5000 };
  }
};

const confirmDeleteFalta = (falta) => {
  itemToDelete.value = falta;
  itemToDeleteType.value = 'falta';
  deleteItemDialog.value = true;
};

// --- Função para Confirmação de Exclusão Genérica ---
const confirmDeleteAction = async () => {
  try {
    if (itemToDeleteType.value === 'avaliacao') {
      await disciplinasStore.deleteAvaliacao(disciplinaId.value, itemToDelete.value.id);
      snackbar.value = { show: true, text: 'Avaliação excluída com sucesso!', color: 'success', timeout: 3000 };
    } else if (itemToDeleteType.value === 'falta') {
      await disciplinasStore.deleteFalta(disciplinaId.value, itemToDelete.value.id);
      snackbar.value = { show: true, text: 'Falta excluída com sucesso!', color: 'success', timeout: 3000 };
    }
    deleteItemDialog.value = false;
    itemToDelete.value = null;
    itemToDeleteType.value = null;
  } catch (err) {
    snackbar.value = { show: true, text: `Erro ao excluir: ${err.message}`, color: 'error', timeout: 5000 };
  }
};
</script>

<style scoped>
.detail-disciplina-bg {
  background: linear-gradient(135deg, #e8f5e9, #dcedc8); /* Gradiente de verde menta suave */
  min-height: 100vh;
}
</style>
