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
    $scope.operationSummary = dataService.getOperationalState();
    $scope.operationalBairros = $scope.bairros.filter(function (bairro) {
      return bairro.value !== 'todos';
    });
    $scope.temperatureBars = [];
    $scope.activeModal = null;
    $scope.pickupForm = {};
    $scope.pilotForm = {};

    $scope.currentPage = 1;
    $scope.itemsPerPage = 3;
    $scope.selectedBairro = $scope.bairros[0];
    $scope.onboardingProgress = 72;

    Object.defineProperty($scope, 'toast', {
      get: function () { return toastService.toast; },
      enumerable: true
    });

    function getFilteredRotas() {
      if (!$scope.selectedBairro || $scope.selectedBairro.value === 'todos') {
        return $scope.rotas;
      }

      return $scope.rotas.filter(function (item) {
        return item.bairro === $scope.selectedBairro.label;
      });
    }

    function updateTotalPages() {
      var total = Math.ceil(getFilteredRotas().length / $scope.itemsPerPage);
      $scope.totalPages = total || 1;
    }

    function getNowLabel() {
      return 'Agora · ' + new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    function getNextTemperature() {
      var sequence = [4.1, 3.9, 4.3, 4.0, 4.5, 3.8];
      var index = $scope.operationSummary.temperatureReadings.length % sequence.length;
      return sequence[index];
    }

    function getRouteByCode(routeCode) {
      return $scope.rotas.find(function (item) {
        return item.rota === routeCode;
      });
    }

    function getDefaultPickupRoute() {
      return $scope.rotas.find(function (item) {
        return item.status === 'Programada' || item.status === 'Rota piloto agendada';
      }) || $scope.rotas[0];
    }

    function addTemperatureReading(label, value) {
      $scope.operationSummary.temperatureReadings.push({
        label: label,
        value: value
      });
    }

    function updateAverageTemperature() {
      var readings = $scope.operationSummary.temperatureReadings;
      var total = readings.reduce(function (sum, reading) {
        return sum + Number(reading.value || 0);
      }, 0);

      $scope.operationSummary.averageTemperature = readings.length ? total / readings.length : 0;
    }

    function updateTemperatureBars() {
      var readings = $scope.operationSummary.temperatureReadings;
      var maxValue = readings.reduce(function (max, reading) {
        return Math.max(max, Number(reading.value || 0));
      }, 5);

      $scope.temperatureBars = readings.map(function (reading) {
        var value = Number(reading.value || 0);
        return {
          label: reading.label,
          value: value,
          height: Math.max(32, Math.round((value / maxValue) * 100))
        };
      });
    }

    function updateOperationalAlerts() {
      var alerts = [];
      var latestReading = $scope.operationSummary.temperatureReadings[$scope.operationSummary.temperatureReadings.length - 1];

      if (latestReading && Number(latestReading.value) >= 6) {
        alerts.push({
          level: 'critico',
          title: 'Temperatura acima do limite',
          message: 'Última leitura em ' + latestReading.label + ': ' + $scope.formatTemperature(latestReading.value) + '. Revisar isolamento e prioridade da carga.'
        });
      } else if ($scope.operationSummary.averageTemperature > 4.8) {
        alerts.push({
          level: 'atencao',
          title: 'Temperatura média em atenção',
          message: 'A média atual está em ' + $scope.formatTemperature($scope.operationSummary.averageTemperature) + ', acima da faixa ideal para carga refrigerada sensível.'
        });
      }

      $scope.rotas.forEach(function (rota) {
        if (rota.status === 'Alerta térmico') {
          alerts.push({
            level: 'critico',
            title: rota.rota + ' com ocorrência térmica',
            message: rota.entrega + ' em ' + rota.bairro + ' precisa de conferência antes de seguir rota.'
          });
        }
      });

      if (Number($scope.operationSummary.pendingPickups || 0) > 0) {
        alerts.push({
          level: 'atencao',
          title: 'Coletas pendentes',
          message: $scope.operationSummary.pendingPickups + ' coleta(s) ainda precisam ser confirmadas antes da janela final das ' + $scope.operationSummary.finalWindow + '.'
        });
      }

      if (!alerts.length) {
        alerts.push({
          level: 'normal',
          title: 'Operação sem alerta crítico',
          message: 'Temperatura, rotas e coletas estão dentro do esperado neste momento.'
        });
      }

      $scope.operationSummary.alerts = alerts;
    }

    function saveOperation() {
      dataService.saveState($scope.rotas, $scope.operationSummary);
    }

    function refreshOperation() {
      updateAverageTemperature();
      updateTemperatureBars();
      updateOperationalAlerts();
      updateTotalPages();
      saveOperation();
    }

    function getNextRouteCode() {
      var nextNumber = $scope.operationSummary.nextRouteNumber || ($scope.rotas.length + 1);
      $scope.operationSummary.nextRouteNumber = nextNumber + 1;
      return 'Rota ' + String(nextNumber).padStart(2, '0');
    }

    $scope.formatTemperature = function (value) {
      return Number(value || 0).toFixed(1).replace('.', ',') + '°C';
    };

    $scope.getRouteClass = function (item) {
      if (item.status === 'Alerta térmico') return 'route-row--alert';
      if (item.status === 'Coleta realizada') return 'route-row--success';
      if (item.status === 'Rota piloto agendada') return 'route-row--pilot';
      return '';
    };

    $scope.getPagedRotas = function () {
      var filteredRotas = getFilteredRotas();
      var start = ($scope.currentPage - 1) * $scope.itemsPerPage;
      return filteredRotas.slice(start, start + $scope.itemsPerPage);
    };

    $scope.changePage = function (page) {
      $scope.currentPage = page;
    };

    $scope.selectBairro = function (option) {
      $scope.selectedBairro = option;
      $scope.currentPage = 1;
      updateTotalPages();
      toastService.show('info', 'Filtro aplicado: ' + option.label);
    };

    $scope.closeModal = function () {
      $scope.activeModal = null;
    };

    $scope.openPickupModal = function () {
      var rota = getDefaultPickupRoute();

      $scope.pickupForm = {
        rota: rota.rota,
        responsavel: '',
        temperatura: getNextTemperature(),
        janela: '08:30'
      };
      $scope.activeModal = 'pickup';
    };

    $scope.openPilotModal = function () {
      var bairro = $scope.selectedBairro.value === 'todos' ? 'Rio Vermelho' : $scope.selectedBairro.label;

      $scope.pilotForm = {
        bairro: bairro,
        produtor: '',
        entrega: '',
        temperatura: 4.2,
        janelaFinal: $scope.operationSummary.finalWindow || '11:30'
      };
      $scope.activeModal = 'pilot';
    };

    $scope.openAlertModal = function () {
      refreshOperation();
      $scope.activeModal = 'alerts';
    };

    $scope.confirmPickup = function () {
      var rota = getRouteByCode($scope.pickupForm.rota) || getDefaultPickupRoute();
      var temperatura = Number($scope.pickupForm.temperatura || getNextTemperature());

      rota.status = temperatura >= 6 ? 'Alerta térmico' : 'Coleta realizada';
      $scope.operationSummary.pendingPickups = Math.max(0, Number($scope.operationSummary.pendingPickups || 0) - 1);
      $scope.operationSummary.currentTime = getNowLabel();
      $scope.operationSummary.activeRoute = rota.rota + ' · ' + rota.bairro;
      $scope.operationSummary.lastEvent = temperatura >= 6
        ? 'Coleta registrada por ' + $scope.pickupForm.responsavel + ' com alerta térmico em ' + rota.entrega + '.'
        : 'Coleta confirmada por ' + $scope.pickupForm.responsavel + ' para ' + rota.entrega + ' em ' + rota.bairro + ', janela ' + $scope.pickupForm.janela + '.';
      addTemperatureReading('Coleta ' + rota.rota.replace('Rota ', ''), temperatura);
      refreshOperation();
      $scope.closeModal();
      toastService.show('success', $scope.operationSummary.lastEvent);
    };

    $scope.confirmPilotRoute = function () {
      var rota = {
        rota: getNextRouteCode(),
        bairro: $scope.pilotForm.bairro,
        entrega: $scope.pilotForm.entrega,
        status: 'Rota piloto agendada'
      };

      $scope.rotas.push(rota);
      $scope.operationSummary.plannedDeliveries = Number($scope.operationSummary.plannedDeliveries || 0) + 1;
      $scope.operationSummary.pendingPickups = Number($scope.operationSummary.pendingPickups || 0) + 1;
      $scope.operationSummary.finalWindow = $scope.pilotForm.janelaFinal;
      $scope.operationSummary.currentTime = getNowLabel();
      $scope.operationSummary.activeRoute = rota.rota + ' · ' + rota.bairro;
      $scope.operationSummary.lastEvent = 'Rota piloto de ' + $scope.pilotForm.produtor + ' agendada para ' + rota.bairro + ' com carga de ' + rota.entrega + '.';
      addTemperatureReading('Piloto ' + rota.rota.replace('Rota ', ''), Number($scope.pilotForm.temperatura || 4.2));
      refreshOperation();
      $scope.closeModal();
      toastService.show('success', $scope.operationSummary.lastEvent);
    };

    $scope.closeToast = function () {
      toastService.close();
    };

    refreshOperation();
  }
})();
