/**
 * @classdesc
 * <p>An Openlayers 3 module for 'zooming' to a particular location on the map based on
 * input via Decimal Degrees, Degrees Minutes Seconds, or Military Grid Reference System.</p>
 * <hr>
 * <p>Dependencies:</p>
 * <ol>
 *   <li>The mgrs.js library for parsing mgrs coordinates: https://github.com/proj4js/mgrs
 *   <li>The feedback mechanism for errors uses toastr.js: https://github.com/CodeSeven/toastr
 * </ol>
 * <hr>
 *
 * @namespace ZoomTo
 */
var ZoomTo = (function () {
    "use strict";
    //function foo(){
    //    return 1;
    //}
    //
    //function bar(param){
    //    return param;
    //}

    // Config:
    // ********************************************************************
    /**
     * Cache DOM elements.  Modify to your form element names.
     */
    var $zoomToForm = $('#searchForm');
    var $zoomButton =  $('#searchButton');
    var $coordInput = $('#searchInput');
    // ********************************************************************

    var lat,
        lon,
        latNum,
        latDir,
        lonNum,
        lonDir;

    /**
     * @description Regular expression for the input types
     * @type {RegExp}
     */
    var dRegExp = /^\s*(\-?\d{1,2})\s*\u00B0?\s*([NnSs])?\s*\,?\s*(\-?\d{1,3})\s*\u00B0?\s*([WwEe])?\s*$/;
    var ddRegExp = /^\s*(\-?\d{1,2}\.\d*)\s*\u00B0?\s*([NnSs])?\s*\,?\s*(\-?\d{1,3}\.\d*)\s*\u00B0?\s*([WwEe])?\s*$/;
    var dmsRegExp = /^\s*(\d{1,2})\s*\u00B0?\s*\:?\s?(\d{1,2})\s*\'?\s*\:?\s?(\d{1,2})(\.\d*)?\s*\"?\s*([NnSs])\s*(\d{1,3})\s*\u00B0?\s*\:?\s?(\d{1,2})\s*\'?\s*\:?\s?(\d{1,2})(\.\d*)?\s*\"?\s*([EeWw])\s*$/;
    var mgrsRegExp = /^\s*(\d{1,2})\s*([A-Za-z])\s*([A-Za-z])\s*([A-Za-z])\s*(\d{1,5})\s*(\d{1,5})\s*$/;

    /** Bind events */
    $zoomButton.on("click", cycleRegExs);
    $zoomToForm.keypress(suppressKey);

    /**
     * Suppress <Enter> key from causing a submit behavior
     * @function suppressKey
     * @memberof ZoomTo
     * @param {event} event - A keycode number
     */
    function suppressKey (event) {
        if (event.keyCode == 10 || event.keyCode == 13){
            event.preventDefault();
        }
    }

    /**
     * Helper method used in the cycleRegExs function.  Prevents
     * errors if the RegExp returns undefinied or NaN.
     * @function getNum
     * @memberof ZoomTo
     * @param {string} val - A value from the RegExp
     * @returns {val}
     */
    function getNum(val) {
        if (typeof val === 'undefined'){
            return "";
        }
        else if (isNaN(val)){
            return "";
        }
        return val;
    }

    /**
     * Cycles through the different coordinate types, and calls
     * the ZoomTo method on the Map module to recenter and
     * set zoom level from the input coordinates.
     * @function cycleRegExs
     * @memberof ZoomTo
     * @fires Map.zoomTo
     */
    function cycleRegExs() {
        var coordInput = $coordInput.val();
        coordInput.trim();

        if (coordInput.match(ddRegExp)) {

            //console.log(coordInput.match(ddRegExp));
            //console.log('0= ' + coordInput.match(ddRegExp)[0]);
            //console.log('1= ' + coordInput.match(ddRegExp)[1]);
            //console.log('2= ' + coordInput.match(ddRegExp)[2]);
            //console.log('3= ' + coordInput.match(ddRegExp)[3]);

            latNum = coordInput.match(ddRegExp)[1];
            latDir = coordInput.match(ddRegExp)[2];

            lonNum = coordInput.match(ddRegExp)[3];
            lonDir = coordInput.match(ddRegExp)[4];

            if ((latNum >= -90 && latNum <= 90) && (lonNum >= -180 && lonNum <= 180)) {

                // check if lat is north or south
                if(latDir === "S" || latDir === "s") {
                    lat = -latNum;
                }
                else {
                    lat = latNum;
                }

                // check if lon is east or west
                if(lonDir === "W" || lonDir === "w") {
                    lon = -lonNum;
                }
                else {
                    lon = lonNum;
                }

                Map.zoomTo(lat, lon);

            }
            else {
                toastr.error('Sorry, could not locate coordinates: [' + $coordInput.val() + '] Please check the' +
                    ' formatting' +
                    ' and' +
                    ' try' +
                    ' again.', 'No Match');
            }

            console.log('DD Match');
            console.log('input: ' + coordInput);
            console.log('result: ' + lat + " " + lon);
        }

        else if (coordInput.match(dRegExp)) {

            //console.log(coordInput.match(ddRegExp));
            //console.log('0= ' + coordInput.match(ddRegExp)[0]);
            //console.log('1= ' + coordInput.match(ddRegExp)[1]);
            //console.log('2= ' + coordInput.match(ddRegExp)[2]);
            //console.log('3= ' + coordInput.match(ddRegExp)[3]);

            latNum = coordInput.match(dRegExp)[1];
            latDir = coordInput.match(dRegExp)[2];

            lonNum = coordInput.match(dRegExp)[3];
            lonDir = coordInput.match(dRegExp)[4];

            if ((latNum >= -90 && latNum <= 90) && (lonNum >= -180 && lonNum <= 180)) {

                // check if lat is north or south
                if(latDir === "S" || latDir === "s") {
                    lat = -latNum;
                }
                else {
                    lat = latNum;
                }

                // check if lon is east or west
                if(lonDir === "W" || lonDir === "w") {
                    lon = -lonNum;
                }
                else {
                    lon = lonNum;
                }

                Map.zoomTo(lat, lon);
            }
            else {
                toastr.error('Sorry, could not locate coordinates: [' + $coordInput.val() + '] Please check the' +
                    ' formatting' +
                    ' and' +
                    ' try' +
                    ' again.', 'No Match');
            }

            console.log('D Match');
            console.log('input: ' + coordInput);
            console.log('result: ' + lat + " " + lon);
        }

        else if (coordInput.match(dmsRegExp)) {

            //console.log(coordInput.match(dmsRegExp));
            //console.log('0= ' + coordInput.match(dmsRegExp)[0]);
            //console.log('1= ' + coordInput.match(dmsRegExp)[1]);
            //console.log('2= ' + coordInput.match(dmsRegExp)[2]);
            //console.log('3= ' + coordInput.match(dmsRegExp)[3]);
            //console.log('4= ' + coordInput.match(dmsRegExp)[4]);
            //console.log('5= ' + coordInput.match(dmsRegExp)[5]);
            //console.log('6= ' + coordInput.match(dmsRegExp)[6]);
            //console.log('7= ' + coordInput.match(dmsRegExp)[7]);
            //console.log('8= ' + coordInput.match(dmsRegExp)[8]);
            //console.log('9= ' + coordInput.match(dmsRegExp)[9]);
            //console.log('10= ' + coordInput.match(dmsRegExp)[10]);

            //var dms = coordInput.match(dmsRegExp)[0];

            var latDeg = coordInput.match(dmsRegExp)[1]; // degrees
            var latMin = coordInput.match(dmsRegExp)[2]; // minutes
            var latSec = (coordInput.match(dmsRegExp)[3]) + getNum(coordInput.match(dmsRegExp)[4]); // seconds decimal
            // number
            var latHem = coordInput.match(dmsRegExp)[5]; // hemisphere

            var lonDeg = coordInput.match(dmsRegExp)[6]; // degrees
            var lonMin = coordInput.match(dmsRegExp)[7]; // minutes
            var lonSec = (coordInput.match(dmsRegExp)[8]) + getNum(coordInput.match(dmsRegExp)[9]); // seconds
            // decimal number
            var lonHem = coordInput.match(dmsRegExp)[10]; // hemisphere

            if ((latDeg >= -90 && latDeg <= 90) && (lonDeg >= -180 && lonDeg <= 180)) {

                lat = dmsToDd(latDeg, latMin, latSec, latHem);
                lon = dmsToDd(lonDeg, lonMin, lonSec, lonHem);
                Map.zoomTo(lat, lon);

            }
            else {
                toastr.error('Sorry, could not locate coordinates: [' + $coordInput.val() + '] Please check the' +
                    ' formatting' +
                    ' and' +
                    ' try' +
                    ' again.', 'No Match');
            }

            console.log('DMS Match');
            console.log('input: ' + coordInput);
            console.log('result: ' + lat + " " + lon);
        }

        else if (coordInput.match(mgrsRegExp)) {

            //var mgrsAll = coordInput.match(mgrsRegExp);
            //var mgrs0 = coordInput.match(mgrsRegExp)[0];
            var mgrs1 = coordInput.match(mgrsRegExp)[1];
            var mgrs2 = coordInput.match(mgrsRegExp)[2];
            var mgrs3 = coordInput.match(mgrsRegExp)[3];
            var mgrs4 = coordInput.match(mgrsRegExp)[4];
            var mgrs5 = coordInput.match(mgrsRegExp)[5];
            var mgrs6 = coordInput.match(mgrsRegExp)[6];

            //console.log('mgrsAll: ' + mgrsAll);
            //console.log('mgrs0: ' + mgrs0);
            //console.log('mgrs1: ' + mgrs1);
            //console.log('mgrs2: ' + mgrs2);
            //console.log('mgrs3: ' + mgrs3);
            //console.log('mgrs4: ' + mgrs4);
            //console.log('mgrs5: ' + mgrs5);
            //console.log('mgrs6: ' + mgrs6);

            // Using mgrs.js toPoint, and then using the zoomTo:
            var mgrsPoint = mgrs.toPoint(mgrs1+mgrs2+mgrs3+mgrs4+mgrs5+mgrs6);
            console.log('------------<mgrsPoint>-----------');
            console.log(mgrsPoint);
            console.log('------------</mgrsPoint>----------');
            Map.zoomTo(mgrsPoint[1], mgrsPoint[0]);

            // ####################################    WIP   #####################################################
            // mgrs.inverse uses the mgrs.js library to return a bounding box.  I am leaving this code here in
            // case we want to have the input mgrs location zoom to the appropriate location on the mgris grid.
            // At this time, if a user that inputs: 33UXP0500444998 it would create a 1m bounding box, and zoom
            // the map to the extent of the bounding box.  We would need to offset the extent by a given factor
            // so that it would not require the user to zoom bout 4-6 times to get to an acceptable level.
            //var bBox = mgrs.inverse(mgrs1+mgrs2+mgrs3+mgrs4+mgrs5+mgrs6);
            //var bBox = mgrs.inverse($coordInput.val());
            //console.log('------------<bBox>-----------');
            //console.log(bBox);
            //console.log('------------</bBox>----------');
            //
            //var mgrsExtent = bBox //[minlon, minlat, maxlon, maxlat];
            //mgrsExtent = ol.extent.applyTransform(mgrsExtent, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));

            //map.getView().fitExtent(mgrsExtent, map.getSize());

            // ####################################    /WIP   ####################################################


        }

        else {
            console.log('No Match');
            toastr.error('Sorry, could not locate coordinates: [' + $coordInput.val() + '] Please check the' +
                ' formatting' +
                ' and' +
                ' try' +
                ' again.', 'No Match');
        }
    }

    /**
     * Converts degrees minutes seconds to decimal degrees
     * @function dmsToDd
     * @memberof ZoomTo
     * @param {number} degrees - Degrees
     * @param {number} minutes - Minutes
     * @param {number} seconds - Seconds
     * @param {number} position - Position
     * @returns {number}
     */
    function dmsToDd (degrees, minutes, seconds, position) {

        var dd = Math.abs(degrees) + Math.abs(minutes / 60) + Math.abs(seconds / 3600);

        if (position == "S" || position == "s" || position == "W" || position == "w") {
            dd = -dd;
        }

        return dd;
    }

    /**
     * toastr.js parameters for the banners
     * @type {{closeButton: boolean, progressBar: boolean, positionClass: string, showMethod: string, hideMethod: string, timeOut: string}}
     */
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "timeOut": "10000"
    };

    return {
        cycleRegExs: cycleRegExs
    };

})();
