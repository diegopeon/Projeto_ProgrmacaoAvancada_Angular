/* Diretiva de barra de progresso: atualiza a largura visual conforme percentual recebido. */
(function () {
  'use strict';

  angular.module('maresiaApp').directive('mProgress', function () {
    return {
      restrict: 'E',
      scope: { value: '=' },
      // Bug corrigido: ng-style com objeto JS diretamente (sem concatenação de string com aspas)
      template:
        '<div class="progress-card">' +
          '<div class="progress-card__top"><span>Implantação da rota piloto</span><strong>{{ value }}%</strong></div>' +
          '<div class="progress"><span ng-style="getBarStyle()"></span></div>' +
          '<small>Checklist térmico, cadastro de produtores e validação das janelas de entrega.</small>' +
        '</div>',
      link: function (scope) {
        // Bug corrigido: ng-style agora usa uma função do scope que retorna um objeto JS válido,
        // evitando o bug de aspas dentro de template string JavaScript.
        scope.getBarStyle = function () {
          return { width: (scope.value || 0) + '%' };
        };
      }
    };
  });
})();
