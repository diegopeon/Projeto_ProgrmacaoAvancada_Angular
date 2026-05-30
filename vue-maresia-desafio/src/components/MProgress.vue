<template>
  <div class="progress-card">
    <div class="progress-card__top">
      <span>Implantação da rota piloto</span>
      <strong>{{ clampedProgress }}%</strong>
    </div>
    <div class="progress">
      <!-- Bug corrigido: usa computed property clampedProgress para garantir valor
           entre 0 e 100, evitando barras quebradas com valores inválidos. -->
      <span :style="{ width: `${clampedProgress}%` }"></span>
    </div>
    <small>Checklist térmico, cadastro de produtores e validação das janelas de entrega.</small>
  </div>
</template>

<script>
export default {
  name: 'MProgress',
  props: {
    progress: { type: Number, required: true }
  },
  computed: {
    // Bug corrigido: garante que o valor de progresso fique entre 0 e 100.
    // Um valor fora desse intervalo quebrava o layout da barra.
    clampedProgress() {
      return Math.min(100, Math.max(0, this.progress || 0))
    }
  }
}
</script>
