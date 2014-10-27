angular.module('sdk.directives.sofaRadioButton', ['src/directives/sofaForms/sofaRadioButton/sofa-radio-button.tpl.html']);

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
                disabled: '=?',
                propertyName: '@'
            },
            templateUrl: 'src/directives/sofaForms/sofaRadioButton/sofa-radio-button.tpl.html',
            link: function (scope) {
                instanceCount++;
                scope.id = instanceCount;
            }
        };
    });
