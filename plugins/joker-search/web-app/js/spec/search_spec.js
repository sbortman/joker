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

$inject("http://localhost:8080/joker-search/assets/search.js", function() {
    "use strict";

    // Suite
    describe("search.js tests", function() {

        //// Test
        //it("the foo function should return a value === 1", function () {
        //    expect(foo()).toEqual(1);
        //});
        //
        //it("the bar function should return the passed parameter", function () {
        //    expect(bar('Going Back to Tally!')).toEqual('Going Back to Tally!');
        //});

        it("the changeSearchType function should return that it fired", function(){
            expect(changeSearchType()).toEqual('changeSearchType fired');
        });

        it("the searchPlace function should return that it fired", function(){
            expect(searchPlace()).toEqual('searchPlace fired');
        });

    });

});




