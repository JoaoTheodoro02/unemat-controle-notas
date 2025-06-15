Olá! Perfeito, agora sim! Aqui está o seu código com os comentários pontuais em cada seção,
explicando o que cada parte faz. ```vue
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
            <v-card-title
              class="text-h4 mb-4 text-primary font-weight-bold d-flex justify-space-between align-center"
            >
              <span>{{ disciplina.nome }}</span>
              <v-btn
                icon
                color="secondary"
                @click="openEditDialog(disciplina)"
                title="Editar Disciplina"
              >
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
                    <v-list-item-title class="font-weight-medium">{{
                      avaliacao.nome
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      >Nota: {{ avaliacao.nota }} | Peso: {{ avaliacao.peso }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <template v-slot:append>
                    <v-btn
                      icon
                      variant="text"
                      color="grey"
                      @click.stop="openEditAvaliacaoDialog(avaliacao)"
                      title="Editar"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="text"
                      color="red"
                      @click.stop="confirmDeleteAvaliacao(avaliacao)"
                      title="Excluir"
                    >
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
                    <v-list-item-title class="font-weight-medium"
                      >Data: {{ falta.data }}</v-list-item-title
                    >
                    <v-list-item-subtitle>Quantidade: {{ falta.quantidade }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <template v-slot:append>
                    <v-btn
                      icon
                      variant="text"
                      color="grey"
                      @click.stop="openEditFaltaDialog(falta)"
                      title="Editar"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="text"
                      color="red"
                      @click.stop="confirmDeleteFalta(falta)"
                      title="Excluir"
                    >
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
                    <div :class="`text-h4 font-weight-bold mt-2 text-${mediaColor}`">
                      {{ mediaFinal }}
                    </div>
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
                    <div :class="`text-h4 font-weight-bold mt-2 text-${statusColor}`">
                      {{ statusAprovacao }}
                    </div>
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
            <v-btn
              color="grey"
              variant="text"
              @click="dialogDisciplina = false"
              :disabled="disciplinasStore.loading"
              >Cancelar</v-btn
            >
            <v-btn
              color="primary"
              @click="handleSaveDisciplina"
              :loading="disciplinasStore.loading"
              :disabled="disciplinasStore.loading"
            >
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
            <v-btn
              color="grey"
              variant="text"
              @click="dialogAvaliacao = false"
              :disabled="disciplinasStore.loading"
              >Cancelar</v-btn
            >
            <v-btn
              color="success"
              @click="handleSaveAvaliacao"
              :loading="disciplinasStore.loading"
              :disabled="disciplinasStore.loading"
            >
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
            <v-btn
              color="grey"
              variant="text"
              @click="dialogFalta = false"
              :disabled="disciplinasStore.loading"
              >Cancelar</v-btn
            >
            <v-btn
              color="warning"
              @click="handleSaveFalta"
              :loading="disciplinasStore.loading"
              :disabled="disciplinasStore.loading"
            >
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
            <v-btn
              color="grey"
              variant="text"
              @click="deleteItemDialog = false"
              :disabled="disciplinasStore.loading"
              >Cancelar</v-btn
            >
            <v-btn
              color="error"
              @click="confirmDeleteAction"
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
    <v-container v-else class="text-center pt-8">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
        v-if="disciplinasStore.loading"
      ></v-progress-circular>
      <v-alert
        v-else-if="disciplinasStore.error"
        type="error"
        dense
        variant="tonal"
        icon="mdi-alert-circle-outline"
      >
        Erro ao carregar disciplina: {{ disciplinasStore.error }}
        <v-btn text class="ml-2" @click="disciplinasStore.fetchDisciplinas()"
          >Tentar Novamente</v-btn
        >
      </v-alert>
      <v-alert v-else type="info" variant="outlined" icon="mdi-information-outline">
        Disciplina não encontrada ou não carregada.
      </v-alert>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue' // Importa funcionalidades reativas do Vue (ref, computed, onMounted, watch).
import { useRoute } from 'vue-router' // Importa o hook `useRoute` para acessar informações da rota atual.
import { useAuthStore } from '../stores/auth' // Importa a store Pinia `useAuthStore` para gerenciar a autenticação.
import { useDisciplinasStore } from '../stores/disciplinas' // Importa a store Pinia `useDisciplinasStore` para gerenciar os dados das disciplinas.
import NotasChart from '../components/NotasChart.vue' // Importa o componente de gráfico `NotasChart`.

// Instanciação dos hooks e stores.
const route = useRoute() // Obtém o objeto de rota para acessar parâmetros (como o ID da disciplina).
const authStore = useAuthStore() // Obtém uma instância da store de autenticação.
const disciplinasStore = useDisciplinasStore() // Obtém uma instância da store de disciplinas.

// --- Estados Reativos (ref) e Propriedades Computadas (computed) ---

// `disciplinaId`: Uma referência reativa que armazena o ID da disciplina obtido dos parâmetros da URL.
const disciplinaId = ref(route.params.id)
// `disciplina`: Uma propriedade computada que busca a disciplina correspondente na `disciplinasStore`
// Sempre que `disciplinaId.value` mudar, esta propriedade será reavaliada.
const disciplina = computed(() => disciplinasStore.getDisciplinaById(disciplinaId.value))

// Variáveis de estado para controlar a visibilidade e o comportamento do diálogo de Disciplina.
const dialogDisciplina = ref(false) // `true` para mostrar o diálogo, `false` para escondê-lo.
const isEditingDisciplina = ref(false) // `true` se estiver editando uma disciplina existente, `false` para uma nova.
const currentDisciplina = ref({
  id: null,
  nome: '',
  professor: '',
  cargaHoraria: null,
  semestre: '',
}) // Objeto reativo para os dados do formulário de disciplina.
const formErrorDisciplina = ref(null) // Mensagem de erro específica para o formulário da disciplina.

// Variáveis de estado para o diálogo de Avaliação (similar ao de Disciplina).
const dialogAvaliacao = ref(false)
const isEditingAvaliacao = ref(false)
const currentAvaliacao = ref({ id: null, nome: '', nota: null, peso: null })
const formErrorAvaliacao = ref(null)

// Variáveis de estado para o diálogo de Falta (similar aos anteriores).
const dialogFalta = ref(false)
const isEditingFalta = ref(false)
const currentFalta = ref({ id: null, data: '', quantidade: null })
const formErrorFalta = ref(null)

// Variáveis de estado para o diálogo de confirmação de exclusão genérico.
const deleteItemDialog = ref(false) // Controla a visibilidade do diálogo de confirmação.
const itemToDelete = ref(null) // Armazena o objeto (avaliação ou falta) a ser excluído.
const itemToDeleteType = ref(null) // Indica o tipo do item a ser excluído ('avaliacao' ou 'falta') para direcionar a ação correta.

// Variável de estado para o `v-snackbar` (mensagens de feedback).
const snackbar = ref({
  show: false, // Controla a visibilidade do snackbar.
  text: '', // Texto da mensagem.
  color: '', // Cor do snackbar (ex: 'success', 'error', 'warning').
  timeout: 3000, // Tempo em milissegundos para o snackbar desaparecer.
})

// --- Regras de Validação para Formulários ---
// Objeto que contém funções de validação reutilizáveis para os campos dos formulários.
const rules = {
  required: (value) => !!value || 'Campo obrigatório.', // Verifica se o valor não é nulo ou vazio.
  positiveNumber: (value) => value > 0 || 'Deve ser um número positivo.', // Verifica se o valor é um número maior que zero.
  notaRange: (value) => (value >= 0 && value <= 10) || 'A nota deve estar entre 0 e 10.', // Verifica se a nota está entre 0 e 10.
  pesoRange: (value) => (value >= 0 && value <= 1) || 'O peso deve estar entre 0 e 1.', // Verifica se o peso está entre 0 e 1.
}

// --- Propriedades Computadas para Cálculos e Status Acadêmicos ---

// `mediaFinal`: Calcula a média final da disciplina usando a função `calcularMediaFinal` da `disciplinasStore`.
const mediaFinal = computed(() => disciplinasStore.calcularMediaFinal(disciplinaId.value))
// `totalFaltas`: Calcula o total de faltas da disciplina usando a função `calcularTotalFaltas` da `disciplinasStore`.
const totalFaltas = computed(() => disciplinasStore.calcularTotalFaltas(disciplinaId.value))
// `maxFaltasPermitidas`: Calcula o número máximo de faltas permitido (25% da carga horária da disciplina).
const maxFaltasPermitidas = computed(() => (disciplina.value?.cargaHoraria || 0) * 0.25)
// `statusAprovacao`: Determina o status de aprovação da disciplina usando a função `getStatusAprovacao` da `disciplinasStore`.
const statusAprovacao = computed(() => disciplinasStore.getStatusAprovacao(disciplinaId.value))

// Propriedade computada para definir a cor da `mediaFinal` com base no seu valor.
const mediaColor = computed(() => {
  const media = parseFloat(mediaFinal.value)
  if (media >= 7) return 'success' // Verde para média 7 ou mais.
  if (media >= 5) return 'warning' // Amarelo para média entre 5 e 6.9.
  if (media < 5) return 'error' // Vermelho para média menor que 5.
  return 'grey' // Cor padrão.
})

// Propriedade computada para definir a cor do `statusAprovacao`.
const statusColor = computed(() => {
  const status = statusAprovacao.value
  if (status === 'Aprovado') return 'success' // Verde para aprovado.
  if (status === 'Recuperação') return 'warning' // Amarelo para recuperação.
  if (status.includes('Reprovado')) return 'error' // Vermelho para reprovado.
  return 'grey' // Cor padrão.
})

// --- Ciclo de Vida do Componente e Observadores (watch) ---

// `watch`: Observa mudanças no `id` dos parâmetros da rota.
// Isso é útil se o usuário navegar entre diferentes detalhes de disciplinas sem recarregar a página.
watch(
  () => route.params.id,
  (newId) => {
    disciplinaId.value = newId // Atualiza o `disciplinaId`, o que automaticamente reage a propriedade computada `disciplina`.
  },
)

// `onMounted`: Hook de ciclo de vida que é executado uma vez que o componente é montado no DOM.
onMounted(() => {
  // Verifica se a disciplina já está presente na store. Se não estiver, tenta carregá-la.
  // Isso garante que os dados estejam disponíveis mesmo se o usuário acessar a URL diretamente.
  if (!disciplina.value) {
    disciplinasStore.fetchDisciplinas()
  }
})

// --- Métodos para Manipulação de Disciplinas (edição via diálogo) ---

// `openEditDialog`: Função para abrir o diálogo de edição da disciplina.
const openEditDialog = (disc) => {
  isEditingDisciplina.value = true // Define o modo de edição como verdadeiro.
  currentDisciplina.value = { ...disc } // Copia os dados da disciplina para o formulário de edição.
  formErrorDisciplina.value = null // Limpa qualquer mensagem de erro anterior.
  dialogDisciplina.value = true // Abre o diálogo.
}

// `handleSaveDisciplina`: Função assíncrona para salvar as alterações de uma disciplina.
const handleSaveDisciplina = async () => {
  formErrorDisciplina.value = null // Limpa erros de formulário.
  // Validações básicas do formulário antes de tentar salvar.
  if (
    !currentDisciplina.value.nome ||
    !currentDisciplina.value.professor ||
    !currentDisciplina.value.cargaHoraria ||
    !currentDisciplina.value.semestre
  ) {
    formErrorDisciplina.value = 'Por favor, preencha todos os campos obrigatórios.'
    return
  }
  if (currentDisciplina.value.cargaHoraria <= 0) {
    formErrorDisciplina.value = 'A carga horária deve ser um número positivo.'
    return
  }

  try {
    // Chama a ação `updateDisciplina` da store para persistir as alterações.
    await disciplinasStore.updateDisciplina(currentDisciplina.value.id, currentDisciplina.value)
    // Exibe uma mensagem de sucesso no snackbar.
    snackbar.value = {
      show: true,
      text: 'Disciplina atualizada com sucesso!',
      color: 'success',
      timeout: 3000,
    }
    dialogDisciplina.value = false // Fecha o diálogo após o sucesso.
  } catch (err) {
    // Em caso de erro, exibe a mensagem de erro no formulário e no snackbar.
    formErrorDisciplina.value = err.message || 'Erro ao atualizar disciplina.'
    snackbar.value = {
      show: true,
      text: `Erro: ${formErrorDisciplina.value}`,
      color: 'error',
      timeout: 5000,
    }
  }
}

// --- Métodos para Avaliações ---

// `openAddAvaliacaoDialog`: Abre o diálogo para adicionar uma nova avaliação.
const openAddAvaliacaoDialog = () => {
  isEditingAvaliacao.value = false // Define o modo como adição.
  currentAvaliacao.value = { nome: '', nota: null, peso: null } // Reseta o formulário.
  formErrorAvaliacao.value = null // Limpa erros.
  dialogAvaliacao.value = true // Abre o diálogo.
}

// `openEditAvaliacaoDialog`: Abre o diálogo para editar uma avaliação existente.
const openEditAvaliacaoDialog = (avaliacao) => {
  isEditingAvaliacao.value = true // Define o modo como edição.
  currentAvaliacao.value = { ...avaliacao } // Preenche o formulário com os dados da avaliação.
  formErrorAvaliacao.value = null
  dialogAvaliacao.value = true
}

// `handleSaveAvaliacao`: Salva (adiciona ou atualiza) uma avaliação.
const handleSaveAvaliacao = async () => {
  formErrorAvaliacao.value = null
  // Validações dos campos da avaliação.
  if (
    !currentAvaliacao.value.nome ||
    currentAvaliacao.value.nota === null ||
    currentAvaliacao.value.peso === null
  ) {
    formErrorAvaliacao.value = 'Preencha todos os campos.'
    return
  }
  if (currentAvaliacao.value.nota < 0 || currentAvaliacao.value.nota > 10) {
    formErrorAvaliacao.value = 'A nota deve estar entre 0 e 10.'
    return
  }
  if (currentAvaliacao.value.peso < 0 || currentAvaliacao.value.peso > 1) {
    formErrorAvaliacao.value = 'O peso deve estar entre 0 e 1.'
    return
  }

  try {
    if (isEditingAvaliacao.value) {
      // Se estiver editando, chama `updateAvaliacao` na store.
      await disciplinasStore.updateAvaliacao(
        disciplinaId.value,
        currentAvaliacao.value.id,
        currentAvaliacao.value,
      )
      snackbar.value = {
        show: true,
        text: 'Avaliação atualizada com sucesso!',
        color: 'success',
        timeout: 3000,
      }
    } else {
      // Se estiver adicionando, chama `addAvaliacao` na store.
      await disciplinasStore.addAvaliacao(disciplinaId.value, currentAvaliacao.value)
      snackbar.value = {
        show: true,
        text: 'Avaliação adicionada com sucesso!',
        color: 'success',
        timeout: 3000,
      }
    }
    dialogAvaliacao.value = false
  } catch (err) {
    formErrorAvaliacao.value = err.message || 'Erro ao salvar avaliação.'
    snackbar.value = {
      show: true,
      text: `Erro: ${formErrorAvaliacao.value}`,
      color: 'error',
      timeout: 5000,
    }
  }
}

// `confirmDeleteAvaliacao`: Abre o diálogo de confirmação para exclusão de uma avaliação.
const confirmDeleteAvaliacao = (avaliacao) => {
  itemToDelete.value = avaliacao // Define a avaliação a ser excluída.
  itemToDeleteType.value = 'avaliacao' // Indica o tipo do item.
  deleteItemDialog.value = true // Abre o diálogo de confirmação.
}

// --- Métodos para Faltas ---

// `openAddFaltaDialog`: Abre o diálogo para registrar uma nova falta.
const openAddFaltaDialog = () => {
  isEditingFalta.value = false // Define o modo como registro.
  currentFalta.value = { data: '', quantidade: null } // Reseta o formulário.
  formErrorFalta.value = null
  dialogFalta.value = true
}

// `openEditFaltaDialog`: Abre o diálogo para editar uma falta existente.
const openEditFaltaDialog = (falta) => {
  isEditingFalta.value = true // Define o modo como edição.
  currentFalta.value = { ...falta } // Preenche o formulário com os dados da falta.
  formErrorFalta.value = null
  dialogFalta.value = true
}

// `handleSaveFalta`: Salva (registra ou atualiza) uma falta.
const handleSaveFalta = async () => {
  formErrorFalta.value = null
  // Validações dos campos da falta.
  if (!currentFalta.value.data || currentFalta.value.quantidade === null) {
    formErrorFalta.value = 'Preencha todos os campos.'
    return
  }
  if (currentFalta.value.quantidade <= 0) {
    formErrorFalta.value = 'A quantidade de aulas perdidas deve ser um número positivo.'
    return
  }

  try {
    if (isEditingFalta.value) {
      // Se estiver editando, chama `updateFalta` na store.
      await disciplinasStore.updateFalta(
        disciplinaId.value,
        currentFalta.value.id,
        currentFalta.value,
      )
      snackbar.value = {
        show: true,
        text: 'Falta atualizada com sucesso!',
        color: 'success',
        timeout: 3000,
      }
    } else {
      // Se estiver registrando, chama `addFalta` na store.
      await disciplinasStore.addFalta(disciplinaId.value, currentFalta.value)
      snackbar.value = {
        show: true,
        text: 'Falta registrada com sucesso!',
        color: 'success',
        timeout: 3000,
      }
    }
    dialogFalta.value = false
  } catch (err) {
    formErrorFalta.value = err.message || 'Erro ao registrar falta.'
    snackbar.value = {
      show: true,
      text: `Erro: ${formErrorFalta.value}`,
      color: 'error',
      timeout: 5000,
    }
  }
}

// `confirmDeleteFalta`: Abre o diálogo de confirmação para exclusão de uma falta.
const confirmDeleteFalta = (falta) => {
  itemToDelete.value = falta
  itemToDeleteType.value = 'falta'
  deleteItemDialog.value = true
}

// --- Função para Confirmação de Exclusão Genérica ---
// `confirmDeleteAction`: É chamada quando o usuário confirma a exclusão no diálogo.
// Ela verifica o `itemToDeleteType` para saber se deve excluir uma avaliação ou uma falta.
const confirmDeleteAction = async () => {
  try {
    if (itemToDeleteType.value === 'avaliacao') {
      // Chama a ação `deleteAvaliacao` da store para remover a avaliação.
      await disciplinasStore.deleteAvaliacao(disciplinaId.value, itemToDelete.value.id)
      snackbar.value = {
        show: true,
        text: 'Avaliação excluída com sucesso!',
        color: 'success',
        timeout: 3000,
      }
    } else if (itemToDeleteType.value === 'falta') {
      // Chama a ação `deleteFalta` da store para remover a falta.
      await disciplinasStore.deleteFalta(disciplinaId.value, itemToDelete.value.id)
      snackbar.value = {
        show: true,
        text: 'Falta excluída com sucesso!',
        color: 'success',
        timeout: 3000,
      }
    }
    deleteItemDialog.value = false // Fecha o diálogo de confirmação.
    itemToDelete.value = null // Reseta o item a ser excluído.
    itemToDeleteType.value = null // Reseta o tipo.
  } catch (err) {
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
/* Estilos específicos para este componente. */
.detail-disciplina-bg {
  /* Define um gradiente de cor suave como fundo da página, do verde claro ao verde mais claro. */
  background: linear-gradient(135deg, #e8f5e9, #dcedc8); /* Gradiente de verde menta suave */
  min-height: 100vh; /* Garante que o fundo ocupe toda a altura visível da viewport. */
}
</style>
```
