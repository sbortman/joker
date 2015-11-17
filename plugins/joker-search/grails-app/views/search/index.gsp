<%--
  Created by IntelliJ IDEA.
  User: adrake
  Date: 9/2/15
  Time: 3:40 PM
--%>

<%@ page import="grails.converters.JSON" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>OMAR | GeoSearch</title>
    <asset:stylesheet src="manifest-search.css"/>
</head>

<body>

<div class="container">
    <br>
    <div class="row alert alert-success">
        <div class="col-md-12">
            <h1>OMAR | GeoSearch</h1>
        </div>
    </div>
</div>


<div class="container">
    <div class="row">
        <div id="map" class="map col-md-9">
            <div class="span12">
                <form id="searchForm" role="search">
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-btn">
                                <select id="searchSelect" class="form-control selectpicker" data-style="btn-primary">
                                    <option data-icon="glyphicon-map-marker"
                                            value="place">&nbsp;&nbsp;Place&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                    <option data-icon="glyphicon glyphicon-screenshot"
                                            value="coordinate">&nbsp;&nbsp;Coordinate&nbsp;&nbsp;</option>
                                    %{--<option data-icon="glyphicon glyphicon-picture" value="imageId">&nbsp;&nbsp;Image--}%
                                    %{--ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>--}%
                                    %{--<option data-icon="glyphicon glyphicon-pushpin" value="beNum">&nbsp;&nbsp;B.E. Number&nbsp;</option>--}%
                                </select>
                            </div>
                            <input id="searchInput" class="form-control" type="text" placeholder="" value="">

                            <div class="input-group-btn">
                                <button id="searchButton" class="btn btn-primary" type="button"><span
                                        class="glyphicon glyphicon-search"></span></button>
                                <button id="clearSearchButton" class="btn btn-primary" type="button"><span
                                        class="glyphicon glyphicon-remove"></span></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div id="info" style="display: none;" class="col-md-3">
            <div class="panel panel-primary">
                <div class="panel-heading">Information</div>
                <div class="panel-body">
                    <form>
                        <div class="form-group">
                            <label class="label label-info" for="infoPlaceName">Name:</label>
                            <p id="infoPlaceName"></p>
                        </div>
                        <div class="form-group">
                            <label class="label label-info" for="infoPopulation">Population:</label>
                            <p id="infoPopulation"></p>
                        </div>
                        <div class="form-group">
                            <label class="label label-info" for="infoCentroid">Centroid:</label>
                            <p id="infoCentroid"></p>
                        </div>
                        <div class="form-group">
                            <button type="button" style="width: 100%;" class="btn btn-success" data-toggle="modal"
                                    data-target="#infoBboxModal" id="btnInfoBbox">Copy
                        BBox</button>
                        </div>
                        <div class="form-group">
                            <button type="button" style="width: 100%;" class="btn btn-success" data-toggle="modal"
                                    data-target="#infoWktModal" id="btnInfoWkt">Copy
                            WKT</button>
                        </div>
                        <div class="form-group">
                            <button type="button" style="width: 100%;" class="btn btn-success" data-toggle="modal"
                                    data-target="#infoGeoJsonModal" id="btnInfoGeoJson">Copy
                            GeoJSON</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <p><small>Geocoding engine: Twofishes (powered by Geonames.org)</small></p>
</div>

<div class="modal fade" id="infoBboxModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Bounding Box Information</h4>
            </div>
            <div class="modal-body">
                <p>Toggle the tabs below to view the bounding box in different projections.</p>
                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#bBoxEpsg4326" aria-controls="bBoxEpsg4326" role="tab" data-toggle="tab">EPSG: 4326</a></li>
                    <li role="presentation"><a href="#bBoxEpsg3857" aria-controls="bBoxEpsg3857" role="tab"
                       data-toggle="tab">EPSG: 3857</a></li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active in active" id="bBoxEpsg4326">
                        <br>
                        <button id="bBox4326Copy" type="button" class="btn btn-warning">Copy to
                        Clipboard</button>
                        <br>
                        <br>
                        <code id="infoBbox4326"></code>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="bBoxEpsg3857">
                        <br>
                        <button id="bBox3857Copy" type="button" class="btn btn-warning">Copy to
                        Clipboard</button>
                        <br>
                        <br>
                        <code id="infoBbox3857"></code>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="infoWktModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">WKT Information</h4>
            </div>
            <div class="modal-body">
                <p>Toggle the tabs below to view the WKT string in different projections.</p>
                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#wktEpsg4326" aria-controls="wktEpsg4326"
                            role="tab" data-toggle="tab">EPSG: 4326</a></li>
                    <li role="presentation"><a href="#wktEpsg3857" aria-controls="wktEpsg3857" role="tab"
                            data-toggle="tab">EPSG: 3857</a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active in active" id="wktEpsg4326">
                        <br>
                        <button id="wkt4326Copy" type="button" class="btn btn-warning">Copy to
                        Clipboard</button>
                        <br>
                        <br>
                        <div style="height: 300px; overflow-y: auto">
                            <code id="infoWkt4326" class="code"></code>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="wktEpsg3857">
                        <br>
                        <button id="wkt3857Copy" type="button" class="btn btn-warning copy-button">Copy to
                        Clipboard</button>
                        <br>
                        <br>
                        <div style="height: 300px; overflow-y: auto">
                            <code id="infoWkt3857" class="code"></code>
                        </div>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="infoGeoJsonModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">GeoJSON</h4>
            </div>
            <div class="modal-body">

                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#geoJsonEpsg4326" aria-controls="geoJsonEpsg4326"
                                                              role="tab" data-toggle="tab">EPSG: 4326</a></li>
                    <li role="presentation"><a href="#geoJsonEpsg3857" aria-controls="geoJsonEpsg3857" role="tab"
                                               data-toggle="tab">EPSG: 3857</a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active in active" id="geoJsonEpsg4326">
                        <br>
                        <button id="geoJson4326Copy" type="button" class="btn btn-warning">Copy to
                        Clipboard</button>
                        <br>
                        <br>
                        <div style="height: 300px; overflow-y: auto">
                            <code id="infoGeoJson4326"></code>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="geoJsonEpsg3857">
                        <br>
                        <button id="geoJson3857Copy" type="button" class="btn btn-warning">Copy to
                        Clipboard</button>
                        <br>
                        <br>
                        <div style="height: 300px; overflow-y: auto">
                            <code id="infoGeoJson3857"></code>
                        </div>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<asset:javascript src="manifest-search.js"/>
<asset:script>
    $(document).ready(function(){
        var webAppConfig = ${raw( ( webAppConfig as JSON ).toString() )};
            Search.init(webAppConfig);
            Map.init(webAppConfig);
        });
</asset:script>
<asset:deferredScripts/>
%{--<script src="https://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.2.0/ZeroClipboard.js"></script>--}%

</body>
</html>