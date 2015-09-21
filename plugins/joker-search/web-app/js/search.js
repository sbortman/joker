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

    // cache DOM
    var $el = $('#searchForm');
    var $searchSelect = $el.find('#searchSelect');
    var $searchInput = $el.find('#searchInput');
    var $searchButton = $el.find('#searchButton');

    // bind events
    $searchSelect.on('change', changeSearchType);
    //$searchButton.on('click', searchByPlace(););

    searchByPlace();

    function changeSearchType() {

        var searchType = $searchSelect.val();

        switch (searchType){
            case 'place':
                $searchInput.val('');
                $searchInput.autocomplete('enable');
                break;
            case 'coordinate':
                $searchInput.val('');
                $searchInput.autocomplete('disable');
                break;
            case 'imageId':
                $searchInput.val('');
                $searchInput.autocomplete('disable');
                break;
            case'beNum':
                $searchInput.val('');
                $searchInput.autocomplete('disable');
                break;
            default: console.log('nothing selected');
        }

        return 'changeSearchType fired';
    }

    // ############################################################################
    // TODO: Pubsub pattern
    // ############################################################################

    function searchByPlace(){
        //console.log('place selected');
        var url = 'http://localhost/twofish/?responseIncludes=WKT_GEOMETRY_SIMPLIFIED&autocomplete=true&maxInterpretations=10&autocompleteBias=BALANCED';
        $searchInput.autocomplete({
            serviceUrl: url,
            dataType: 'json',
            type: 'GET',
            transformResult: function(response) {
                console.log('response', response);
                return {
                    suggestions: $.map(response.interpretations, function(dataItem){
                        //console.log(dataItem);
                        //console.log('value: ' + dataItem.feature.displayName + ' data: ' +
                        // dataItem.feature.displayName);
                        return {
                            value: dataItem.feature.displayName,
                            data: dataItem.feature.displayName,
                            lat: dataItem.feature.geometry.center.lat,
                            lng: dataItem.feature.geometry.center.lng,
                            bounds: dataItem.feature.geometry.bounds,
                            wkt: dataItem.feature.geometry.wktGeometrySimplified
                        };
                    })
                };
            },
            onSelect: function (suggestion) {
                //console.log('You selected: ' + suggestion.value + ', \n' + suggestion.lat + ', \n' + suggestion.lng);
                console.log('suggestion', suggestion);

                if (suggestion.bounds === undefined){
                    //console.log('bounds is undefined!');
                    Map.zoomTo(suggestion.lat, suggestion.lng);
                }
                else{
                    Map.zoomToExt(suggestion);
                }

            }
        });
    }

    function searchByCoordinates(){
        console.log('coordinate selected');
    }

    function searchByImageId(){
        console.log('imageId selected');
    }

    function searchByBeNum(){
        console.log('beNum selected');
    }

    //return {
    //    // If needed...
    //};

})();