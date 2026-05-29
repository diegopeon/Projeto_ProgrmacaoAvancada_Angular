<template>
  <aside class="toast" :class="[toast.type, { visible: toast.visible }]" role="status">
    <span>{{ toast.message }}</span>
    <button aria-label="Fechar notificação" @click="$emit('close')">×</button>
  </aside>
</template>

<script>
export default {
  name: 'MToast',
  props: {
    toast: { type: Object, required: true }
  },
  emits: ['close']
}
</script>
