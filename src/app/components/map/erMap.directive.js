(function() {
  'use strict';

  angular
    .module('app')
    .directive('erMap', erMap);

  /** @ngInject */
  function erMap() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/map/erMap.tpl.html',
      scope: {},
      controller: ErMapController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ErMapController($log, $timeout, $element, GeoDataService) {
      var vm = this;
      
      var map = new L.Map('map', {
        center: new L.LatLng(45.755658, 4.834432), 
        zoom: 13, 
        layers: [new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { maxZoom: 21 })]
      });

      var markers = new L.MarkerClusterGroup({ chunkedLoading: true, chunkProgress: updateProgressBar });

      GeoDataService.list.subscribe(function(list) {
        $log.log('Observable subscriber called ---> MAP ', list.length);
        addMarkers(list);
      })

      function addMarkers(list) {
        map.removeLayer(markers);
        markers.clearLayers();

        if(list.length == 0) return;

        GeoDataService.mapWIP = true;

        var markerList = [];
        for (var i = 0; i < list.length; i++) {
          var a = list[i];
          if(a.latitude && a.longitude) {
            var marker = new L.Marker(new L.LatLng(a.latitude, a.longitude), { id: a.id });
            markerList.push(marker);
          }
        }
        console.time('clustering');

        markers.addLayers(markerList);
        //markers.on('click', clickMarker);
        map.addLayer(markers);

        console.timeEnd('clustering');
      }

      function updateProgressBar(processed, total, elapsed, layersArray) {
        var progress = $('#progress', $element)[0];
        var progressBar = $('#progress-bar', $element)[0];

        if (elapsed > 1000) {
          progress.style.display = 'block';
          progressBar.style.width = Math.round(processed/total*100) + '%';
        }

        if (processed === total) {
          progress.style.display = 'none';

          $timeout(function() {
            GeoDataService.mapWIP = false;
          })
        }
      }

      function clickMarker(e) {
        $log.info('click > ', e);
      }
    }
  }

})();
