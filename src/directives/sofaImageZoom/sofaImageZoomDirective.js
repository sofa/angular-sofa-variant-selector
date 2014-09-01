/* global Hammer */

/**
 * Image Zoom.
 * Dependencies: hammerjs (v.2.0)
 *
 */

// TODO: pan and pinch works, while pinch and pan doesn't :(

angular.module('sdk.directives.sofaImageZoom', ['src/directives/sofaImageZoom/sofa-image-zoom.tpl.html']);


angular.module('sdk.directives.sofaImageZoom')
    .directive('sofaImageZoom', ['$window', '$compile', '$rootScope', '$timeout', 'sofaImageZoomService',
        function ($window, $compile, $rootScope, $timeout, sofaImageZoomService) {

            'use strict';

            if (!angular.isFunction($window.Hammer)) {
                throw new Error('Hammer.js is missing');
            }

            return {
                restrict: 'A',
                templateUrl: 'src/directives/sofaImageZoom/sofa-image-zoom.tpl.html',
                compile: function (tElement) {

                    var scope = $rootScope.$new();

                    scope.imageSrc = '';

                    scope.closeZoomView = function () {
                        scope.active = false;
                        scope.imageSrc = '';
                        scope.$digest();

                        $window.removeEventListener('resize', sofaImageZoomService.adjust);
                    };

                    scope.openZoomView = function (imgSrc, originalImage) {
                        scope.imageSrc = imgSrc;
                        scope.active   = true;
                        scope.$digest();

                        // orientationchange will not work for android, so we use the resize event
                        $window.addEventListener('resize', sofaImageZoomService.adjust);

                        sofaImageZoomService.setup(originalImage, scope.$zoomImage[0], scope.$zoomContainer[0]);
                    };

                    scope.$zoomContainer = $compile(tElement.contents())(scope);
                    scope.$zoomImage = scope.$zoomContainer.find('img');

                    angular.element($window.document.body).prepend(scope.$zoomContainer);

                    // Touch stuff
                    var mc = new Hammer.Manager(scope.$zoomImage[0]);

                    var pinch = new Hammer.Pinch();
                    var pan   = new Hammer.Pan();

                    pinch.recognizeWith(pan);

                    var sessionEnded = false;

                    mc.add([pinch, pan]);

                    mc.on('pinchin pinchout', function (e) {
                        if (!sessionEnded) {
                            sofaImageZoomService.zoom(e, scope.$zoomImage[0]);
                        }
                    }).on('pinchstart', function () {
                        sessionEnded = false;
                    }).on('pinchend', function (e) {
                        sessionEnded = true;
                        sofaImageZoomService.zoom(e, scope.$zoomImage[0], true);

                        if (sofaImageZoomService.getZoomFactor() <= 1) {
                            scope.closeZoomView();
                        }
                    }).on('pan', function (e) {
                        sofaImageZoomService.move(e, scope.$zoomImage[0]);
                    }).on('panend', function (e) {
                        sofaImageZoomService.move(e, scope.$zoomImage[0], true);
                    });

                    // This is for the cleanup
                    scope.imageScopes = {};

                    scope.$watchCollection('imageScopes', function (a) {
                        if (!Object.keys(a).length) {
                            scope.$zoomContainer.remove();
                            $timeout(function () {
                                scope.$destroy();
                            }, 0);
                        }
                    });

                    return function ($scope, $element, attrs) {

                        // Where does the zoomImage URL come from?
                        var getImageSrc = function () {
                            return !!attrs.sofaImageZoom ? $scope.$eval(attrs.sofaImageZoom) : attrs.src;
                        };

                        $scope.imageSrc = getImageSrc();

                        if (!$scope.imageSrc) {
                            var unwatch = $scope.$watch(function () {
                                return getImageSrc();
                            }, function (newVal) {
                                if (newVal && angular.isString(newVal)) {
                                    $scope.imageSrc = newVal;
                                    unwatch();
                                }
                            });
                        }

                        var activateZoom = function () {
                            if ($scope.imageSrc) {
                                scope.openZoomView($scope.imageSrc, $element[0]);
                            }
                            // TODO: shall we show a warning until the zoom becomes available?
                        };

                        var mc = new Hammer.Manager($element[0]);

                        var pinch = new Hammer.Pinch();

                        // Helper to prevent another "pinchin/pinchout" after the "pinchend" was fired
                        // (pinch fires 2 touchend events)
                        var sessionEnded = false;

                        mc.add([pinch]);

                        mc.on('pinchstart', function () {
                            sessionEnded = false;
                        });
                        mc.on('pinchin pinchout', function (e) {
                            if (!sessionEnded) {
                                if (!scope.active && e.type === 'pinchout') {
                                    activateZoom();
                                }
                                sofaImageZoomService.zoom(e, scope.$zoomImage[0]);
                            }
                        });
                        mc.on('pinchend', function (e) {
                            sessionEnded = true;
                            sofaImageZoomService.zoom(e, scope.$zoomImage[0], true);

                            if (sofaImageZoomService.getZoomFactor() <= 1) {
                                scope.closeZoomView();
                            }
                        });

                        // Since "scope" is not automatically destroyed, we need to destroy it when
                        // all "$scope"'s are destroyed.
                        scope.imageScopes[$scope.$id] = $scope;

                        $scope.$on('$destroy', function () {
                            delete scope.imageScopes[$scope.$id];
                        });
                    };
                }
            };
        }]);
