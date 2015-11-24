(function() {
  'use strict';

  angular
    .module('app')
    .factory('FilterService', FilterService);

  /** @ngInject */
  function FilterService($modal, $log, MapService) {

    var Service = {
      getDisplay: getDisplay,
      openModal: openModal
    };

    function getDisplay() {
      return 'Aucun filtre'
    }

    function openModal() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/components/filter/erFilter.tpl.html',
        controller: 'ErFilterController',
        size: 'lg'
      });

      modalInstance.result.then(function (a) {
        $log.info('>>: ' + a);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }


    return Service;
  }
})();
