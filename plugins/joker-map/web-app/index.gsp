<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Demo | Map</title>
        <asset:stylesheet src="map.css"/>
    </head>

    <body>
        <div class="container-fluid">
            <header>
                <h1 class="alert alert-success">Demo | Map</h1>
            </header>
        </div>
        <div id="map"></div>
        <asset:javascript src="manifest-map.js"/>

        <asset:script>

            $(document).ready(function (){
                Map.init();
            });

        </asset:script>
        <asset:deferredScripts/>
    </body>
</html>