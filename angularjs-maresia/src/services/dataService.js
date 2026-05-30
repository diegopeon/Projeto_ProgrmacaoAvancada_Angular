/*
  Serviço responsável por fornecer dados fictícios, porém coerentes,
  para a empresa Maresia Log — logística refrigerada para pequenos produtores.
*/
(function () {
  'use strict';

  angular
    .module('maresiaApp')
    .factory('dataService', dataService);

  function dataService() {
    const bairros = [
      { label: 'Todos os bairros', value: 'todos' },
      { label: 'Rio Vermelho', value: 'rio-vermelho' },
      { label: 'Barra', value: 'barra' },
      { label: 'Itapuã', value: 'itapua' },
      { label: 'Lauro de Freitas', value: 'lauro' }
    ];

    const rotas = [
      { rota: 'Rota 01', bairro: 'Rio Vermelho', entrega: 'Peixes artesanais', status: 'Em trânsito' },
      { rota: 'Rota 02', bairro: 'Barra', entrega: 'Queijos e iogurtes', status: 'Programada' },
      { rota: 'Rota 03', bairro: 'Itapuã', entrega: 'Polpas naturais', status: 'Conferência' },
      { rota: 'Rota 04', bairro: 'Lauro de Freitas', entrega: 'Hortifruti premium', status: 'Entregue' },
      { rota: 'Rota 05', bairro: 'Pituba', entrega: 'Doces refrigerados', status: 'Em trânsito' },
      { rota: 'Rota 06', bairro: 'Ondina', entrega: 'Marmitas saudáveis', status: 'Programada' }
    ];

    const legacyStorageKey = 'maresiaLog.operacao';
    const storageKey = 'maresiaLog.operacao.v2';

    const operationalState = {
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
    };

    function clone(value) {
      return JSON.parse(JSON.stringify(value));
    }

    function normalizeState(state) {
      const safeState = state || {};
      const safeOperational = safeState.operational || {};

      return {
        rotas: Array.isArray(safeState.rotas) && safeState.rotas.length ? safeState.rotas : clone(rotas),
        operational: Object.assign(clone(operationalState), safeOperational, {
          alerts: Array.isArray(safeOperational.alerts) ? safeOperational.alerts : [],
          temperatureReadings: Array.isArray(safeOperational.temperatureReadings) && safeOperational.temperatureReadings.length
            ? safeOperational.temperatureReadings
            : clone(operationalState.temperatureReadings)
        })
      };
    }

    function loadState() {
      try {
        window.localStorage.removeItem(legacyStorageKey);
        const rawState = window.localStorage.getItem(storageKey);
        return normalizeState(rawState ? JSON.parse(rawState) : null);
      } catch (error) {
        return normalizeState(null);
      }
    }

    function saveState(rotasAtualizadas, operationalAtualizado) {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify({
          rotas: rotasAtualizadas,
          operational: operationalAtualizado
        }));
      } catch (error) {
        return false;
      }

      return true;
    }

    return {
      getBairros: function () { return bairros; },
      getRotas: function () { return loadState().rotas; },
      getOperationalState: function () { return loadState().operational; },
      saveState: saveState,
      getFaq: function () {
        return [
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
        ];
      },
      getTabs: function () {
        return [
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
        ];
      }
    };
  }
})();
