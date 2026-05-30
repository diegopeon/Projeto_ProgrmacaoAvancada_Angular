/* Diretiva de abas: organiza conteúdo por públicos da solução. */
(function () {
  'use strict';

  angular.module('maresiaApp').directive('mTabs', function () {
    return {
      restrict: 'E',
      scope: { tabs: '=' },
      template:
        '<div class="tabs">' +
          '<div class="tabs__nav">' +
            '<button ng-repeat="tab in tabs track by $index"' +
              ' ng-class="{ active: active === $index }"' +
              ' ng-click="setActive($index)">{{ tab.title }}</button>' +
          '</div>' +
          // Bug corrigido: guarda contra tabs[active] undefined com ng-if
          '<div class="tabs__panel" ng-if="tabs.length > 0"><p>{{ tabs[active].content }}</p></div>' +
        '</div>',
      link: function (scope) {
        scope.active = 0;

        // Bug corrigido: usa método dedicado em vez de atribuição direta no ng-click,
        // garantindo que o $digest seja disparado corretamente.
        scope.setActive = function (index) {
          scope.active = index;
        };
      }
    };
  });
})();
