/* global Hammer */

/**
 * Horizontal Range Slider Control.
 * Dependencies: hammerjs (v.2.0)
 */

// TODO: check performance
// TODO: code can be optimized at several places...
// TODO: add disabled state (add "disabled: '=?'")
// TODO: make it work with ngModel and sofa-name (add "propertyName: '@'")

angular.module('sdk.directives.sofaRangeSlider', ['src/directives/sofaRangeSlider/sofa-range-slider.tpl.html']);

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
                minValue: '=',
                maxValue: '=',
                step: '=?',
                displayValueExp: '&?'
            },
            templateUrl: 'src/directives/sofaRangeSlider/sofa-range-slider.tpl.html',
            link: function ($scope, $element) {

                var startHandle = $element[0].querySelector('.sofa-range-slider__handle--start');
                var endHandle   = $element[0].querySelector('.sofa-range-slider__handle--end');
                var slider      = $element[0].querySelector('.sofa-range-slider');
                var range       = $element[0].querySelector('.sofa-range-slider__range');
                var dimensions;

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
                    start: 0,
                    end: 0
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

                    var modelStart = model.start;
                    var modelEnd = model.end;
                    var startPosition, endPosition, startPercentage, endPercentage, minValue, maxValue;

                    startPercentage = modelStart * 100 / max;
                    endPercentage = modelEnd * 100 / max;

                    startPosition = parseInt(totalWidth / 100 * startPercentage, 10);
                    endPosition = -(totalWidth - parseInt(totalWidth / 100 * endPercentage, 10));

                    minValue = parseInt(max / 100 * startPercentage, 10);
                    maxValue = parseInt(max / 100 * endPercentage, 10);

                    if (step) {
                        [startPosition, endPosition, minValue, maxValue].forEach(function (value) {
                            value = Math.round(value * step) / step;
                        });
                    }

                    startHandle.style[TRANSFORM_PROPERTY] = 'translateX(' + startPosition + 'px)';
                    endHandle.style[TRANSFORM_PROPERTY] = 'translateX(' + endPosition + 'px)';

                    savePosition('start', startPosition);
                    savePosition('end', endPosition);

                    return {
                        start: startPosition,
                        end:   endPosition,
                        min:   minValue,
                        max:   maxValue
                    };
                };

                var setup = function () {
                    var initialModel = getInnerModel(dimensions.totalWidth, $scope.model, $scope.minValue, $scope.maxValue, $scope.step);

                    // Inner model (updates the labels while dragging a handle)
                    $scope.rangeStart = initialModel ? initialModel.min : $scope.minValue;
                    $scope.rangeEnd   = initialModel ? initialModel.max : $scope.maxValue;

                    range.style.left  = initialModel ? initialModel.start + 'px' : '0';
                    range.style.right = initialModel ? Math.abs(initialModel.end) + 'px' : '0';
                };

                if (dimensions.totalWidth > 0) {
                    setup();
                }

                var setSlider = function (type, value) {
                    var percentage, newValue;
                    if (type === 'start') {
                        percentage = value * 100 / dimensions.totalWidth;
                        newValue = parseInt($scope.maxValue / 100 * percentage, 10);
                        if ($scope.step) {
                            newValue = Math.round(newValue / $scope.step) * $scope.step;
                        }
                        $scope.$apply(function () {
                            $scope.rangeStart = newValue;
                        });
                        range.style.left  = value + 'px';
                    } else {
                        percentage = (dimensions.totalWidth + value) * 100 / dimensions.totalWidth;
                        newValue = parseInt($scope.maxValue / 100 * percentage, 10);
                        if ($scope.step) {
                            newValue = Math.round(newValue / $scope.step) * $scope.step;
                        }
                        $scope.$apply(function () {
                            $scope.rangeEnd = newValue;
                        });
                        range.style.right = Math.abs(value) + 'px';
                    }
                };

                var updateModel = function () {
                    $scope.$apply(function () {
                        $scope.model = {
                            start: $scope.rangeStart,
                            end: $scope.rangeEnd
                        };
                    });
                };

                var moveElement = function (type, el, delta, final) {
                    var newPos, minPos, maxPos;

                    if (type === 'start') {
                        newPos = positionTracker.start + delta;
                        minPos = 0;
                        maxPos = dimensions.totalWidth - Math.abs(positionTracker.end) - (dimensions.handleWidth * 2);
                        if (newPos < minPos) {
                            newPos = minPos;
                        } else if (newPos > maxPos) {
                            newPos = maxPos;
                        }
                        // update inner start model
                        setSlider(type, newPos);
                    } else {
                        newPos = positionTracker.end + delta;
                        minPos = -(dimensions.totalWidth - positionTracker.start - (dimensions.handleWidth * 2));
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
                    moveElement('start', startHandle, parseInt(e.deltaX, 10), e.type === 'panend');
                });

                mcB.on('panmove panend', function (e) {
                    e.preventDefault();
                    moveElement('end', endHandle, parseInt(e.deltaX, 10), e.type === 'panend');
                });
            }
        };
    });
