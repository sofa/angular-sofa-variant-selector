cc.Config = {
    loggingEnabled: true,
    storeCode: '53787',
    originalUrl:'http://couchcommerce.shopwaredemo.de/',
    noRedirectSuffix:'/CC/noRedirect',
    searchUrl: 'https://de7so.api.searchify.com/v1/indexes/production/search',
    apiUrl: 'http://cc1.couchcommerce.com/apiv6/products/',
    checkoutUrl:'http://couchdemoshop.couchcommerce.com/checkout/v2/',
    apiHttpMethod: 'jsonp',
    categoryJson: 'data/couchdemoshop/categories.json',
    //apiUrl: 'data/dasgibtesnureinmal/products.json',
    //apiHttpMethod: 'get',
    mediaFolder:'http://cc1.couchcommerce.com/media/couchdemoshop/img/',
    mediaImgExtension:'png',
    mediaPlaceholder:'http://cdn.couchcommerce.com/media/platzhalter.png',
    resourceUrl:'http://localhost:8888/couchcommerce/couchcommerce-frontend/app/data/pages/',
    shippingCost:5,
    shippingTax:19,
    shippingFreeFrom: null,
    currencySign:'€',
    shippingText:'zzgl. 5€ Versandkosten',
    showGeneralAgreement:1,
    showAgeAgreement:0,
    showAppExitLink:true,
    linkGeneralAgreement:'saturn',
    linkRecallAgreement:'neptune',
    linkAgeAgreement:'age',
    linkShippingCosts:'',
    locale:'de-de',
    countries:[{"value":"DE","label":"Deutschland"},{"value":"AT","label":"\u00d6sterreich"},{"value":"AE","label":"Arabische Emirate"},{"value":"AU","label":"Australien"},{"value":"BE","label":"Belgien"},{"value":"DK","label":"D\u00e4nemark"},{"value":"FI","label":"Finnland"},{"value":"IT","label":"Italien"},{"value":"NL","label":"Niederlande"},{"value":"CH","label":"Schweiz"},{"value":"ES","label":"Spanien"}],
    aboutPages:[
            {
                title:'Neptune',
                id:'neptune'
            },
            {
                title:'Saturn',
                id:'saturn'
            },
            {
                title:'Something',
                id:'something'
            }
    ]
};
cc.define('cc.mocks.httpService', function($q){

    'use strict';

    var mocks,
        requestQueue = [];

    var self = function(config){

        config.method = config.method && config.method.toLowerCase();
        requestQueue.push(config);
        var deferred = $q.defer();


        var responseMock = mocks[config.method][config.url];
        var configData = config.data || config.params;
        if (responseMock === undefined && configData !== undefined){
            var endpointKey = createEndpointKey(config.url, configData);
            responseMock = mocks[config.method][endpointKey];
        }

        if (responseMock && typeof responseMock.responseTime === 'number'){
            setTimeout(function(){
                deferred.resolve({
                    data: responseMock.data
                });
            }, responseMock.responseTime);
        }
        else if (responseMock){
            deferred.resolve({
                    data: responseMock.data
            });
        }

        return deferred.promise;
    };

    self.getLastCallParams = function(){
        return requestQueue.length > 0 ? requestQueue[requestQueue.length - 1] : null;
    };

    self.getRequestQueue = function(){
        return requestQueue;
    };

    self.when = function(method, endpoint, data){

        endpoint = createEndpointKey(endpoint, data);

        return {
            respond: function(data, responseTime){
                method = method.toLowerCase();
                mocks[method][endpoint] = { data: data , responseTime: responseTime};
            }
        };
    };

    var createEndpointKey = function(endpoint, data){
        return data !== undefined ? endpoint + '_' + md5Object(data) : endpoint;
    };

    /**
     * clear the mocked data so that the service is in it's initial state
     * 
     */
    self.clear = function(){
        requestQueue.length = 0;
        mocks = {
            get: {},
            post: {},
            put: {},
            jsonp: {},
            'delete': {}
        };
    };

    self.clear();

    return self;
});
(function(window){
    function md5cycle(x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];

        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);

        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);

        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);

        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);

        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);

    }

    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }

    function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    function md51(s) {
        txt = '';
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i;
        for (i = 64; i <= s.length; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < s.length; i++)
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i++) tail[i] = 0;
        }
        tail[14] = n * 8;
        md5cycle(state, tail);
        return state;
    }

    /* there needs to be support for Unicode here,
     * unless we pretend that we can redefine the MD-5
     * algorithm for multi-byte characters (perhaps
     * by adding every four 16-bit characters and
     * shortening the sum to 32 bits). Otherwise
     * I suggest performing MD-5 as if every character
     * was two bytes--e.g., 0040 0025 = @%--but then
     * how will an ordinary MD-5 sum be matched?
     * There is no way to standardize text to something
     * like UTF-8 before transformation; speed cost is
     * utterly prohibitive. The JavaScript standard
     * itself needs to look at this: it should start
     * providing access to strings as preformed UTF-8
     * 8-bit unsigned value arrays.
     */

    function md5blk(s) { /* I figured global was faster.   */
        var md5blks = [],
            i; /* Andy King said do it this way. */
        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    var hex_chr = '0123456789abcdef'.split('');

    function rhex(n) {
        var s = '',
            j = 0;
        for (; j < 4; j++)
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        return s;
    }

    function hex(x) {
        for (var i = 0; i < x.length; i++)
            x[i] = rhex(x[i]);
        return x.join('');
    }

    function md5(s) {
        return hex(md51(s));
    }

    function md5Object(obj){
        return md5(JSON.stringify(obj));
    }

    /* this function is much faster,
    so if possible we use it. Some IEs
    are the only ones I know of that
    need the idiotic second function,
    generated by an if clause.  */

    function add32(a, b) {
        return (a + b) & 0xFFFFFFFF;
    }

    if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
        function add32(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
    }

    window.md5 = md5;
    window.md5Object = md5Object;
})(window)
module('cc.basketService.tests');

var createBasketService = function(){
    return new sofa.BasketService(new sofa.LocalStorageService(), new sofa.ConfigService());
};

test('can create BasketService instance', function() {
    var basketService = createBasketService();
    basketService.clear();
    ok(basketService, 'Created basketService instance' );
});

test('can add item', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    var basketItem = basketService.addItem(product, 1);
    var summary = basketService.getSummary();

    ok(summary.quantity === 1, 'has a summary of one');
    ok(basketItem.product === product, 'retrieved product from basketItem');

});

test('isEmpty reports true or false accordingly', function() {
    var basketService = createBasketService();
    basketService.clear();

    ok(basketService.isEmpty(), 'is empty');

    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    var basketItem = basketService.addItem(product, 1);
    ok(!basketService.isEmpty(), 'is not empty');

    basketService.clear();

    ok(basketService.isEmpty(), 'is empty');
});

test('trying to add an item that is out of stock raises exception', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;
    product.qty = 0;

    throws(function(){
        var basketItem = basketService.addItem(product, 1);
    }, Error);

    var summary = basketService.getSummary();

    ok(summary.quantity === 0, 'has a summary of none');
});

test('removing the last item removes the whole basket item', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    var basketItem = basketService.addItem(product, 1);
    var summary = basketService.getSummary();

    ok(summary.quantity === 1, 'has a summary of one');
    ok(basketItem.product === product, 'retrieved product from basketItem');

    var itemRemovedCalled = 0;
    basketService.on('itemRemoved', function(){
        //it's important to proof that the item was already removed
        //by the time the event fires
        summary = basketService.getSummary();
        ok(summary.quantity === 0, 'has zero items');
        ok(basketService.getItems().length === 0, 'has zero items');
        itemRemovedCalled++;
    });

    basketService.decreaseOne(basketItem);

    ok(itemRemovedCalled === 1, 'itemRemoved was fired');
});

test('can use increase and decrease shorthands', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    var basketItem = basketService.addItem(product, 1);
    var summary = basketService.getSummary();

    ok(summary.quantity === 1, 'has a summary of 1');
    ok(basketItem.product === product, 'retrieved product from basketItem');
    ok(basketItem.quantity === 1, 'has a quantity of 1');

    basketService.increaseOne(basketItem);

    summary = basketService.getSummary();

    ok(summary.quantity === 2, 'has a summary of 2');
    ok(basketItem.quantity === 2, 'has a quantity of 2');

    basketService.decreaseOne(basketItem);

    summary = basketService.getSummary();

    ok(summary.quantity === 1, 'has a summary of 1');
    ok(basketItem.quantity === 1, 'has a quantity of 1');

    basketService.increase(basketItem, 10);

    summary = basketService.getSummary();

    ok(summary.quantity === 11, 'has a summary of 11');
    ok(basketItem.quantity === 11, 'has a quantity of 11');


    basketService.decrease(basketItem, 10);

    summary = basketService.getSummary();

    ok(summary.quantity === 1, 'has a summary of 1');
    ok(basketItem.quantity === 1, 'has a quantity of 1');

});

test('cumulates same products', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;
    product.price = 2;

    var itemAddedCalled = 0;

    basketService.on('itemAdded', function(){ itemAddedCalled++; });

    var basketItem = basketService.addItem(product, 1);
    var basketItem2 = basketService.addItem(product, 1);
    var summary = basketService.getSummary();

    ok(itemAddedCalled === 2, 'raises itemAdded event two times');
    ok(summary.quantity === 2, 'has a quantity of two');
    ok(basketService.exists(product), 'product exists');
    ok(basketItem.product === product, 'retrieved product from basketItem');
    ok(basketItem === basketItem2, 'baksetItems are identical');
    ok(basketItem.quantity === 2, 'has a quantity of two');
    ok(basketItem.getTotal() === 4, 'has a total price of four');
    ok(basketService.getItems().length === 1, 'has only one item');

});

test('cumulates same products even after app reload (without variant)', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;
    product.price = 2;

    var itemAddedCalled = 0;

    basketService.on('itemAdded', function(){ itemAddedCalled++; });

    //we intentionally set variant to null here because
    //it has been a regression once that null values were not preserved
    //after reloading the app due to a bug in cc.Util.extend
    var basketItem = basketService.addItem(product, 1, null);

    //we create a fresh basketService instance to mock the case that the
    //app was reloaded
    var freshBasketService = createBasketService();
    freshBasketService.on('itemAdded', function(){ itemAddedCalled++; });
    var basketItem2 = freshBasketService.addItem(product, 1, null);
    var summary = freshBasketService.getSummary();

    ok(itemAddedCalled === 2, 'raises itemAdded event two times');
    ok(summary.quantity === 2, 'has a quantity of two');
    ok(basketItem2.product === product, 'retrieved product from basketItem');
    ok(basketItem2.quantity === 2, 'has a quantity of two');
    ok(basketItem2.getTotal() === 4, 'has a total price of four');
    ok(freshBasketService.getItems().length === 1, 'has only one item');
});

test('cumulates same products even after app reload (with variant)', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;
    product.price = 2;

    var variant = {
        price: '2.00',
        variantID: 1,
        optionID: 1
    };

    var itemAddedCalled = 0;

    basketService.on('itemAdded', function(){ itemAddedCalled++; });

    var basketItem = basketService.addItem(product, 1, variant);

    //we create a fresh basketService instance to mock the case that the
    //app was reloaded
    var freshBasketService = createBasketService();
    freshBasketService.on('itemAdded', function(){ itemAddedCalled++; });
    var basketItem2 = freshBasketService.addItem(product, 1, variant);
    var summary = freshBasketService.getSummary();

    ok(itemAddedCalled === 2, 'raises itemAdded event two times');
    ok(summary.quantity === 2, 'has a quantity of two');
    ok(basketItem2.product === product, 'retrieved product from basketItem');
    ok(basketItem2.quantity === 2, 'has a quantity of two');
    ok(basketItem2.getTotal() === 4, 'has a total price of four');
    ok(freshBasketService.getItems().length === 1, 'has only one item');
});

test('can increase quantity by any number', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    var basketItem = basketService.addItem(product, 1);
    var basketItem2 = basketService.addItem(product, 2);

    var summary = basketService.getSummary();

    ok(summary.quantity === 3, 'has a quantity of three');
    ok(basketItem.product === product, 'retrieved product from basketItem');
    ok(basketItem === basketItem2, 'baksetItems are identical');
    ok(basketItem.quantity === 3, 'has a quantity of three');
    ok(basketService.getItems().length === 1, 'has only one item');
});

test('does not cumulate same products with different variantIds', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    variant1 = {
        variantID: 123
    };

    variant2 = {
        variantID: 46
    };

    var basketItem = basketService.addItem(product, 1, variant1);
    var basketItem2 = basketService.addItem(product, 1, variant2);


    var summary = basketService.getSummary();

    ok(summary.quantity === 2, 'has a quantity of two');

    ok(basketService.exists(product, variant1), 'product exists');
    ok(basketService.exists(product, variant2), 'product exists');

    ok(basketItem.product === product, 'retrieved product from basketItem');
    ok(basketItem2.product === product, 'retrieved product from basketItem2');

    ok(basketItem !== basketItem2, 'baksetItems are different');
    ok(basketItem.quantity === 1, 'has a quantity of one');
    ok(basketItem2.quantity === 1, 'has a quantity of one');

    ok(basketService.getItems().length === 2, 'has two items');
});

test('cumulates same products with identical variantIds', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    var basketItem = basketService.addItem(product, 1, 1);
    var basketItem2 = basketService.addItem(product, 1, 1);


    var summary = basketService.getSummary();

    ok(summary.quantity === 2, 'has a quantity of two');

    ok(basketItem.product === product, 'retrieved product from basketItem');
    ok(basketItem2.product === product, 'retrieved product from basketItem2');

    ok(basketItem === basketItem2, 'baksetItems are identical');
    ok(basketItem.quantity === 2, 'has a quantity of two');

    ok(basketService.getItems().length === 1, 'has one item');
});


test('cumulates same products with identical optionIds', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    var basketItem = basketService.addItem(product, 1, 1, 1);
    var basketItem2 = basketService.addItem(product, 1, 1, 1);

    var summary = basketService.getSummary();

    ok(summary.quantity === 2, 'has a quantity of two');

    ok(basketItem.product === product, 'retrieved product from basketItem');
    ok(basketItem2.product === product, 'retrieved product from basketItem2');

    ok(basketItem === basketItem2, 'baksetItems are identical');
    ok(basketItem.quantity === 2, 'has a quantity of two');

    ok(basketService.getItems().length === 1, 'has one item');
});

test('does not cumulate same products with different optionIds', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    var variant1 = {
        price: 10.00,
        variantID: 1,
        optionID: 1
    };

    var variant2 = {
        price: 10.00,
        variantID: 1,
        optionID: 2
    };

    var basketItem = basketService.addItem(product, 1, variant1);
    var basketItem2 = basketService.addItem(product, 1, variant2);


    var summary = basketService.getSummary();

    ok(summary.quantity === 2, 'has a quantity of two');

    ok(basketService.exists(product, variant1), 'product exists');
    ok(basketService.exists(product, variant2), 'product exists');

    ok(basketItem.product === product, 'retrieved product from basketItem');
    ok(basketItem.variant === variant1, 'has correct variant set');

    ok(basketItem2.product === product, 'retrieved product from basketItem2');
    ok(basketItem2.variant === variant2, 'has correct variant set');

    ok(basketItem !== basketItem2, 'baksetItems are different');
    ok(basketItem.quantity === 1, 'has a quantity of one');
    ok(basketItem2.quantity === 1, 'has a quantity of one');

    ok(basketService.getItems().length === 2, 'has two items');
});

test('can remove items by any number', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    var basketItem = basketService.addItem(product, 10);

    var summary = basketService.getSummary();

    ok(summary.quantity === 10, 'has a quantity of ten');

    ok(basketItem.product === product, 'retrieved product from basketItem');
    ok(basketItem.quantity === 10, 'has a quantity of tten');


    var itemRemovedCalled = 0;

    basketService.on('itemRemoved', function(){ itemRemovedCalled++; });

    basketService.removeItem(product, 5);

    var summaryAfter = basketService.getSummary();

    ok(itemRemovedCalled === 1, 'raises itemRemoved event');
    ok(summaryAfter.quantity === 5, 'has a quantity of five');

    ok(basketItem.quantity === 5, 'has a quantity of five');
});

test('trying to remove an non existing item raises exception', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    throws(function(){
        basketService.removeItem(product, 5);
    }, Error);
});

test('trying to remove more items than what exists in basket raises exception', function() {
    var basketService = createBasketService();
    basketService.clear();
    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    var basketItem = basketService.addItem(product, 10);

    ok(basketItem.product === product, 'retrieved product from basketItem');
    ok(basketItem.quantity === 10, 'has a quantity of ten');

    throws(function(){
        basketService.removeItem(product, 11);
        ok(basketItem.quantity === 10, 'quantity was not touched');
    }, Error);

});

test('can clear all items', function() {
    var basketService = createBasketService();
    basketService.clear();

    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 10;

    var variant1 = {
        variantID: 123
    };

    var variant2 = {
        variantID: 456
    };

    var basketItem = basketService.addItem(product, 1, variant1);
    var basketItem2 = basketService.addItem(product, 1, variant2);

    var summary = basketService.getSummary();

    ok(summary.quantity === 2, 'has a quantity of two');

    var product2 = new cc.models.Product();
    product2.name = 'Testproduct';
    product2.id = 12;

    basketItem = basketService.addItem(product2, 1, variant1);
    basketItem2 = basketService.addItem(product2, 1, variant2);

    ok(basketService.getItems().length === 4, 'has four items');


    var clearedCalled = 0;

    basketService.on('cleared', function(){ clearedCalled++; });

    basketService.clear();

    ok(clearedCalled === 1, 'raises cleared event');

    var summaryAfter = basketService.getSummary();

    ok(summaryAfter.quantity === 0, 'has a quantity of five');

    ok(basketService.getItems().length === 0, 'has zero items');
});

test('calculates summary', function() {
    var basketService = createBasketService();
    basketService.clear();

    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 1;
    product.price = 4.65;
    product.tax = 19;

    var product2 = new cc.models.Product();
    product2.name = 'Testproduct';
    product2.id = 2;
    product2.price = 12.28;
    product2.tax = 7;

    var product3 = new cc.models.Product();
    product3.name = 'Testproduct';
    product3.id = 3;
    product3.price = 9.00;
    product3.tax = 7;

    var variant = {
        price: 10.00
    };

    basketService.addItem(product, 1);
    basketService.addItem(product, 4);

    basketService.addItem(product2, 2);
    basketService.addItem(product2, 3);

    basketService.addItem(product3, 1, variant);

    var summary = basketService.getSummary();
    var itemCount = basketService.getItems().length;

    ok(itemCount === 3, 'has two basketItems');
    ok(summary.quantity === 11, 'has a quantity of 15');
    ok(summary.sum === 94.65, 'calculates sum correctly');
    ok(summary.vat === 9.15, 'calculates VAT correctly');
    ok(summary.total === 99.65, 'calculates total correctly');
    ok(summary.shipping === 5, 'uses shipping costs from config');
});

test('can calculate summary with shippingCost null', function() {
    //FIXME: doesn't feel right to directly fiddle with cc.Config
    var oldShippingCost = cc.Config.shippingCost;
    cc.Config.shippingCost = null;
    var basketService = createBasketService();
    basketService.clear();

    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 1;
    product.price = 4.65;
    product.tax = 19;

    var product2 = new cc.models.Product();
    product2.name = 'Testproduct';
    product2.id = 2;
    product2.price = 12.28;
    product2.tax = 7;

    basketService.addItem(product, 1);
    basketService.addItem(product, 4);

    basketService.addItem(product2, 2);
    basketService.addItem(product2, 3);

    var summary = basketService.getSummary();
    var itemCount = basketService.getItems().length;

    ok(itemCount === 2, 'has two basketItems');
    ok(summary.quantity === 10, 'has a quantity of 15');
    ok(summary.sum === 84.65, 'calculates sum correctly');
    ok(summary.vat === 7.70, 'calculates VAT correctly');
    ok(summary.total === 84.65, 'calculates total correctly');
    ok(summary.shipping === 0, 'uses shipping costs from config');

    cc.Config.shippingCost = oldShippingCost;
});


test('calculates summary', function() {
    var basketService = createBasketService();
    basketService.clear();

    var product = new cc.models.Product();
    product.price = 29.99;
    product.tax = 19;

    basketService.addItem(product, 1);

    var summary = basketService.getSummary({
        paymentMethod: { surcharge: 3 },
        shippingMethod: { price: 2.90 }
    });
    var itemCount = basketService.getItems().length;

    ok(itemCount === 1, 'has no basketItems');
    ok(summary.surchargeStr === '3.00', 'has a surcharge of 3.00');
    ok(summary.surcharge === 3, 'has a surcharge of 3');
    ok(summary.shipping === 2.90, 'uses passed shippingMethod for shipping costs');
    ok(summary.vat === 5.25, 'calculates VAT correctly');
    ok(summary.total === 35.89, 'calculates total correctly');
});


test('can add and remove coupons', function() {
    var basketService = createBasketService();
    basketService.clear();

    basketService.addCoupon({
        amount: 0,
        code: 'TENEURO',
        description: '10 EURO',
        error: null,
        freeShipping: '0',
        name: '10 EURO',
        sortOrder: '0',
        type: 'fix'
    });

    var coupons = basketService.getActiveCoupons();

    ok(coupons.length, 'contains coupons');
    ok(coupons[0].code === 'TENEURO');

    basketService.removeCoupon('TENEURO');

    coupons = basketService.getActiveCoupons();

    ok(!coupons.length, 'contains no coupons');
});

test('cannot add the same coupon twice', function() {
    var basketService = createBasketService();
    basketService.clear();

    for (var i = 0; i < 2; i++) {
        basketService.addCoupon({
            amount: 0,
            code: 'TENEURO',
            description: '10 EURO',
            error: null,
            freeShipping: '0',
            name: '10 EURO',
            sortOrder: '0',
            type: 'fix'
        });
    }

    var coupons = basketService.getActiveCoupons();

    ok(coupons.length === 1, 'contains 1 coupon');
});

test('can clear all coupons', function() {
    var basketService = createBasketService();
    basketService.clear();

    for (var i = 0; i < 2; i++) {
        basketService.addCoupon({
            amount: 0,
            code: 'TENEURO',
            description: '10 EURO',
            error: null,
            freeShipping: '0',
            name: '10 EURO',
            sortOrder: '0',
            type: 'fix'
        });
    }

    basketService.clear();

    var coupons = basketService.getActiveCoupons();

    ok(coupons.length === 0, 'contains no coupons');
});

module('cc.couponService.tests');

var createHttpService = function() {
    return new cc.mocks.httpService(new cc.QService());
};

var createCouponService = function(httpService, basketService) {
    var configService = new cc.ConfigService();
    basketService = basketService || new cc.BasketService(new cc.LocalStorageService(), configService);
    var checkoutService = new cc.CheckoutService(httpService, new cc.QService(), basketService, new cc.LoggingService(configService), configService);
    return new cc.CouponService(httpService, new cc.QService(), basketService, checkoutService, new cc.LoggingService(configService), configService);
};

test('can create CouponService instance', function() {
    var couponService = createCouponService(createHttpService());

    ok(couponService, 'created couponService instance');
});

asyncTest('submitting a code returns a valid response', function() {
    expect(1);

    var httpService = createHttpService();

    httpService
        .when('POST', cc.Config.checkoutUrl + 'coupon.php')
        .respond({
            amount: 0,
            code: 'TENEURO',
            description: '10 EURO',
            error: null,
            freeShipping: '0',
            name: '10 EURO',
            sortOrder: '0',
            type: 'fix'
        });

    var couponService = createCouponService(httpService);

    couponService.submitCode('TENEURO')
        .then(function(response) {
            ok(response && response.code === 'TENEURO', 'received a valid response');
            start();
        });
});

asyncTest('submitting an empty code returns an error', function() {
    expect(1);

    var httpService = createHttpService();

    httpService
        .when('POST', cc.Config.checkoutUrl + 'coupon.php')
        .respond({
            amount: 0,
            code: 'TENEURO',
            description: '10 EURO',
            error: null,
            freeShipping: '0',
            name: '10 EURO',
            sortOrder: '0',
            type: 'fix'
        });

    var couponService = createCouponService(httpService);

    couponService.submitCode('')
        .then(function(response) {
            ok(false, 'should receive an error');
            start();
        }, function(err) {
            ok(err, 'receives an error');
            start();
        });
});

asyncTest('submitting an invalid code returns an error', function() {
    expect(1);

    var httpService = createHttpService();

    httpService
        .when('POST', cc.Config.checkoutUrl + 'coupon.php')
        .respond({
            amount: null,
            code: null,
            description: null,
            error: 'Invalid',
            freeShipping: null,
            name: null,
            sortOrder: null,
            type: null
        });

    var couponService = createCouponService(httpService);

    couponService.submitCode('ORLY')
        .then(function(response) {
            ok(false, 'should receive an error');
            start();
        }, function(err) {
            ok(err, 'receives an error');
            start();
        });
});

asyncTest('changing an item in the cart also updates the active coupons', function() {
    expect(3);

    var basketService = new cc.BasketService(new cc.LocalStorageService(), new cc.ConfigService());
    basketService.clear();

    var httpService = createHttpService();

    var product = new cc.models.Product();
    product.name = 'Testproduct';
    product.id = 1;
    product.price = 2.5;
    product.tax = 19;

    var basketItem = basketService.addItem(product, 1, null);
    var summary = basketService.getSummary();

    ok(summary.total === 7.5, 'normal: total should equal 7.5');

    httpService
        .when('POST', cc.Config.checkoutUrl + 'coupon.php')
        .respond({
            amount: 2.5,
            code: 'TENEURO',
            description: '10 EURO',
            error: null,
            freeShipping: '0',
            name: '10 EURO',
            sortOrder: '0',
            type: 'fix'
        });

    var couponService = createCouponService(httpService, basketService);

    // Now increase the quantity of the item and check again
    basketService.once('couponAdded', function () {
        var summary = basketService.getSummary();

        ok(summary.total === 5.0, 'pre-change: total should equal 5');

        httpService.clear();
        httpService
            .when('POST', cc.Config.checkoutUrl + 'coupon.php')
            .respond({
                amount: 5.0,
                code: 'TENEURO',
                description: '10 EURO',
                error: null,
                freeShipping: '0',
                name: '10 EURO',
                sortOrder: '0',
                type: 'fix'
            });

        basketService.once('couponAdded', function () {
            var summary = basketService.getSummary();

            ok(summary.total === 5.0, 'post-change: total should still equal 5');
            start();
        });

        basketService.increaseOne(basketItem);
    });

    couponService.submitCode('TENEURO');


});
module('cc.qService.tests');

test('can create qService instance', function() {

    var qService = new cc.QService();

    ok(qService, 'Created qService instance' );
});


test('can resolve synchronously', function() {

    var qService = new cc.QService();
    var deferred = qService.defer();
    deferred.resolve(true);

    deferred.promise.then(function(data){
        ok(data, 'is true');
    });
});

asyncTest('can resolve asynchronously', function() {

    expect(1);

    var qService = new cc.QService();
    var deferred = qService.defer();


    setTimeout(function(){
        deferred.resolve(true);
    }, 100);

    
    deferred.promise.then(function(data){
        ok(data, 'is true');
        start();
    });
});