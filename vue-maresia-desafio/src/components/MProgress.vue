<template>
  <div class="progress-card">
    <div class="progress-card__top">
      <span>Implantação da rota piloto</span>
      <strong>{{ progress }}%</strong>
    </div>
    <div class="progress">
      <span :style="{ width: `${progress}%` }"></span>
    </div>
    <small>Checklist térmico, cadastro de produtores e validação das janelas de entrega.</small>
  </div>
</template>

<script>
export default {
  name: 'MProgress',
  props: {
    progress: { type: Number, required: true }
  }
}
</script>
