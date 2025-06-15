// src/stores/disciplinas.js
import { defineStore } from 'pinia';
import { getAuth } from 'firebase/auth'; // Para simular a obtenção do token Firebase

// Variáveis para gerar IDs únicos mocados
let nextDisciplinaId = 3; // Começa após os IDs mocados existentes
let nextAvaliacaoId = 5;
let nextFaltaId = 4;

// Dados mocados para simular o backend
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
    faltas: [
      { id: 'fa-3', data: '2025-03-01', quantidade: 2 },
    ],
  },
];

export const useDisciplinasStore = defineStore('disciplinas', {
  state: () => ({
    disciplinas: JSON.parse(JSON.stringify(mockDisciplinas)), // Cria uma cópia profunda para permitir mutações
    loading: false,
    error: null,
  }),
  actions: {
    // Método para simular a obtenção do token Firebase (para futura integração com o backend real)
    async getAuthToken() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        // Em um ambiente de produção real, isso redirecionaria,
        // mas aqui é apenas para simular a existência de um token para o frontend.
        console.warn("Usuário não autenticado no Firebase. Um token de simulação está sendo usado.");
        return "simulated-firebase-token-123";
      }
      return await user.getIdToken();
    },

    async fetchDisciplinas() {
      this.loading = true;
      this.error = null;
      try {
        // await this.getAuthToken(); // Descomente para simular requisição autenticada
        await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay da rede
        this.disciplinas = JSON.parse(JSON.stringify(mockDisciplinas)); // Atualiza com a cópia dos mocados
      } catch (err) {
        this.error = "Erro simulado ao buscar disciplinas.";
        console.error("Erro simulado ao buscar disciplinas:", err);
      } finally {
        this.loading = false;
      }
    },

    async addDisciplina(disciplinaData) {
      this.loading = true;
      this.error = null;
      try {
        // await this.getAuthToken();
        await new Promise(resolve => setTimeout(resolve, 500));
        const newId = `dis-${nextDisciplinaId++}`;
        const novaDisciplina = {
          id: newId,
          ...disciplinaData,
          avaliacoes: [],
          faltas: [],
        };
        this.disciplinas.push(novaDisciplina);
        return novaDisciplina;
      } catch (err) {
        this.error = "Erro simulado ao adicionar disciplina.";
        console.error("Erro simulado ao adicionar disciplina:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async updateDisciplina(id, updatedData) {
      this.loading = true;
      this.error = null;
      try {
        // await this.getAuthToken();
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = this.disciplinas.findIndex(d => d.id === id);
        if (index !== -1) {
          this.disciplinas[index] = { ...this.disciplinas[index], ...updatedData };
        } else {
            throw new Error('Disciplina não encontrada para atualização.');
        }
      } catch (err) {
        this.error = "Erro simulado ao atualizar disciplina.";
        console.error("Erro simulado ao atualizar disciplina:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async deleteDisciplina(id) {
      this.loading = true;
      this.error = null;
      try {
        // await this.getAuthToken();
        await new Promise(resolve => setTimeout(resolve, 300));
        this.disciplinas = this.disciplinas.filter(d => d.id !== id);
      } catch (err) {
        this.error = "Erro simulado ao deletar disciplina.";
        console.error("Erro simulado ao deletar disciplina:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async addAvaliacao(disciplinaId, avaliacaoData) {
      this.loading = true;
      this.error = null;
      try {
        // await this.getAuthToken();
        await new Promise(resolve => setTimeout(resolve, 300));
        const disciplina = this.disciplinas.find(d => d.id === disciplinaId);
        if (disciplina) {
          const newAvId = `av-${nextAvaliacaoId++}`;
          disciplina.avaliacoes.push({ id: newAvId, ...avaliacaoData });
        } else {
            throw new Error('Disciplina não encontrada para adicionar avaliação.');
        }
      } catch (err) {
        this.error = "Erro simulado ao adicionar avaliação.";
        console.error("Erro simulado ao adicionar avaliação:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async updateAvaliacao(disciplinaId, avaliacaoId, updatedData) {
        this.loading = true;
        this.error = null;
        try {
            // await this.getAuthToken();
            await new Promise(resolve => setTimeout(resolve, 300));
            const disciplina = this.disciplinas.find(d => d.id === disciplinaId);
            if (disciplina) {
                const index = disciplina.avaliacoes.findIndex(a => a.id === avaliacaoId);
                if (index !== -1) {
                    disciplina.avaliacoes[index] = { ...disciplina.avaliacoes[index], ...updatedData };
                } else {
                    throw new Error('Avaliação não encontrada.');
                }
            } else {
                throw new Error('Disciplina não encontrada para atualizar avaliação.');
            }
        } catch (err) {
            this.error = "Erro simulado ao atualizar avaliação.";
            console.error("Erro simulado ao atualizar avaliação:", err);
            throw err;
        } finally {
            this.loading = false;
        }
    },

    async deleteAvaliacao(disciplinaId, avaliacaoId) {
        this.loading = true;
        this.error = null;
        try {
            // await this.getAuthToken();
            await new Promise(resolve => setTimeout(resolve, 300));
            const disciplina = this.disciplinas.find(d => d.id === disciplinaId);
            if (disciplina) {
                disciplina.avaliacoes = disciplina.avaliacoes.filter(a => a.id !== avaliacaoId);
            } else {
                throw new Error('Disciplina não encontrada para deletar avaliação.');
            }
        } catch (err) {
            this.error = "Erro simulado ao deletar avaliação.";
            console.error("Erro simulado ao deletar avaliação:", err);
            throw err;
        } finally {
            this.loading = false;
        }
    },

    async addFalta(disciplinaId, faltaData) {
      this.loading = true;
      this.error = null;
      try {
        // await this.getAuthToken();
        await new Promise(resolve => setTimeout(resolve, 300));
        const disciplina = this.disciplinas.find(d => d.id === disciplinaId);
        if (disciplina) {
          const newFaId = `fa-${nextFaltaId++}`;
          disciplina.faltas.push({ id: newFaId, ...faltaData });
        } else {
            throw new Error('Disciplina não encontrada para adicionar falta.');
        }
      } catch (err) {
        this.error = "Erro simulado ao adicionar falta.";
        console.error("Erro simulado ao adicionar falta:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async updateFalta(disciplinaId, faltaId, updatedData) {
        this.loading = true;
        this.error = null;
        try {
            // await this.getAuthToken();
            await new Promise(resolve => setTimeout(resolve, 300));
            const disciplina = this.disciplinas.find(d => d.id === disciplinaId);
            if (disciplina) {
                const index = disciplina.faltas.findIndex(f => f.id === faltaId);
                if (index !== -1) {
                    disciplina.faltas[index] = { ...disciplina.faltas[index], ...updatedData };
                } else {
                    throw new Error('Falta não encontrada.');
                }
            } else {
                throw new Error('Disciplina não encontrada para atualizar falta.');
            }
        } catch (err) {
            this.error = "Erro simulado ao atualizar falta.";
            console.error("Erro simulado ao atualizar falta:", err);
            throw err;
        } finally {
            this.loading = false;
        }
    },

    async deleteFalta(disciplinaId, faltaId) {
        this.loading = true;
        this.error = null;
        try {
            // await this.getAuthToken();
            await new Promise(resolve => setTimeout(resolve, 300));
            const disciplina = this.disciplinas.find(d => d.id === disciplinaId);
            if (disciplina) {
                disciplina.faltas = disciplina.faltas.filter(f => f.id !== faltaId);
            } else {
                throw new Error('Disciplina não encontrada para deletar falta.');
            }
        } catch (err) {
            this.error = "Erro simulado ao deletar falta.";
            console.error("Erro simulado ao deletar falta:", err);
            throw err;
        } finally {
            this.loading = false;
        }
    },
  },
  getters: {
    // Retorna uma cópia profunda da disciplina para evitar mutações acidentais fora do store
    getDisciplinaById: (state) => (id) => {
      const found = state.disciplinas.find(d => d.id === id);
      return found ? JSON.parse(JSON.stringify(found)) : null;
    },
    // Calcula a média final de uma disciplina
    calcularMediaFinal: (state) => (disciplinaId) => {
      const disciplina = state.disciplinas.find(d => d.id === disciplinaId);
      if (!disciplina || !disciplina.avaliacoes || disciplina.avaliacoes.length === 0) {
        return '0.00'; // Retorna 0.00 se não houver avaliações
      }
      let somaNotasPonderadas = 0;
      let somaPesos = 0;
      disciplina.avaliacoes.forEach(avaliacao => {
        somaNotasPonderadas += (avaliacao.nota || 0) * (avaliacao.peso || 0);
        somaPesos += (avaliacao.peso || 0);
      });
      return somaPesos === 0 ? '0.00' : (somaNotasPonderadas / somaPesos).toFixed(2);
    },
    // Calcula o total de faltas de uma disciplina
    calcularTotalFaltas: (state) => (disciplinaId) => {
      const disciplina = state.disciplinas.find(d => d.id === disciplinaId);
      return disciplina ? disciplina.faltas.reduce((acc, falta) => acc + (falta.quantidade || 0), 0) : 0;
    },
    // Determina o status de aprovação de uma disciplina
    getStatusAprovacao: (state) => (disciplinaId) => {
        const disciplina = state.disciplinas.find(d => d.id === disciplinaId);
        if (!disciplina) return 'Indefinido';

        const media = parseFloat(useDisciplinasStore().calcularMediaFinal(disciplinaId));
        const cargaHoraria = disciplina.cargaHoraria || 0;
        const totalFaltas = useDisciplinasStore().calcularTotalFaltas(disciplinaId);
        const maxFaltasPermitidas = cargaHoraria * 0.25; // Limite de 25% da carga horária

        if (totalFaltas > maxFaltasPermitidas) {
            return 'Reprovado por Falta';
        }

        if (media >= 7) {
            return 'Aprovado';
        } else if (media >= 5) {
            return 'Recuperação';
        } else if (!isNaN(media) && media < 5) {
            return 'Reprovado';
        }
        return 'Indefinido'; // Caso a média seja NaN ou outros casos não tratados
    },
  },
});
