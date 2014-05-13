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
                value: '='
            },
            templateUrl: 'src/directives/sofaRadioButton/sofa-radio-button.tpl.html',
            link: function (scope, $element, attrs) {
                instanceCount++;
                scope.id = instanceCount;
            }
        };
    });