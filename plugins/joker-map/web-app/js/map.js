/**
 * @classdesc
 * <p>An Openlayers 3 module for creating a map</p>
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
    var zoomToLevel = 14; // Change this to desired zoom level
    var searchLayerVector;
    var iconStyle;

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

        searchLayerVector = new ol.layer.Vector({
            source: new ol.source.Vector()
        });

        map.addLayer(searchLayerVector);

        iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'assets/search_marker_green.png'
            }))
        });

    }

    /**
     * Clear a layer's source, and
     * remove all features
     * @function clearLayerSource
     * @memberof Map
     * @param {layer} layer - layer
     */
    function clearLayerSource(layer){
        if (layer.getSource().getFeatures().length >=1 ){
            console.log('We have features...remove them...');
            layer.getSource().clear();
        }
    }

    /**
     * Add a marker to the map
     * at a specified point.  Clears
     * previous instance of a maker
     * if they exist before placing
     * a new one
     * @function addMarker
     * @memberof Map
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {layer} layer - layer
     */
    function addMarker(lat, lon, layer){

        clearLayerSource(layer);
        var centerFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lon), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857'))
        });
        centerFeature.setStyle(iconStyle);
        layer.getSource().addFeatures([centerFeature]);
    }

    /**
     * Animates the pan and zoom for
     * the map
     * @function zoomAnimate
     * @memberof Map
     */
    function zoomAnimate(){

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
    }

    /**
     * Move and zoom the map to a
     * certain location via a latitude
     * and longitude
     * @function zoomTo
     * @memberof Map
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     */
    function zoomTo(lat, lon) {

        zoomAnimate();
        map.getView().setCenter(ol.proj.transform([parseFloat(lon), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(zoomToLevel);
        addMarker(parseFloat(lat),parseFloat(lon), searchLayerVector);

    }

    /**
     * Move and zoom the map to a
     * certain location via a latitude
     * and longitude
     * @function zoomToExt
     * @memberof Map
     * @param {obj} inputExtent - inputExtent
     */
    function zoomToExt(inputExtent) {

        clearLayerSource(searchLayerVector);

        var neFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([inputExtent.bounds.ne.lng, inputExtent.bounds.ne.lat], 'EPSG:4326', 'EPSG:3857'))
        });

        var swFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([inputExtent.bounds.sw.lng, inputExtent.bounds.sw.lat], 'EPSG:4326', 'EPSG:3857'))
        });

        searchLayerVector.getSource().addFeatures([neFeature, swFeature]);

        var searchItemExtent = searchLayerVector.getSource().getExtent();

        zoomAnimate();

        map.getView().fit(searchItemExtent, map.getSize());

        searchLayerVector.getSource().clear(); // Clean up the searchLayer extent for the next query

        addMarker(inputExtent.lat, inputExtent.lng, searchLayerVector);

    }

    return {
        init: init,
        zoomTo: zoomTo,
        zoomToExt: zoomToExt
    };

})();