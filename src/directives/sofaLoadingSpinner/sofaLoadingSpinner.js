angular.module('sdk.directives.sofaLoadingSpinner', ['src/directives/sofaLoadingSpinner/sofa-loading-spinner.tpl.html']);

angular.module('sdk.directives.sofaLoadingSpinner')
    .directive('sofaLoadingSpinner', function () {

        'use strict';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/directives/sofaLoadingSpinner/sofa-loading-spinner.tpl.html'
        };
    });
