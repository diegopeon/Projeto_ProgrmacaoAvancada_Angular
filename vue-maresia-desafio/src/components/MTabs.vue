<template>
  <div class="tabs">
    <div class="tabs__nav">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="{ active: active === index }"
        @click="active = index"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs__panel">
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
  }
}
</script>
