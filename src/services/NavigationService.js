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
