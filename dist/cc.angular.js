(function(window, cc, angular, undefined){

angular.module('cc.angular.templates', ['src/directives/ccAddress/ccaddress.tpl.html', 'src/directives/ccBreadcrumbs/cc-breadcrumbs.tpl.html', 'src/directives/ccCategoryTreeView/cc-category-tree-view.tpl.html', 'src/directives/ccCheckBox/cc-checkbox.tpl.html', 'src/directives/ccFooterLinks/cc-footer-links.tpl.html', 'src/directives/ccGoBackButton/cc-go-back-button.tpl.html', 'src/directives/ccGoUpButton/cc-go-up-button.tpl.html', 'src/directives/ccGoUpControl/cc-go-up-control.tpl.html', 'src/directives/ccLoadingSpinner/ccloadingspinner.tpl.html', 'src/directives/ccPrice/cc-price.tpl.html', 'src/directives/ccSearchField/cc-search-field.tpl.html', 'src/directives/ccSelectBox/cc-select-box.tpl.html', 'src/directives/ccThumbnailBar/cc-thumbnail-bar.tpl.html', 'src/directives/ccVariantSelector/ccvariantselector.tpl.html', 'src/directives/ccZippy/cc-zippy.tpl.html', 'src/directives/sofaFullPageView/sofa-full-page-view.tpl.html', 'src/directives/sofaImageZoom/sofa-image-zoom.tpl.html', 'src/directives/sofaRadioButton/sofa-radio-button.tpl.html', 'src/directives/sofaTouchSlider/sofa-touch-slider-indicator.tpl.html', 'src/directives/sofaTouchSlider/sofa-touch-slider.tpl.html']);

angular.module("src/directives/ccAddress/ccaddress.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccAddress/ccaddress.tpl.html",
    "<address>\n" +
    "  <span>{{data.company}}</span>\n" +
    "  <span>{{data.name}} {{data.surname}}</span>\n" +
    "  <span>{{data.street}} {{data.streetnumber}}</span>\n" +
    "  <span ng-if=\"data.streetextra\">{{data.streetextra}}</span>\n" +
    "  <span>{{data.zip}} {{data.city}}</span>\n" +
    "  <span>{{data.country.label}}</span>\n" +
    "</address>\n" +
    "");
}]);

angular.module("src/directives/ccBreadcrumbs/cc-breadcrumbs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccBreadcrumbs/cc-breadcrumbs.tpl.html",
    "<ul>\n" +
    "    <li class=\"cc-breadcrumbs__entry\" \n" +
    "        ng-repeat=\"entry in data\">\n" +
    "        <a ng-click=\"navigateTo(entry)\" ng-bind=\"entry.title\"></a>\n" +
    "    </li>\n" +
    "</ul>");
}]);

angular.module("src/directives/ccCategoryTreeView/cc-category-tree-view.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccCategoryTreeView/cc-category-tree-view.tpl.html",
    "<div class=\"cc-category-tree-view\">\n" +
    "    <ul ng-class=\"{ 'cc-category-tree-view__list--open': item._categoryTreeView.isVisible,\n" +
    "                    'cc-category-tree-view__list--closed': !item._categoryTreeView.isVisible,\n" +
    "                    'cc-category-tree-view__list--root': isRoot,\n" +
    "                    'cc-category-tree-view__list--child': !isRoot }\" cc-template-code>\n" +
    "       <li class=\"cc-category-tree-view__list-item\"\n" +
    "           cc-nested-category-item ng-repeat=\"item in items\">\n" +
    "           <a href=\"{{item.getOriginFullUrl()}}\" ng-click=\"doAction($event, item)\"\n" +
    "                 ng-class=\"item._categoryTreeView.isActive ? 'cc-category-tree-view__category-entry--active' : 'cc-category-tree-view__category-entry'\">\n" +
    "                 {{item.label}}\n" +
    "                <i ng-class=\"item._categoryTreeView.isVisible ? 'fa-chevron-up' : 'fa-chevron-down'\"\n" +
    "                   class=\"cc-category-tree-view__category-entry-icon fa\"\n" +
    "                   ng-show=\"item.hasChildren\">\n" +
    "               </i>\n" +
    "            </a>\n" +
    "       </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/directives/ccCheckBox/cc-checkbox.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccCheckBox/cc-checkbox.tpl.html",
    "<div class=\"cc-checkbox\">\n" +
    "    <input type=\"checkbox\" ng-model=\"value\" id=\"cc-check-box-{{id}}\" class=\"cc-checkbox__input\">\n" +
    "    <label for=\"cc-check-box-{{id}}\" class=\"cc-checkbox__label\" ng-bind-html=\"label\"></label>\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/directives/ccFooterLinks/cc-footer-links.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccFooterLinks/cc-footer-links.tpl.html",
    "\n" +
    "<ul class=\"cc-footer-list\">\n" +
    "    <li bindonce=\"item\" ng-repeat=\"item in items\" ng-click=\"goTo(item)\" bo-text=\"item.title\" class=\"cc-footer-list__item\"></li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("src/directives/ccGoBackButton/cc-go-back-button.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccGoBackButton/cc-go-back-button.tpl.html",
    "<button class=\"cc-go-back-button\" ng-click=\"goBack()\" ng-transclude></button>");
}]);

angular.module("src/directives/ccGoUpButton/cc-go-up-button.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccGoUpButton/cc-go-up-button.tpl.html",
    "<button class=\"cc-go-up-button\" ng-click=\"goUp()\" ng-transclude></button>");
}]);

angular.module("src/directives/ccGoUpControl/cc-go-up-control.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccGoUpControl/cc-go-up-control.tpl.html",
    "    <cc-go-up-button class=\"cc-go-up-control\" ng-if=\"getParentLabel()\">\n" +
    "        <i class=\"cc-go-up-control__icon\">\n" +
    "        </i>\n" +
    "        <span class=\"cc-go-up-control__text\" bo-text=\"getParentLabel()\"></span>\n" +
    "    </cc-go-up-button>");
}]);

angular.module("src/directives/ccLoadingSpinner/ccloadingspinner.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccLoadingSpinner/ccloadingspinner.tpl.html",
    "<div class=\"cc-loading-spinner\">\n" +
    "    <!-- generated and tweaked from http://cssload.net/ -->\n" +
    "    <div class=\"cc-loading-spinner__circle--01\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--02\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--03\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--04\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--05\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--06\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--07\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--08\"></div>\n" +
    "</div>");
}]);

angular.module("src/directives/ccPrice/cc-price.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccPrice/cc-price.tpl.html",
    "<span class=\"cc-price\" ng-class=\"product.hasOldPrice() ? 'cc-price--special' : 'cc-price--basic'\">\n" +
    "    <span class=\"cc-price__price--old\" ng-if=\"product.hasOldPrice()\" ng-bind=\"priceOld | currency\"></span>\n" +
    "    <span class=\"cc-price__price\" ng-bind=\"price | currency\"></span>\n" +
    "</span>");
}]);

angular.module("src/directives/ccSearchField/cc-search-field.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccSearchField/cc-search-field.tpl.html",
    "<span class=\"cc-search-field\">\n" +
    "    <i class=\"cc-search-field__icon--label\"></i>\n" +
    "    <input type=\"text\" class=\"cc-search-field__input\" placeholder=\"{{ placeholderText }}\"\n" +
    "           ng-model=\"_value\" />\n" +
    "    <i class=\"cc-search-field__icon--clear\" ng-click=\"clearValue()\" ng-show=\"hasValue()\"></i>\n" +
    "</span>\n" +
    "");
}]);

angular.module("src/directives/ccSelectBox/cc-select-box.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccSelectBox/cc-select-box.tpl.html",
    "<div class=\"cc-select-box\">\n" +
    "    <span class=\"cc-select-box__value\" ng-class=\"{'cc-select-box__value--choose': !model && chooseText}\" ng-bind=\"displayFn(model) || chooseText\"></span>\n" +
    "    <i class=\"cc-select-box__icon\"></i>\n" +
    "    <select sofa-name=\"propertyName\"\n" +
    "            ng-required=\"{{required}}\"\n" +
    "            class=\"cc-select-box__native\"\n" +
    "            ng-model=\"model\"\n" +
    "            ng-options=\"displayFn(val) for val in data\">\n" +
    "        <option ng-if=\"chooseText\" value=\"\">-- {{chooseText}} --</option>\n" +
    "    </select>\n" +
    "</div>");
}]);

angular.module("src/directives/ccThumbnailBar/cc-thumbnail-bar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccThumbnailBar/cc-thumbnail-bar.tpl.html",
    "<ul class=\"cc-thumbnail-bar\">\n" +
    "    <li ng-class=\"$index === selectedImageIndex ? 'cc-thumbnail-bar__item--active' : 'cc-thumbnail-bar__item'\"\n" +
    "        ng-click=\"setSelectedImage($index)\"\n" +
    "        ng-repeat=\"image in images\">\n" +
    "        <img class=\"cc-thumbnail-bar__image\" ng-src=\"{{image.thumbnail}}\" alt=\"\"/>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("src/directives/ccVariantSelector/ccvariantselector.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccVariantSelector/ccvariantselector.tpl.html",
    "<ul class=\"cc-variant-selector\" ng-if=\"variants.length\">\n" +
    "    <li class=\"cc-variant-selector__item\" ng-repeat=\"property in properties\">\n" +
    "        <label class=\"cc-variant-selector__label\" ng-bind=\"property\"></label>\n" +
    "        <cc-select-box\n" +
    "                model=\"selectedProperties[property]\"\n" +
    "                data=\"data[property]\"\n" +
    "                choose-text=\"property\"\n" +
    "                property-name=\"variant_{{property}}\">\n" +
    "        </cc-select-box>\n" +
    "    </li>\n" +
    "</ul>");
}]);

angular.module("src/directives/ccZippy/cc-zippy.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccZippy/cc-zippy.tpl.html",
    "<div class=\"cc-zippy\">\n" +
    "    <div class=\"cc-zippy__caption\">\n" +
    "        <span ng-bind=\"caption\"></span>\n" +
    "        <i class=\"cc-zippy-icon\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"cc-zippy__content\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/directives/sofaFullPageView/sofa-full-page-view.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/sofaFullPageView/sofa-full-page-view.tpl.html",
    "<div class=\"sofa-full-page-view\" ng-class=\"{'sofa-full-page-view--active': active}\">\n" +
    "    <button class=\"sofa-full-page-view__close\" ng-click=\"closeFullPageView($event)\"></button>\n" +
    "    <div class=\"sofa-full-page-view__content\" ng-transclude></div>\n" +
    "</div>");
}]);

angular.module("src/directives/sofaImageZoom/sofa-image-zoom.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/sofaImageZoom/sofa-image-zoom.tpl.html",
    "<div class=\"sofa-image-zoom\" ng-class=\"{'sofa-image-zoom--active': active}\">\n" +
    "    <img class=\"sofa-image-zoom__image\" ng-src=\"{{imageSrc}}\">\n" +
    "</div>");
}]);

angular.module("src/directives/sofaRadioButton/sofa-radio-button.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/sofaRadioButton/sofa-radio-button.tpl.html",
    "<div class=\"sofa-radio-button\" ng-class=\"{ 'sofa-radio-button--disabled': disabled }\">\n" +
    "    <input ng-disabled=\"disabled\" type=\"radio\" ng-model=\"model\" id=\"sofa-radio-{{id}}\" value=\"{{value}}\" class=\"sofa-radio-button__input\">\n" +
    "    <label for=\"sofa-radio-{{id}}\" class=\"sofa-radio-button__label\" bindonce bo-text=\"label\"></label>\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/directives/sofaTouchSlider/sofa-touch-slider-indicator.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/sofaTouchSlider/sofa-touch-slider-indicator.tpl.html",
    "<ul class=\"sofa-touch-slider-indicator\">\n" +
    "    <li ng-repeat=\"item in items\" class=\"sofa-touch-slider-indicator__item\"\n" +
    "        ng-class=\"{'sofa-touch-slider-indicator__item--active': $index === activeIndex}\">\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("src/directives/sofaTouchSlider/sofa-touch-slider.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/sofaTouchSlider/sofa-touch-slider.tpl.html",
    "<div class=\"sofa-touch-slider-wrapper\">\n" +
    "    <div class=\"sofa-touch-slider-mask\">\n" +
    "        <ul class=\"sofa-touch-slider sofa-touch-slider--show-{{displayItems}}\"></ul>\n" +
    "    </div>\n" +
    "    <sofa-touch-slider-indicator ng-if=\"showIndicator\"></sofa-touch-slider-indicator>\n" +
    "</div>");
}]);

angular.module('sdk.services.basketService', [
        // TODO: Investigate. I'm not sold this should be handled on this level. 
        store.enabled ? 'sdk.services.localStorageService' : 'sdk.services.memoryStorageService',
        'sdk.services.configService'
    ]);

angular
    .module('sdk.services.basketService')
    .factory('basketService', ['storageService', 'configService', function(storageService, configService){
        return new cc.BasketService(storageService, configService);
}]);



angular.module('sdk.services.checkoutService', ['sdk.services.basketService', 'sdk.services.loggingService']);

angular
    .module('sdk.services.checkoutService')
    .factory('checkoutService', ['$http', '$q', 'basketService', 'loggingService', 'configService', function($http, $q, basketService, loggingService, configService){
        return new cc.CheckoutService($http, $q, basketService, loggingService, configService);
}]);



angular.module('sdk.services.configService', []);

angular
    .module('sdk.services.configService')
    .factory('configService', [function(){
        return new cc.ConfigService();
}]);



angular.module('sdk.services.couchService', ['sdk.services.configService']);

angular
    .module('sdk.services.couchService')
    .factory('couchService', ['$http', '$q', 'configService', function($http, $q, configService){
        return new cc.CouchService($http, $q, configService);
}]);



angular.module('sdk.services.couponService', ['sdk.services.configService']);

angular
    .module('sdk.services.couponService')
    .factory('couponService', ['$http', '$q', 'basketService', 'checkoutService', 'loggingService', 'configService', function($http, $q, basketService, checkoutService, loggingService, configService){
        return new cc.CouponService($http, $q, basketService, checkoutService, loggingService, configService);
}]);



angular.module('sdk.services.deviceService', []);

angular
    .module('sdk.services.deviceService')
    .factory('deviceService', ['$window', function($window){
        return new cc.DeviceService($window);
}]);



angular.module('sdk.services.imageResizeService', ['sdk.services.configService']);

angular
    .module('sdk.services.imageResizeService')
    .factory('imageResizeService', ['configService', '$window', function(configService, $window) {
        return new sofa.ImageResizerService(configService, $window);
}]);



angular.module('sdk.services.injectsService', ['sdk.services.configService']);

angular
    .module('sdk.services.injectsService')
    .factory('injectsService', ['$location', 'configService', function($location, configService){

        'use strict';

        var self = {};

        var RESOURCE_URL     = configService.get('resourceUrl') + 'html/';

        //we build a map of the injects for faster lookups.
        var injects = configService
                        .get('injects', [])
                        .reduce(function(previous, current){
                            var key = current.url + '_' + current.target;
                            previous[key] = {
                                template: current.template + '.html',
                                target: current.target
                            };
                            return previous;
                        }, {});

        var getKey = function(injectionPoint, url){
            return assureUrl(url) + '_' + injectionPoint;
        };

        var assureUrl = function(url){
            return url || $location.path();
        };

        self.hasInject = function(injectionPoint, url){
            return !cc.Util.isUndefined(injects[getKey(injectionPoint, url)]);
        };

        self.getTemplate = function(injectionPoint){

            if (self.hasInject(injectionPoint)){
                return RESOURCE_URL + injects[getKey(injectionPoint)].template;
            }

            if (self.hasInject(injectionPoint, '*')){
                return RESOURCE_URL + injects[getKey(injectionPoint, '*')].template;
            }

            return null;
        };

        return self;
}]);



angular.module('sdk.services.loggingService', ['sdk.services.configService']);

angular
    .module('sdk.services.loggingService')
    .factory('loggingService', ['configService', function(configService){
        return new cc.LoggingService(configService);
}]);



angular.module('sdk.services.memoryStorageService', []);

angular
    .module('sdk.services.memoryStorageService')
    .factory('storageService', [function(){
        return new cc.MemoryStorageService();
}]);



angular.module('sdk.services.navigationService', [
        'sdk.services.navigationService',
        'sdk.services.couchService',
        'sdk.services.trackingService',
        'sdk.services.urlConstructionService',
        'sdk.services.urlParserService'
    ]);

angular
    .module('sdk.services.navigationService')
    .factory('navigationService', ['$location', '$window', 'couchService', 'trackingService', 'urlConstructionService', 'urlParserService', 'stateResolverService',
        function($location, $window, couchService, trackingService, urlConstructionService, urlParserService, stateResolverService){

        'use strict';

        var self = {};

        self.navigateToUrl = function(url) {
            trackingService.trackEvent({
                category: 'pageView',
                label: url
            });
            $location.path(url);
        };


        self.navigateToContentPage = function (pageId) {
            self.navigateToUrl(urlConstructionService.createUrlForContentPage(pageId));
        };

        self.navigateToRootCategory = function(){
            self.navigateToUrl(urlConstructionService.createUrlForRootCategory());
        };

        self.navigateToCart = function(){
            self.navigateToUrl(urlConstructionService.createUrlForCart());
        };

        self.navigateToCheckout = function(){
            self.navigateToUrl(urlConstructionService.createUrlForCheckout());
        };

        self.navigateToSummary = function(token){
            $location.path(urlConstructionService.createUrlForSummary(token));
            trackingService.trackEvent({
                category: 'pageView',
                // No token here as it would flood the analytics
                label: "/summary"
            });
        };

        self.navigateToShippingCostsPage = function(){
            self.navigateToUrl(urlConstructionService.createUrlForShippingCostsPage());
        };

        var navigateToParentCategory = function(currentCategoryUrlId){
            couchService.getCategory(currentCategoryUrlId)
                .then(function(category){
                    if (category.parent && category.parent.parent){
                        self.navigateToUrl(category.parent.getOriginFullUrl());
                    }
                    else{
                        self.navigateToRootCategory();
                    }
                });
        };


        self.goUp = function(){

            // This code is a bit unfortunate as it introduces a logical dependency
            // against a possible service consumer. It assumes that the `stateResolverService`
            // is fed up with `state` objects in a very certain way. It assumes hardcoded
            // `stateName`s and `stateParams`.
            stateResolverService
                .resolveState($location.path())
                .then(function (state) {
                    if (state.stateName === 'product') {
                        couchService
                            .getCategory(state.stateParams.category)
                            .then(function(category){
                                self.navigateToUrl(category.getOriginFullUrl());
                            });
                    }
                    else if (state.stateName === 'products') {
                        navigateToParentCategory(state.stateParams.category);
                    }
                    else if (state.stateName === 'categories') {
                        navigateToParentCategory(state.stateParams.category);
                    }
                    else {
                        //TODO: The method is actually designed to go up in the tree
                        //structure of a category/product tree. However, this is as a
                        //here as a fallback so that e.g. when the user is on the
                        //shopping cart the back button works as a history back.
                        //We should overthink our whole approach here. And almost
                        //cetainly we should move the whole service out of the SDK
                        //as it's not generic enough to be useful for others.
                        $window.history.back();
                    }
                });
        };

        trackingService.trackEvent({
            category: 'pageView',
            label: $location.path()
        });

        return self;
}]);

angular.module('sdk.services.pagesService', ['sdk.services.configService']);

angular
    .module('sdk.services.pagesService')
    .factory('pagesService', ['$http', '$q', 'configService', function($http, $q, configService){
        return new cc.PagesService($http, $q, configService);
}]);



angular.module('sdk.services.requestAnimationFrame', []);

angular
    .module('sdk.services.requestAnimationFrame')
    .factory('requestAnimationFrame', ['$window', '$rootScope', function($window, $rootScope){
        return function(callback, invokeApply){

            //only if it's explicitly false it should not invoke apply.
            //If it's called without the parameter it should be true by default.
            invokeApply = invokeApply === false ? false : true;

            $window.requestAnimationFrame(function(){
                callback();

                if(invokeApply){
                    $rootScope.$apply();
                }
            });
        };
}]);
angular.module('sdk.services.searchService', ['sdk.services.configService']);

angular
    .module('sdk.services.searchService')
    .factory('searchService', ['configService', '$http', '$q', '$rootScope', function(configService, $http, $q, $rootScope){
        
        var applier = function(){
            $rootScope.$apply();
        };

        return new cc.SearchService(configService, $http, $q, applier);
}]);



angular.module('sdk.services.localStorageService', []);

angular
    .module('sdk.services.localStorageService')
    .factory('storageService', [function(){
        return new cc.LocalStorageService();
}]);



angular.module('sdk.services.stateResolverService', []);

angular
    .module('sdk.services.stateResolverService')
    .factory('stateResolverService', ['$q', '$http', 'configService', function($q, $http, configService){
        return new sofa.StateResolverService($q, $http, configService);
}]);

angular.module('sdk.services.trackingService', []);

angular
    .module('sdk.services.trackingService')
    .factory('trackingService', ['$window', '$http', 'configService', function($window, $http, configService){
        return new cc.tracking.TrackingService($window, $http, configService);
}]);

angular.module('sdk.services.urlConstructionService', [
        'sdk.services.configService'
    ]);

angular
    .module('sdk.services.urlConstructionService')
    .factory('urlConstructionService', ['configService', function(configService){
        return new cc.UrlConstructionService(configService);
}]);



angular.module('sdk.services.urlParserService', []);

angular.module('sdk.services.urlParserService')
.factory('urlParserService', function(){
        return new cc.UrlParserService(new sofa.LocationService());
});



angular.module('sdk.services.userService', [
        // TODO: Investigate. I'm not sold this should be handled on this level. 
        store.enabled ? 'sdk.services.localStorageService' : 'sdk.services.memoryStorageService',
        'sdk.services.configService'
    ]);

angular
    .module('sdk.services.userService')
    .factory('userService', ['storageService', 'configService', function(storageService, configService){
        return new cc.UserService(storageService, configService);
}]);



angular.module('sdk.services.wishlistService', [
        // TODO: Investigate. I'm not sold this should be handled on this level.
        store.enabled ? 'sdk.services.localStorageService' : 'sdk.services.memoryStorageService'
    ]);

angular
    .module('sdk.services.wishlistService')
    .factory('wishlistService', ['storageService', function(storageService){
        return new cc.WishlistService(storageService);
}]);

angular.module('chayns', [])
    .run(function() {

        'use strict';

        var params = {};

        if (location.search) {
            var parts = location.search.substring(1).split('&');

            for (var i = 0; i < parts.length; i++) {
                var nv = parts[i].split('=');
                if (!nv[0]) continue;
                params[nv[0]] = nv[1] || true;
            }
        }

        if ( params.chayns ) {
            setTimeout(function() {
                location.href = "chayns://chaynsCall(0,false)";
            }, 1);
        }
    });

angular.module('sdk.directives.ccAddress', ['src/directives/ccAddress/ccaddress.tpl.html']);

angular.module('sdk.directives.ccAddress')
    .directive('ccAddress', function() {

        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '=',
            },
            templateUrl: 'src/directives/ccAddress/ccaddress.tpl.html'
        };
    });

angular.module('sdk.directives.ccBreadcrumbs', [
        'src/directives/ccBreadcrumbs/cc-breadcrumbs.tpl.html',
        'sdk.services.urlParserService',
        'sdk.services.urlConstructionService',
        'sdk.services.couchService'
    ]);

angular.module('sdk.directives.ccBreadcrumbs')
    .directive('ccBreadcrumbs', ['$location', 'urlParserService', 'urlConstructionService', 'couchService', 'navigationService', function($location, urlParserService, urlConstructionService, couchService, navigationService) {

        'use strict';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/directives/ccBreadcrumbs/cc-breadcrumbs.tpl.html',
            scope: {
                data: '=?'
            },
            link: function($scope, $element, attrs){

                var categoryToLinkTitleList = function(category){
                    var list = [];

                    var doIt = function(currentCategory){
                        if(currentCategory.parent){
                            list.unshift({
                                title: currentCategory.label,
                                link: currentCategory.getOriginFullUrl()
                            });

                            doIt(currentCategory.parent);
                        }
                    };

                    doIt(category);

                    return list;
                };

                var prependRootLink = function(list){
                    //get rid of hardcoded stuff
                    list.unshift({
                        title: 'Startseite',
                        link: '/'
                    });

                    return list;
                };

                $scope.navigateTo = function(entry){
                    $location.path(entry.link);
                };

                $scope.$watch(function(){
                    return $location.path();
                }, function(){
                    if(!urlParserService.isRootCategory() ||
                        urlParserService.isView('categories') ||
                        urlParserService.isView('products') ||
                        urlParserService.isView('product')){

                        var categoryUrlId = urlParserService.getCategoryUrlId();

                        couchService
                            .getCategory(categoryUrlId)
                            .then(function(category){
                                var data = prependRootLink(
                                                categoryToLinkTitleList(category));

                                if (urlParserService.isView('products')){
                                    data.pop();
                                }

                                $scope.data = data;
                            });
                    }
                });
            }
        };
    }]);

angular.module('sdk.directives.ccCategoryTreeView', [
        'sdk.directives.ccTemplateCode',
        'src/directives/ccCategoryTreeView/cc-category-tree-view.tpl.html'
    ]);
angular.module('sdk.directives.ccCategoryTreeView')
    .directive('ccCategoryTreeView', ['couchService', 'categoryTreeViewRemote', function(couchService, categoryTreeViewRemote) {

        'use strict';

        return {
            restrict: 'EA',
            scope:{},
            replace: true,
            templateUrl: 'src/directives/ccCategoryTreeView/cc-category-tree-view.tpl.html',
            link: function($scope, $element, attributes, controller){
                couchService
                    .getCategory()
                    .then(function(rootCategory){
                        $scope.items = rootCategory && rootCategory.children ? rootCategory.children : [];
                        $scope.item = rootCategory;
                        $scope.isRoot = true;
                        categoryTreeViewRemote.toggleVisibility(rootCategory);

                        $scope.items.forEach(function(item){
                            categoryTreeViewRemote.setItemLevel(item, 1);
                        });

                    });
            }
        };
    }]);
angular.module('sdk.directives.ccCategoryTreeView')
    .factory('categoryTreeViewRemote', [function() {

        'use strict';

        var self = {};

        var activeItem = null;

        self.setActive = function(item){
            asurePrivateStore(item);

            if (activeItem){
                activeItem._categoryTreeView.isActive = false;
            }

            item._categoryTreeView.isActive = true;
            self.setVisibility(item, true, true);

            activeItem = item;
        };

        self.setVisibility = function(item, visbility, upwardsRecursive){
            asurePrivateStore(item);
            item._categoryTreeView.isVisible = visbility;
            if (item.parent && upwardsRecursive){
                self.setVisibility(item.parent, visbility, upwardsRecursive);
            }
        };

        self.toggleVisibility = function(item){
            asurePrivateStore(item);
            item._categoryTreeView.isVisible = !item._categoryTreeView.isVisible;
        };

        self.setItemLevel = function(item, level){
            asurePrivateStore(item);
            item._categoryTreeView.level = level;
        };

        var asurePrivateStore = function(item){
            if (!item._categoryTreeView){
                item._categoryTreeView = { isVisible: false };
            }
        };

        return self;
    }]);
angular.module('sdk.directives.ccCategoryTreeView')
    .directive('ccNestedCategoryItem', ['$compile', 'categoryTreeViewRemote', 'navigationService', 'snapRemote', function($compile, categoryTreeViewRemote, navigationService) {

        'use strict';

        return {
            restrict: 'A',
            require: '^ccTemplateCode',
            link: function($scope, $element, attributes, controller){
                $scope.isRoot = false;
                if ($scope.item.children){
                    $scope.items = $scope.item.children;
                    var html = $compile(controller.templateCode)($scope);
                    $element.append(html);
                }
                $scope.remoteControl = categoryTreeViewRemote;

                $scope.doAction = function($event, item){
                    $event.preventDefault();
                    if (!item.hasChildren){
                        categoryTreeViewRemote.setActive(item);
                        navigationService.navigateToUrl(item.getOriginFullUrl());
                    } else {
                        categoryTreeViewRemote.toggleVisibility(item);
                    }
                };
            }
        };
    }]);


angular.module('sdk.directives.ccCheckBox', ['src/directives/ccCheckBox/cc-checkbox.tpl.html']);

angular.module('sdk.directives.ccCheckBox')
    .directive('ccCheckBox', function() {

        'use strict';

        var instanceCount = 0;

        return {
            restrict: 'E',
            replace: true,
            scope: {
                label: '=?',
                value: '=?'
            },
            templateUrl: 'src/directives/ccCheckBox/cc-checkbox.tpl.html',
            controller: ['$scope', function($scope) {
                return {
                    getId: function(){
                        return $scope.id;
                    }
                };
            }],
            link: function(scope, $element, attrs){
                instanceCount++;
                scope.id = instanceCount;
            }
        };
    });


angular.module('sdk.directives.ccFixedToolbarsView', []);

//this is a generic directive that creates an view with optional fixed
//header and toolbars
angular.module('sdk.directives.ccFixedToolbarsView')
    .directive('ccFixedToolbarsView', function() {

        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                header: '=',
                footer: '='
            },
            templateUrl: 'src/directives/ccFixedToolbarsView/fixedtoolbarsview.html'
        };
    });
angular.module('sdk.directives.ccFooterLinks', [
    'src/directives/ccFooterLinks/cc-footer-links.tpl.html',
    'sdk.services.configService'
]);

angular
    .module('sdk.directives.ccFooterLinks')
    .directive('ccFooterLinks', ['configService', 'navigationService', function(configService, navigationService) {

        'use strict';

        var defaultIfUndefined = function(scope, property, defaultVal){
            scope[property] = scope[property] === undefined ? defaultVal : scope[property];
        };

        var ABOUT_PAGES = configService.get('aboutPages');

        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                items: '=?'
            },
            templateUrl: 'src/directives/ccFooterLinks/cc-footer-links.tpl.html',
            link: function(scope, element, attrs){
                defaultIfUndefined(scope, 'items', ABOUT_PAGES);

                scope.goTo = function(item){
                    navigationService.navigateToContentPage(item.id);
                };
            }
        };
    }]);
angular.module('sdk.directives.ccGoBackButton', ['src/directives/ccGoBackButton/cc-go-back-button.tpl.html']);

angular.module('sdk.directives.ccGoBackButton')
    .directive('ccGoBackButton', ['$window', function($window) {

        'use strict';

        return {
            restrict: 'EA',
            templateUrl: 'src/directives/ccGoBackButton/cc-go-back-button.tpl.html',
            scope: {},
            replace: true,
            transclude: true,
            link: function($scope, element, attributes, controller){

                $scope.goBack = function(){
                    $window.history.back();
                };
            }
        };
    }]);
angular.module('sdk.directives.ccGoUpButton', ['src/directives/ccGoUpButton/cc-go-up-button.tpl.html']);

angular.module('sdk.directives.ccGoUpButton')
    .directive('ccGoUpButton', ['navigationService', function(navigationService) {

        'use strict';

        return {
            restrict: 'EA',
            templateUrl: 'src/directives/ccGoUpButton/cc-go-up-button.tpl.html',
            scope: {},
            replace: true,
            transclude: true,
            link: function($scope, element, attributes, controller){

                $scope.goUp = function(){
                    navigationService.goUp();
                };
            }
        };
    }]);
angular.module('sdk.directives.ccGoUpControl', [
    'src/directives/ccGoUpControl/cc-go-up-control.tpl.html',
    'sdk.directives.ccGoUpButton'
]);

angular.module('sdk.directives.ccGoUpControl')
    .directive('ccGoUpControl', [function() {

        'use strict';

        return {
            restrict: 'EA',
            templateUrl: 'src/directives/ccGoUpControl/cc-go-up-control.tpl.html',
            scope: {
                category: '=',
                homeText: '@'
            },
            link: function($scope, element, attributes){

                $scope.getParentLabel = function () {
                    return $scope.category.parent && !$scope.category.parent.isRoot ? $scope.category.parent.label :
                           $scope.category.parent && $scope.category.parent.isRoot ? $scope.homeText : '';
                };
            }
        };
    }]);

angular.module('sdk.directives.ccImageFullScreen', []);
angular
    .module('sdk.directives.ccImageFullScreen')
    .directive('ccImageFullScreen', ['deviceService', 'ccImageFullScreenService', function (deviceService, ccImageFullScreenService) {

            'use strict';

            return {
                restrict: 'A',
                link: function (scope, $element) {

                    if (!ccImageFullScreenService.enabled) {
                        return;
                    }

                    $element.bind('click', function () {
                        ccImageFullScreenService.toFullScreen($element);
                    });
                }
            };
        }]
    );
/* global document*/

angular.module('sdk.directives.ccImageFullScreen')
       .factory('ccImageFullScreenService', ['$timeout', function ($timeout) {

    'use strict';

    var self = {},
    isAllowedToInteract = true,
    $fullDiv,
    appContent;

    var settings = {
        BODY_WRAPPER_CLASS: 'cc-image-full-screen__hide-marker',
        SIMPLE_CLASS: 'cc-image-full-screen__image',
        SIMPLE_CLASS_ACTIVE: 'cc-image-full-screen__image--active',
        ZOOM_ANIM_DURATION: 500
    };

    self.enabled = true;

    self.toFullScreen = function ($element) {
        if (!isAllowedToInteract) {
            return;
        }

        var $body = angular.element(document.body);

        appContent = settings.BODY_WRAPPER_CLASS ?
                     angular.element(document.querySelectorAll('.' + settings.BODY_WRAPPER_CLASS)[0]) :
                     $body;

        $fullDiv = angular.element(document.createElement('div'));
        $body.append($fullDiv[0]);

        if (settings.SIMPLE_CLASS) {
            $fullDiv.addClass(settings.SIMPLE_CLASS);
        }

        // Set the background-image of the newly created div to the image src
        $fullDiv.css('background-image', 'url(' + $element.attr('src') + ')');

        // The following triggers a reflow which allows for the transition animation to kick in.
        $fullDiv[0].offsetWidth; /* jshint ignore:line */

        if (settings.SIMPLE_CLASS_ACTIVE) {
            $fullDiv.addClass(settings.SIMPLE_CLASS_ACTIVE);
        }

        $fullDiv.bind('click', self.closeFullScreen);
        
        isAllowedToInteract = false;

        $timeout(function () {
            isAllowedToInteract = true;

            // We need to set the whole underlying thing to display:none
            // otherwise on some platforms (Android 2 I'm looking at you)
            // the content behind the fullscreen image will still be visible
            // and even scrollable which gives a bad experience.
            appContent.css('display', 'none');
        }, settings.ZOOM_ANIM_DURATION);
    };

    self.closeFullScreen = function () {
        if (!isAllowedToInteract) {
            return;
        }

        appContent.css('display', '');
        if (settings.SIMPLE_CLASS_ACTIVE) {
            $fullDiv.removeClass(settings.SIMPLE_CLASS_ACTIVE);
        }

        isAllowedToInteract = false;
        $timeout(function () {
            $fullDiv.remove();
            isAllowedToInteract = true;
        }, settings.ZOOM_ANIM_DURATION);
    };

    return self;
}]);

angular.module('sdk.directives.ccImageZoom', []);
/* global document*/

angular
    .module('sdk.directives.ccImageZoom')
    .directive('ccImageZoom', ['deviceService', '$q', '$timeout', 'ccImageZoomDomActors', 'ccImageZoomMaskService', 'ccImageZoomLerpAnim', 'ccImageZoomSettings', 'ccImageZoomDomUtil', function (deviceService, $q, $timeout, ccImageZoomDomActors, ccImageZoomMaskService, ccImageZoomLerpAnim, ccImageZoomSettings, ccImageZoomDomUtil) {

            'use strict';

            var isTouchedWithNTouches = function (event, numTouches) {
                return event.touches.length === numTouches;
            };

            return {
                restrict: 'A',
                scope: {
                    ngSrc: '@',
                    maskClass: '@',
                    activeClass: '@',
                    zoomAnimDuration: '@'
                },
                link: function (scope, $element, attrs) {

                    if (!ccImageZoomSettings.enabled) {
                        return;
                    }

                    var MASK_CLASS = 'cc-image-zoom__mask';
                    var ACTIVE_CLASS = 'cc-image-zoom__image--active';
                    var ZOOM_ANIM_DURATION = attrs.zoomAnimDuration ? attrs.zoomAnimDuration : 1000;
                    
                    var body = ccImageZoomDomActors.$body = angular.element(document.body);

                    var $clone;

                    ccImageZoomDomActors.$element = $element;

                    $clone = ccImageZoomDomActors.$clone = $element.clone();

                    $element.css('visibility', 'hidden');
                    $clone.css('visibility', 'hidden');

                    body.append($clone);

                    if (ACTIVE_CLASS) {
                        $clone.addClass(ACTIVE_CLASS);
                    }

                    // We spawn a clone that is invisible. Every time we want to interact with the image,
                    // we transform the clone instead and make it visible.

                    var stateEnum = {
                        SMALL: 1,
                        SMALL_TO_FULL: 2,
                        FULL: 3,
                        FULL_TO_SMALL: 4
                    };

                    var currentState = stateEnum.SMALL;

                    var originalImagePos;

                    var goFullscreen = function () {

                        // 1. Teleport to the original image
                        // 2. Become visible
                        // 3. Do the transition

                        // Calculate the absolute position of the original image, including scroll
                        originalImagePos = ccImageZoomDomUtil.findPos(originalImage);

                        currentState = stateEnum.SMALL_TO_FULL;

                        var aspectRatio = current.width / current.height;
                        var targetHeight;
                        var targetWidth;

                        var offsetX = 0;
                        var offsetY = 0;

                        if (window.innerWidth < window.innerHeight) {
                            targetWidth = window.innerWidth;
                            targetHeight = targetWidth / aspectRatio;
                        } else {
                            targetHeight = window.innerHeight;
                            targetWidth = targetHeight * aspectRatio;
                            offsetX = -(targetWidth - window.innerWidth) / 2;
                        }

                        offsetY = -(targetHeight / 2) + window.innerHeight / 2;

                        ccImageZoomMaskService.addMask(MASK_CLASS);

                        return lerp({x: offsetX, y: offsetY, w: targetWidth, h: targetHeight}, current)
                                .then(function () {
                                    currentState = stateEnum.FULL;
                                });
                    };

                    var exitFullscreen = function () {
                        currentState = stateEnum.FULL_TO_SMALL;

                        var aspectRatio = imgWidth / imgHeight;
                        var newHeight = imgHeight > parentHeight ? parentHeight : imgHeight;
                        var newWidth = imgHeight * aspectRatio;

                        // Calculate the absolute position of the original image, including scroll
                        originalImagePos = ccImageZoomDomUtil.findPos(originalImage);

                        return lerp({x: originalImagePos.left, y: originalImagePos.top, w: newWidth, h: newHeight}, current)
                                .then(function () {
                                    currentState = stateEnum.SMALL;
                                    ccImageZoomMaskService.removeMask();
                                });
                    };

                    ccImageZoomMaskService.onClose(exitFullscreen);

                    var updateOpacity = function (width, height) {
                        if (!ccImageZoomMaskService.hasMask()) {
                            return;
                        }

                        var tempw = width / window.innerWidth;
                        var temph = height / window.innerHeight;
                        var currentValue = Math.max(tempw, temph);

                        tempw = imgWidth / window.innerWidth;
                        temph = imgHeight / window.innerHeight;
                        var startValue = Math.max(tempw, temph);

                        var opacity = (currentValue - startValue) / ((1 - startValue) * 0.9);

                        opacity = Math.min(opacity, 1.0);
                        opacity = Math.max(opacity, 0.0);

                        ccImageZoomMaskService.updateOpacity(opacity);
                    };

                    var lerp = function (target, current) {
                        if (inAnimation) {
                            return $q.when();
                        }
                        else {
                            inAnimation = true;

                            var onProgress = function (temp) {
                                ccImageZoomDomUtil.setImageDimensionsAndVisibility(cloneImage,
                                    temp.lerpedX,
                                    temp.lerpedY,
                                    temp.lerpedWidth,
                                    temp.lerpedHeight,
                                    true);
                                updateOpacity(temp.lerpedWidth, temp.lerpedHeight);
                            };

                            return ccImageZoomLerpAnim.lerpTo(ZOOM_ANIM_DURATION, imgWidth, target, current, onProgress, function () { scope.$digest(); })
                                    .then(function () {
                                        inAnimation = false;
                                    });
                        }
                    };

                    var panning = false,
                        zooming = false,
                        startX0,
                        startY0,
                        startX1,
                        startY1,
                        startDistanceBetweenFingers,
                        endDistanceBetweenFingers,
                        pinchRatio,
                        imgWidth,
                        imgHeight;

                    var current = {
                        continuousZoom: 1.0,
                        offsetX: 0,
                        offsetY: 0,
                        width: imgWidth,
                        height: imgHeight
                    };

                    var newContinuousZoom,
                        newHeight,
                        newWidth,
                        newOffsetX,
                        newOffsetY;

                    var centerPointStartX,
                        centerPointStartY,
                        centerPointEndX,
                        centerPointEndY;

                    var percentageOfImageAtPinchPointX,
                        percentageOfImageAtPinchPointY;

                    var originalImage = $element[0],
                        cloneImage = $clone[0];

                    var parentWidth = 0,
                        parentHeight = 0;

                    var inAnimation = false;

                    var touchMoved = false;

                    var init = function () {
                        parentWidth = originalImage.parentElement.offsetWidth;
                        parentHeight = originalImage.parentElement.offsetHeight;

                        var aspectRatio = current.width / current.height;

                        imgHeight = current.height = current.height > parentHeight ? parentHeight : current.height;
                        imgWidth = current.width = current.height * aspectRatio;

                        if (imgWidth > parentWidth) {
                            imgWidth = current.width = parentWidth - 20;
                            imgHeight = current.height = current.width / aspectRatio;
                        }

                        // Calculate the absolute position of the original image, including scroll
                        originalImagePos = ccImageZoomDomUtil.findPos(originalImage);

                        current.offsetX = originalImagePos.left;
                        current.offsetY = originalImagePos.top;

                        ccImageZoomDomUtil.setImageDimensionsAndVisibility(cloneImage,
                            current.offsetX,
                            current.offsetY,
                            current.width,
                            current.height,
                            false);
                    };

                    attrs.$observe('ngSrc', function (newValue) {
                        if (newValue) {
                            // We need the image width and height, so link it to the native onload function
                            // This will automatically be refired when angular changes the src attr
                            originalImage.onload = function () {
                                imgHeight = originalImage.offsetHeight;
                                imgWidth = originalImage.offsetWidth;
                                current.width = imgWidth;
                                current.height = imgHeight;

                                init();

                                $element.css('visibility', 'visible');

                                return true;
                            };

                            cloneImage.src = newValue;
                        }
                    }, true);

                    var touchStart = function (event) {
                        // Let the animation finish before altering the image
                        if (inAnimation) {
                            return;
                        }

                        // Calculate the absolute position of the original image, including scroll
                        originalImagePos = ccImageZoomDomUtil.findPos(originalImage);

                        if (currentState !== stateEnum.FULL) {
                            current.offsetX = originalImagePos.left;
                            current.offsetY = originalImagePos.top;
                        }

                        var rect = cloneImage.parentElement.getBoundingClientRect();
                        
                        touchMoved = false;
                        panning = false;
                        zooming = false;

                        if (isTouchedWithNTouches(event, 1)) {
                            panning = true;
                            if (currentState === stateEnum.SMALL || currentState === stateEnum.FULL_TO_SMALL) {
                                return;
                            }
                            startX0 = event.touches[0].pageX - rect.left;
                            startY0 = event.touches[0].pageY - rect.top;
                        }
                        if (isTouchedWithNTouches(event, 2)) {
                            zooming = true;
                            startX0 = event.touches[0].pageX - rect.left;
                            startY0 = event.touches[0].pageY - rect.top;
                            startX1 = event.touches[1].pageX - rect.left;
                            startY1 = event.touches[1].pageY - rect.top;

                            centerPointStartX = ((startX0 + startX1) / 2.0);
                            centerPointStartY = ((startY0 + startY1) / 2.0);

                            percentageOfImageAtPinchPointX = (centerPointStartX - current.offsetX) / current.width;
                            percentageOfImageAtPinchPointY = (centerPointStartY - current.offsetY) / current.height;
                            startDistanceBetweenFingers = Math.sqrt(Math.pow((startX1 - startX0), 2) + Math.pow((startY1 - startY0), 2));
                        }

                        if (isTouchedWithNTouches(event, 2)) {
                            inAnimation = false;
                        }

                        ccImageZoomMaskService.addMask(MASK_CLASS);
                    };

                    var touchmove = function (event) {
                        var endX0,
                            endY0,
                            endX1,
                            endY1,
                            translateFromZoomingX,
                            translateFromZoomingY,
                            translateFromTranslatingX,
                            translateFromTranslatingY,
                            translateTotalX,
                            translateTotalY;

                        var rect = cloneImage.parentElement.getBoundingClientRect();
                        touchMoved = true;

                        if (panning) {
                            if (currentState === stateEnum.SMALL || currentState === stateEnum.FULL_TO_SMALL) {
                                return;
                            }

                            event.preventDefault();
                            endX0 = event.touches[0].pageX - rect.left;
                            endY0 = event.touches[0].pageY - rect.top;
                            translateFromTranslatingX = endX0 - startX0;
                            translateFromTranslatingY = endY0 - startY0;
                            newOffsetX = current.offsetX + translateFromTranslatingX;
                            newOffsetY = current.offsetY + translateFromTranslatingY;
                            cloneImage.style.left = newOffsetX + 'px';
                            cloneImage.style.top = newOffsetY + 'px';

                            updateOpacity(current.width, current.height);
                        } else if (zooming) {

                            event.preventDefault();

                            // Get the new touches
                            endX0 = event.touches[0].pageX - rect.left;
                            endY0 = event.touches[0].pageY - rect.top;
                            endX1 = event.touches[1].pageX - rect.left;
                            endY1 = event.touches[1].pageY - rect.top;

                            // Calculate current distance between points to get new-to-old pinch ratio and calc width and height
                            endDistanceBetweenFingers = Math.sqrt(Math.pow((endX1 - endX0), 2) + Math.pow((endY1 - endY0), 2));
                            pinchRatio = endDistanceBetweenFingers / startDistanceBetweenFingers;
                            newContinuousZoom = pinchRatio * current.continuousZoom;
                            newWidth = imgWidth * newContinuousZoom;
                            newHeight = imgHeight * newContinuousZoom;

                            // Get the point between the two touches, relative to upper-left corner of image
                            centerPointEndX = ((endX0 + endX1) / 2.0);
                            centerPointEndY = ((endY0 + endY1) / 2.0);

                            // This is the translation due to pinch-zooming
                            translateFromZoomingX = (current.width - newWidth) * percentageOfImageAtPinchPointX;
                            translateFromZoomingY = (current.height - newHeight) * percentageOfImageAtPinchPointY;

                            // And this is the translation due to translation of the centerpoint between the two fingers
                            translateFromTranslatingX = centerPointEndX - centerPointStartX;
                            translateFromTranslatingY = centerPointEndY - centerPointStartY;

                            // Total translation is from two components: (1) changing height and width from zooming and (2) from the two fingers translating in unity
                            translateTotalX = translateFromZoomingX + translateFromTranslatingX;
                            translateTotalY = translateFromZoomingY + translateFromTranslatingY;

                            // the new offset is the old/current one plus the total translation component
                            newOffsetX = current.offsetX + translateTotalX;
                            newOffsetY = current.offsetY + translateTotalY;

                            // Set the image attributes on the page
                            ccImageZoomDomUtil.setImageDimensionsAndVisibility(cloneImage,
                                newOffsetX,
                                newOffsetY,
                                newWidth,
                                newHeight,
                                true);

                            updateOpacity(newWidth, newHeight);
                        }
                    };

                    var simpleClickZoom = function () {
                        if (!touchMoved) {
                            if (currentState === stateEnum.FULL) {
                                scope.$apply(exitFullscreen);
                            } else if (currentState === stateEnum.SMALL) {
                                scope.$apply(goFullscreen);
                            }
                        }
                    };

                    var touchend = function (event) {

                        if (isTouchedWithNTouches(event, 2)) {
                            inAnimation = false;
                        }

                        if (panning) {
                            panning = false;

                            simpleClickZoom(event);

                            if (currentState === stateEnum.SMALL || currentState === stateEnum.FULL_TO_SMALL) {
                                return;
                            }

                            current.offsetX = newOffsetX;
                            current.offsetY = newOffsetY;
                        } else if (zooming) {
                            zooming = false;
                            current.offsetX = newOffsetX;
                            current.offsetY = newOffsetY;
                            current.width = newWidth;
                            current.height = newHeight;
                            current.continuousZoom = newContinuousZoom;
                        }

                        // If the image is zoomed in > 75% and < 100% of the screen it is likely they want to have it fullscreen
                        // At full screen, never destroy the mask
                        if (current.width / window.innerWidth > 0.75 || current.height / window.innerHeight > 0.75) {
                            if ((current.width / window.innerWidth < 1 && current.height / window.innerHeight < 1)) {
                                scope.$apply(goFullscreen);
                            } else {
                                currentState = stateEnum.FULL;
                            }
                        } else if (!inAnimation) {
                            scope.$apply(exitFullscreen);
                        }

                        touchMoved = false;
                    };

                    $clone
                        .bind('touchend', touchend)
                        .bind('touchstart', touchStart)
                        .bind('touchmove', touchmove);

                    $element
                        .bind('touchend', touchend)
                        .bind('touchmove', touchmove)
                        .bind('touchstart', touchStart);


                    $clone.bind('touchcancel', function () {
                        if (panning) {
                            panning = false;
                        } else if (zooming) {
                            zooming = false;
                        }
                        ccImageZoomMaskService.removeMask();
                    });

                    // Needed for devices to reposition the image
                    window.addEventListener('orientationchange', function () {
                        if (currentState === stateEnum.FULL) {
                            scope.$apply(goFullscreen);
                        }
                        init();
                    });

                    // Clean up when the directive is destroyed
                    scope.$on('$destroy', function () {
                        if (currentState === stateEnum.FULL) {
                            exitFullscreen()
                            .then(function () {
                                $clone.remove();
                            });
                        }
                        else {
                            $clone.remove();
                        }
                    });

                }
            };
        }]
    );
angular.module('sdk.directives.ccImageZoom')
       .factory('ccImageZoomDomActors', function () {

    'use strict';
    //this is just an empty object so that we have a home
    //for all the different DOM nodes involved. We can inject
    //it in different services which act on such DOM nodes.
    return {};
});

/* global document*/

angular.module('sdk.directives.ccImageZoom')
       .factory('ccImageZoomDomUtil', function () {

    'use strict';

    var self = {};

    // This methods calculates the exact absolute position of an element, including scroll offset
    self.findPos = function (obj) {
        var obj2 = obj;
        var curtop = 0;
        var curleft = 0;
        if (document.getElementById || document.all) {
            do {
                curleft += obj.offsetLeft - obj.scrollLeft;
                curtop += obj.offsetTop - obj.scrollTop;
                obj = obj.offsetParent;
                obj2 = obj2.parentNode;
                while (obj2 !== obj) {
                    curleft -= obj2.scrollLeft;
                    curtop -= obj2.scrollTop;
                    obj2 = obj2.parentNode;
                }
            } while (obj.offsetParent);
        } else if (document.layers) {
            curtop += obj.y;
            curleft += obj.x;
        }
        return {
            top: curtop,
            left: curleft
        };
    };

    self.setImageDimensionsAndVisibility = function (img, left, top, width, height, visible) {
        img.style.left = left + 'px';
        img.style.top = top + 'px';
        img.style.width = width + 'px';
        img.style.height = height + 'px';
        img.style.visibility = visible ? 'visible' : 'hidden';
    };

    return self;
});

/* global requestAnimationFrame */

angular.module('sdk.directives.ccImageZoom')
       .factory('ccImageZoomLerpAnim', ['$q', function ($q) {

    'use strict';

    var self = {};

    self.lerpTo = function (duration, imgWidth, target, current, onProgress, applier) {
        var deferred = $q.defer();

        var startX = current.offsetX;
        var startY = current.offsetY;
        var startW = current.width;
        var startH = current.height;

        var lastFrameTime = (new Date()).getTime();

        var animTime = duration / 1000;
        var currentAnimTime = 0;

        var lerp = function (a, b, alpha) {
            a += (b - a) * alpha;
            return a;
        };

        var easing = function (k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k;
            }
            return -0.5 * (--k * (k - 2) - 1);
        };

        var tick = function () {

            var currTime = (new Date()).getTime();
            var delta = (currTime - lastFrameTime) / 1000;
            lastFrameTime = currTime;

            currentAnimTime += delta;
            currentAnimTime = Math.min(currentAnimTime, animTime);

            var lerpFactor = currentAnimTime / animTime;

            var currentLerpedX = lerp(startX, target.x, easing(lerpFactor));
            var currentLerpedY = lerp(startY, target.y, easing(lerpFactor));
            var currentLerpedWidth = lerp(startW, target.w, easing(lerpFactor));
            var currentLerpedHeight = lerp(startH, target.h, easing(lerpFactor));

            // We would love to just use deferred.notify here but since in our
            // current version of Angular promises don't resolve outside of a $digest
            // it's more practical to switch to callback style here as manually triggering
            // a $digest with each frame might cause a perf bottleneck.
            // This might be solved once we upgrade to Angular 1.2
            // See: https://github.com/angular/angular.js/commit/6b91aa0a18098100e5f50ea911ee135b50680d67
            onProgress({
                lerpedX:         currentLerpedX,
                lerpedY:         currentLerpedY,
                lerpedWidth:     currentLerpedWidth,
                lerpedHeight:    currentLerpedHeight
            });

            current.offsetX = currentLerpedX;
            current.offsetY = currentLerpedY;
            current.width = currentLerpedWidth;
            current.height = currentLerpedHeight;

            if (currentAnimTime < animTime) {
                requestAnimationFrame(tick);
            } else {
                current.continuousZoom = current.width / imgWidth;
                deferred.resolve();
                // promises don't resolve outside of a $digest in the current angular version
                // TODO: Think about moving this whole thing to old fashioned callback style. :-(
                applier();
            }
        };

        requestAnimationFrame(tick);

        return deferred.promise;
    };

    return self;
}]);

/* global document */

angular.module('sdk.directives.ccImageZoom')
       .factory('ccImageZoomMaskService', ['ccImageZoomDomActors', function (ccImageZoomDomActors) {

    'use strict';

    var self = {},
        closeFn = null,
        $maskCloseIcon,
        mask = null;

    self.addMask = function (maskClass) {

        if (self.hasMask()) {
            return;
        }

        mask = angular.element(document.createElement('div'));

        $maskCloseIcon = angular
                            .element(document.createElement('i'))
                            .addClass('cc-image-zoom__close-mask-image');

        if (closeFn) {
            $maskCloseIcon.bind('click', closeFn);
        }

        if (maskClass) {
            mask.addClass(maskClass);
        }

        ccImageZoomDomActors.$body.append($maskCloseIcon);

        ccImageZoomDomActors.$body.prepend(mask);

        ccImageZoomDomActors.$element.css('visibility', 'hidden');
        ccImageZoomDomActors.$clone.css('visibility', 'visible');
    };

    self.removeMask = function () {

        if (!self.hasMask()) {
            return;
        }


        if (closeFn) {
            $maskCloseIcon.unbind('click', closeFn);
            $maskCloseIcon.remove();
        }

        mask.remove();
        mask = null;

        ccImageZoomDomActors.$element.css('visibility', 'visible');
        ccImageZoomDomActors.$clone.css('visibility', 'hidden');
    };

    self.hasMask = function () {
        return mask !== null;
    };

    self.updateOpacity = function (opacity) {
        if (!self.hasMask()) {
            return;
        }

        mask.css('opacity', opacity);
        $maskCloseIcon.css('opacity', opacity);
    };

    //Todo: this is all quite anti angular.
    //At least, make it raise an event :-/
    self.onClose = function (fn) {
        closeFn = fn;
    };

    return self;
}]);


angular.module('sdk.directives.ccImageZoom')
       .factory('ccImageZoomSettings', function () {

    'use strict';

    return {
        enabled: true
    };
});

angular.module('sdk.directives.ccInclude', []);

angular.module('sdk.directives.ccInclude')
    .directive('ccInclude', ['$http', '$templateCache', '$compile', function($http, $templateCache, $compile) {

        'use strict';

        return {
                restrict: 'A',
                link: function (scope, element, attributes) {
                    var templateUrl = scope.$eval(attributes.ccInclude);
                    $http
                        .get(templateUrl, {cache: $templateCache})
                        .success(function (tplContent) {
                            element.replaceWith($compile(tplContent.trim())(scope));
                        });
                }
            };
    }]);
angular.module('sdk.directives.ccInject', []);

angular
    .module('sdk.directives.ccInject')
    .directive('ccInject', ['$templateCache', '$http', '$compile', 'injectsService', 'deviceService', function($templateCache, $http, $compile, injectsService, deviceService) {

        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            scope: {
                target: '@'
            },
            link: function(scope, element, attrs){
                scope.injectsService = injectsService;
                scope.deviceService = deviceService;

                //if it's an inject on the product page, automatically expose
                //the product to the inject
                if (scope.$parent.product){
                    scope.product = scope.$parent.product;
                }

                var templateUrl = injectsService.getTemplate(scope.target);

                if (templateUrl === null){
                    element.remove();
                }
                else{
                    $http
                        .get(templateUrl, {cache: $templateCache})
                        .success(function (tplContent) {
                            element.replaceWith($compile(tplContent)(scope));
                        });
                }
            }
        };
    }]);
angular.module('sdk.directives.ccIosInputFocusFix', []);
// On iOS, when you focus an input and then rotate the screen, the layout
// tends to mess up. To fix it we force a DOM refresh on orientation change.

angular.module('sdk.directives.ccIosInputFocusFix')
    .directive('ccIosInputFocusFix', ['inputFocusFixConfigService', 'deviceService',
        function(inputFocusFixConfigService, deviceService) {

        'use strict';

        return {
                restrict: 'A',
                link: function (scope, element, attributes, controllers) {
                    window.addEventListener('orientationchange', function() {
                        if ( inputFocusFixConfigService.enabled && deviceService.getOs() === "iOS" ) {
                            setTimeout(function() {
                                document.body.style.display = "none";
                                setTimeout(function() {
                                    document.body.style.display = "block";
                                }, 1);
                            }, 1000);
                            // The number 1000 here is magic, because this hack needs to happen somewhere after the orientationchange.
                            // It is unlikely that orientationchanges will ever exceed 1000ms since devices only get faster and
                            // this is only targeted towards iOS devices which react in a consistent way.
                        }
                    });
                }
            };
    }]);
angular
    .module('sdk.directives.ccIosInputFocusFix')
    .factory('inputFocusFixConfigService', [function(){
        'use strict';

        var self = {};

        self.enabled = false;

        return self;
}]);
angular.module('sdk.directives.ccLazyValidation', []);

/**
 * Lazy validation extends the modelController with alternative valid and invalid properties,
 * which are set with a delay. This way, the user isn't disturbed by error messages while filling
 * out a field.
 * The new properties to use in your template are
 * - ccValid
 * - ccInvalid
 */

angular.module('sdk.directives.ccLazyValidation')
    .directive('ccLazyValidation', function () {

        'use strict';

        var DEBOUNCE_MS_DEFAULT = 2000;

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, controller) {

                var DEBOUNCE_MS = DEBOUNCE_MS_DEFAULT,
                    offCalled = false;

                if (attrs.ccLazyValidation && typeof $scope.$eval(attrs.ccLazyValidation) === 'number') {
                    DEBOUNCE_MS = $scope.$eval(attrs.ccLazyValidation);
                }

                var checkValidity = function () {
                    // stop all remaining watches once the user starts interacting with the field
                    if (!offCalled) {
                        off();
                        offCalled = true;
                    }
                    if (controller.$valid) {
                        setValid();
                    } else {
                        if (controller.$dirty) {
                            debouncedError();
                        }
                    }
                };

                var debouncedError = cc.Util.debounce(function (stop) {
                    if (!stop && element[0].value.length > 0) {
                        setInvalid();
                    }
                }, DEBOUNCE_MS);


                var validate = function () {
                    if (controller.$dirty) {
                        if (controller.$valid) {
                            setValid();
                        } else {
                            setInvalid();
                        }
                    }
                };

                var setValid = function () {
                    debouncedError(true);
                    $scope.$apply(function () {
                        controller.ccValid = true;
                        controller.ccInvalid = false;
                    });
                };

                var setInvalid = function () {
                    $scope.$apply(function () {
                        controller.ccValid = false;
                        controller.ccInvalid = true;
                    });
                };

                element.bind('keyup keydown', checkValidity);
                element.bind('blur', validate);

                // In case there are values coming from a controller we need to watch for changes
                var off = $scope.$watch(function () { return controller.$viewValue; }, function (newValue) {
                    if (newValue && newValue.length) {
                        controller.ccValid = controller.$valid;
                        controller.ccInvalid = controller.$invalid;
                        off();
                        offCalled = true;
                    }
                });

                // Initially set to be neither valid nor invalid
                controller.ccValid = false;
                controller.ccInvalid = false;
            }
        };
    });

angular.module('sdk.directives.ccLoadingSpinner', ['src/directives/ccLoadingSpinner/ccloadingspinner.tpl.html']);

angular.module('sdk.directives.ccLoadingSpinner')
    .directive('ccLoadingSpinner', function() {

        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'src/directives/ccLoadingSpinner/ccloadingspinner.tpl.html'
        };
    });
angular.module('sdk.directives.ccPrice', ['src/directives/ccPrice/cc-price.tpl.html']);

/**
 * Creates pricing markup for prices and special prices
 *
 *
 */
angular.module('sdk.directives.ccPrice')
    .directive('ccPrice', function() {

        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                product: '=',
                selectedVariant: '=?'
            },
            templateUrl: 'src/directives/ccPrice/cc-price.tpl.html',
            link: function ($scope) {

                // We can't have the template directly bind to the product.price because
                // that's leaving out the selected variant which changes dynamically
                // outside of the product model.

                // So what we need to do is to listen manually for changes on the product or
                // the variant and then update the price on our isolated scope.
                var updatePrices = function() {
                    $scope.price = $scope.product.price;
                    $scope.priceOld = $scope.product.priceOld;

                    if ($scope.selectedVariant && $scope.selectedVariant.price !== undefined) {
                        $scope.price = $scope.selectedVariant.price;
                    }
                };

                $scope.$watch('product', updatePrices);
                $scope.$watch('selectedVariant', updatePrices);
            }
        };
    });

angular.module('sdk.directives.ccScrollFix', []);

angular.module('sdk.directives.ccScrollFix')
    .directive('ccScrollFix', function() {

        'use strict';
        //This code is inspired by https://github.com/joelambert/ScrollFix
        //but was turned into a angular directive

        //It partly works around scrolling issues on iOS where the elastic
        //scrolling comes into our way when using overflow:scroll sub elements

        return {
            restrict: 'A',
            link: function(scope, $element, attrs){

                var startY, 
                    startTopScroll,
                    element = $element[0];

                $element.bind('touchstart', function(event){
                    startY = event.touches[0].pageY;
                    startTopScroll = element.scrollTop;

                    if(startTopScroll <= 0)
                        element.scrollTop = 1;

                    if(startTopScroll + element.offsetHeight >= element.scrollHeight)
                        element.scrollTop = element.scrollHeight - element.offsetHeight - 1;
                });
            }
        };
    });
angular.module('sdk.directives.ccScrollingShadow', []);

angular.module('sdk.directives.ccScrollingShadow')
    .directive('ccScrollingShadow', function() {

        'use strict';

        return {
            restrict: 'A',
            link: function(scope, $element, attr){

                var $topShadow          = angular.element('<div class="cc-scrolling-shadow-top"></div>'),
                    $bottomShadow       = angular.element('<div class="cc-scrolling-shadow-bottom"></div>'),
                    $parent             = $element.parent();

                $parent
                    .append($topShadow)
                    .append($bottomShadow);

                var topShadowHeight     = $topShadow[0].clientHeight,
                    bottomShadowHeight  = $bottomShadow[0].clientHeight;


                //IE uses scrollTop instead of scrollY
                var getScrollTop = function(element){
                    return ('scrollTop' in element) ? element.scrollTop : element.scrollY;
                };

                var updateShadows = function(){

                    var element                     = $element[0],
                        scrollTop                   = getScrollTop(element),
                        clientHeight                = element.clientHeight,
                        scrollHeight                = element.scrollHeight,
                        bottomTopVal                = (scrollTop - bottomShadowHeight) + clientHeight,
                        scrollBottom                = scrollHeight - scrollTop - clientHeight,
                        rollingShadowOffsetTop      = 0,
                        rollingShadowOffsetBottom   = 0;

                    if (scrollTop < topShadowHeight){
                        rollingShadowOffsetTop      = (topShadowHeight - scrollTop) * -1;
                    }

                    if (scrollBottom < bottomShadowHeight){
                        rollingShadowOffsetBottom = (bottomShadowHeight - scrollBottom) * -1;
                    }

                    $topShadow.css('top', rollingShadowOffsetTop + 'px');
                    $bottomShadow.css('bottom', rollingShadowOffsetBottom + 'px');
                };

                setTimeout(updateShadows, 1);

                $element.bind('scroll', updateShadows);
            }
        };
    });

angular.module('sdk.directives.ccSearchField', ['src/directives/ccSearchField/cc-search-field.tpl.html']);

/**
 * Creates a search field which offers some common usability features
 *
 * - shows a search-icon at the input field
 * - provides a clear-button for the input
 * - offers an interface to focus() the input field
 * - binds to a parent model
 * - optional placeholder-text
 *
*/
angular.module('sdk.directives.ccSearchField')
    .directive('ccSearchField', function() {

        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                focus: '=',
                placeholderText: '=',
                _value: '=ngModel'
            },
            require: '?ngModel',
            templateUrl: 'src/directives/ccSearchField/cc-search-field.tpl.html',
            link: function (scope, element, attrs) {

                var inputField  = element.find('input')[0];

                if (!attrs.ngModel) {
                    return;
                }

                scope.hasValue = function () {
                    return scope._value.length > 0;
                };

                scope.focusField = function () {
                    inputField.focus();
                };

                scope.clearValue = function () {
                    scope._value = '';
                    scope.focusField();
                };

                scope.$watch('focus', function (newValue) {
                    if (newValue) {
                        scope.focusField();
                    }
                });
            }
        };
    });

angular.module('sdk.directives.ccSelectBox', ['src/directives/ccSelectBox/cc-select-box.tpl.html', 'sdk.directives.sofaName']);

/**
* Creates a mobile friendly select box that delegates to the native picker
* 
* Options:
* 
*   -   `displayValueExp` optional expression that maps values to display values.
*       Can either be a string (e.g. 'some.nested.property') or a function 
*       (e.g. function(value){ return value.some.nested.property; })
*/
angular.module('sdk.directives.ccSelectBox')
    .directive('ccSelectBox', function() {

        'use strict';

        // a) "ngModel compares by reference, not value. This is important when binding to an array of objects."
        // b) Regardless of data type also check whether the given model exists within the options-data
        var mapModelToData = function (scope) {
            if (scope.model) {
                var modelInData = false;

                for(var i = 0; i < scope.data.length; i++) {
                    if (angular.equals(scope.data[i], scope.model)) {
                        scope.model = scope.data[i];
                        modelInData = true;
                        break;
                    }
                }

                if (!modelInData) {
                    scope.model = null;
                }
            }
            if (!scope.model && !scope.chooseText && scope.data.length) {
                scope.model = scope.data[0];
            }
        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=',
                data: '=',
                propertyName: '@',
                required: '=?',
                chooseText: '=?',
                displayValueExp: '&'
            },
            templateUrl: 'src/directives/ccSelectBox/cc-select-box.tpl.html',
            link: function (scope) {

                // Initial run to map any preselected model values
                mapModelToData(scope);

                // If by any reason the data object has changed, we have to map any existing model data to the new data
                scope.$watchCollection('data', function (newData, oldData) {
                    if (newData !== oldData) {
                        mapModelToData(scope);
                    }
                });

                var displayValueFormatter = scope.displayValueExp();

                //default display function that will be used if no displayValueExp is given
                scope.displayFn = function (value) {
                    return value;
                };

                if (angular.isFunction(displayValueFormatter)) {
                    scope.displayFn = displayValueFormatter;
                } else if (angular.isString(displayValueFormatter)) {

                    var properties = displayValueFormatter.split('.');

                    scope.displayFn = function (value) {

                        if (!value) {
                            return value;
                        }
                        var tempValue = value;
                        properties.forEach(function (node) {
                            tempValue = tempValue[node];
                        });
                        return tempValue;
                    };
                }
            }
        };
    });

angular.module('sdk.directives.ccTemplateCode', []);

angular.module('sdk.directives.ccTemplateCode')
    .directive('ccTemplateCode', function() {

        'use strict';

        return {
            restrict: 'A',
            controller: function(){},
            compile: function($element){
                $element.removeAttr('cc-template-code');
                //ATTENTION: We need to trim() here. Otherwise AngularJS raises an exception
                //later when we want to use the templateCode in a $compile function. 
                //Be aware that we assume a modern browser 
                //that already ships with a trim function.
                //It's easy to secure that with a polyfill.
                var templateCode = $element.parent().html().trim();
                return function(scope, iElement, iAttrs, controller){
                    controller.templateCode = templateCode;
                };
            }
        };
    });
angular.module('sdk.directives.ccThumbnailBar', ['src/directives/ccThumbnailBar/cc-thumbnail-bar.tpl.html']);

angular.module('sdk.directives.ccThumbnailBar')
    .directive('ccThumbnailBar', function () {

        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            scope: {
                images: '=',
                onChange: '&'
            },
            templateUrl: 'src/directives/ccThumbnailBar/cc-thumbnail-bar.tpl.html',
            link: function ($scope) {

                $scope.setSelectedImage = function (index) {
                    $scope.selectedImageIndex = index;

                    $scope.onChange({image: $scope.images[index].image});
                };

                $scope.$watch('images', function (newValue) {
                    // reset the image index when images ref changes
                    if (angular.isArray(newValue)) {
                        $scope.setSelectedImage(0);
                    }
                });
            }
        };
    });

angular.module('sdk.directives.ccVariantSelector', ['src/directives/ccVariantSelector/ccvariantselector.tpl.html', 'sdk.directives.ccSelectBox']);

angular.module('sdk.directives.ccVariantSelector')
    .filter('ccVariantFilter', ['$filter', function ($filter) {

        'use strict';

        // variants, selectedProperties, propertyKey
        return function (values, selectedValues, key) {
            var selected = {
                properties: {}
            },
            applyFilters = false;

            // reformat for built in filter and exclude current property
            for (var property in selectedValues) {
                if (key !== property && selectedValues[property] !== null && selectedValues[property] !== undefined) {
                    selected.properties[property] = selectedValues[property];
                    applyFilters = true;
                }
            }

            var comparator = function(obj, text) {
                if (obj && text && typeof obj === 'object' && typeof text === 'object') {
                    for (var textKey in text) {
                        if (obj[textKey] !== text[textKey]) {
                            return false;
                        } 
                    }
                    return true;
                }
            };

            // extract available variants
            var variants = applyFilters ? $filter('filter')(values, selected, comparator) : values;

            // extract flat values for the curent property
            var result = [];
            variants.forEach(function (variant) {
                if (result.indexOf(variant.properties[key]) === -1 && variant.stock > 0) {
                    result.push(variant.properties[key]);
                }
            });

            return result;
        };
    }])

    .directive('ccVariantSelector', ['$filter', function ($filter) {

        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                variants: '=',
                variant: '=?',
                selectedProperties: '=?',
                chooseText: '=?'
            },
            templateUrl: 'src/directives/ccVariantSelector/ccvariantselector.tpl.html',
            link: function (scope) {

                // extract flat list of available properties
                // maybe iterating on the first variant is enough ?
                scope.properties = [];
                scope.selectedProperties = scope.selectedProperties || {};
                scope.data = {};

                var getDataByProperty = function (property) {
                    return $filter('ccVariantFilter')(scope.variants, scope.selectedProperties, property);
                };

                var setData = function () {
                    scope.properties.forEach(function (property) {
                        scope.data[property] = getDataByProperty(property);
                    });
                };

                var findVariant = function (variants, selectedProperties) {
                    var filteredVariants = variants.filter(function (variant) {
                        for (var property in variant.properties) {
                            if (variant.properties[property] !== selectedProperties[property]) {
                                return false;
                            }
                        }

                        return true;
                    });

                    return filteredVariants.length > 0 ? filteredVariants[0] : null;
                };

                scope.variants.forEach(function (variant) {
                    for (var property in variant.properties) {
                        //create a placeholder value on the selectedProperties hash
                        //for each available property. So we can later figure out
                        //which are missing.
                        scope.selectedProperties[property] = null;
                        if (scope.properties.indexOf(property) === -1) {
                            scope.properties.push(property);
                        }
                    }
                });

                scope.$watch('selectedProperties', function (newVal) {
                    scope.variant = findVariant(scope.variants, newVal);
                    setData();
                }, true);
            }
        };
    }]);


angular.module('sdk.directives.ccZippy', ['src/directives/ccZippy/cc-zippy.tpl.html']);

angular.module('sdk.directives.ccZippy')
    .directive('ccZippy', function() {

        'use strict';

        var defaultIfUndefined = function(scope, property, defaultVal){
            scope[property] = scope[property] === undefined ? defaultVal : scope[property];
        };

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                caption: '=?',
                opened: '=?'
            },
            templateUrl: 'src/directives/ccZippy/cc-zippy.tpl.html',
            link: function(scope, $element, attrs){
                var element = $element[0],
                    $caption = angular.element(element.querySelectorAll('.cc-zippy__caption')[0]),
                    $icon = angular.element(element.querySelectorAll('.cc-zippy-icon')[0]),
                    openedIconClass = 'cc-zippy-icon--opened',
                    closedIconClass = 'cc-zippy-icon--closed';

                defaultIfUndefined(scope, 'caption', 'default');

                scope.opened = attrs.initOpened === undefined ? false : (attrs.initOpened === "true");

                var setOpen = function(opened){
                    $element.removeClass(opened ? 'cc-zippy--closed' : 'cc-zippy--opened');
                    $element.addClass(opened ? 'cc-zippy--opened' : 'cc-zippy--closed');
                    $icon.removeClass(opened ? closedIconClass : openedIconClass);
                    $icon.addClass(opened ? openedIconClass : closedIconClass);
                };

                var toggle = function(){
                    scope.opened = !scope.opened;
                    setOpen(scope.opened);
                };

                $caption.bind('click', toggle);

                scope.$watch('opened', setOpen);

                setOpen(scope.opened);
            }
        };
    });
angular.module('sdk.directives', [
    'sdk.directives.sofaName',
    'sdk.directives.ccFixedToolbarsView',
    'sdk.directives.ccZippy',
    'sdk.directives.ccFooterLinks',
    'sdk.directives.ccSelectBox',
    'sdk.directives.ccCheckBox',
    'sdk.directives.ccAddress',
    'sdk.directives.ccLazyValidation',
    'sdk.directives.ccVariantSelector',
    'sdk.directives.ccThumbnailBar',
    'sdk.directives.ccScrollingShadow',
    'sdk.directives.ccScrollFix',
    'sdk.directives.ccLoadingSpinner',
    'sdk.directives.ccInclude',
    'sdk.directives.ccIosInputFocusFix',
    'sdk.directives.ccInject',
    'sdk.directives.ccBreadcrumbs',
    'sdk.directives.ccTemplateCode',
    'sdk.directives.ccCategoryTreeView',
    'sdk.directives.ccGoUpButton',
    'sdk.directives.ccGoUpControl',
    'sdk.directives.ccGoBackButton',
    'sdk.directives.ccImageFullScreen',
    'sdk.directives.ccImageZoom',
    'sdk.directives.ccPrice',
    'sdk.directives.ccSearchField',
    'sdk.directives.sofaRadioButton',
    'sdk.directives.sofaTouchSlider',
    'sdk.directives.sofaFullPageView',
    'sdk.directives.sofaImageZoom',
    'sdk.directives.sofaImageAspectRatio'
]);
angular.module('sdk.directives.sofaFullPageView', ['src/directives/sofaFullPageView/sofa-full-page-view.tpl.html']);


angular.module('sdk.directives.sofaFullPageView')
    .directive('sofaFullPageView', function () {

        'use strict';

        return {
            restrict: 'E',
            controller: function () {

            },
            link: function ($scope, $element, attrs) {
                var onOpen  = $scope.$eval(attrs.onOpen);
                var onClose = $scope.$eval(attrs.onClose);

                $scope.openFullPageView = function (e) {
                    e.preventDefault();
                    if (angular.isFunction(onOpen)) {
                        onOpen($scope);
                    }
                    $scope.active = true;
                };
                $scope.closeFullPageView = function (e) {
                    e.preventDefault();
                    if (angular.isFunction(onClose)) {
                        onClose($scope);
                    }
                    $scope.active = false;
                };

                $scope.$on('$destroy', function () {
                    $scope.cloneElement.remove();
                });
            }
        };
    })
    .directive('sofaFullPageViewClone', ['$window', function ($window) {
        return {
            restrict: 'E',
            require: '^sofaFullPageView',
            replace: true,
            transclude: true,
            templateUrl: 'src/directives/sofaFullPageView/sofa-full-page-view.tpl.html',
            compile: function () {
                return function ($scope, $element) {
                    angular.element($window.document.body).prepend($element);
                    $scope.active = false;
                    $scope.cloneElement = $element;
                    $element.css('height', $window.innerHeight + 'px');

                    // orientationchange will not work for android, so we use the resize event
                    $window.addEventListener('resize', function () {
                        $element.css('height', $window.innerHeight + 'px');
                    });
                };
            }
        };
    }])
    .directive('sofaFullPageViewOriginal', function () {
        return {
            restrict: 'E',
            require: '^sofaFullPageView',
            link: function ($scope, $element) {
                $scope.originalElement = $element;
            }
        };
    });
angular.module('sdk.directives.sofaImageAspectRatio', [])
    .directive('sofaImageAspectRatio', ['$window', '$rootScope', 'deviceService', function ($window, $rootScope, deviceService) {

        'use strict';
        
        $window.addEventListener('orientationchange', function () {
            $rootScope.$emit('sofaImageAspectRatio.orientationChange');
        }, false);

        return {
            restrict: 'A',
            link: function ($scope, $element) {
                var el = $element[0];

                var setStyles = function () {
                    if (deviceService.isInPortraitMode()) {
                        el.style.maxWidth  = '100%';
                        el.style.maxHeight = 'none';
                    } else {
                        el.style.maxWidth  = 'none';
                        el.style.maxHeight = '100%';
                    }
                };

                setStyles();

                $scope.$onRootScope('sofaImageAspectRatio.orientationChange', setStyles);
            }
        };
    }]);
/* global Hammer */

/**
 * Image Zoom.
 * Dependencies: hammerjs (v.2.0)
 *
 */

// TODO: pan and pinch works, while pinch and pan doesn't :(

angular.module('sdk.directives.sofaImageZoom', ['src/directives/sofaImageZoom/sofa-image-zoom.tpl.html']);


angular.module('sdk.directives.sofaImageZoom')
    .directive('sofaImageZoom', ['$window', '$compile', '$rootScope', '$timeout', 'sofaImageZoomService',
        function ($window, $compile, $rootScope, $timeout, sofaImageZoomService) {

            'use strict';

            if (!angular.isFunction($window.Hammer)) {
                throw new Error('Hammer.js is missing');
            }

            return {
                restrict: 'A',
                templateUrl: 'src/directives/sofaImageZoom/sofa-image-zoom.tpl.html',
                compile: function (tElement) {

                    var scope = $rootScope.$new();

                    scope.imageSrc = '';

                    scope.closeZoomView = function () {
                        scope.active = false;
                        scope.imageSrc = '';
                        scope.$digest();

                        $window.removeEventListener('resize', sofaImageZoomService.adjust);
                    };

                    scope.openZoomView = function (imgSrc, originalImage) {
                        scope.imageSrc = imgSrc;
                        scope.active   = true;
                        scope.$digest();

                        // orientationchange will not work for android, so we use the resize event
                        $window.addEventListener('resize', sofaImageZoomService.adjust);

                        sofaImageZoomService.setup(originalImage, scope.$zoomImage[0], scope.$zoomContainer[0]);
                    };

                    scope.$zoomContainer = $compile(tElement.contents())(scope);
                    scope.$zoomImage = scope.$zoomContainer.find('img');

                    angular.element($window.document.body).prepend(scope.$zoomContainer);

                    // Touch stuff
                    var mc = new Hammer.Manager(scope.$zoomImage[0]);

                    var pinch = new Hammer.Pinch();
                    var pan   = new Hammer.Pan();

                    pinch.recognizeWith(pan);

                    var sessionEnded = false;

                    mc.add([pinch, pan]);

                    mc.on('pinchin pinchout', function (e) {
                        if (!sessionEnded) {
                            sofaImageZoomService.zoom(e, scope.$zoomImage[0]);
                        }
                    }).on('pinchstart', function () {
                        sessionEnded = false;
                    }).on('pinchend', function (e) {
                        sessionEnded = true;
                        sofaImageZoomService.zoom(e, scope.$zoomImage[0], true);

                        if (sofaImageZoomService.getZoomFactor() <= 1) {
                            scope.closeZoomView();
                        }
                    }).on('pan', function (e) {
                        sofaImageZoomService.move(e, scope.$zoomImage[0]);
                    }).on('panend', function (e) {
                        sofaImageZoomService.move(e, scope.$zoomImage[0], true);
                    });

                    // This is for the cleanup
                    scope.imageScopes = {};

                    scope.$watchCollection('imageScopes', function (a) {
                        if (!Object.keys(a).length) {
                            scope.$zoomContainer.remove();
                            $timeout(function () {
                                scope.$destroy();
                            }, 0);
                        }
                    });

                    return function ($scope, $element, attrs) {

                        // Where does the zoomImage URL come from?
                        var getImageSrc = function () {
                            return !!attrs.sofaImageZoom ? $scope.$eval(attrs.sofaImageZoom) : attrs.src;
                        };

                        $scope.imageSrc = getImageSrc();

                        if (!$scope.imageSrc) {
                            var unwatch = $scope.$watch(function () {
                                return getImageSrc();
                            }, function (newVal) {
                                if (newVal && angular.isString(newVal)) {
                                    $scope.imageSrc = newVal;
                                    unwatch();
                                }
                            });
                        }

                        var activateZoom = function () {
                            if ($scope.imageSrc) {
                                scope.openZoomView($scope.imageSrc, $element[0]);
                            }
                            // TODO: shall we show a warning until the zoom becomes available?
                        };

                        var mc = new Hammer.Manager($element[0]);

                        var pinch = new Hammer.Pinch();

                        // Helper to prevent another "pinchin/pinchout" after the "pinchend" was fired
                        // (pinch fires 2 touchend events)
                        var sessionEnded = false;

                        mc.add([pinch]);

                        mc.on('pinchstart', function () {
                            sessionEnded = false;
                        });
                        mc.on('pinchin pinchout', function (e) {
                            if (!sessionEnded) {
                                if (!scope.active && e.type === 'pinchout') {
                                    activateZoom();
                                }
                                sofaImageZoomService.zoom(e, scope.$zoomImage[0]);
                            }
                        });
                        mc.on('pinchend', function (e) {
                            sessionEnded = true;
                            sofaImageZoomService.zoom(e, scope.$zoomImage[0], true);

                            if (sofaImageZoomService.getZoomFactor() <= 1) {
                                scope.closeZoomView();
                            }
                        });

                        // Since "scope" is not automatically destroyed, we need to destroy it when
                        // all "$scope"'s are destroyed.
                        scope.imageScopes[$scope.$id] = $scope;

                        $scope.$on('$destroy', function () {
                            delete scope.imageScopes[$scope.$id];
                        });
                    };
                }
            };
        }]);

/* global document */

angular.module('sdk.directives.sofaImageZoom')
    .factory('sofaImageZoomService', [function () {

        'use strict';

        var TRANSFORM_PROPERTY = 'transform';
        ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
            var e = prefix + 'Transform';
            if (document.body.style[e] !== undefined) {
                TRANSFORM_PROPERTY = e;
                return false;
            }
            return true;
        });

        var scaleRegEx     = /scale\([-+]?[0-9]*\.?[0-9]*\)/;
        var translateRegEx = /translate\((-?[0-9]*\.?[0-9]*?px), ?(-?[0-9]*\.?[0-9]*?px)\)/;

        var cache = {};

        cache.zoomFactor = 1;
        // Track the movement (pan) of the zoomed image
        cache.movePosition = {
            x: 0,
            y: 0
        };
        // Cache the original position and dimensions of the image
        cache.basePosition = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
        // Cache the container dimensions
        cache.containerDimensions = {
            w: 0,
            h: 0
        };
        cache.elements = null;
        // Max scale factor depends on the original image and thus is object to change
        cache.maxScale = 3;

        var self = this;

        // Min scale is always 1...
        self.minScale = 1;

        // Some getters
        self.getElements = function () {
            return cache.elements;
        };

        self.getZoomFactor = function () {
            return cache.zoomFactor;
        };

        self.getBasePosition = function () {
            return cache.basePosition;
        };

        self.getContainerDimensions = function () {
            return cache.containerDimensions;
        };

        self.getLimits = function () {
            return cache.limits;
        };

        self.getMaxScale = function () {
            return cache.maxScale;
        };

        // Some setters
        self.setElements = function (original, zoom, container) {
            cache.elements = {
                originalElement: original,
                zoomElement: zoom,
                container: container
            };
        };

        self.setZoomFactor = function (factor) {
            self.resetLimits();
            cache.zoomFactor = factor;
        };

        self.setBasePosition = function (rect) {
            cache.basePosition = {
                x: rect.left,
                y: rect.top,
                w: rect.width,
                h: rect.height
            };
        };

        self.setContainerDimensions = function (rect) {
            cache.containerDimensions = {
                w: rect.width,
                h: rect.height
            };
        };

        self.setMovePosition = function (x, y) {
            cache.movePosition = {
                x: x,
                y: y
            };
        };

        self.setLimits = function (limits) {
            cache.limits = limits;
        };

        // Regardless of the real zoom image's size, we should at least zoom to thrice the original size
        self.setMaxScale = function (factor) {
            cache.maxScale = (factor && factor > 3) ? factor : 3;
        };

        // Resetting methods
        self.resetZoomFactor = function () {
            self.setZoomFactor(1);
        };

        self.resetMovePosition = function () {
            self.setMovePosition(0, 0);
        };

        self.resetElementStyles = function (el) {
            el.style[TRANSFORM_PROPERTY] = '';
        };

        self.resetLimits = function () {
            cache.limits = null;
        };

        // ZOOM!
        self.setZoom = function (zoomElement, zoomFactor) {
            var scaleValue = 'scale(' + zoomFactor + ')';
            var hasScaleStyle = zoomElement.style[TRANSFORM_PROPERTY].search(/scale/) > -1;

            if (hasScaleStyle) {
                zoomElement.style[TRANSFORM_PROPERTY] = zoomElement.style[TRANSFORM_PROPERTY].replace(scaleRegEx, scaleValue);
            } else {
                zoomElement.style[TRANSFORM_PROPERTY] = zoomElement.style[TRANSFORM_PROPERTY] + ' ' + scaleValue;
            }
        };

        self.zoom = function (event, zoomElement, end) {

            var zoomFactor = event.scale * self.getZoomFactor();
            var maxScale   = self.getMaxScale();

            if (zoomFactor < self.minScale) {
                zoomFactor = self.minScale;
            } else if (zoomFactor > maxScale) {
                zoomFactor = maxScale;
            }

            self.setZoom(zoomElement, zoomFactor);

            if (end) {
                self.setZoomFactor(zoomFactor);
            }
        };

        self.checkLimits = function () {

            if (cache.limits) {
                return cache.limits;
            }

            var limits, leftLimit, rightLimit, topLimit, bottomLimit;
            var zoomFactor          = self.getZoomFactor();
            var basePosition        = self.getBasePosition();
            var containerDimensions = self.getContainerDimensions();

            var imageWidth  = zoomFactor * basePosition.w;
            var imageHeight = zoomFactor * basePosition.h;
            var containerWidth  = containerDimensions.w;
            var containerHeight = containerDimensions.h;

            // xPos
            if (imageWidth <= containerWidth) {
                leftLimit  = (containerWidth - imageWidth) / -2;
                rightLimit = (containerWidth - imageWidth) / 2;
            } else {
                leftLimit  = (imageWidth - containerWidth) / -2;
                rightLimit = (imageWidth - containerWidth) / 2;
            }
            // yPos
            if (imageHeight <= containerHeight) {
                topLimit    = (containerHeight - imageHeight) / -2;
                bottomLimit = (containerHeight - imageHeight) / 2;
            } else {
                topLimit    = (imageHeight - containerHeight) / -2;
                bottomLimit = (imageHeight - containerHeight) / 2;
            }

            limits = cache.limits = {
                left:   parseInt(leftLimit / zoomFactor, 10),
                right:  parseInt(rightLimit / zoomFactor, 10),
                top:    parseInt(topLimit / zoomFactor, 10),
                bottom: parseInt(bottomLimit / zoomFactor, 10)
            };

            return limits;
        };

        self.move = function (event, zoomElement, end) {
            var xPos = parseInt(event.deltaX / cache.zoomFactor + cache.movePosition.x, 10);
            var yPos = parseInt(event.deltaY / cache.zoomFactor + cache.movePosition.y, 10);

            // Check for boundaries
            var limits = self.checkLimits();

            if (xPos < limits.left) {
                xPos = limits.left;
            } else if (xPos > limits.right) {
                xPos = limits.right;
            }
            if (yPos < limits.top) {
                yPos = limits.top;
            } else if (yPos > limits.bottom) {
                yPos = limits.bottom;
            }

            var hasTranslateStyle = zoomElement.style[TRANSFORM_PROPERTY].search(/translate/) > -1;
            var translateValue    = 'translate(' + xPos + 'px, ' + yPos + 'px)';

            if (hasTranslateStyle) {
                zoomElement.style[TRANSFORM_PROPERTY] = zoomElement.style[TRANSFORM_PROPERTY].replace(translateRegEx, translateValue);
            } else {
                zoomElement.style[TRANSFORM_PROPERTY] = zoomElement.style[TRANSFORM_PROPERTY] + ' ' + translateValue;
            }

            if (end) {
                self.setMovePosition(xPos, yPos);
            }
        };

        self.setup = function (originalElement, zoomElement, container, adjust) {
            self.resetZoomFactor();
            self.resetMovePosition();
            self.resetLimits();
            self.resetElementStyles(zoomElement);

            var originalPosition = originalElement.getBoundingClientRect();

            ['left', 'top', 'width', 'height'].forEach(function (property) {
                zoomElement.style[property] = originalPosition[property] + 'px';
            });

            // This one is really WEIRD. But it seems to be the only way to make sure that mobile Safari
            // gets the clientRect right after an orientationchange/resize (from landscape to portrait only, iOS 7.1).
            // Forcing a repaint the right way (e.g., offsetHeight) doesn't work either. And finally, I have no idea
            // why the zoomElement's style affects the clientRect of the original image. Just crazy...
            // Let's at least play it only in case we react on view port changes!
            if (adjust) {
                originalPosition = originalElement.getBoundingClientRect();

                ['left', 'top', 'width', 'height'].forEach(function (property) {
                    zoomElement.style[property] = originalPosition[property] + 'px';
                });
            }
            // end of weirdness

            self.setElements(originalElement, zoomElement, container);
            self.setBasePosition(originalPosition);
            self.setMaxScale(zoomElement.naturalWidth / originalPosition.width);
            self.setContainerDimensions(container.getBoundingClientRect());
        };

        self.adjust = function () {
            var elements = self.getElements();
            var oldZoom  = self.getZoomFactor();
            if (elements) {
                self.setup(elements.originalElement, elements.zoomElement, elements.container, true);
                self.setZoom(elements.zoomElement, oldZoom);
                self.setZoomFactor(oldZoom);
            }
        };

        return self;

    }]);

// Taken from https://github.com/angular/angular.js/pull/6569
// Credits to https://github.com/sjbarker
angular.module('sdk.directives.sofaName', [])
    .directive('sofaName', function () {

        'use strict';

        return {
            priority: 100,
            restrict: 'A',
            require: 'ngModel',
            link: {
                pre: function sofaNameLinkFn(scope, elem, attrs, ctrl) {
                    ctrl.$name = scope.$eval(attrs.sofaName);
                    attrs.$set('name', ctrl.$name);
                }
            }
        };
    });

angular.module('sdk.directives.sofaRadioButton', ['src/directives/sofaRadioButton/sofa-radio-button.tpl.html']);

angular.module('sdk.directives.sofaRadioButton')
    .directive('sofaRadioButton', function () {

        'use strict';

        var instanceCount = 0;

        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=',
                label: '=',
                value: '=',
                disabled: '='
            },
            templateUrl: 'src/directives/sofaRadioButton/sofa-radio-button.tpl.html',
            link: function (scope, $element, attrs) {
                instanceCount++;
                scope.id = instanceCount;
            }
        };
    });

/* global document */
/* global Hammer */

/**
 * Horizontal Touch Slider.
 * Dependencies: hammerjs (v.2.0)
 * Kinetic scrolling and snap inspired by http://ariya.ofilabs.com/2013/12/javascript-kinetic-scrolling-part-3.html
 */

// TODO: see if we can optimize this code

angular.module('sdk.directives.sofaTouchSlider', [
    'src/directives/sofaTouchSlider/sofa-touch-slider.tpl.html',
    'src/directives/sofaTouchSlider/sofa-touch-slider-indicator.tpl.html'
]);

angular.module('sdk.directives.sofaTouchSlider')
    .directive('sofaTouchSlider', ['$window', '$rootScope', function ($window, $rootScope) {

        'use strict';

        var WEIGHT_FACTOR = 1,   // smaller = "heavier"
            TIME_CONSTANT = 325, // ms
            FLEX_PROPERTY = '',
            TRANSFORM_PROPERTY  = 'transform',
            TRANSITION_PROPERTY = 'transition',
            LEFT_LIMIT_CLASS    = 'sofa-touch-slider-max--left',
            RIGHT_LIMIT_CLASS   = 'sofa-touch-slider-max--right',
            NO_FLEXBOX_CLASS    = 'sofa-touch-slider-no-flexbox';

        var setFlexboxProperty = function () {
            var el = document.createElement('div');
            /* -webkit-box-flex and -moz-box-flex can't handle percentages and are set to "1" via CSS */
            ['flex', 'msFlex', 'MozFlex', 'webkitFlex'].every(function (property) {
                if (el.style[property] !== undefined) {
                    FLEX_PROPERTY = property;
                    return false;
                }
                return true;
            });
        };

        var setTransformProperty = function () {
            ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
                var e = prefix + 'Transform';
                if (document.body.style[e] !== undefined) {
                    TRANSFORM_PROPERTY = e;
                    return false;
                }
                return true;
            });
        };

        var setTransitionProperty = function () {
            if (document.body.style.webkitTransition !== undefined) {
                TRANSITION_PROPERTY = 'webkitTransition';
            }
        };

        // Set CSS properties just once
        if (!FLEX_PROPERTY) {
            setFlexboxProperty();
            setTransformProperty();
            setTransitionProperty();
        }

        var CAN_USE_FLEXBOX = !!FLEX_PROPERTY;

        // orientationchange will not work for android, so we use the resize event
        $window.addEventListener('resize', function () {
            $rootScope.$emit('sofaTouchSlider.resize');
        });

        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                items: '=',
                displayItems: '=',
                onItemClick: '&',
                snap: '@?',
                showIndicator: '@?',
                slideIndex: '=?',
                selectedIndex: '=?'
            },
            templateUrl: 'src/directives/sofaTouchSlider/sofa-touch-slider.tpl.html',
            controller: ['$scope', function ($scope) {
                this.getItems = function () {
                    return $scope.items;
                };

                this.getSlideIndex = function () {
                    return $scope.slideIndex;
                };
            }],
            link: function ($scope, $element, attrs, controller, transclude) {

                if (!angular.isFunction($window.Hammer)) {
                    throw new Error('Hammer.js is missing');
                }

                if ($scope.slideIndex === undefined) {
                    $scope.slideIndex = 0;
                }

                var api;

                $scope.$onRootScope('sofaTouchSlider.resize', function () {
                    api.reset();
                });

                $scope.slideToIndex = function (i) {
                    api.slideToIndex(i);
                };

                $scope.setToIndex = function (i) {
                    api.setToIndex(i);
                };

                $scope.reset = function () {
                    api.reset();
                };

                var initialize = function () {

                    var $moveContainer    = $element.find('ul'),
                        moveContainer     = $moveContainer[0],
                        moveContainerRect = moveContainer.getBoundingClientRect(),
                        containerWidth    = moveContainerRect.width,
                        itemCount         = $scope.items.length,
                        displayItemCount  = attrs.displayItems,
                        itemWidth         = containerWidth / displayItemCount,
                        itemWidthPercent  = 100 / displayItemCount,
                        maxMovement       = -(parseInt(itemWidth * (itemCount - displayItemCount), 10)),
                        snap              = $scope.snap ? itemWidth : false,
                        positionX         = 0,
                        savedPositionX    = 0,
                        amplitude         = 0,
                        oldSlideIndex     = $scope.slideIndex,
                        sliderItems       = [],
                        target,
                        running,
                        start,
                        progress,
                        lastMove;

                    if (!CAN_USE_FLEXBOX) {
                        var moveContainerWidth = itemWidth * itemCount;
                        $moveContainer.css('width', moveContainerWidth + 'px');
                        $element.addClass(NO_FLEXBOX_CLASS);
                    }

                    $element.addClass(LEFT_LIMIT_CLASS);

                    var reset = function () {
                        if (!CAN_USE_FLEXBOX) {
                            $moveContainer.css('width', '100%');
                        }

                        moveContainerRect = moveContainer.getBoundingClientRect();
                        containerWidth    = moveContainerRect.width;
                        itemWidth         = containerWidth / displayItemCount;
                        maxMovement       = -(parseInt(itemWidth * (itemCount - displayItemCount), 10));
                        snap              = $scope.snap ? itemWidth : false;

                        if (!CAN_USE_FLEXBOX) {
                            moveContainerWidth = itemWidth * itemCount;
                            $moveContainer.css('width', moveContainerWidth + 'px');
                            sliderItems.forEach(function (item) {
                                item.style.width = itemWidth + 'px';
                            });
                        }

                        setToIndex($scope.slideIndex);
                    };

                    var scroll = function (xValue, save) {

                        if (xValue <= maxMovement) {
                            xValue = maxMovement;
                            positionX = xValue;
                            $element.addClass(RIGHT_LIMIT_CLASS);
                        } else if (xValue >= 0) {
                            xValue = 0;
                            positionX = xValue;
                            $element.addClass(LEFT_LIMIT_CLASS);
                        } else {
                            $element.removeClass(LEFT_LIMIT_CLASS + ' ' + RIGHT_LIMIT_CLASS);
                        }
                        if (save) {
                            positionX = xValue;
                        }

                        $scope.slideIndex = Math.abs(parseInt(positionX / itemWidth, 10));

                        if (oldSlideIndex !== $scope.slideIndex) {
                            oldSlideIndex = $scope.slideIndex;
                            $scope.$apply();
                        }

                        moveContainer.style[TRANSFORM_PROPERTY] = 'translateX(' + xValue + 'px)';
                    };

                    // Animate to a given index
                    var slideToIndex = function (i) {
                        positionX = itemWidth * i * -1;
                        moveContainer.style[TRANSFORM_PROPERTY] = 'translateX(' + positionX + 'px)';
                    };

                    // Set to a given index without animating
                    var setToIndex = function (i) {
                        moveContainer.style[TRANSITION_PROPERTY] = 'none';
                        slideToIndex(i);
                        /* jshint ignore:start */
                        var forceRepaint = moveContainer.offsetHeight;
                        /* jshint ignore:end */
                        moveContainer.style[TRANSITION_PROPERTY] = '';
                    };

                    var autoScroll = function (timestamp) {
                        var delta, position;

                        if (!start) {
                            start = parseInt(timestamp, 10);
                        }
                        progress = parseInt(timestamp, 10) - start;
                        delta    = -amplitude * Math.exp(-progress / TIME_CONSTANT);
                        position = parseInt(target + delta, 10);

                        if (delta >= 1 || delta <= -1) {
                            scroll(position);
                            running = $window.requestAnimationFrame(autoScroll);
                        } else {
                            start = null;
                            progress = null;
                            scroll(position, true);
                        }
                    };

                    var mc = new Hammer.Manager(moveContainer);

                    var horizontal = new Hammer.Pan({
                        direction: Hammer.DIRECTION_HORIZONTAL,
                        threshold: 10,
                        touchAction: 'pan'
                    });

                    mc.add(horizontal);

                    mc.on('panstart', function (e) {
                        e.preventDefault();
                        $window.cancelAnimationFrame(running);
                        savedPositionX = positionX;
                        positionX = savedPositionX + parseInt(e.deltaX, 10);
                        scroll(positionX);
                    });

                    mc.on('panend', function (e) {
                        e.preventDefault();

                        var velocity = parseFloat((Math.abs(e.deltaX) / e.deltaTime).toFixed(1));

                        savedPositionX = positionX;

                        // Initialize autoscrolling
                        if ((positionX > maxMovement || positionX < 0)) {
                            if (velocity >= 0.5) {
                                target = Math.round(positionX + e.deltaX * Math.max(velocity, 1));
                                if (snap) {
                                    var newTarget = Math.round(target / snap) * snap;
                                    var delta = Math.abs(Math.abs(target) - Math.abs(savedPositionX));
                                    // If it's higher than 4, newTarget is rounded down to the old position and nothing happens
                                    if (snap / delta > 4) {
                                        // Left
                                        if (e.direction === 2) {
                                            newTarget = Math.round((target - snap) / snap) * snap;
                                        // Right
                                        } else if (e.direction === 4) {
                                            newTarget = Math.round((target + snap) / snap) * snap;
                                        }
                                    }
                                    target = newTarget;
                                }
                                running = $window.requestAnimationFrame(autoScroll);
                            } else if (snap) {
                                // Snap back to initial position
                                amplitude = parseInt(WEIGHT_FACTOR / displayItemCount, 10);
                                target    = Math.round(positionX / snap) * snap;
                                running   = $window.requestAnimationFrame(autoScroll);
                            }
                        }
                    });

                    mc.on('panmove', function (e) {
                        e.preventDefault();
                        lastMove = e;
                        positionX = savedPositionX + parseInt(e.deltaX, 10);
                        scroll(positionX);
                    });

                    // We build our own repeater here to assure getting the right scope for each item
                    var buildItems = function () {
                        var width = itemWidthPercent % 1 === 0 ? itemWidthPercent : itemWidthPercent.toFixed(5);

                        $moveContainer.innerHTML = '';

                        for (var i = 0; i < $scope.items.length; i += 1) {
                            var childScope   = $scope.$new();
                            childScope.item  = $scope.items[i];
                            childScope.index = i;

                            /*jshint loopfunc: true */
                            // "Don't make functions within a loop"
                            transclude(childScope, function (clone) {
                                var li = document.createElement('li');
                                li.className = 'sofa-touch-slider__item';
                                if (FLEX_PROPERTY) {
                                    li.style[FLEX_PROPERTY] = '1 0 ' + width + '%';
                                } else {
                                    li.style.width = itemWidth + 'px';
                                }
                                sliderItems.push(li);
                                // TODO: this is a case for documentFragment. Reduce DOM touches!
                                $moveContainer.append(angular.element(li).append(clone));
                            });
                            /*jshint loopfunc: false */
                        }
                    };

                    buildItems();

                    return {
                        slideToIndex: slideToIndex,
                        setToIndex: setToIndex,
                        reset: reset
                    };
                };

                // Items may come async...
                if (!$scope.items || $scope.items.length === 0) {
                    var off = $scope.$watch('items', function (newValue) {
                        if (newValue && newValue.length) {
                            api = initialize();
                            off();
                        }
                    });
                } else {
                    api = initialize();
                }

            }
        };
    }]);

angular.module('sdk.directives.sofaTouchSlider')
    .directive('sofaTouchSliderIndicator', function () {

        'use strict';

        return {
            restrict: 'E',
            require: '^sofaTouchSlider',
            replace: true,
            templateUrl: 'src/directives/sofaTouchSlider/sofa-touch-slider-indicator.tpl.html',
            link: function ($scope, $element, attrs, controller) {

                $scope.items = controller.getItems();
                $scope.activeIndex = 0;

                $scope.$watch(function () {
                    return controller.getSlideIndex();
                }, function (newIndex) {
                    $scope.activeIndex = newIndex;
                });
            }
        };
    });

angular.module('sdk.decorators.$rootScope', []);

    angular
        .module('sdk.decorators.$rootScope')
        .config(['$provide', function($provide){
            $provide.decorator('$rootScope', ['$delegate', function($delegate){


                // we monkey patch the $rootScope to provide a $onRootScope method that
                // just works like the $on method but subscribes to events directly emitted
                // on the $rootScope.
                // While one can directly bind to events emitted on the $rootScope even without
                // such a `$onRootScope` method, this method makes sure that events are automatically
                // unbound when the local scope gets destroyed.
                // This comes in handy when the $rootScope is treated as EventBus
                // and is used for all inter app communication.
                
                // Read this for more info:
                // http://stackoverflow.com/questions/11252780/whats-the-correct-way-to-communicate-between-controllers-in-angularjs/19498009#19498009

                Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
                    value: function(name, listener){
                        var unsubscribe = $delegate.$on(name, listener);
                        this.$on('$destroy', unsubscribe);
                    },
                    enumerable: false,
                    configurable: true
                });


                return $delegate;
            }]);
        }]);



angular
    .module('sdk.filter.currency', ['sdk.services.configService'])
    .filter('currency', ['configService', function(configService){


        //the currency can be specified by either the html entity,
        //the symbol or the shorthand name
        var currencyMap = {
            EUR: {
                synonyms: ['&euro;', '€', 'EUR'],
                character: '\u20AC'
            },
            USD: { 
                synonyms: ['&&#36;', '$', 'USD'],
                character: '\u0024'
            },
            GBP: {
                synonyms: ['&pound;', '£', 'GBP'],
                character: '\u00A3'
            },
            CHF: {
                synonyms: ['CHF'],
                character: 'CHF'
            },
            PLN: {
                 synonyms: ['PLN'],
                 character: 'z\u0142'
            }
        };

        var pointToComma = function(val){
            return val.replace('.', ',');
        };

        var CURRENCY_SIGN = configService.get('currencySign');

        return function(val){

            var currency = (CURRENCY_SIGN || '&euro;').trim();

            var currencyKey = cc.Util.findKey(currencyMap, function(item){
                                    return item.synonyms.indexOf(currency) > -1; 
                                });

            var currencyChar = currencyMap[currencyKey].character;

            var fixedVal = parseFloat(val).toFixed(2);

            if (currencyKey === 'EUR' ){
                return pointToComma(fixedVal) + ' ' + currencyChar;
            }
            else if (currencyKey === 'USD' || currencyKey === 'GBP'){
                return currencyChar + ' ' + fixedVal;
            }
            else if (currencyKey === 'CHF'){
                return currencyChar + ' ' + pointToComma(fixedVal);
            }
            else if (currencyKey === 'PLN'){
                return pointToComma(fixedVal) + ' ' + currencyChar;
            }
            else{
                return fixedVal;
            }
        };
    }]);

angular.module('sdk.filter',    [
                                    'sdk.filter.currency'
                                ]);

}).call(this, window, window.cc, window.angular);