/* Diretiva de menu suspenso: fecha ao selecionar uma opção e emite a escolha ao controller. */
(function () {
  'use strict';

  angular.module('maresiaApp').directive('mDropdown', function ($document) {
    return {
      restrict: 'E',
      scope: {
        options: '=',
        selected: '=',
        onSelect: '&'
      },
      template:
        '<div class="dropdown">' +
          '<button class="dropdown__button" ng-click="toggle($event)">{{ selected.label }} <span>⌄</span></button>' +
          '<ul class="dropdown__list" ng-show="open">' +
            '<li ng-repeat="option in options track by option.value">' +
              '<button ng-click="choose(option)">{{ option.label }}</button>' +
            '</li>' +
          '</ul>' +
        '</div>',
      link: function (scope, element) {
        scope.open = false;

        scope.toggle = function (event) {
          event.stopPropagation();
          scope.open = !scope.open;
        };

        scope.choose = function (option) {
          scope.selected = option;
          scope.open = false;
          scope.onSelect({ option: option });
        };

        // Bug corrigido: adicionada verificação de segurança para element[0] antes de contains.
        // Também usa ng-show em vez de ng-if para evitar recriar o DOM a cada abertura.
        function closeOnOutsideClick(event) {
          if (element[0] && !element[0].contains(event.target)) {
            scope.$apply(function () { scope.open = false; });
          }
        }

        $document.on('click', closeOnOutsideClick);

        // Limpa o listener ao destruir a diretiva para evitar memory leak.
        scope.$on('$destroy', function () {
          $document.off('click', closeOnOutsideClick);
        });
      }
    };
  });
})();
