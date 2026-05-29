/* Diretiva de barra de progresso: atualiza a largura visual conforme percentual recebido. */
(function () {
  'use strict';

  angular.module('maresiaApp').directive('mProgress', function () {
    return {
      restrict: 'E',
      scope: { value: '=' },
      template:
        '<div class="progress-card">' +
          '<div class="progress-card__top"><span>Implantação da rota piloto</span><strong>{{ value }}%</strong></div>' +
          '<div class="progress"><span ng-style="{ width: value + "%" }"></span></div>' +
          '<small>Checklist térmico, cadastro de produtores e validação das janelas de entrega.</small>' +
        '</div>'
    };
  });
})();
