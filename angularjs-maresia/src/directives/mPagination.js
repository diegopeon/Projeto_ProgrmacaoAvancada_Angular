/* Diretiva de paginação: recebe página atual, total e devolve a alteração por callback. */
(function () {
  'use strict';

  angular.module('maresiaApp').directive('mPagination', function () {
    return {
      restrict: 'E',
      scope: {
        currentPage: '=',
        totalPages: '=',
        onChange: '&'
      },
      template:
        '<nav class="pagination" aria-label="Paginação de rotas">' +
          '<button ng-disabled="currentPage === 1" ng-click="go(currentPage - 1)">Anterior</button>' +
          '<button ng-repeat="page in pages() track by $index"' +
            ' ng-class="{ active: page === currentPage }"' +
            ' ng-click="go(page)">{{ page }}</button>' +
          '<button ng-disabled="currentPage === totalPages" ng-click="go(currentPage + 1)">Próxima</button>' +
        '</nav>',
      link: function (scope) {
        scope.pages = function () {
          var pages = [];
          for (var i = 1; i <= scope.totalPages; i++) {
            pages.push(i);
          }
          return pages;
        };

        scope.go = function (page) {
          if (page < 1 || page > scope.totalPages) return;
          // Bug corrigido: atualiza currentPage no scope local E chama o callback,
          // garantindo que o two-way binding e o controller pai sejam notificados.
          scope.currentPage = page;
          scope.onChange({ page: page });
        };
      }
    };
  });
})();
