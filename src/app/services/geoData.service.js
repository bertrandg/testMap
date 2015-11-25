(function() {
  'use strict';

  angular
    .module('app')
    .factory('GeoDataService', GeoDataService);

  /** @ngInject */
  function GeoDataService($log, $http, $timeout, $q, GridService, UtilsService, Files) {
    var _list = [];
    var _filteredList = [];
    var _observer;

    L.Icon.Default.imagePath = 'assets/images/leaflet';

    var Service = {
      totalItems: 0,
      mapWIP: true,
      list: Rx.Observable.create(function(observer) {
        _observer = observer;
      }).share(),
      loadData: loadData,
      filterData: filterData,
      getItem: getItem
    };

    $timeout(function() {
      _observer.onNext(_list);
    });

    function loadData() {
      $q.all(Files.map(function (item) {
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
          Service.totalItems = _list.length;
          _observer.onNext(_list);
        }, 1000);
      }

      function loadDataFailed(error) {
        $log.error('XHR Failed for getData.' + angular.toJson(error.data, true));
      }
    }

    function getItem(id) {
      return _.find(_list, function(item) { item.id = id; });
    }

    function filterData(filter) {

      $timeout(function() {

        // Si aucun filtre activé, on retourne la liste compléte
        if( !filter.name.enabled && !filter.gender.enabled && !filter.position.enabled && !filter.date.enabled )
        {
          _observer.onNext(_list);
          return;
        }

        _filteredList = _list.filter(function(item) {

          // Filter on NAME
          if( filter.name.enabled && 
              filter.name.value != '' && 
              item.name.indexOf(filter.name.value) == -1 )
                return false;

          // Filter on GENDER
          if( filter.gender.enabled && 
              filter.gender.value != '' && 
              item.gender != filter.gender.value ) 
                return false;

          // Filter on POSITION
          if(filter.position.enabled) {
            if( filter.position.startLatValue != '' && 
                item.latitude < filter.position.startLatValue ) 
                  return false;

            if( filter.position.endLatValue != '' && 
                item.latitude > filter.position.endLatValue ) 
                  return false;

            if( filter.position.startLngValue != '' && 
                item.longitude < filter.position.startLngValue ) 
                  return false;

            if( filter.position.endLngValue != '' && 
                item.longitude > filter.position.endLngValue ) 
                  return false;
          }

          // Filter on DATE
          if(filter.date.enabled) {
            if( filter.date.startValue != '' && 
                GridService.dateComparator(UtilsService.formatDate(filter.date.startValue), item.registered) > 0 ) 
                  return false;

            if( filter.date.endValue != '' && 
                GridService.dateComparator(UtilsService.formatDate(filter.date.endValue), item.registered) < 0 ) 
                  return false;
          }
          return true;
        });

        _observer.onNext(_filteredList);
      });
    }

    return Service;
  }
})();
