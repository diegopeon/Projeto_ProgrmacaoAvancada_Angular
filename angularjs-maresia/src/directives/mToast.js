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
      // Bug corrigido: ng-class agora usa array de strings correto para o tipo dinâmico.
      // Antes, a classe de tipo (success/error/info) podia não ser aplicada corretamente
      // dependendo da versão do AngularJS ao usar sintaxe de array com objeto misturado.
      template:
        '<aside class="toast"' +
          ' ng-class="getToastClasses()"' +
          ' role="status">' +
          '<span>{{ toast.message }}</span>' +
          '<button ng-click="onClose()" aria-label="Fechar notificação">×</button>' +
        '</aside>',
      link: function (scope) {
        // Bug corrigido: classes calculadas via função no scope para garantir avaliação
        // correta do tipo dinâmico (success, error, info) combinado com visible.
        scope.getToastClasses = function () {
          var classes = {};
          classes[scope.toast.type] = true;
          classes['visible'] = scope.toast.visible;
          return classes;
        };
      }
    };
  });
})();
