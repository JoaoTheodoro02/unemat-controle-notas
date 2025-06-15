<template>
  <!-- Rodapé fixo com altura de 40px -->
  <v-footer height="40" app>

    <!-- Renderiza cada item de rede social como um link -->
    <a
      v-for="item in items"                <!-- Laço para percorrer o array 'items' -->
      :key="item.title"                    <!-- Chave única baseada no título -->
      :href="item.href"                    <!-- URL do item -->
      :title="item.title"                  <!-- Título exibido ao passar o mouse -->
      class="d-inline-block mx-2 social-link"  <!-- Classe para espaçamento e estilo -->
      rel="noopener noreferrer"            <!-- Segurança ao abrir link externo -->
      target="_blank"                      <!-- Abre em nova aba -->
    >
      <!-- Ícone do link social -->
      <v-icon
        :icon="item.icon"                              <!-- Ícone vindo do item -->
        :size="item.icon === '$vuetify' ? 24 : 16"     <!-- Tamanho condicional do ícone -->
      />
    </a>

    <!-- Texto de direitos autorais com ano atual e link de licença -->
    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"         <!-- Posiciona no canto direito -->
    >
      &copy; 2016-{{ (new Date()).getFullYear() }}     <!-- Exibe intervalo de anos -->
      <span class="d-none d-sm-inline-block">Vuetify, LLC</span>
      —
      <!-- Link da licença MIT -->
      <a
        class="text-decoration-none on-surface"
        href="https://vuetifyjs.com/about/licensing/"
        rel="noopener noreferrer"
        target="_blank"
      >
        MIT License
      </a>
    </div>
  </v-footer>
</template>

<script setup>
// Define um array de objetos com links sociais e seus ícones
const items = [
  {
    title: 'Vuetify Documentation',         // Nome exibido ao passar o mouse
    icon: `$vuetify`,                       // Ícone especial do Vuetify
    href: 'https://vuetifyjs.com/',         // Link para a documentação
  },
  {
    title: 'Vuetify Support',
    icon: 'mdi-shield-star-outline',        // Ícone do Material Design
    href: 'https://support.vuetifyjs.com/',
  },
  {
    title: 'Vuetify X',
    icon: `svg:M2.04875 3.00002L9.77052...`, // Ícone SVG customizado (rede X / Twitter)
    href: 'https://x.com/vuetifyjs',
  },
  {
    title: 'Vuetify GitHub',
    icon: `mdi-github`,
    href: 'https://github.com/vuetifyjs/vuetify',
  },
  {
    title: 'Vuetify Discord',
    icon: `mdi-discord`,
    href: 'https://community.vuetifyjs.com/',
  },
  {
    title: 'Vuetify Reddit',
    icon: `mdi-reddit`,
    href: 'https://reddit.com/r/vuetifyjs',
  },
]
</script>

<style scoped lang="sass">
/* Estiliza os ícones sociais dentro do rodapé */
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity)) // Cor inicial opaca
  text-decoration: none
  transition: .2s ease-in-out  // Transição suave ao passar o mouse

  &:hover
    color: rgba(25, 118, 210, 1)  // Cor azul ao passar o mouse
</style>
