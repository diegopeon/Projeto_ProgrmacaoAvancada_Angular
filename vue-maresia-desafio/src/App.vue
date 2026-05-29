<template>
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Maresia Log">
      <span class="brand__mark">ML</span>
      <span>Maresia Log</span>
    </a>

    <nav class="nav" aria-label="Menu principal">
      <a href="#solucao">Solução</a>
      <a href="#rotas">Rotas</a>
      <a href="#faq">FAQ</a>
    </nav>

    <button class="button button--ghost" @click="confirmSchedule">Simular coleta</button>
  </header>

  <main id="top">
    <section class="hero section-pad">
      <div class="hero__content reveal">
        <span class="eyebrow">Logística refrigerada · Salvador e RMS</span>
        <h1>Entrega fresca, rastreada e sem improviso para produtores locais.</h1>
        <p>
          A Maresia Log conecta pequenos produtores de alimentos frescos a restaurantes,
          cafés e mercados de bairro com rotas refrigeradas, janelas claras e operação simples.
        </p>
        <div class="hero__actions">
          <button class="button" @click="confirmSchedule">Agendar rota piloto</button>
          <button class="button button--soft" @click="reportIssue">Ver alerta operacional</button>
        </div>
      </div>

      <aside class="route-card reveal" aria-label="Resumo operacional">
        <div class="route-card__top">
          <span>Hoje · 06:40</span>
          <strong>Rota Rio Vermelho</strong>
        </div>
        <div class="temperature">
          <span>Temperatura média</span>
          <strong>4,2°C</strong>
        </div>
        <div class="mini-map">
          <span></span><span></span><span></span><span></span>
        </div>
        <p>12 entregas previstas · 2 coletas pendentes · janela final às 11:30</p>
      </aside>
    </section>

    <section id="solucao" class="section section-pad">
      <div class="section-heading">
        <span class="eyebrow">Componentes obrigatórios em contexto real</span>
        <h2>Um painel enxuto para quem vende comida fresca e não pode perder qualidade no caminho.</h2>
      </div>

      <div class="component-grid">
        <article class="panel">
          <h3>Abas por público</h3>
          <MTabs :tabs="tabs" />
        </article>

        <article class="panel">
          <h3>Progresso da implantação</h3>
          <MProgress :progress="onboardingProgress" />
        </article>
      </div>
    </section>

    <section id="rotas" class="section section-pad section--warm">
      <div class="section-heading section-heading--row">
        <div>
          <span class="eyebrow">Rotas da semana</span>
          <h2>Entregas organizadas por bairro, carga e status.</h2>
        </div>
        <MDropdown :options="bairros" :selected="selectedBairro" @select-option="selectBairro" />
      </div>

      <div class="route-list">
        <article v-for="item in pagedRotas" :key="item.rota" class="route-row">
          <span class="route-row__code">{{ item.rota }}</span>
          <div>
            <strong>{{ item.entrega }}</strong>
            <p>{{ item.bairro }}</p>
          </div>
          <em>{{ item.status }}</em>
        </article>
      </div>

      <MPagination :current-page="currentPage" :total-pages="totalPages" @change-page="changePage" />
    </section>

    <section id="faq" class="section section-pad">
      <div class="section-heading">
        <span class="eyebrow">Perguntas frequentes</span>
        <h2>Dúvidas reais antes de contratar uma rota refrigerada compartilhada.</h2>
      </div>
      <MAccordion :items="faqItems" />
    </section>
  </main>

  <footer class="footer">
    <p>Projeto acadêmico fictício · Maresia Log · Vue.js</p>
  </footer>

  <MToast :toast="toast" @close="closeToast" />
</template>

<script>
import MAccordion from './components/MAccordion.vue'
import MPagination from './components/MPagination.vue'
import MProgress from './components/MProgress.vue'
import MTabs from './components/MTabs.vue'
import MDropdown from './components/MDropdown.vue'
import MToast from './components/MToast.vue'

export default {
  name: 'App',
  components: {
    MAccordion,
    MPagination,
    MProgress,
    MTabs,
    MDropdown,
    MToast
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 3,
      onboardingProgress: 72,
      selectedBairro: { label: 'Todos os bairros', value: 'todos' },
      toast: { visible: false, type: 'info', message: '' },
      toastTimer: null,
      bairros: [
        { label: 'Todos os bairros', value: 'todos' },
        { label: 'Rio Vermelho', value: 'rio-vermelho' },
        { label: 'Barra', value: 'barra' },
        { label: 'Itapuã', value: 'itapua' },
        { label: 'Lauro de Freitas', value: 'lauro' }
      ],
      rotas: [
        { rota: 'Rota 01', bairro: 'Rio Vermelho', entrega: 'Peixes artesanais', status: 'Em trânsito' },
        { rota: 'Rota 02', bairro: 'Barra', entrega: 'Queijos e iogurtes', status: 'Programada' },
        { rota: 'Rota 03', bairro: 'Itapuã', entrega: 'Polpas naturais', status: 'Conferência' },
        { rota: 'Rota 04', bairro: 'Lauro de Freitas', entrega: 'Hortifruti premium', status: 'Entregue' },
        { rota: 'Rota 05', bairro: 'Pituba', entrega: 'Doces refrigerados', status: 'Em trânsito' },
        { rota: 'Rota 06', bairro: 'Ondina', entrega: 'Marmitas saudáveis', status: 'Programada' }
      ],
      tabs: [
        {
          title: 'Produtores',
          content: 'Coleta programada, previsibilidade de saída e menos perda de produto por falha logística.'
        },
        {
          title: 'Restaurantes',
          content: 'Recebimento organizado por janela, aviso de rota e conferência de itens antes da chegada.'
        },
        {
          title: 'Operação',
          content: 'Controle de entregas, status por rota e visão rápida do que está parado, em trânsito ou finalizado.'
        }
      ],
      faqItems: [
        {
          title: 'A Maresia atende pequenos produtores sem frota própria?',
          content: 'Sim. A operação foi pensada para produtores de alimentos frescos que precisam entregar com controle térmico, rastreio simples e coleta organizada.'
        },
        {
          title: 'Como funciona o controle de temperatura?',
          content: 'Cada rota utiliza caixas térmicas identificadas e checklist de conferência. O painel informa status, janela de entrega e prioridade da carga.'
        },
        {
          title: 'Restaurantes conseguem acompanhar os pedidos?',
          content: 'Sim. O restaurante recebe uma previsão clara da entrega e pode consultar atualizações por rota, reduzindo ligações e retrabalho operacional.'
        }
      ]
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.rotas.length / this.itemsPerPage)
    },
    pagedRotas() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.rotas.slice(start, start + this.itemsPerPage)
    }
  },
  mounted() {
    this.showToast('info', 'Painel Maresia carregado com dados operacionais simulados.')
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    selectBairro(option) {
      this.selectedBairro = option
      this.showToast('info', `Filtro aplicado: ${option.label}`)
    },
    confirmSchedule() {
      this.showToast('success', 'Coleta simulada com sucesso para a próxima janela logística.')
    },
    reportIssue() {
      this.showToast('error', 'Exemplo de alerta: temperatura fora do padrão em uma carga.')
    },
    showToast(type, message) {
      clearTimeout(this.toastTimer)
      this.toast = { visible: true, type, message }
      this.toastTimer = setTimeout(() => this.closeToast(), 3200)
    },
    closeToast() {
      this.toast.visible = false
    }
  }
}
</script>
