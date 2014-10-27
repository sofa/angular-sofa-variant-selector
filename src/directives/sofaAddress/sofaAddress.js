angular.module('sdk.directives.sofaAddress', ['src/directives/sofaAddress/sofa-address.tpl.html']);

angular.module('sdk.directives.sofaAddress')
    .directive('ccAddress', function() {

        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '='
            },
            templateUrl: 'src/directives/sofaAddress/sofa-address.tpl.html'
        };
    });