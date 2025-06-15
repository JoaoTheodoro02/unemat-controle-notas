// Importa funções reativas do Vue
import { ref, computed } from 'vue'

// Importa função para definir uma store usando Pinia
import { defineStore } from 'pinia'

// Define uma store chamada 'counter'
export const useCounterStore = defineStore('counter', () => {
  // Estado reativo: contador com valor inicial 0
  const count = ref(0)

  // Valor computado: o dobro do contador
  const doubleCount = computed(() => count.value * 2)

  // Função para incrementar o contador
  function increment() {
    count.value++
  }

  // Retorna os dados e métodos para uso no app
  return { count, doubleCount, increment }
})
