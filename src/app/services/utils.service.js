(function() {
  'use strict';

  angular
    .module('app')
    .factory('UtilsService', UtilsService);

  /** @ngInject */
  function UtilsService($filter) {

    var Service = {
      formatDate: formatDate
    };

    function formatDate(date) {
      return $filter('date')(date, 'dd/MM/yyyy');
    }

    return Service;
  }
})();
