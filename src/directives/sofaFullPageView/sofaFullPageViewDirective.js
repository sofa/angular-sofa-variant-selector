angular.module('sdk.directives.sofaFullPageView', ['src/directives/sofaFullPageView/sofa-full-page-view.tpl.html']);


angular.module('sdk.directives.sofaFullPageView')
    .directive('sofaFullPageView', function () {

        'use strict';

        return {
            restrict: 'E',
            controller: function () {

            },
            link: function ($scope, $element, attrs) {
                var onOpen  = $scope.$eval(attrs.onOpen);
                var onClose = $scope.$eval(attrs.onClose);

                $scope.openFullPageView = function (e) {
                    e.preventDefault();
                    if (angular.isFunction(onOpen)) {
                        onOpen($scope);
                    }
                    $scope.active = true;
                };
                $scope.closeFullPageView = function (e) {
                    e.preventDefault();
                    if (angular.isFunction(onClose)) {
                        onClose($scope);
                    }
                    $scope.active = false;
                };

                $scope.$on('$destroy', function () {
                    $scope.cloneElement.remove();
                });
            }
        };
    })
    .directive('sofaFullPageViewClone', ['$window', function ($window) {
        return {
            restrict: 'E',
            require: '^sofaFullPageView',
            replace: true,
            transclude: true,
            templateUrl: 'src/directives/sofaFullPageView/sofa-full-page-view.tpl.html',
            compile: function () {
                return function ($scope, $element) {
                    angular.element($window.document.body).prepend($element);
                    $scope.active = false;
                    $scope.cloneElement = $element;
                    $element.css('height', $window.innerHeight + 'px');

                    // orientationchange will not work for android, so we use the resize event
                    $window.addEventListener('resize', function () {
                        $element.css('height', $window.innerHeight + 'px');
                    });
                };
            }
        };
    }])
    .directive('sofaFullPageViewOriginal', function () {
        return {
            restrict: 'E',
            require: '^sofaFullPageView',
            link: function ($scope, $element) {
                $scope.originalElement = $element;
            }
        };
    });