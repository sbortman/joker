<%--
  Created by IntelliJ IDEA.
  User: adrake
  Date: 9/2/15
  Time: 3:40 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Zoom To</title>
    <asset:stylesheet src="zoom.css"/>
</head>
<body>
<div class="row-fluid">
    <div class="span12">
        <form role="search" style="position: absolute; left: 40px; top: 10px; width: 300px;" id="zoomToForm">
            <div class="form-group">
                <div class="input-group" id="zoom-input-group">
                    <input class="form-control" id="coordInput" style="box-shadow: 0px 5px 5px #808080; z-index: 9999" type="text" placeholder="Search by coordinates">
                    <div class="input-group-btn">
                        <button id="zoomButton" class="btn btn-primary" style="box-shadow: 0px 6px 5px #808080;" type="button"><i class="glyphicon glyphicon-search"></i></button>
                    </div>
                </div>
            </div>
        </form>
        <div id="map" class="map"></div>
        <p>test fdsfdf</p>
    </div>
</div>

<asset:javascript src="zoom.js"/>
<asset:script>
    $(document).ready(function(){

        MapWidget.init();

    });
</asset:script>
<asset:deferredScripts/>

</body>
</html>