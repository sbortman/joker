/**
 * @classdesc
 * <p>An Openlayers 3 module for creating a map.</p>
 * <hr>
 *
 * @namespace Map
 * @returns {init}
 */
var Map = (function () {

    'use strict';

    //function foo(){
    //    return 1;
    //}
    //
    //function bar(param){
    //    return param;
    //}

    var map;
    var zoomToLevel = 12; // Change this to desired zoom level

    /**
     * @function init
     * @memberof Map
     */
    function init() {

        var mapView = new ol.View({
            center: [0, 0],
            zoom: 2
        });
        map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })],
            controls: ol.control.defaults({
                attributionOptions: ({
                    collapsible: false
                })
            }),
            target: 'map',
            view: mapView
        });

    }

    // TODO: Add this to a pubsub pattern
    /**
     * Add the ability to move and zoom the map
     * to a certain location via a latitude and
     * longitude
     * @function zoomTo
     * @memberof Map
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     */
    function zoomTo(lat, lon) {

        var start = +new Date();
        var pan = ol.animation.pan({
            duration: 750,
            source: (map.getView().getCenter()),
            start: start
        });
        var zoom = ol.animation.zoom({
            duration: 1000,
            resolution: map.getView().getResolution()
        });

        map.beforeRender(zoom, pan);
        map.getView().setCenter(ol.proj.transform([parseFloat(lon), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(zoomToLevel);

    }

    return {
        init: init,
        zoomTo: zoomTo
    };

})();