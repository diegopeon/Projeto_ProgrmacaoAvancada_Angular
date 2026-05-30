/*
  Controller principal da página.
  Centraliza o estado usado pelos componentes demonstrativos da atividade.
*/
(function () {
  'use strict';

  angular
    .module('maresiaApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'dataService', 'toastService'];

  function MainController($scope, dataService, toastService) {
    $scope.faqItems = dataService.getFaq();
    $scope.tabs = dataService.getTabs();
    $scope.bairros = dataService.getBairros();
    $scope.rotas = dataService.getRotas();

    $scope.currentPage = 1;
    $scope.itemsPerPage = 3;
    $scope.totalPages = Math.ceil($scope.rotas.length / $scope.itemsPerPage);
    $scope.selectedBairro = $scope.bairros[0];
    $scope.onboardingProgress = 72;

    // Bug corrigido: em vez de copiar a referência do objeto toast uma vez,
    // usamos uma função getter para que o ng-bind sempre leia o estado atual do serviço.
    // Isso garante que mudanças no toastService.toast sejam refletidas na view.
    Object.defineProperty($scope, 'toast', {
      get: function () { return toastService.toast; },
      enumerable: true
    });

    $scope.getPagedRotas = function () {
      var start = ($scope.currentPage - 1) * $scope.itemsPerPage;
      return $scope.rotas.slice(start, start + $scope.itemsPerPage);
    };

    $scope.changePage = function (page) {
      $scope.currentPage = page;
    };

    $scope.selectBairro = function (option) {
      $scope.selectedBairro = option;
      toastService.show('info', 'Filtro aplicado: ' + option.label);
    };

    $scope.confirmSchedule = function () {
      toastService.show('success', 'Coleta simulada com sucesso para a próxima janela logística.');
    };

    $scope.reportIssue = function () {
      toastService.show('error', 'Exemplo de alerta: temperatura fora do padrão em uma carga.');
    };

    $scope.closeToast = function () {
      toastService.close();
    };
  }
})();
