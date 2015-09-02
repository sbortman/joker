/**
 * Created by sbortman on 9/2/15.
 */
//= require webjars/openlayers/3.8.2/ol.js
//= require_self

var MapWidget = (function ()
{
    'use strict';

    function init()
    {
        var layers = [
            new ol.layer.Tile( {
                source: new ol.source.TileWMS( {
                    url: 'http://demo.boundlessgeo.com/geoserver/wms',
                    params: {
                        'LAYERS': 'ne:NE1_HR_LC_SR_W_DR'
                    }
                } )
            } )
        ];

        var map = new ol.Map( {
            controls: ol.control.defaults().extend( [
                new ol.control.ScaleLine( {
                    units: 'degrees'
                } )
            ] ),
            layers: layers,
            target: 'map',
            view: new ol.View( {
                projection: 'EPSG:4326',
                center: [0, 0],
                zoom: 2
            } )
        } );
    }

    return {
        init: init
    }
})();