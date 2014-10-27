angular.module('sdk.directives.sofaFooterLinks', [
    'src/directives/sofaFooterLinks/sofa-footer-links.tpl.html',
    'sdk.services.configService'
]);

angular
    .module('sdk.directives.sofaFooterLinks')
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
            templateUrl: 'src/directives/sofaFooterLinks/sofa-footer-links.tpl.html',
            link: function(scope, element, attrs){
                defaultIfUndefined(scope, 'items', ABOUT_PAGES);

                scope.goTo = function(item){
                    navigationService.navigateToContentPage(item.id);
                };
            }
        };
    }]);