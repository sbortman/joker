/**
 * Created by sbortman on 9/2/15.
 */
//= require jquery
//= require mapWidget
//= require_self

var MapView = (function ()
{
    'use strict';

    function init()
    {
        //alert('here');
        MapWidget.init();
    }

    return {
        init: init
    };
})();
