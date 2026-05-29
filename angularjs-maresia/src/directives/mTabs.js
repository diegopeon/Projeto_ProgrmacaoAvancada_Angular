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
            '<button ng-repeat="tab in tabs track by $index" ng-class="{ active: active === $index }" ng-click="active = $index">{{ tab.title }}</button>' +
          '</div>' +
          '<div class="tabs__panel"><p>{{ tabs[active].content }}</p></div>' +
        '</div>',
      link: function (scope) {
        scope.active = 0;
      }
    };
  });
})();
