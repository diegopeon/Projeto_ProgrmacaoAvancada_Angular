<template>
  <div class="dropdown" ref="dropdown">
    <button class="dropdown__button" @click="toggle">
      {{ selected.label }} <span>⌄</span>
    </button>

    <ul v-if="open" class="dropdown__list">
      <li v-for="option in options" :key="option.value">
        <button @click="choose(option)">{{ option.label }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MDropdown',
  props: {
    options: { type: Array, required: true },
    selected: { type: Object, required: true }
  },
  emits: ['select-option'],
  data() {
    return { open: false }
  },
  mounted() {
    // Lifecycle hook: registra listener ao montar o componente.
    document.addEventListener('click', this.closeOnOutsideClick)
  },
  beforeUnmount() {
    // Limpa o listener ao desmontar para evitar memory leak.
    document.removeEventListener('click', this.closeOnOutsideClick)
  },
  methods: {
    toggle(event) {
      event.stopPropagation()
      this.open = !this.open
    },
    choose(option) {
      this.open = false
      this.$emit('select-option', option)
    },
    closeOnOutsideClick(event) {
      // Bug corrigido: verifica se $refs.dropdown existe antes de chamar contains().
      // Sem essa guarda, se o componente for desmontado enquanto o listener ainda está
      // ativo, ocorre TypeError: Cannot read properties of undefined (reading 'contains').
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.open = false
      }
    }
  }
}
</script>
