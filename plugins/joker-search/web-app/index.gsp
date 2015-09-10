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
    <title>Demo | Search</title>
    <asset:stylesheet src="manifest-search.css"/>
</head>
<body>
    <div class="container-fluid">
        <header>
            <h1 class="alert alert-success">Demo | Search</h1>
        </header>
    </div>
    <div class="row-fluid">
        <div class="span12">
            <form role="search" style="position: absolute; left: 40px; top: 120px; width: 300px;" id="searchForm">
                <div class="form-group">
                    <div class="input-group" id="zoom-input-group">
                        <input class="form-control" id="searchInput" style="box-shadow: 0px 5px 5px #808080; z-index:
                        9999" type="text" placeholder="Search by place name">
                        <div class="input-group-btn">
                            <button id="zoomButton" class="btn btn-primary" style="box-shadow: 0px 6px 5px #808080;" type="button"><i class="glyphicon glyphicon-search"></i></button>
                        </div>
                    </div>
                </div>
            </form>
            <div id="map" class="map"></div>
        </div>
    </div>

    <asset:javascript src="manifest-search.js"/>
    <asset:script>
        $(document).ready(function(){
            Map.init();
        });
    </asset:script>
    <asset:deferredScripts/>

</body>
</html>