<template>
  <div v-if="avaliacoes && avaliacoes.length > 0">
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
  <v-alert v-else type="info" variant="tonal" icon="mdi-chart-bar-off">
    Nenhuma avaliação para exibir no gráfico.
  </v-alert>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  avaliacoes: {
    type: Array,
    default: () => [],
  },
  chartId: {
    type: String,
    default: 'notas-bar-chart',
  },
  datasetIdKey: {
    type: String,
    default: 'label',
  },
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 200,
  },
  cssClasses: {
    default: '',
    type: String,
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
  plugins: {
    type: Array,
    default: () => [],
  },
});

const chartData = computed(() => {
  const labels = props.avaliacoes.map(a => a.nome);
  const data = props.avaliacoes.map(a => a.nota);

  return {
    labels: labels,
    datasets: [
      {
        label: 'Notas das Avaliações',
        backgroundColor: '#42A5F5', // Cor primária do Vuetify
        borderColor: '#1976D2',
        borderWidth: 1,
        data: data,
      },
    ],
  };
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 10, // Notas de 0 a 10
      title: {
        display: true,
        text: 'Nota',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Avaliação',
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y.toFixed(2);
          }
          return label;
        }
      }
    }
  }
});
</script>

<style scoped>
/* Adicione estilos se necessário */
</style>
