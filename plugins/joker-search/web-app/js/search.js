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
    $searchButton.on('click', searchPlace);

    function changeSearchType() {

        var searchType = $searchSelect.val();

        switch (searchType){
            case 'place':
                console.log('place selected');
                // searchPlace();
                break;
            case 'coordinate':
                console.log('coordinate selected');
                break;
            case 'imageId':
                console.log('imageId selected');
                break;
            case'beNum':
                console.log('beNum selected');
                break;
            default: console.log('nothing selected');
        }

        return 'changeSearchType fired';
    }

    function searchPlace() {

        return 'searchPlace fired';

    }

    //var countries = [
    //    { value: 'Andorra', data: 'AD' },
    //    { value: 'Zimbabwe', data: 'ZZ' }
    //];

    var url = 'http://localhost/twofish/?autocomplete=true&maxInterpretations=10&autocompleteBias=BALANCED';


    $searchInput.autocomplete({
        serviceUrl: url,
        dataType: 'json',
        type: 'GET',
        transformResult:function(response, originalQuery) {
            //console.log('originarlQuery ', originalQuery);
            //console.log('response ', response.interpretations[0].feature.displayName);
            console.log('response', response);
            //$.each(response.interpretations, function(index, value){
            //    //var sugg = feature[index];
            //    console.log('value', value.feature.displayName);
            //
            //});
            return {
                suggestions: $.map(response.interpretations, function(dataItem){
                    console.log('value: ' + dataItem.feature.displayName + ' data: ' + dataItem.feature.displayName);
                    return {value: dataItem.feature.displayName, data: dataItem.feature.displayName}
                })
            };
        },
        //formatResult: function (suggestion, currentValue) {
        //    console.log('suggestion ', suggestion);
        //    console.log('currentValue ', currentValue);
        //
        //}
        //lookup: countries,
        //onSelect: function (suggestion) {
        //    alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        //}
    });

    //return {
    //    // If needed...
    //};

})();