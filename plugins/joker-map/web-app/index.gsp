<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <%--
    <link rel="stylesheet" href="http://openlayers.org/en/v3.8.2/css/ol.css"/>
    <link rel="stylesheet" href="css/mapWidget.css" type="text/css">
    --%>
    <asset:stylesheet src="mapWidget.css"/>
</head>

<body>
<h1>Here</h1>
<div id="map"></div>
<%--
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="http://openlayers.org/en/v3.8.2/build/ol.js"></script>
<script src="js/mapWidget.js"></script>
--%>
<asset:javascript src="mapWidget.js"/>
<asset:javascript src="jquery.js"/>
<asset:script>
    $( document ).ready( function ()
    {
        MapWidget.init();
    } );
</asset:script>
<asset:deferredScripts/>
</body>
</html>