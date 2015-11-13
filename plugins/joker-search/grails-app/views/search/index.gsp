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
                        %{--<label class="label label-info" for="infoBbox">Bounding Box:</label>--}%
                        %{--<p id="infoBbox"></p>--}%
                        %{--<label class="label label-info" for="infoWkt">WKT:</label>--}%
                        %{--<p id="infoWkt"></p>--}%
                        <div class="form-group">
                            <button type="button" style="width: 100%;" class="btn btn-success" id="btnInfoBbox">Copy
                        BBox</button>
                        </div>
                        <div class="form-group">
                            <button type="button" style="width: 100%;" class="btn btn-success" id="btnInfoWkt">Copy
                            WKT</button>
                        </div>
                        <div class="form-group">
                            <button type="button" style="width: 100%;" class="btn btn-success" id="btnInfoGeoJson"
                                    disabled>Copy
                            GeoJSON</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<asset:javascript src="manifest-search.js"/>
<asset:script>
    $(document).ready(function(){
        var webAppConfig = ${raw( ( webAppConfig as JSON ).toString() )};
            Search.init(webAppConfig);
            Map.init(webAppConfig);
        });
</asset:script>
<asset:deferredScripts/>

</body>
</html>