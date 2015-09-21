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

$inject("http://localhost/joker-search/assets/search.js", function() {
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

    //describe("search.js Ajax test", function(){
    //
    //    it("allows responses to be setup ahead of time", function () {
    //            var doneFn = jasmine.createSpy("success");
    //
    //            jasmine.Ajax.stubRequest('http://localhost/twofish/?autocomplete=true&maxInterpretations=10&autocompleteBias=BALANCED&query=melb').andReturn({
    //                "responseText": '{"interpretations":[{"what":"","where":"melb","feature":{"cc":"AU","geometry":{"center":{"lat":-37.814,"lng":144.96332},"bounds":{"ne":{"lat":-37.799716675999996,"lng":144.990094688},"sw":{"lat":-37.8555269395,"lng":144.95143536}},"source":"qs"},"name":"Melbourne","displayName":"Melbourne, VIC, Australia","woeType":7,"ids":[{"source":"geonameid","id":"2158177"},{"source":"woeid","id":"1103816"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]},{"name":"Melbourne City","lang":"en","flags":[16]}],"highlightedName":"<b>Melb</b>ourne, VIC, Australia","matchedName":"Melbourne, VIC, Australia","id":"geonameid:2158177","attributes":{"adm0cap":0,"adm1cap":1,"scalerank":1,"labelrank":3,"natscale":300,"population":4246375,"urls":["http://en.wikipedia.org/wiki/Melbourne","http://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%BB%D1%8C%D0%B1%D1%83%D1%80%D0%BD"],"worldcity":1},"longId":"72057594040086113","parentIds":["72057594040005392","72057594040073170","72057594045767741"]}},{"what":"","where":"melb","feature":{"cc":"US","geometry":{"center":{"lat":28.08363,"lng":-80.60811},"bounds":{"ne":{"lat":28.200749,"lng":-80.57501099999999},"sw":{"lat":28.035069999999997,"lng":-80.740673}},"source":"qs"},"name":"Melbourne","displayName":"Melbourne, FL, United States","woeType":7,"ids":[{"source":"geonameid","id":"4163971"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne, FL, United States","matchedName":"Melbourne, FL, United States","id":"geonameid:4163971","attributes":{"adm0cap":0,"scalerank":8,"labelrank":1,"natscale":10,"population":76068,"urls":["http://en.wikipedia.org/wiki/Melbourne%2C_Florida"],"worldcity":0},"longId":"72057594042091907","parentIds":["72057594044179937","72057594042083687","72057594042076762"]}},{"what":"","where":"melb","feature":{"cc":"US","geometry":{"center":{"lat":28.06835,"lng":-80.56033},"bounds":{"ne":{"lat":28.078315,"lng":-80.546691},"sw":{"lat":28.052925,"lng":-80.572251}},"source":"qs"},"name":"Melbourne Beach","displayName":"Melbourne Beach, FL, United States","woeType":7,"ids":[{"source":"geonameid","id":"4163972"}],"names":[{"name":"Melbourne Beach","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne Beach, FL, United States","matchedName":"Melbourne Beach, FL, United States","id":"geonameid:4163972","attributes":{"population":3101,"urls":["http://en.wikipedia.org/wiki/Melbourne_Beach%2C_Florida"]},"longId":"72057594042091908","longIds":["72057594045099320"],"parentIds":["72057594044179937","72057594042083687","72057594042076762"]}},{"what":"","where":"melb","feature":{"cc":"US","geometry":{"center":{"lat":39.02978,"lng":-84.36633},"bounds":{"ne":{"lat":39.039238999999995,"lng":-84.356842},"sw":{"lat":39.021304,"lng":-84.383669}},"source":"qs"},"name":"Melbourne","displayName":"Melbourne, KY, United States","woeType":7,"ids":[{"source":"geonameid","id":"4300541"},{"source":"woeid","id":"2449093"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne, KY, United States","matchedName":"Melbourne, KY, United States","id":"geonameid:4300541","attributes":{"population":401,"urls":["http://en.wikipedia.org/wiki/Melbourne%2C_Kentucky"]},"longId":"72057594042228477","parentIds":["72057594044179937","72057594044182861","72057594042214641"]}},{"what":"","where":"melb","feature":{"cc":"US","geometry":{"center":{"lat":41.94138,"lng":-93.10326},"bounds":{"ne":{"lat":41.949697,"lng":-93.096492},"sw":{"lat":41.935258999999995,"lng":-93.10952999999999}},"source":"qs"},"name":"Melbourne","displayName":"Melbourne, IA, United States","woeType":7,"ids":[{"source":"geonameid","id":"4866887"},{"source":"woeid","id":"2449092"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne, IA, United States","matchedName":"Melbourne, IA, United States","id":"geonameid:4866887","attributes":{"population":830,"urls":["http://en.wikipedia.org/wiki/Melbourne%2C_Iowa"]},"longId":"72057594042794823","parentIds":["72057594044179937","72057594042790118","72057594042794296"]}},{"what":"","where":"melb","feature":{"cc":"US","geometry":{"center":{"lat":36.05951,"lng":-91.90848},"bounds":{"ne":{"lat":36.090283,"lng":-91.830491},"sw":{"lat":36.040555,"lng":-91.944441}},"source":"qs"},"name":"Melbourne","displayName":"Melbourne, AR, United States","woeType":7,"ids":[{"source":"geonameid","id":"4121256"},{"source":"woeid","id":"2449104"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne, AR, United States","matchedName":"Melbourne, AR, United States","id":"geonameid:4121256","attributes":{"population":1848,"urls":["http://en.wikipedia.org/wiki/Melbourne%2C_Arkansas"]},"longId":"72057594042049192","parentIds":["72057594044179937","72057594042027689","72057594042044114"]}},{"what":"","where":"melb","feature":{"cc":"GB","geometry":{"center":{"lat":52.8219,"lng":-1.42522},"bounds":{"ne":{"lat":52.829292,"lng":-1.416249},"sw":{"lat":52.807533,"lng":-1.447277}},"source":"2-diss-gn-GB.shp"},"name":"Melbourne","displayName":"Melbourne, Derbyshire, United Kingdom","woeType":7,"ids":[{"source":"geonameid","id":"2642801"},{"source":"woeid","id":"28637"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne, Derbyshire, United Kingdom","matchedName":"Melbourne, Derbyshire, United Kingdom","id":"geonameid:2642801","attributes":{"population":4404,"urls":["http://en.wikipedia.org/wiki/Melbourne%2C_Derbyshire"]},"longId":"72057594040570737","parentIds":["72057594040563103","72057594044197067","72057594040579282","72057594045218609"]}},{"what":"","where":"melb","feature":{"cc":"GB","geometry":{"center":{"lat":52.08128,"lng":0.01514},"bounds":{"ne":{"lat":52.094509,"lng":0.042228},"sw":{"lat":52.05703,"lng":-0.004634}},"source":"2-diss-gn-GB.shp"},"name":"Melbourn","displayName":"Melbourn, Cambridgeshire, United Kingdom","woeType":7,"ids":[{"source":"geonameid","id":"2642802"},{"source":"woeid","id":"28636"}],"names":[{"name":"Melbourn","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourn, Cambridgeshire, United Kingdom","matchedName":"Melbourn, Cambridgeshire, United Kingdom","id":"geonameid:2642802","attributes":{"population":4394,"urls":["http://en.wikipedia.org/wiki/Melbourn"]},"longId":"72057594040570738","parentIds":["72057594040563103","72057594044197067","72057594040581876","72057594045218597"]}},{"what":"","where":"melb","feature":{"cc":"DE","geometry":{"center":{"lat":53.18333,"lng":10.4},"bounds":{"ne":{"lat":53.18287592765438,"lng":10.423206376916994},"sw":{"lat":53.17022889283476,"lng":10.390315676833666}},"source":"qs"},"name":"Melbeck","displayName":"Melbeck, Germany","woeType":7,"ids":[{"source":"geonameid","id":"2872117"}],"names":[{"name":"Melbeck","lang":"en","flags":[1]}],"highlightedName":"<b>Melb</b>eck, Germany","matchedName":"Melbeck, Germany","id":"geonameid:2872117","attributes":{"population":3358,"urls":["http://en.wikipedia.org/wiki/Melbeck"]},"longId":"72057594040800053","longIds":["72057594044480619"],"parentIds":["72057594040848980","72057594040790862","72057594041148976","72057594044480619"]}},{"what":"","where":"melb","feature":{"cc":"NO","geometry":{"center":{"lat":68.50246,"lng":14.79962},"bounds":{"ne":{"lat":68.50986650580683,"lng":14.841464950274428},"sw":{"lat":68.49662869856706,"lng":14.762968643330055}},"source":"qs"},"name":"Melbu","displayName":"Melbu, Norway","woeType":7,"ids":[{"source":"geonameid","id":"3146160"},{"source":"woeid","id":"861734"}],"names":[{"name":"Melbu","lang":"en","flags":[1]}],"highlightedName":"<b>Melb</b>u, Norway","matchedName":"Melbu, Norway","id":"geonameid:3146160","attributes":{"population":2161,"urls":["http://en.wikipedia.org/wiki/Melbu"]},"longId":"72057594041074096","parentIds":["72057594041072032","72057594041072237","72057594041082330"]}}]}'
    //            });
    //
    //        var xhr = new XMLHttpRequest();
    //        xhr.onreadystatechange = function(args) {
    //            if (this.readyState == this.DONE) {
    //                doneFn(this.responseText);
    //            }
    //        };
    //
    //        xhr.open("GET", "http://localhost/twofish/?autocomplete=true&maxInterpretations=10&autocompleteBias=BALANCED&query=melb");
    //        xhr.send();
    //
    //        expect(doneFn).toHaveBeenCalledWith('{"interpretations":[{"what":"","where":"melb","feature":{"cc":"AU","geometry":{"center":{"lat":-37.814,"lng":144.96332},"bounds":{"ne":{"lat":-37.799716675999996,"lng":144.990094688},"sw":{"lat":-37.8555269395,"lng":144.95143536}},"source":"qs"},"name":"Melbourne","displayName":"Melbourne, VIC, Australia","woeType":7,"ids":[{"source":"geonameid","id":"2158177"},{"source":"woeid","id":"1103816"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]},{"name":"Melbourne City","lang":"en","flags":[16]}],"highlightedName":"<b>Melb</b>ourne, VIC, Australia","matchedName":"Melbourne, VIC, Australia","id":"geonameid:2158177","attributes":{"adm0cap":0,"adm1cap":1,"scalerank":1,"labelrank":3,"natscale":300,"population":4246375,"urls":["http://en.wikipedia.org/wiki/Melbourne","http://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%BB%D1%8C%D0%B1%D1%83%D1%80%D0%BD"],"worldcity":1},"longId":"72057594040086113","parentIds":["72057594040005392","72057594040073170","72057594045767741"]}},{"what":"","where":"melb","feature":{"cc":"US","geometry":{"center":{"lat":28.08363,"lng":-80.60811},"bounds":{"ne":{"lat":28.200749,"lng":-80.57501099999999},"sw":{"lat":28.035069999999997,"lng":-80.740673}},"source":"qs"},"name":"Melbourne","displayName":"Melbourne, FL, United States","woeType":7,"ids":[{"source":"geonameid","id":"4163971"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne, FL, United States","matchedName":"Melbourne, FL, United States","id":"geonameid:4163971","attributes":{"adm0cap":0,"scalerank":8,"labelrank":1,"natscale":10,"population":76068,"urls":["http://en.wikipedia.org/wiki/Melbourne%2C_Florida"],"worldcity":0},"longId":"72057594042091907","parentIds":["72057594044179937","72057594042083687","72057594042076762"]}},{"what":"","where":"melb","feature":{"cc":"US","geometry":{"center":{"lat":28.06835,"lng":-80.56033},"bounds":{"ne":{"lat":28.078315,"lng":-80.546691},"sw":{"lat":28.052925,"lng":-80.572251}},"source":"qs"},"name":"Melbourne Beach","displayName":"Melbourne Beach, FL, United States","woeType":7,"ids":[{"source":"geonameid","id":"4163972"}],"names":[{"name":"Melbourne Beach","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne Beach, FL, United States","matchedName":"Melbourne Beach, FL, United States","id":"geonameid:4163972","attributes":{"population":3101,"urls":["http://en.wikipedia.org/wiki/Melbourne_Beach%2C_Florida"]},"longId":"72057594042091908","longIds":["72057594045099320"],"parentIds":["72057594044179937","72057594042083687","72057594042076762"]}},{"what":"","where":"melb","feature":{"cc":"US","geometry":{"center":{"lat":39.02978,"lng":-84.36633},"bounds":{"ne":{"lat":39.039238999999995,"lng":-84.356842},"sw":{"lat":39.021304,"lng":-84.383669}},"source":"qs"},"name":"Melbourne","displayName":"Melbourne, KY, United States","woeType":7,"ids":[{"source":"geonameid","id":"4300541"},{"source":"woeid","id":"2449093"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne, KY, United States","matchedName":"Melbourne, KY, United States","id":"geonameid:4300541","attributes":{"population":401,"urls":["http://en.wikipedia.org/wiki/Melbourne%2C_Kentucky"]},"longId":"72057594042228477","parentIds":["72057594044179937","72057594044182861","72057594042214641"]}},{"what":"","where":"melb","feature":{"cc":"US","geometry":{"center":{"lat":41.94138,"lng":-93.10326},"bounds":{"ne":{"lat":41.949697,"lng":-93.096492},"sw":{"lat":41.935258999999995,"lng":-93.10952999999999}},"source":"qs"},"name":"Melbourne","displayName":"Melbourne, IA, United States","woeType":7,"ids":[{"source":"geonameid","id":"4866887"},{"source":"woeid","id":"2449092"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne, IA, United States","matchedName":"Melbourne, IA, United States","id":"geonameid:4866887","attributes":{"population":830,"urls":["http://en.wikipedia.org/wiki/Melbourne%2C_Iowa"]},"longId":"72057594042794823","parentIds":["72057594044179937","72057594042790118","72057594042794296"]}},{"what":"","where":"melb","feature":{"cc":"US","geometry":{"center":{"lat":36.05951,"lng":-91.90848},"bounds":{"ne":{"lat":36.090283,"lng":-91.830491},"sw":{"lat":36.040555,"lng":-91.944441}},"source":"qs"},"name":"Melbourne","displayName":"Melbourne, AR, United States","woeType":7,"ids":[{"source":"geonameid","id":"4121256"},{"source":"woeid","id":"2449104"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne, AR, United States","matchedName":"Melbourne, AR, United States","id":"geonameid:4121256","attributes":{"population":1848,"urls":["http://en.wikipedia.org/wiki/Melbourne%2C_Arkansas"]},"longId":"72057594042049192","parentIds":["72057594044179937","72057594042027689","72057594042044114"]}},{"what":"","where":"melb","feature":{"cc":"GB","geometry":{"center":{"lat":52.8219,"lng":-1.42522},"bounds":{"ne":{"lat":52.829292,"lng":-1.416249},"sw":{"lat":52.807533,"lng":-1.447277}},"source":"2-diss-gn-GB.shp"},"name":"Melbourne","displayName":"Melbourne, Derbyshire, United Kingdom","woeType":7,"ids":[{"source":"geonameid","id":"2642801"},{"source":"woeid","id":"28637"}],"names":[{"name":"Melbourne","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourne, Derbyshire, United Kingdom","matchedName":"Melbourne, Derbyshire, United Kingdom","id":"geonameid:2642801","attributes":{"population":4404,"urls":["http://en.wikipedia.org/wiki/Melbourne%2C_Derbyshire"]},"longId":"72057594040570737","parentIds":["72057594040563103","72057594044197067","72057594040579282","72057594045218609"]}},{"what":"","where":"melb","feature":{"cc":"GB","geometry":{"center":{"lat":52.08128,"lng":0.01514},"bounds":{"ne":{"lat":52.094509,"lng":0.042228},"sw":{"lat":52.05703,"lng":-0.004634}},"source":"2-diss-gn-GB.shp"},"name":"Melbourn","displayName":"Melbourn, Cambridgeshire, United Kingdom","woeType":7,"ids":[{"source":"geonameid","id":"2642802"},{"source":"woeid","id":"28636"}],"names":[{"name":"Melbourn","lang":"en","flags":[16,1]}],"highlightedName":"<b>Melb</b>ourn, Cambridgeshire, United Kingdom","matchedName":"Melbourn, Cambridgeshire, United Kingdom","id":"geonameid:2642802","attributes":{"population":4394,"urls":["http://en.wikipedia.org/wiki/Melbourn"]},"longId":"72057594040570738","parentIds":["72057594040563103","72057594044197067","72057594040581876","72057594045218597"]}},{"what":"","where":"melb","feature":{"cc":"DE","geometry":{"center":{"lat":53.18333,"lng":10.4},"bounds":{"ne":{"lat":53.18287592765438,"lng":10.423206376916994},"sw":{"lat":53.17022889283476,"lng":10.390315676833666}},"source":"qs"},"name":"Melbeck","displayName":"Melbeck, Germany","woeType":7,"ids":[{"source":"geonameid","id":"2872117"}],"names":[{"name":"Melbeck","lang":"en","flags":[1]}],"highlightedName":"<b>Melb</b>eck, Germany","matchedName":"Melbeck, Germany","id":"geonameid:2872117","attributes":{"population":3358,"urls":["http://en.wikipedia.org/wiki/Melbeck"]},"longId":"72057594040800053","longIds":["72057594044480619"],"parentIds":["72057594040848980","72057594040790862","72057594041148976","72057594044480619"]}},{"what":"","where":"melb","feature":{"cc":"NO","geometry":{"center":{"lat":68.50246,"lng":14.79962},"bounds":{"ne":{"lat":68.50986650580683,"lng":14.841464950274428},"sw":{"lat":68.49662869856706,"lng":14.762968643330055}},"source":"qs"},"name":"Melbu","displayName":"Melbu, Norway","woeType":7,"ids":[{"source":"geonameid","id":"3146160"},{"source":"woeid","id":"861734"}],"names":[{"name":"Melbu","lang":"en","flags":[1]}],"highlightedName":"<b>Melb</b>u, Norway","matchedName":"Melbu, Norway","id":"geonameid:3146160","attributes":{"population":2161,"urls":["http://en.wikipedia.org/wiki/Melbu"]},"longId":"72057594041074096","parentIds":["72057594041072032","72057594041072237","72057594041082330"]}}]}');
    //    });
    //});

});




