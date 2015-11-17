/**
 * @classdesc
 * <p>A module for searching the twofishes database with
 *  autocomplete functionality.
 * </p>
 * <hr>
 *
 * @namespace Search
 */
var Search = (function () {
    "use strict";

    // jasmine test functions
    //function foo(){
    //    return 1;
    //}
    //
    //function bar(param){
    //    return param;
    //}

    var twoFishesUrl;

    var webAppConfig;

    // cache DOM
    var $el = $('#searchForm');
    var $searchSelect = $el.find('#searchSelect');
    var $searchInput = $el.find('#searchInput');
    var $searchButton = $el.find('#searchButton');
    var $clearSearchButton = $el.find('#clearSearchButton');

    // bind events
    $el.keypress(suppressKey);
    $searchSelect.on('change', changeSearchType);
    $clearSearchButton.on('click', clearSearch);

    /**
     * Remove enter/return key forcing a form
     * submit, and reloading the page
     * @function suppressKey
     * @memberof Search
     */
    function suppressKey(event) {
        if (event.keyCode === 10 || event.keyCode === 13) {
            event.preventDefault();
        }
    }

    /**
     * Clear the search input, and
     * remove the map marker and polygon boundaries
     * @function clearSearch
     * @memberof Search
     */
    function clearSearch() {
        $searchInput.val('');
        Map.clearLayerSource(Map.searchLayerVector);
    }

    function changeSearchType() {

        var searchType = $searchSelect.val();

        switch (searchType) {
            case 'place':
                searchByPlace();
                break;
            case 'coordinate':
                searchByCoordinates();
                break;
            //case 'imageId':
            //    $searchInput.val('');
            //    $searchInput.autocomplete('disable');
            //    break;
            //case'beNum':
            //    $searchInput.val('');
            //    $searchInput.autocomplete('disable');
            //    break;
            default:
                console.log('nothing selected');
        }

        return 'changeSearchType fired';
    }

    // ############################################################################
    // TODO: Pubsub pattern
    // ############################################################################

    /**
     * Searches the TwoFish geocoding engine using
     * a jquery autocomplete widget.  Pans and zooms
     * the map on a selected item.
     * @function searchByPlace
     * @memberof Search
     */
    function searchByPlace() {
        $searchInput.val('');
        $searchInput.attr("placeholder", "Search by place");

        twoFishesUrl =
            webAppConfig.twoFishes.proxyUrl
                //'/joker-ui/twoFishesProxy'
            + '?responseIncludes=WKT_GEOMETRY_SIMPLIFIED&autocomplete=true&maxInterpretations=10&autocompleteBias=BALANCED';

        $searchInput.autocomplete({
            serviceUrl: twoFishesUrl,
            dataType: 'json',
            type: 'GET',
            transformResult: function (response) {
                //console.log('response', response);
                return {
                    suggestions: $.map(response.interpretations, function (dataItem) {
                        //console.log(dataItem);
                        //console.log('value: ' + dataItem.feature.displayName + ' data: ' +
                        // dataItem.feature.displayName);
                        return {
                            value: dataItem.feature.displayName,
                            data: dataItem.feature.displayName,
                            lat: dataItem.feature.geometry.center.lat,
                            lng: dataItem.feature.geometry.center.lng,
                            bounds: dataItem.feature.geometry.bounds,
                            wkt: dataItem.feature.geometry.wktGeometrySimplified,
                            dataAll: dataItem.feature
                        };
                    })
                };
            },
            onSelect: function (suggestion) {
                //console.log('You selected: ' + suggestion.value + ', \n' + suggestion.lat + ', \n' + suggestion.lng);
                //console.log('suggestion', suggestion);
                if (suggestion.bounds === undefined) {
                    //console.log('bounds is undefined!');
                    Map.zoomTo(suggestion.lat, suggestion.lng);
                    addInfo(suggestion.dataAll);
                    $searchInput.val('');
                }
                else {
                    Map.zoomToExt(suggestion);
                    addInfo(suggestion.dataAll);
                    $searchInput.val('');
                }

            }
        });

    }

    // TODO: Cache the DOM elements
    function addInfo(info) {
        clearInfo();
        //console.log(info);
        $('#info').show();

        $('#infoPlaceName').html(info.displayName);
        $('#infoPopulation').html(info.attributes.population);
        $('#infoCentroid').html(info.geometry.center.lat + ', ' + info.geometry.center.lng);
        $('#infoBbox4326').html(Map.getItemExtent4326());
        $('#infoBbox3857').html(Map.getItemExtent3857());
        $('#infoWkt4326').html(info.geometry.wktGeometrySimplified);
        $('#infoWkt3857').html(Map.getWkt3857());
        $('#infoGeoJson4326').html(Map.getGj4326Feature());
        $('#infoGeoJson3857').html(Map.getGj3857Feature());
    }

    function clearInfo() {
        $('#infoPlaceName').html('');
        $('#infoPopulation').html('');
        $('#infoCentroid').html('');
        $('#infoBbox4326').html('');
        $('#infoBbox3857').html('');
        $('#infoWkt4326').html('');
        $('#infoWkt3857').html('');
    }

    function searchByCoordinates() {
        $searchInput.val('');
        $searchInput.attr("placeholder", "Search by coordinate");
        $searchInput.autocomplete('disable');
        $searchButton.on('click', ZoomTo.cycleRegExs);
    }

    //function searchByImageId(){
    //    console.log('imageId selected');
    //}
    //
    //function searchByBeNum(){
    //    console.log('beNum selected');
    //}

    function setupZeroClipboard(){
        console.log('webApp.swfPath', webAppConfig.zeroClipboard.swfPath);

        // ###### BBox
        var clipBbox4326 = new ZeroClipboard($("#bBox4326Copy"));
        clipBbox4326.on('copy', function (event) {
            event.clipboardData.setData('text/plain', $('#infoBbox4326').html());
        });

        clipBbox4326.on('aftercopy', function (event) {
            toastr.info('Data copied to clipboard...', 'Info');
            console.log('Copied to clipboard: ' + event.data['text/plain']);
        });

        var clipBbox3857 = new ZeroClipboard($("#bBox3857Copy"));
        clipBbox3857.on('copy', function (event) {
            event.clipboardData.setData('text/plain', $('#infoBbox3857').html());
        });

        clipBbox3857.on('aftercopy', function (event) {
            toastr.info('Data copied to clipboard...', 'Info');
            console.log('Copied to clipboard: ' + event.data['text/plain']);
        });

        // ###### WKT
        var clipWkt4326 = new ZeroClipboard($("#wkt4326Copy"));
        clipWkt4326.on('copy', function (event) {
            event.clipboardData.setData('text/plain', $('#infoWkt4326').html());
        });

        clipWkt4326.on('aftercopy', function (event) {
            toastr.info('Data copied to clipboard...', 'Info');
            console.log('Copied to clipboard: ' + event.data['text/plain']);
        });

        var clipWkt3857 = new ZeroClipboard($("#wkt3857Copy"));
        clipWkt3857.on('copy', function (event) {
            event.clipboardData.setData('text/plain', $('#infoWkt3857').html());
        });

        clipWkt3857.on('aftercopy', function (event) {
            toastr.info('Data copied to clipboard...', 'Info');
            console.log('Copied to clipboard: ' + event.data['text/plain']);
        });

        // ###### GeoJSON
        var clipGeoJson4326 = new ZeroClipboard($("#geoJson4326Copy"));
        clipGeoJson4326.on('copy', function (event) {
            event.clipboardData.setData('text/plain', $('#infoGeoJson4326').html());
        });

        clipGeoJson4326.on('aftercopy', function (event) {
            toastr.info('Data copied to clipboard...', 'Info');
            console.log('Copied to clipboard: ' + event.data['text/plain']);
        });

        var clipGeoJson3857 = new ZeroClipboard($("#geoJson3857Copy"));
        clipGeoJson3857.on('copy', function (event) {
            event.clipboardData.setData('text/plain', $('#infoGeoJson3857').html());
        });

        clipGeoJson3857.on('aftercopy', function (event) {
            toastr.info('Data copied to clipboard...', 'Info');
            console.log('Copied to clipboard: ' + event.data['text/plain']);
        });

    }

    function init(initParams) {

        webAppConfig = initParams;

        searchByPlace();

        setupZeroClipboard();
        
    }

    return {
        init: init
    };


})();