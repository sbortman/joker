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

    var zoomToLevel = 14;
    var map,
        mapView,
        searchLayerVector, // Used for visualizing the search items map markers polygon boundaries
        wktFormat,
        wkt3857Feature,
        gj4326Feature,
        gj3857Feature,
        searchFeatureWkt,
        iconStyle,
        wktStyle,
        wktOutput3857,
        webAppConfig;

    searchLayerVector = new ol.layer.Vector({
        source: new ol.source.Vector()
    });

    /**
     * @function init
     * @memberof Map
     */
    function init(initParams) {
        webAppConfig = initParams;

        //console.log(webAppConfig);

        iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: webAppConfig.twoFishes.markerIcon
            }))
        });

        wktStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 100, 50, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                width: 1.5,
                color: 'rgba(255, 100, 50, 0.6)'
            })
        });

        mapView = new ol.View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 2
        });
        map = new ol.Map({
            layers: [
                new ol.layer.Tile({
//                    source: new ol.source.OSM()
                    source: new ol.source.TileWMS(webAppConfig.referenceMap)
                })],
            controls: ol.control.defaults({
                attributionOptions: ({
                    collapsible: false
                })
            }),
            target: 'map',
            view: mapView
        });

        map.addLayer(searchLayerVector);

    }

    var itemExtent = "...";
    var itemtExtent4326 = "...";

    function setItemExtent(extent3857, extent4326) {
        itemExtent = extent3857;
        itemtExtent4326 = extent4326;
    }

    function getItemExtent4326() {
        var formattedExtent = String(itemExtent).split(",");
        var formatted4326 = formattedExtent[0] + ', ' + formattedExtent[1] + ', ' + formattedExtent[2] + ', ' + formattedExtent[3];

        return formatted4326;
    }

    function getItemExtent3857() {
        var formattedExtent = String(itemtExtent4326).split(",");
        var formatted4326 = formattedExtent[0] + ', ' + formattedExtent[1] + ', ' + formattedExtent[2] + ', ' + formattedExtent[3];

        return formatted4326;
    }

    function getFormats(wktParm) {

        // Used for formating the wkt Output information
        var wktFormat = new ol.format.WKT();

        wkt3857Feature = wktFormat.readFeature(wktParm, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            }
        ); // returns a feature

        wktOutput3857 = wktFormat.writeFeature(wkt3857Feature, {
                dataProjection: 'EPSG:3857',
                featureProjection: 'EPSG:3857'
            }
        ); // returns a wkt string

        var wkt4326Feature = wktFormat.readFeature(wktParm, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:4326'
            }
        ); // returns a feature

        // Used for formating the geoJson Output information
        var geoJsonFormat = new ol.format.GeoJSON();

        gj4326Feature = geoJsonFormat.writeFeature(wkt4326Feature,{
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326'
        }); // returns GeoJSON in EPSG:4326
        //console.log('gj4326Feature', gj4326Feature);

        gj3857Feature = geoJsonFormat.writeFeature(wkt3857Feature,{
            dataProjection: 'EPSG:3857',
            featureProjection: 'EPSG:3857'
        }); // returns GeoJSON in EPSG:3857
        //console.log('gj3857Feature', gj3857Feature);

        //console.log(geoJsonFormat.readProjection(gj4326Feature));

    }

    function getWkt3857(){
        return wktOutput3857;
    }

    function getGj4326Feature(){
        return gj4326Feature;
    }

    function getGj3857Feature(){
        return gj3857Feature;
    }

    /**
     * Clear a layer's source, and
     * remove all features
     * @function clearLayerSource
     * @memberof Map
     * @param {layer} layer - layer
     */
    function clearLayerSource(layer) {

        if (layer.getSource().getFeatures().length >= 1) {
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
    function addMarker(lat, lon, layer) {

        clearLayerSource(layer);
        var centerFeature = new ol.Feature({
            geometry: new ol.geom.Point(
                ol.proj.transform(
                    [parseFloat(lon), parseFloat(lat)], 'EPSG:4326', 'EPSG:4326')
            )
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
    function zoomAnimate() {

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

        // Figure out 3857 later,  once we get our basemap inside
        map.getView().setCenter(
            ol.proj.transform([
                parseFloat(lon),
                parseFloat(lat)
            ], 'EPSG:4326', 'EPSG:4326')
        );

        map.getView().setZoom(zoomToLevel);
        addMarker(parseFloat(lat), parseFloat(lon), searchLayerVector);

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
            geometry: new ol.geom.Point(
                ol.proj.transform(
                    [inputExtent.bounds.ne.lng, inputExtent.bounds.ne.lat], 'EPSG:4326', 'EPSG:4326')
            )
        });

        var swFeature = new ol.Feature({
            geometry: new ol.geom.Point(
                ol.proj.transform(
                    [inputExtent.bounds.sw.lng, inputExtent.bounds.sw.lat], 'EPSG:4326', 'EPSG:4326')
            )
        });

        searchLayerVector.getSource().addFeatures([neFeature, swFeature]);

        itemExtent = searchLayerVector.getSource().getExtent();
        //console.log('itemExtent', itemExtent);

        var itemExtent3857 = ol.proj.transformExtent(itemExtent, 'EPSG:4326', 'EPSG:3857');
        //console.log(itemExtent3857);

        setItemExtent(itemExtent, itemExtent3857);

        zoomAnimate();

        // Moves the map to the extent of the search item
        map.getView().fit(itemExtent, map.getSize());

        // Clean up the searchLayer extent for the next query
        searchLayerVector.getSource().clear();

        // Add the WKT to the map to illustrate the boundary of the search item
        if (inputExtent.wkt !== undefined) {

            wktFormat = new ol.format.WKT();
            // WKT string is in 4326 so we need to reproject it for the current map
            //searchFeatureWkt = wktFormat.readFeature(inputExtent.wkt, {
            //    dataProjection: 'EPSG:4326',
            //    //featureProjection: 'EPSG:3857'
            //    featureProjection: 'EPSG:4326'
            //});
            searchFeatureWkt = wktFormat.readFeature(inputExtent.wkt);

            searchFeatureWkt.setStyle(wktStyle);
            searchLayerVector.getSource().addFeatures([searchFeatureWkt]);

            getFormats(inputExtent.wkt);

        }
        else {
            // Add a marker to the map if there isn't a wkt
            // present with the search item
            zoomTo(inputExtent.lat, inputExtent.lng);
        }

    }

    function getExtent(extent) {
        //console.log(extent);
        return extent;
    }

    return {
        init: init,
        zoomTo: zoomTo,
        zoomToExt: zoomToExt,
        clearLayerSource: clearLayerSource,
        searchLayerVector: searchLayerVector,
        getItemExtent4326: getItemExtent4326,
        getItemExtent3857: getItemExtent3857,
        getWkt3857: getWkt3857,
        getGj4326Feature: getGj4326Feature,
        getGj3857Feature: getGj3857Feature


    };

})();