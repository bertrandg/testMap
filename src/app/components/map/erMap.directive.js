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
    function ErMapController($log, $timeout, $element, GeoDataService, ItemDetailsService) {
      var vm = this;
      
      var map = new L.Map('map', {
        center: new L.LatLng(45.755658, 4.834432),
        zoom: 13, 
        layers: [new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { maxZoom: 21 })]
      });

      var MarkerExtended = L.CircleMarker.extend({
         options: {
            radius: 8
         }
      });

      var markers = null;

      GeoDataService.list.subscribe(function(list) {
        $log.log('Observable subscriber called ---> MAP ', list.length);
        addMarkers(list);
      })

      function addMarkers(list) {
        if(markers) {
          map.removeLayer(markers);
          markers.clearLayers();
          markers = null;
        }

        if(list.length == 0) return;

        GeoDataService.mapWIP = true;
        console.time('clustering');

        var markerList = [];
        for (var i = 0; i < list.length; i++) {
          var a = list[i];
          if(a.latitude && a.longitude) {
            var marker = new MarkerExtended(new L.LatLng(a.latitude, a.longitude), { title: a.id, fill: true, fillColor: 'black', color: '#999', stroke: true, weight: 12, opacity: .5, fillOpacity: 1 });
            marker.on('click', clickMarker);
            markerList.push(marker);
          }
        }

        $timeout(function() {
          markers = new L.MarkerClusterGroup({ chunkedLoading: true, chunkProgress: updateProgressBar });
          markers.addLayers(markerList);
          //markers.on('click', clickMarker);
          map.addLayer(markers);
        });
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

          console.timeEnd('clustering');

          $timeout(function() {
            GeoDataService.mapWIP = false;
          })
        }
      }

      function clickMarker(e) {
        ItemDetailsService.openModal(this.options.title);
      }
    }
  }

})();
