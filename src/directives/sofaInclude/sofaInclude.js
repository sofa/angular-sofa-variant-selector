angular.module('sdk.directives.sofaInclude', []);

angular.module('sdk.directives.sofaInclude')
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