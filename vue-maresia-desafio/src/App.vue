<template>
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Maresia Log">
      <span class="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="img">
          <path class="brand__wave" d="M8 29c5.8-6.2 11.6-6.2 17.4 0 4.7 5 9.4 5 14.6 0" />
          <path class="brand__route" d="M15 18c3-5.8 12-5.8 15 0 1.9 3.7-.2 8-7.5 14-7.3-6-9.4-10.3-7.5-14Z" />
          <circle cx="22.5" cy="19.5" r="3.3" />
        </svg>
      </span>
      <span>Maresia Log</span>
    </a>

    <nav class="nav" aria-label="Menu principal">
      <a href="#solucao">Solução</a>
      <a href="#rotas">Rotas</a>
      <a href="#faq">FAQ</a>
    </nav>

    <button class="button button--ghost" @click="openPickupModal">Simular coleta</button>
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
          <button class="button" @click="openPilotModal">Agendar rota piloto</button>
          <button class="button button--alert" @click="openAlertModal">Ver alerta operacional</button>
        </div>
      </div>

      <aside class="route-card reveal" aria-label="Resumo operacional">
        <div class="route-card__top">
          <span>{{ operationSummary.currentTime }}</span>
          <strong>{{ operationSummary.activeRoute }}</strong>
        </div>
        <div class="temperature">
          <span>Temperatura média</span>
          <strong>{{ formatTemperature(averageTemperature) }}</strong>
        </div>
        <div class="mini-map" aria-label="Leituras de temperatura">
          <span
            v-for="(reading, index) in temperatureBars"
            :key="`${reading.label}-${index}`"
            :style="{ height: `${reading.height}%` }"
            :title="`${reading.label} · ${formatTemperature(reading.value)}`"
          >
            <small>{{ formatTemperature(reading.value) }}</small>
          </span>
        </div>
        <p>{{ operationSummary.plannedDeliveries }} entregas previstas · {{ operationSummary.pendingPickups }} coletas pendentes · janela final às {{ operationSummary.finalWindow }}</p>
        <p class="route-card__event">{{ operationSummary.lastEvent }}</p>
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
        <article v-for="item in pagedRotas" :key="item.rota" class="route-row" :class="getRouteClass(item)">
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

  <div v-if="activeModal" class="modal-backdrop" @click="closeModal">
    <section class="modal" role="dialog" aria-modal="true" @click.stop>
      <button class="modal__close" type="button" aria-label="Fechar" @click="closeModal">×</button>

      <form v-if="activeModal === 'pickup'" @submit.prevent="confirmPickup">
        <span class="eyebrow">Simulação de coleta</span>
        <h2>Registrar coleta refrigerada</h2>
        <label>
          Rota
          <select v-model="pickupForm.rota" required>
            <option v-for="rota in rotas" :key="rota.rota" :value="rota.rota">
              {{ rota.rota }} · {{ rota.bairro }} · {{ rota.entrega }}
            </option>
          </select>
        </label>
        <label>
          Responsável pela coleta
          <input v-model="pickupForm.responsavel" type="text" placeholder="Ex.: Ana Souza" required>
        </label>
        <div class="form-grid">
          <label>
            Temperatura aferida
            <input v-model.number="pickupForm.temperatura" type="number" min="-5" max="15" step="0.1" required>
          </label>
          <label>
            Janela de coleta
            <input v-model="pickupForm.janela" type="text" placeholder="Ex.: 08:30" required>
          </label>
        </div>
        <button class="button" type="submit">Confirmar coleta</button>
      </form>

      <form v-if="activeModal === 'pilot'" @submit.prevent="confirmPilotRoute">
        <span class="eyebrow">Rota piloto</span>
        <h2>Agendar nova rota</h2>
        <label>
          Bairro atendido
          <select v-model="pilotForm.bairro" required>
            <option v-for="bairro in operationalBairros" :key="bairro.value" :value="bairro.label">
              {{ bairro.label }}
            </option>
          </select>
        </label>
        <label>
          Produtor parceiro
          <input v-model="pilotForm.produtor" type="text" placeholder="Ex.: Sítio Mar Azul" required>
        </label>
        <label>
          Carga refrigerada
          <input v-model="pilotForm.entrega" type="text" placeholder="Ex.: Queijos artesanais" required>
        </label>
        <div class="form-grid">
          <label>
            Temperatura prevista
            <input v-model.number="pilotForm.temperatura" type="number" min="-5" max="15" step="0.1" required>
          </label>
          <label>
            Janela final
            <input v-model="pilotForm.janelaFinal" type="text" placeholder="Ex.: 11:30" required>
          </label>
        </div>
        <button class="button" type="submit">Salvar rota piloto</button>
      </form>

      <div v-if="activeModal === 'alerts'" class="alerts-panel">
        <span class="eyebrow">Alerta operacional</span>
        <h2>Condições que pedem atenção</h2>
        <div class="alert-list">
          <article
            v-for="(alert, index) in operationSummary.alerts"
            :key="`${alert.title}-${index}`"
            class="alert-item"
            :class="`alert-item--${alert.level}`"
          >
            <strong>{{ alert.title }}</strong>
            <p>{{ alert.message }}</p>
          </article>
        </div>
        <button class="button button--soft" type="button" @click="closeModal">Entendi</button>
      </div>
    </section>
  </div>

  <MToast :toast="toast" @close="closeToast" />
</template>

<script>
import MAccordion from './components/MAccordion.vue'
import MPagination from './components/MPagination.vue'
import MProgress from './components/MProgress.vue'
import MTabs from './components/MTabs.vue'
import MDropdown from './components/MDropdown.vue'
import MToast from './components/MToast.vue'

const LEGACY_STORAGE_KEY = 'maresiaLog.operacao'
const STORAGE_KEY = 'maresiaLog.operacao.v2'

const defaultOperationSummary = {
  currentTime: 'Hoje · 06:40',
  activeRoute: 'Rota Rio Vermelho',
  plannedDeliveries: 12,
  pendingPickups: 2,
  finalWindow: '11:30',
  nextRouteNumber: 7,
  lastEvent: 'Operação inicial carregada com rotas refrigeradas compartilhadas.',
  alerts: [],
  temperatureReadings: [
    { label: '06:00', value: 3.8 },
    { label: '06:20', value: 4.4 },
    { label: '06:40', value: 4.0 },
    { label: '07:00', value: 4.6 }
  ]
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function normalizeState(state, defaultRotas) {
  const safeState = state || {}
  const safeOperational = safeState.operational || {}

  return {
    rotas: Array.isArray(safeState.rotas) && safeState.rotas.length ? safeState.rotas : clone(defaultRotas),
    operationSummary: {
      ...clone(defaultOperationSummary),
      ...safeOperational,
      alerts: Array.isArray(safeOperational.alerts) ? safeOperational.alerts : [],
      temperatureReadings:
        Array.isArray(safeOperational.temperatureReadings) && safeOperational.temperatureReadings.length
          ? safeOperational.temperatureReadings
          : clone(defaultOperationSummary.temperatureReadings)
    }
  }
}

function loadState(defaultRotas) {
  try {
    window.localStorage.removeItem(LEGACY_STORAGE_KEY)
    const rawState = window.localStorage.getItem(STORAGE_KEY)
    return normalizeState(rawState ? JSON.parse(rawState) : null, defaultRotas)
  } catch (error) {
    return normalizeState(null, defaultRotas)
  }
}

function saveState(rotas, operationSummary) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ rotas, operational: operationSummary }))
  } catch (error) {
    return false
  }

  return true
}

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
    const defaultRotas = [
      { rota: 'Rota 01', bairro: 'Rio Vermelho', entrega: 'Peixes artesanais', status: 'Em trânsito' },
      { rota: 'Rota 02', bairro: 'Barra', entrega: 'Queijos e iogurtes', status: 'Programada' },
      { rota: 'Rota 03', bairro: 'Itapuã', entrega: 'Polpas naturais', status: 'Conferência' },
      { rota: 'Rota 04', bairro: 'Lauro de Freitas', entrega: 'Hortifruti premium', status: 'Entregue' },
      { rota: 'Rota 05', bairro: 'Pituba', entrega: 'Doces refrigerados', status: 'Em trânsito' },
      { rota: 'Rota 06', bairro: 'Ondina', entrega: 'Marmitas saudáveis', status: 'Programada' }
    ]
    const savedState = loadState(defaultRotas)

    return {
      currentPage: 1,
      itemsPerPage: 3,
      onboardingProgress: 72,
      selectedBairro: { label: 'Todos os bairros', value: 'todos' },
      activeModal: null,
      pickupForm: {},
      pilotForm: {},
      // Bug corrigido: toast inicializado com objeto reativo completo.
      // Mutações diretas em propriedades do objeto são rastreadas pelo Vue 3.
      toast: { visible: false, type: 'info', message: '' },
      toastTimer: null,
      bairros: [
        { label: 'Todos os bairros', value: 'todos' },
        { label: 'Rio Vermelho', value: 'rio-vermelho' },
        { label: 'Barra', value: 'barra' },
        { label: 'Itapuã', value: 'itapua' },
        { label: 'Lauro de Freitas', value: 'lauro' }
      ],
      rotas: savedState.rotas,
      operationSummary: savedState.operationSummary,
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
          title: 'O que é um alerta operacional?',
          content: 'É um aviso gerado quando a operação foge do esperado, como temperatura acima do limite, rota com ocorrência térmica ou coletas pendentes que podem atrasar entregas refrigeradas.'
        },
        {
          title: 'Restaurantes conseguem acompanhar os pedidos?',
          content: 'Sim. O restaurante recebe uma previsão clara da entrega e pode consultar atualizações por rota, reduzindo ligações e retrabalho operacional.'
        }
      ]
    }
  },
  computed: {
    operationalBairros() {
      return this.bairros.filter((bairro) => bairro.value !== 'todos')
    },
    totalPages() {
      return Math.ceil(this.filteredRotas.length / this.itemsPerPage) || 1
    },
    filteredRotas() {
      if (this.selectedBairro.value === 'todos') return this.rotas
      return this.rotas.filter((item) => item.bairro === this.selectedBairro.label)
    },
    pagedRotas() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredRotas.slice(start, start + this.itemsPerPage)
    },
    averageTemperature() {
      const readings = this.operationSummary.temperatureReadings
      const total = readings.reduce((sum, reading) => sum + Number(reading.value || 0), 0)
      return readings.length ? total / readings.length : 0
    },
    temperatureBars() {
      const readings = this.operationSummary.temperatureReadings
      const maxValue = readings.reduce((max, reading) => Math.max(max, Number(reading.value || 0)), 5)

      return readings.map((reading) => {
        const value = Number(reading.value || 0)
        return {
          label: reading.label,
          value,
          height: Math.max(32, Math.round((value / maxValue) * 100))
        }
      })
    }
  },
  mounted() {
    // Lifecycle hook: exibe toast de boas-vindas ao montar a aplicação.
    this.persistOperation()
    this.showToast('info', 'Painel Maresia carregado com dados operacionais simulados.')
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    selectBairro(option) {
      this.selectedBairro = option
      this.currentPage = 1
      this.showToast('info', `Filtro aplicado: ${option.label}`)
    },
    getNowLabel() {
      return `Agora · ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
    },
    getNextTemperature() {
      const sequence = [4.1, 3.9, 4.3, 4.0, 4.5, 3.8]
      const index = this.operationSummary.temperatureReadings.length % sequence.length
      return sequence[index]
    },
    getNextRouteCode() {
      const nextNumber = this.operationSummary.nextRouteNumber || this.rotas.length + 1
      this.operationSummary.nextRouteNumber = nextNumber + 1
      return `Rota ${String(nextNumber).padStart(2, '0')}`
    },
    addTemperatureReading(label, value) {
      this.operationSummary.temperatureReadings.push({ label, value })
    },
    updateOperationalAlerts() {
      const alerts = []
      const latestReading = this.operationSummary.temperatureReadings[this.operationSummary.temperatureReadings.length - 1]

      if (latestReading && Number(latestReading.value) >= 6) {
        alerts.push({
          level: 'critico',
          title: 'Temperatura acima do limite',
          message: `Última leitura em ${latestReading.label}: ${this.formatTemperature(latestReading.value)}. Revisar isolamento e prioridade da carga.`
        })
      } else if (this.averageTemperature > 4.8) {
        alerts.push({
          level: 'atencao',
          title: 'Temperatura média em atenção',
          message: `A média atual está em ${this.formatTemperature(this.averageTemperature)}, acima da faixa ideal para carga refrigerada sensível.`
        })
      }

      this.rotas.forEach((rota) => {
        if (rota.status === 'Alerta térmico') {
          alerts.push({
            level: 'critico',
            title: `${rota.rota} com ocorrência térmica`,
            message: `${rota.entrega} em ${rota.bairro} precisa de conferência antes de seguir rota.`
          })
        }
      })

      if (Number(this.operationSummary.pendingPickups || 0) > 0) {
        alerts.push({
          level: 'atencao',
          title: 'Coletas pendentes',
          message: `${this.operationSummary.pendingPickups} coleta(s) ainda precisam ser confirmadas antes da janela final das ${this.operationSummary.finalWindow}.`
        })
      }

      if (!alerts.length) {
        alerts.push({
          level: 'normal',
          title: 'Operação sem alerta crítico',
          message: 'Temperatura, rotas e coletas estão dentro do esperado neste momento.'
        })
      }

      this.operationSummary.alerts = alerts
    },
    getRouteByCode(routeCode) {
      return this.rotas.find((item) => item.rota === routeCode)
    },
    getDefaultPickupRoute() {
      return this.rotas.find((item) => item.status === 'Programada' || item.status === 'Rota piloto agendada') || this.rotas[0]
    },
    persistOperation() {
      this.updateOperationalAlerts()
      saveState(this.rotas, this.operationSummary)
    },
    formatTemperature(value) {
      return `${Number(value || 0).toFixed(1).replace('.', ',')}°C`
    },
    getRouteClass(item) {
      if (item.status === 'Alerta térmico') return 'route-row--alert'
      if (item.status === 'Coleta realizada') return 'route-row--success'
      if (item.status === 'Rota piloto agendada') return 'route-row--pilot'
      return ''
    },
    closeModal() {
      this.activeModal = null
    },
    openPickupModal() {
      const rota = this.getDefaultPickupRoute()

      this.pickupForm = {
        rota: rota.rota,
        responsavel: '',
        temperatura: this.getNextTemperature(),
        janela: '08:30'
      }
      this.activeModal = 'pickup'
    },
    openPilotModal() {
      const bairro = this.selectedBairro.value === 'todos' ? 'Rio Vermelho' : this.selectedBairro.label

      this.pilotForm = {
        bairro,
        produtor: '',
        entrega: '',
        temperatura: 4.2,
        janelaFinal: this.operationSummary.finalWindow || '11:30'
      }
      this.activeModal = 'pilot'
    },
    openAlertModal() {
      this.persistOperation()
      this.activeModal = 'alerts'
    },
    confirmPickup() {
      const rota = this.getRouteByCode(this.pickupForm.rota) || this.getDefaultPickupRoute()
      const temperatura = Number(this.pickupForm.temperatura || this.getNextTemperature())

      rota.status = temperatura >= 6 ? 'Alerta térmico' : 'Coleta realizada'
      this.operationSummary.pendingPickups = Math.max(0, Number(this.operationSummary.pendingPickups || 0) - 1)
      this.operationSummary.currentTime = this.getNowLabel()
      this.operationSummary.activeRoute = `${rota.rota} · ${rota.bairro}`
      this.operationSummary.lastEvent = temperatura >= 6
        ? `Coleta registrada por ${this.pickupForm.responsavel} com alerta térmico em ${rota.entrega}.`
        : `Coleta confirmada por ${this.pickupForm.responsavel} para ${rota.entrega} em ${rota.bairro}, janela ${this.pickupForm.janela}.`
      this.addTemperatureReading(`Coleta ${rota.rota.replace('Rota ', '')}`, temperatura)
      this.persistOperation()
      this.closeModal()
      this.showToast('success', this.operationSummary.lastEvent)
    },
    confirmPilotRoute() {
      const rota = {
        rota: this.getNextRouteCode(),
        bairro: this.pilotForm.bairro,
        entrega: this.pilotForm.entrega,
        status: 'Rota piloto agendada'
      }

      this.rotas.push(rota)
      this.operationSummary.plannedDeliveries = Number(this.operationSummary.plannedDeliveries || 0) + 1
      this.operationSummary.pendingPickups = Number(this.operationSummary.pendingPickups || 0) + 1
      this.operationSummary.finalWindow = this.pilotForm.janelaFinal
      this.operationSummary.currentTime = this.getNowLabel()
      this.operationSummary.activeRoute = `${rota.rota} · ${rota.bairro}`
      this.operationSummary.lastEvent = `Rota piloto de ${this.pilotForm.produtor} agendada para ${rota.bairro} com carga de ${rota.entrega}.`
      this.addTemperatureReading(`Piloto ${rota.rota.replace('Rota ', '')}`, Number(this.pilotForm.temperatura || 4.2))
      this.persistOperation()
      this.closeModal()
      this.showToast('success', this.operationSummary.lastEvent)
    },
    showToast(type, message) {
      clearTimeout(this.toastTimer)
      // Bug corrigido: reassigna o objeto inteiro em vez de mutar propriedades individualmente.
      // Garante que o Vue 3 detecte a mudança e re-renderize o componente MToast.
      this.toast = { visible: true, type, message }
      this.toastTimer = setTimeout(() => this.closeToast(), 3200)
    },
    closeToast() {
      // Bug corrigido: cria novo objeto com visible: false para garantir reatividade.
      this.toast = { ...this.toast, visible: false }
    }
  }
}
</script>
