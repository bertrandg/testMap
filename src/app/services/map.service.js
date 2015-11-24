(function() {
  'use strict';

  angular
    .module('app')
    .factory('MapService', MapService);

  /** @ngInject */
  function MapService($log, $http, $timeout, $q) {
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
      var apiList = ['assets/data/positions.json', 'assets/data/positions2.json', 'assets/data/positions3.json'];

      $q.all(apiList.map(function (item) {
        return $http({
          method: 'GET',
          url: item
        });
      })).then(loadDataComplete).catch(loadDataFailed);

      function loadDataComplete(results) {
        angular.forEach(results, function (result) {
          _list = _list.concat(result.data);
        });
        
        $timeout(function() {
          _observer.onNext(_list);
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
