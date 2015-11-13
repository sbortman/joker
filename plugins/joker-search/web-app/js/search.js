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
                addInfo(suggestion.dataAll);
                //console.log('You selected: ' + suggestion.value + ', \n' + suggestion.lat + ', \n' + suggestion.lng);
                //console.log('suggestion', suggestion);
                if (suggestion.bounds === undefined) {
                    //console.log('bounds is undefined!');
                    Map.zoomTo(suggestion.lat, suggestion.lng);
                    $searchInput.val('');
                }
                else {
                    Map.zoomToExt(suggestion);
                    $searchInput.val('');
                }

            }
        });

    }

    function addInfo(info) {
        console.log(info);
        $('#info').show();
        $('#infoPlaceName').html(info.displayName);
        $('#infoPopulation').html(info.attributes.population);

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

    function init(initParams) {

        webAppConfig = initParams;
        searchByPlace();

    }

    return {
        init: init
    };

})();