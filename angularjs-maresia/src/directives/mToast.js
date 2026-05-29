/* Diretiva de toast: exibe mensagens curtas de sucesso, erro ou informação. */
(function () {
  'use strict';

  angular.module('maresiaApp').directive('mToast', function () {
    return {
      restrict: 'E',
      scope: {
        toast: '=',
        onClose: '&'
      },
      template:
        '<aside class="toast" ng-class="[toast.type, { visible: toast.visible }]" role="status">' +
          '<span>{{ toast.message }}</span>' +
          '<button ng-click="onClose()" aria-label="Fechar notificação">×</button>' +
        '</aside>'
    };
  });
})();
