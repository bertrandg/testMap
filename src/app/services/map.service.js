(function() {
  'use strict';

  angular
    .module('app')
    .factory('MapService', MapService);

  /** @ngInject */
  function MapService($log, $http, $timeout) {
    var _apiHost = 'assets/data/positions.json';
    var _list = [];
    var _observer;

    L.Icon.Default.imagePath = 'assets/images/leaflet';

    var Service = {
      loadData: loadData,
      filterData: filterData,
      list: Rx.Observable.create(function(observer) {
        _observer = observer;
        _observer.onNext(_list);
      })
    };

    function loadData() {
      $http.get(_apiHost).then(loadDataComplete).catch(loadDataFailed);

      function loadDataComplete(response) {
        _list = response.data;

        $timeout(function() {
          _observer.onNext(response.data);
        }, 1000);
      }

      function loadDataFailed(error) {
        $log.error('XHR Failed for getData.' + angular.toJson(error.data, true));
      }
    }

    function filterData() {
        //_observer.onNext(_list);
    }

    return Service;
  }
})();
