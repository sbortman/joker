/**
 * Created by adrake on 9/2/15.
 */
// Set up the ol3 map

var mapView = new ol.View({
    center: [0, 0],
    zoom: 2
});
var mapZoom = new ol.Map({
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