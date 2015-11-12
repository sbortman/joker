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
    <title>Demo | Search</title>
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
        <div style="background-color: #ccc; height: 600px;" class="col-md-3"></div>
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