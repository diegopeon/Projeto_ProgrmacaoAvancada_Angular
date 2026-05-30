<template>
  <nav class="pagination" aria-label="Paginação de rotas">
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Anterior</button>
    <button
      v-for="page in pageNumbers"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Próxima</button>
  </nav>
</template>

<script>
export default {
  name: 'MPagination',
  props: {
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true }
  },
  emits: ['change-page'],
  computed: {
    // Bug corrigido: v-for="page in totalPages" itera número diretamente no Vue 3,
    // mas é ambíguo e pode gerar índices inesperados em alguns builds.
    // Usando computed property que retorna array explícito [1, 2, ..., n].
    pageNumbers() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1)
    }
  },
  methods: {
    changePage(page) {
      if (page < 1 || page > this.totalPages) return
      this.$emit('change-page', page)
    }
  }
}
</script>
