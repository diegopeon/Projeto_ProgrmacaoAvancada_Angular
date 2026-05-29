/* Diretiva de acordeão: mantém apenas uma pergunta aberta por vez. */
(function () {
  'use strict';

  angular.module('maresiaApp').directive('mAccordion', function () {
    return {
      restrict: 'E',
      scope: { items: '=' },
      template:
        '<div class="accordion">' +
          '<article class="accordion__item" ng-repeat="item in items track by $index" ng-class="{ active: opened === $index }">' +
            '<button class="accordion__trigger" ng-click="toggle($index)">' +
              '<span>{{ item.title }}</span><strong>{{ opened === $index ? "−" : "+" }}</strong>' +
            '</button>' +
            '<div class="accordion__content"><p>{{ item.content }}</p></div>' +
          '</article>' +
        '</div>',
      link: function (scope) {
        scope.opened = 0;
        scope.toggle = function (index) {
          scope.opened = scope.opened === index ? null : index;
        };
      }
    };
  });
})();
