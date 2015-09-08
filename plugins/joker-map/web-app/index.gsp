<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <asset:stylesheet src="mapWidget.css"/>
</head>

<body>
    <h1>Map</h1>
    <div id="map"></div>
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