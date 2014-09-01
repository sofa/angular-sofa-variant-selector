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
