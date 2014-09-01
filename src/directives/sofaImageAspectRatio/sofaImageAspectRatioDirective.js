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