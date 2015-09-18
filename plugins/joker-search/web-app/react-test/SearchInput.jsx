var SearchInput = React.createClass({
    componentDidMount: function(){
        $('.selectpicker').selectpicker('show'); // Will not render if this is not called
        this.searchByPlace();
    },
    changeSearchType: function () {

        //var searchType = $('#searchInput').val();
        var searchType = React.findDOMNode(this.refs.searchSelect).value
        console.log('searchInput Value', React.findDOMNode(this.refs.searchSelect).value)

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

    },
    searchByPlace: function () {
        console.log('place selected');
        var url = 'http://localhost/twofish/?autocomplete=true&maxInterpretations=10&autocompleteBias=BALANCED';
        //var url = 'http://demo.twofishes.net/?autocomplete=true&maxInterpretations=10&autocompleteBias=BALANCED';
        $('#searchInput').autocomplete({
            serviceUrl: url,
            dataType: 'json',
            type: 'GET',
            transformResult: function(response) {
                //console.log('response', response);
                return {
                    suggestions: $.map(response.interpretations, function(dataItem){
                        //console.log('value: ' + dataItem.feature.displayName + ' data: ' + dataItem.feature.displayName);
                        return {
                            value: dataItem.feature.displayName,
                            data: dataItem.feature.displayName,
                            lat: dataItem.feature.geometry.center.lat,
                            lng: dataItem.feature.geometry.center.lng
                        };
                    })
                };
            },
            onSelect: function (suggestion) {
                console.log('You selected: ' + suggestion.value + ', \n' + suggestion.lat + ', \n' + suggestion.lng);
                //Map.zoomTo(suggestion.lat, suggestion.lng);
            }
        });
    },
    render: function(){
        return(
              <div>
                <form id="searchForm" role="search">
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-btn">
                                <select ref="searchSelect" id="searchSelect" onChange={this.changeSearchType} className="form-control selectpicker"  data-style="btn-primary">
                                    <option data-icon="glyphicon-map-marker" value="place">&nbsp;&nbsp;Place&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                    <option data-icon="glyphicon glyphicon-screenshot" value="coordinate">&nbsp;&nbsp;Coordinate&nbsp;&nbsp;</option>
                                    <option data-icon="glyphicon glyphicon-picture" value="imageId">&nbsp;&nbsp;Image
                                    ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                    <option data-icon="glyphicon glyphicon-pushpin" value="beNum">&nbsp;&nbsp;B.E. Number&nbsp;</option>
                                </select>
                            </div>
                            <input ref="searchInput" id="searchInput" className="form-control" type="text"></input>
                            <div className="input-group-btn">
                                <button id="searchButton" className="btn btn-primary" type="button">&nbsp;&nbsp;Search</button>
                            </div>
                        </div>
                    </div>
                </form>
              </div>
            );
        }
    });

