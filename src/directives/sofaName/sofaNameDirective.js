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
