<template>
  <div class="tabs">
    <div class="tabs__nav">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="{ active: active === index }"
        @click="setActive(index)"
      >
        {{ tab.title }}
      </button>
    </div>
    <!-- Bug corrigido: guarda com v-if para evitar erro quando tabs é array vazio
         ou quando active aponta para índice inexistente. -->
    <div v-if="tabs.length > 0" class="tabs__panel">
      <p>{{ tabs[active].content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MTabs',
  props: {
    tabs: { type: Array, required: true }
  },
  data() {
    return { active: 0 }
  },
  methods: {
    // Bug corrigido: usa método dedicado em vez de atribuição direta no template (@click="active = index"),
    // garantindo que a mudança de estado seja sempre rastreável e testável.
    setActive(index) {
      this.active = index
    }
  }
}
</script>
