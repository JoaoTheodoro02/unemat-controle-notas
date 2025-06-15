// Importa o Pinia para criar a store de estado
import { defineStore } from 'pinia'
// Importa a autenticação do Firebase para simular token
import { getAuth } from 'firebase/auth'

// Variáveis globais para gerar IDs únicos simulados
let nextDisciplinaId = 3
let nextAvaliacaoId = 5
let nextFaltaId = 4

// Disciplinas simuladas para testes locais (mock)
const mockDisciplinas = [
  {
    id: 'dis-1',
    nome: 'Programação Web I',
    professor: 'Dr. Smith',
    cargaHoraria: 60,
    semestre: '2025/1',
    avaliacoes: [
      { id: 'av-1', nome: 'Prova 1', nota: 8.5, peso: 0.4 },
      { id: 'av-2', nome: 'Trabalho Final', nota: 9.0, peso: 0.6 },
    ],
    faltas: [
      { id: 'fa-1', data: '2025-03-10', quantidade: 1 },
      { id: 'fa-2', data: '2025-04-05', quantidade: 1 },
    ],
  },
  {
    id: 'dis-2',
    nome: 'Estruturas de Dados',
    professor: 'Profa. Ana',
    cargaHoraria: 80,
    semestre: '2025/1',
    avaliacoes: [
      { id: 'av-3', nome: 'Lista 1', nota: 7.0, peso: 0.2 },
      { id: 'av-4', nome: 'Prova Final', nota: 6.5, peso: 0.8 },
    ],
    faltas: [{ id: 'fa-3', data: '2025-03-01', quantidade: 2 }],
  },
]

// Define a store Pinia para gerenciar disciplinas
export const useDisciplinasStore = defineStore('disciplinas', {
  state: () => ({
    disciplinas: JSON.parse(JSON.stringify(mockDisciplinas)), // Cópia profunda para evitar mutações indesejadas
    loading: false,
    error: null,
  }),
  actions: {
    // Simula a obtenção de token de autenticação do Firebase
    async getAuthToken() {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) {
        console.warn('Usuário não autenticado no Firebase.')
        return 'simulated-firebase-token-123'
      }
      return await user.getIdToken()
    },

    // Busca todas as disciplinas (simulado)
    async fetchDisciplinas() {
      this.loading = true
      this.error = null
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        this.disciplinas = JSON.parse(JSON.stringify(mockDisciplinas))
      } catch {
        this.error = 'Erro simulado ao buscar disciplinas.'
      } finally {
        this.loading = false
      }
    },

    // Adiciona uma nova disciplina (simulado)
    async addDisciplina(disciplinaData) {
      this.loading = true
      this.error = null
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const newId = `dis-${nextDisciplinaId++}`
        const novaDisciplina = {
          id: newId,
          ...disciplinaData,
          avaliacoes: [],
          faltas: [],
        }
        this.disciplinas.push(novaDisciplina)
        return novaDisciplina
      } catch (err) {
        this.error = 'Erro simulado ao adicionar disciplina.'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Atualiza uma disciplina existente
    async updateDisciplina(id, updatedData) {
      this.loading = true
      this.error = null
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const index = this.disciplinas.findIndex((d) => d.id === id)
        if (index !== -1) {
          this.disciplinas[index] = { ...this.disciplinas[index], ...updatedData }
        } else {
          throw new Error('Disciplina não encontrada para atualização.')
        }
      } catch (err) {
        this.error = 'Erro simulado ao atualizar disciplina.'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Remove uma disciplina
    async deleteDisciplina(id) {
      this.loading = true
      this.error = null
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        this.disciplinas = this.disciplinas.filter((d) => d.id !== id)
      } catch (err) {
        this.error = 'Erro simulado ao deletar disciplina.'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Adiciona avaliação a uma disciplina
    async addAvaliacao(disciplinaId, avaliacaoData) {
      this.loading = true
      this.error = null
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const disciplina = this.disciplinas.find((d) => d.id === disciplinaId)
        if (disciplina) {
          const newAvId = `av-${nextAvaliacaoId++}`
          disciplina.avaliacoes.push({ id: newAvId, ...avaliacaoData })
        } else {
          throw new Error('Disciplina não encontrada para adicionar avaliação.')
        }
      } catch (err) {
        this.error = 'Erro simulado ao adicionar avaliação.'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Atualiza dados de uma avaliação
    async updateAvaliacao(disciplinaId, avaliacaoId, updatedData) {
      this.loading = true
      this.error = null
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const disciplina = this.disciplinas.find((d) => d.id === disciplinaId)
        if (disciplina) {
          const index = disciplina.avaliacoes.findIndex((a) => a.id === avaliacaoId)
          if (index !== -1) {
            disciplina.avaliacoes[index] = { ...disciplina.avaliacoes[index], ...updatedData }
          } else {
            throw new Error('Avaliação não encontrada.')
          }
        } else {
          throw new Error('Disciplina não encontrada para atualizar avaliação.')
        }
      } catch (err) {
        this.error = 'Erro simulado ao atualizar avaliação.'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Remove uma avaliação
    async deleteAvaliacao(disciplinaId, avaliacaoId) {
      this.loading = true
      this.error = null
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const disciplina = this.disciplinas.find((d) => d.id === disciplinaId)
        if (disciplina) {
          disciplina.avaliacoes = disciplina.avaliacoes.filter((a) => a.id !== avaliacaoId)
        } else {
          throw new Error('Disciplina não encontrada para deletar avaliação.')
        }
      } catch (err) {
        this.error = 'Erro simulado ao deletar avaliação.'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Adiciona falta à disciplina
    async addFalta(disciplinaId, faltaData) {
      this.loading = true
      this.error = null
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const disciplina = this.disciplinas.find((d) => d.id === disciplinaId)
        if (disciplina) {
          const newFaId = `fa-${nextFaltaId++}`
          disciplina.faltas.push({ id: newFaId, ...faltaData })
        } else {
          throw new Error('Disciplina não encontrada para adicionar falta.')
        }
      } catch (err) {
        this.error = 'Erro simulado ao adicionar falta.'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Atualiza uma falta
    async updateFalta(disciplinaId, faltaId, updatedData) {
      this.loading = true
      this.error = null
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const disciplina = this.disciplinas.find((d) => d.id === disciplinaId)
        if (disciplina) {
          const index = disciplina.faltas.findIndex((f) => f.id === faltaId)
          if (index !== -1) {
            disciplina.faltas[index] = { ...disciplina.faltas[index], ...updatedData }
          } else {
            throw new Error('Falta não encontrada.')
          }
        } else {
          throw new Error('Disciplina não encontrada para atualizar falta.')
        }
      } catch (err) {
        this.error = 'Erro simulado ao atualizar falta.'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Remove uma falta
    async deleteFalta(disciplinaId, faltaId) {
      this.loading = true
      this.error = null
      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const disciplina = this.disciplinas.find((d) => d.id === disciplinaId)
        if (disciplina) {
          disciplina.faltas = disciplina.faltas.filter((f) => f.id !== faltaId)
        } else {
          throw new Error('Disciplina não encontrada para deletar falta.')
        }
      } catch (err) {
        this.error = 'Erro simulado ao deletar falta.'
        throw err
      } finally {
        this.loading = false
      }
    },
  },

  // Funções que derivam do estado (getters)
  getters: {
    // Retorna disciplina por ID (cópia)
    getDisciplinaById: (state) => (id) => {
      const found = state.disciplinas.find((d) => d.id === id)
      return found ? JSON.parse(JSON.stringify(found)) : null
    },

    // Calcula média ponderada das avaliações
    calcularMediaFinal: (state) => (disciplinaId) => {
      const disciplina = state.disciplinas.find((d) => d.id === disciplinaId)
      if (!disciplina || !disciplina.avaliacoes.length) return '0.00'
      let somaNotasPonderadas = 0
      let somaPesos = 0
      disciplina.avaliacoes.forEach((avaliacao) => {
        somaNotasPonderadas += (avaliacao.nota || 0) * (avaliacao.peso || 0)
        somaPesos += avaliacao.peso || 0
      })
      return somaPesos === 0 ? '0.00' : (somaNotasPonderadas / somaPesos).toFixed(2)
    },

    // Soma total de faltas da disciplina
    calcularTotalFaltas: (state) => (disciplinaId) => {
      const disciplina = state.disciplinas.find((d) => d.id === disciplinaId)
      return disciplina
        ? disciplina.faltas.reduce((acc, falta) => acc + (falta.quantidade || 0), 0)
        : 0
    },

    // Verifica status do aluno na disciplina
    getStatusAprovacao: (state) => (disciplinaId) => {
      const disciplina = state.disciplinas.find((d) => d.id === disciplinaId)
      if (!disciplina) return 'Indefinido'
      const media = parseFloat(useDisciplinasStore().calcularMediaFinal(disciplinaId))
      const cargaHoraria = disciplina.cargaHoraria || 0
      const totalFaltas = useDisciplinasStore().calcularTotalFaltas(disciplinaId)
      const maxFaltas = cargaHoraria * 0.25

      if (totalFaltas > maxFaltas) return 'Reprovado por Falta'
      if (media >= 7) return 'Aprovado'
      if (media >= 5) return 'Recuperação'
      if (!isNaN(media) && media < 5) return 'Reprovado'
      return 'Indefinido'
    },
  },
})
