// start jasmine unit testing
describe("jasmine-test-injector", function() {
    "use strict";

    beforeEach(function() {
        spyOn(window, "$inject");
    });

    it("$inject should be a global function", function() {
        expect(typeof $inject).toBe("function");
    });

    it("$inject should call through", function() {
        $inject();
        expect($inject).toHaveBeenCalled();
    });

});

// setup $inject to use jasmine
$inject.use.jasmine();

$inject("http://localhost:8080/joker-map/assets/map.js", function() {
    "use strict";

    // Suite
    describe("Map module tets", function() {

        // Test
        //it("the foo function should return a value === 1", function () {
        //    expect(foo()).toEqual(1);
        //});
        //
        //it("the bar function should return the passed parameter", function () {
        //    expect(bar('Going Back to Tally!')).toEqual('Going Back to Tally!');
        //});

        //it("the getNum() function should return an empty string if it is passed 'undefinied'", function(){
        //    expect(getNum(undefined)).toEqual('');
        //});
        //
        //it("the getNum() function should return an empty string if it is passed 'NaN'", function(){
        //    expect(getNum(NaN)).toEqual('');
        //});
        //
        //it("the getNum() function should return the passed parameter if is not 'undefined' or 'NaN'", function(){
        //    expect(getNum(-80)).toEqual(-80);
        //});



    });

    //describe("Regex coordinate match tests", function() {
    //    "use strict";
    //
    //    var dmsRegExp = /^\s*(\d{1,2})\s*\u00B0?\s*\:?\s?(\d{1,2})\s*\'?\s*\:?\s?(\d{1,2})(\.\d*)?\s*\"?\s*([NnSs])\s*(\d{1,3})\s*\u00B0?\s*\:?\s?(\d{1,2})\s*\'?\s*\:?\s?(\d{1,2})(\.\d*)?\s*\"?\s*([EeWw])\s*$/
    //    var mgrsRegExp = /^\s*(\d{1,2})\s*([A-Za-z])\s*([A-Za-z])\s*([A-Za-z])\s*(\d{1,5})\s*(\d{1,5})\s*$/;
    //
    //    it("dmsRegExp should match the '12356N 1234567E' coordinate", function() {
    //        var coord1 = '12356N 1234567E'
    //        expect(coord1).toMatch(dmsRegExp);
    //    });
    //
    //    it("dmsRegExp should match the '12356.00N 1234567.00E' coordinate", function() {
    //        var coord2 = '12356.00N 1234567.00E'
    //        expect(coord2).toMatch(dmsRegExp);
    //    });
    //
    //    it("dmsRegExp should match the '12°34'56N 123°45'67E' coordinate", function() {
    //        var coord3 = "12°34'56N 123°45'67E"
    //        expect(coord3).toMatch(dmsRegExp);
    //    });
    //
    //    it("dmsRegExp should match the '12°34'56.00 N 123°45'67.00 E' coordinate", function() {
    //        var coord4 = "12°34'56.00 N 123°45'67.00 E"
    //        expect(coord4).toMatch(dmsRegExp);
    //    });
    //
    //    it("dmsRegExp should match the '12°34'56.00N 3°45'67.00E' coordinate", function() {
    //        var coord5 = "12°34'56.00N 3°45'67.00E"
    //        expect(coord5).toMatch(dmsRegExp);
    //    });
    //
    //    it("dmsRegExp should match the '12 34 56N 123 45 67E' coordinate", function() {
    //        var coord6 = "12 34 56N 123 45 67E"
    //        expect(coord6).toMatch(dmsRegExp);
    //    });
    //
    //    it("dmsRegExp should match the '12:34:56 N 123:45:67 E' coordinate", function() {
    //        var coord7 = "12:34:56 N 123:45:67 E"
    //        expect(coord7).toMatch(dmsRegExp);
    //    });
    //
    //    it("dmsRegExp should match the '12:34:56.00N 123:45:67.00E' coordinate", function() {
    //        var coord8 = "12:34:56.00N 123:45:67.00E"
    //        expect(coord8).toMatch(dmsRegExp);
    //    });
    //
    //    it("dmsRegExp should match the '34°36'57.0" + "S 58°25'60.0" + "W'" + "coordinate", function() {
    //        var coord9 = "34°36'57.0" + "S 58°25'60.0" + "W"
    //        expect(coord9).toMatch(dmsRegExp);
    //    });
    //
    //    it("dmsRegExp should match the 35°32\'20.2\"N 82°33\'55.5\"W " + "coordinate", function() {
    //        var coord10 = " 35°32\'20.2\"N 82°33\'55.5\"W"
    //        expect(coord10).toMatch(dmsRegExp);
    //    });
    //
    //    it("mgrsRegExp should match the 18S UJ 23480 06470 coordinate", function() {
    //        var coord10 = "18S UJ 23480 06470"
    //        expect(coord10).toMatch(mgrsRegExp);
    //    });
    //
    //});
});




