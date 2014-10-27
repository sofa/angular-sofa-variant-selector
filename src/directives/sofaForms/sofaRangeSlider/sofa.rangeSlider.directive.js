/* global Hammer */

/**
 * Horizontal Range Slider Control.
 * Dependencies: hammerjs (v.2.0)
 */

// TODO: check performance
// TODO: code can be optimized at several places...
// TODO: add disabled state (add "disabled: '=?'")
// TODO: make it work with ngModel and sofa-name (add "propertyName: '@'")

angular.module('sdk.directives.sofaRangeSlider', ['src/directives/sofaForms/sofaRangeSlider/sofa-range-slider.tpl.html']);

angular.module('sdk.directives.sofaRangeSlider')
    .directive('sofaRangeSlider', function () {

        'use strict';

        if (!angular.isFunction(Hammer)) {
            throw new Error('Hammer.js is missing');
        }

        var TRANSFORM_PROPERTY = 'transform';

        ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
            var e = prefix + 'Transform';
            if (document.body.style[e] !== undefined) {
                TRANSFORM_PROPERTY = e;
                return false;
            }
            return true;
        });

        var isVisible = function (el) {
            return el.offsetWidth > 0;
        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=',
                minLimit: '=',
                maxLimit: '=',
                step: '=?',
                displayValueExp: '&?'
            },
            templateUrl: 'src/directives/sofaForms/sofaRangeSlider/sofa-range-slider.tpl.html',
            link: function ($scope, $element) {

                var startHandle = $element[0].querySelector('.sofa-range-slider__handle--start');
                var endHandle   = $element[0].querySelector('.sofa-range-slider__handle--end');
                var slider      = $element[0].querySelector('.sofa-range-slider');
                var range       = $element[0].querySelector('.sofa-range-slider__range');
                var dimensions;

                if (!$scope.model) {
                    $scope.model = {
                        min: $scope.minLimit,
                        max: $scope.maxLimit
                    };
                }

                $scope.rangeStart = $scope.model.min;
                $scope.rangeEnd   = $scope.model.max;

                var getDimensions = function () {
                    return {
                        totalWidth:  slider.getBoundingClientRect().width,
                        handleWidth: startHandle.getBoundingClientRect().width
                    };
                };

                dimensions = getDimensions();

                // The slider might be loaded in a hidden state.
                // If so, we're not having its dimensions until it's shown...
                if (dimensions.totalWidth === 0) {
                    var off = $scope.$watch(function () {
                        return isVisible(slider);
                    }, function (nv) {
                        if (nv) {
                            dimensions = getDimensions();
                            setup();
                            off();
                        }
                    });
                }

                var positionTracker = {
                    min: 0,
                    max: 0
                };

                var savePosition = function (type, position) {
                    positionTracker[type] = position;
                };

                $scope.displayFn = function (value) {
                    return angular.isFunction($scope.displayValueExp) ? $scope.displayValueExp({value: value}) : value;
                };

                var getInnerModel = function (totalWidth, model, min, max, step) {
                    if (!model) {
                        return false;
                    }

                    var modelStart = model.min;
                    var modelEnd = model.max;
                    var startPosition, endPosition, startPercentage, endPercentage, minLimit, maxLimit;

                    startPercentage = modelStart * 100 / max;
                    endPercentage = modelEnd * 100 / max;

                    startPosition = parseInt(totalWidth / 100 * startPercentage, 10);
                    endPosition = -(totalWidth - parseInt(totalWidth / 100 * endPercentage, 10));

                    minLimit = parseInt(max / 100 * startPercentage, 10);
                    maxLimit = parseInt(max / 100 * endPercentage, 10);

                    if (step) {
                        [startPosition, endPosition, minLimit, maxLimit].forEach(function (value) {
                            value = Math.round(value * step) / step;
                        });
                    }

                    startHandle.style[TRANSFORM_PROPERTY] = 'translateX(' + startPosition + 'px)';
                    endHandle.style[TRANSFORM_PROPERTY] = 'translateX(' + endPosition + 'px)';

                    savePosition('min', startPosition);
                    savePosition('max', endPosition);

                    return {
                        startPosition: startPosition,
                        endPosition: endPosition,
                        minLimit: minLimit,
                        maxLimit: maxLimit
                    };
                };

                var setup = function () {
                    var initialModel = getInnerModel(dimensions.totalWidth, $scope.model, $scope.minLimit, $scope.maxLimit, $scope.step);

                    // Inner model (updates the labels while dragging a handle)
                    $scope.rangeStart = initialModel ? initialModel.minLimit : $scope.minLimit;
                    $scope.rangeEnd   = initialModel ? initialModel.maxLimit : $scope.maxLimit;

                    range.style.left  = initialModel ? initialModel.startPosition + 'px' : '0';
                    range.style.right = initialModel ? Math.abs(initialModel.endPosition) + 'px' : '0';
                };

                if (dimensions.totalWidth > 0) {
                    setup();
                }

                var setSlider = function (type, value) {
                    var percentage, newValue;
                    if (type === 'min') {
                        percentage = value * 100 / dimensions.totalWidth;
                        newValue = parseInt($scope.maxLimit / 100 * percentage, 10);
                        if ($scope.step) {
                            newValue = Math.round(newValue / $scope.step) * $scope.step;
                        }
                        $scope.$apply(function () {
                            $scope.rangeStart = newValue;
                        });
                        range.style.left  = value + 'px';
                    } else {
                        percentage = (dimensions.totalWidth + value) * 100 / dimensions.totalWidth;
                        newValue = parseInt($scope.maxLimit / 100 * percentage, 10);
                        if ($scope.step) {
                            newValue = Math.round(newValue / $scope.step) * $scope.step;
                        }
                        $scope.$apply(function () {
                            $scope.rangeEnd = newValue;
                        });
                        range.style.right = Math.abs(value) + 'px';
                    }
                };

                // Updates the model after the range slider was moved by touch
                var updateModel = function () {
                    $scope.$apply(function () {
                        $scope.model = {
                            min: $scope.rangeStart,
                            max: $scope.rangeEnd
                        };
                    });
                };

                // Watches for model changes from the outside
                $scope.$watch('model', function (nv, ov) {
                    if (nv !== ov) {
                        setup();
                    }
                }, true);

                var moveElement = function (type, el, delta, final) {
                    var newPos, minPos, maxPos;

                    if (type === 'min') {
                        newPos = positionTracker.min + delta;
                        minPos = 0;
                        maxPos = dimensions.totalWidth - Math.abs(positionTracker.max) - (dimensions.handleWidth * 2);
                        if (newPos < minPos) {
                            newPos = minPos;
                        } else if (newPos > maxPos) {
                            newPos = maxPos;
                        }
                        // update inner start model
                        setSlider(type, newPos);
                    } else {
                        newPos = positionTracker.max + delta;
                        minPos = -(dimensions.totalWidth - positionTracker.min - (dimensions.handleWidth * 2));
                        maxPos = 0;
                        if (newPos < minPos) {
                            newPos = minPos;
                        } else if (newPos > maxPos) {
                            newPos = maxPos;
                        }
                        // update inner end model
                        setSlider(type, newPos);
                    }
                    el.style[TRANSFORM_PROPERTY] = 'translateX(' + newPos + 'px)';

                    if (final) {
                        savePosition(type, newPos);
                        updateModel();
                    }
                };

                // Touch stuff
                var mcA = new Hammer.Manager(startHandle);
                var mcB = new Hammer.Manager(endHandle);

                var panConfig = {
                    direction: Hammer.DIRECTION_HORIZONTAL,
                    threshold: 10,
                    touchAction: 'pan'
                };

                var horizontalA = new Hammer.Pan(panConfig);
                var horizontalB = new Hammer.Pan(panConfig);

                mcA.add(horizontalA);
                mcB.add(horizontalB);

                mcA.on('panmove panend', function (e) {
                    e.preventDefault();
                    moveElement('min', startHandle, parseInt(e.deltaX, 10), e.type === 'panend');
                });

                mcB.on('panmove panend', function (e) {
                    e.preventDefault();
                    moveElement('max', endHandle, parseInt(e.deltaX, 10), e.type === 'panend');
                });
            }
        };
    });
