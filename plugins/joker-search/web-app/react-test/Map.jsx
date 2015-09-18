var Map = React.createClass({
  getDefaultProps: function () {
    return{
      initialZoom: 4,
      searchZoom: 14,
      lat: 39.57,
      lon: 85.42,
    }
  },
  statics: {
    zoomTo: function (lat, lon) {

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
      map.getView().setZoom(14);

    }
  },
  init: function () {
    mapView = new ol.View({
      center: [this.props.lat, this.props.lon],
      zoom: this.props.initialZoom
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
  },
  componentDidMount: function () {  
    this.init();
  },
  render: function(){
    return(
      <div className="container-fluid">
        <h3>React | Search</h3>
        <div className="row">
          <div className="col-md-9">
            <SearchInput/>
            <div id="map"></div>
          </div>
          <div className="col-md-3">
            <ImageList/>
          </div>
        </div>
      </div>
    )
  }
});