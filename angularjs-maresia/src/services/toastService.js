/* Serviço simples para disparar notificações temporárias na interface. */
(function () {
  'use strict';

  angular
    .module('maresiaApp')
    .factory('toastService', function ($timeout) {
      const toast = {
        visible: false,
        type: 'info',
        message: ''
      };

      function show(type, message) {
        toast.type = type;
        toast.message = message;
        toast.visible = true;

        $timeout(function () {
          toast.visible = false;
        }, 3200);
      }

      return {
        toast: toast,
        show: show,
        close: function () { toast.visible = false; }
      };
    });
})();
