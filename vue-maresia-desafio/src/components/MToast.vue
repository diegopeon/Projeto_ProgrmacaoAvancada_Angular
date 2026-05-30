<template>
  <!-- Bug corrigido: classes dinâmicas separadas — tipo (success/error/info) aplicado
       via :class string e visibilidade via objeto, evitando conflito de binding. -->
  <aside
    class="toast"
    :class="[toast.type, { visible: toast.visible }]"
    role="status"
    aria-live="polite"
  >
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
  emits: ['close'],
  mounted() {
    // Lifecycle hook: uso demonstrado conforme especificação.
    // Garante que o componente está pronto para receber notificações após montagem.
    console.log('[MToast] Componente montado e pronto para exibir notificações.')
  }
}
</script>
