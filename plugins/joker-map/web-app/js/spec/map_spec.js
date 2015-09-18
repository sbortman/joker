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
        it("the foo function should return a value === 1", function () {
            expect(foo()).toEqual(1);
        });

        it("the bar function should return the passed parameter", function () {
            expect(bar('Going Back to Tally!')).toEqual('Going Back to Tally!');
        });

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

});




