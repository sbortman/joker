<%--
  Created by IntelliJ IDEA.
  User: sbortman
  Date: 9/2/15
  Time: 11:29 AM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
    <asset:stylesheet src="mapView.css"/>
</head>

<body>
<div id="map"></div>
<asset:javascript src="mapView.js"/>
<asset:script>
    $(document).ready(function() {
        'use strict';
        MapView.init();
    });
</asset:script>
<asset:deferredScripts/>
</body>
</html>