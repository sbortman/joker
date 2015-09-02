/**
 * Created by sbortman on 9/2/15.
 */
//= require webjars/openlayers/3.8.2/ol.js
//= require_self

var MapWidget = (function ()
{
    'use strict';
    var map;
    var zoomToLevel = 12; // Change this to desired zoom level
    function init()
    {
        //layers = [
        //    new ol.layer.Tile( {
        //        source: new ol.source.TileWMS( {
        //            url: 'http://demo.boundlessgeo.com/geoserver/wms',
        //            params: {
        //                'LAYERS': 'ne:NE1_HR_LC_SR_W_DR'
        //            }
        //        } )
        //    } )
        //];
        //
        //map = new ol.Map( {
        //    controls: ol.control.defaults().extend( [
        //        new ol.control.ScaleLine( {
        //            units: 'degrees'
        //        } )
        //    ] ),
        //    layers: layers,
        //    target: 'map',
        //    view: new ol.View( {
        //        projection: 'EPSG:4326',
        //        center: [0, 0],
        //        zoom: 2
        //    } )
        //} );

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

    function zoomTo(lat, lon) {

        var start = + new Date();
        var pan = ol.animation.pan({
            duration: 750,
            source: (map.getView().getCenter()),
            start: start
        });
        var zoom = ol.animation.zoom({
            duration: 1000,
            resolution: map.getView().getResolution()
        });

        map.beforeRender(zoom,pan);
        map.getView().setCenter(ol.proj.transform([parseFloat(lon), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(zoomToLevel);

    }

    return {
        init: init,
        zoomTo: zoomTo
    }
})();