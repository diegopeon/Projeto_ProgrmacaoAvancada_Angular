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

    return {
      getBairros: function () { return bairros; },
      getRotas: function () { return rotas; },
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
