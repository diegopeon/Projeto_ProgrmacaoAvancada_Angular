<template>
  <div class="accordion">
    <article
      v-for="(item, index) in items"
      :key="item.title"
      class="accordion__item"
      :class="{ active: opened === index }"
    >
      <button class="accordion__trigger" @click="toggle(index)">
        <span>{{ item.title }}</span>
        <strong>{{ opened === index ? '−' : '+' }}</strong>
      </button>
      <div class="accordion__content">
        <p>{{ item.content }}</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'MAccordion',
  props: {
    items: { type: Array, required: true }
  },
  data() {
    return {
      // Bug corrigido: começa com null (nenhum item aberto) conforme especificação.
      // Antes estava em 0, o que abria o primeiro item automaticamente.
      opened: null
    }
  },
  methods: {
    toggle(index) {
      this.opened = this.opened === index ? null : index
    }
  }
}
</script>
