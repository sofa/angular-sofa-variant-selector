/* global document */
/* global Hammer */

/**
 * Horizontal Touch Slider.
 * Dependencies: hammerjs (v.2.0)
 * Kinetic scrolling and snap inspired by http://ariya.ofilabs.com/2013/12/javascript-kinetic-scrolling-part-3.html
 */

// TODO: see if we can optimize this code

angular.module('sdk.directives.sofaTouchSlider', [
    'src/directives/sofaTouchSlider/sofa-touch-slider.tpl.html',
    'src/directives/sofaTouchSlider/sofa-touch-slider-indicator.tpl.html'
]);

angular.module('sdk.directives.sofaTouchSlider')
    .directive('sofaTouchSlider', ['$window', '$rootScope', function ($window, $rootScope) {

        'use strict';

        var WEIGHT_FACTOR = 1,   // smaller = "heavier"
            TIME_CONSTANT = 325, // ms
            FLEX_PROPERTY = '',
            TRANSFORM_PROPERTY  = 'transform',
            TRANSITION_PROPERTY = 'transition',
            LEFT_LIMIT_CLASS    = 'sofa-touch-slider-max--left',
            RIGHT_LIMIT_CLASS   = 'sofa-touch-slider-max--right',
            NO_FLEXBOX_CLASS    = 'sofa-touch-slider-no-flexbox';

        var setFlexboxProperty = function () {
            var el = document.createElement('div');
            /* -webkit-box-flex and -moz-box-flex can't handle percentages and are set to "1" via CSS */
            ['flex', 'msFlex', 'MozFlex', 'webkitFlex'].every(function (property) {
                if (el.style[property] !== undefined) {
                    FLEX_PROPERTY = property;
                    return false;
                }
                return true;
            });
        };

        var setTransformProperty = function () {
            ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
                var e = prefix + 'Transform';
                if (document.body.style[e] !== undefined) {
                    TRANSFORM_PROPERTY = e;
                    return false;
                }
                return true;
            });
        };

        var setTransitionProperty = function () {
            if (document.body.style.webkitTransition !== undefined) {
                TRANSITION_PROPERTY = 'webkitTransition';
            }
        };

        // Set CSS properties just once
        if (!FLEX_PROPERTY) {
            setFlexboxProperty();
            setTransformProperty();
            setTransitionProperty();
        }

        var CAN_USE_FLEXBOX = !!FLEX_PROPERTY;

        // orientationchange will not work for android, so we use the resize event
        $window.addEventListener('resize', function () {
            $rootScope.$emit('sofaTouchSlider.resize');
        });

        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                items: '=',
                displayItems: '=',
                onItemClick: '&',
                snap: '@?',
                showIndicator: '@?',
                slideIndex: '=?',
                selectedIndex: '=?'
            },
            templateUrl: 'src/directives/sofaTouchSlider/sofa-touch-slider.tpl.html',
            controller: function ($scope) {
                this.getItems = function () {
                    return $scope.items;
                };

                this.getSlideIndex = function () {
                    return $scope.slideIndex;
                };
            },
            link: function ($scope, $element, attrs, controller, transclude) {

                if (!angular.isFunction($window.Hammer)) {
                    throw new Error('Hammer.js is missing');
                }

                if ($scope.slideIndex === undefined) {
                    $scope.slideIndex = 0;
                }

                var api;

                $scope.$onRootScope('sofaTouchSlider.resize', function () {
                    api.reset();
                });

                $scope.slideToIndex = function (i) {
                    api.slideToIndex(i);
                };

                $scope.setToIndex = function (i) {
                    api.setToIndex(i);
                };

                $scope.reset = function () {
                    api.reset();
                };

                var initialize = function () {

                    var $moveContainer    = $element.find('ul'),
                        moveContainer     = $moveContainer[0],
                        moveContainerRect = moveContainer.getBoundingClientRect(),
                        containerWidth    = moveContainerRect.width,
                        itemCount         = $scope.items.length,
                        displayItemCount  = attrs.displayItems,
                        itemWidth         = containerWidth / displayItemCount,
                        itemWidthPercent  = 100 / displayItemCount,
                        maxMovement       = -(parseInt(itemWidth * (itemCount - displayItemCount), 10)),
                        snap              = $scope.snap ? itemWidth : false,
                        positionX         = 0,
                        savedPositionX    = 0,
                        amplitude         = 0,
                        oldSlideIndex     = $scope.slideIndex,
                        sliderItems       = [],
                        target,
                        running,
                        start,
                        progress,
                        lastMove;

                    if (!CAN_USE_FLEXBOX) {
                        var moveContainerWidth = itemWidth * itemCount;
                        $moveContainer.css('width', moveContainerWidth + 'px');
                        $element.addClass(NO_FLEXBOX_CLASS);
                    }

                    $element.addClass(LEFT_LIMIT_CLASS);

                    var reset = function () {
                        if (!CAN_USE_FLEXBOX) {
                            $moveContainer.css('width', '100%');
                        }

                        moveContainerRect = moveContainer.getBoundingClientRect();
                        containerWidth    = moveContainerRect.width;
                        itemWidth         = containerWidth / displayItemCount;
                        maxMovement       = -(parseInt(itemWidth * (itemCount - displayItemCount), 10));
                        snap              = $scope.snap ? itemWidth : false;

                        if (!CAN_USE_FLEXBOX) {
                            moveContainerWidth = itemWidth * itemCount;
                            $moveContainer.css('width', moveContainerWidth + 'px');
                            sliderItems.forEach(function (item) {
                                item.style.width = itemWidth + 'px';
                            });
                        }

                        setToIndex($scope.slideIndex);
                    };

                    var scroll = function (xValue, save) {

                        if (xValue <= maxMovement) {
                            xValue = maxMovement;
                            positionX = xValue;
                            $element.addClass(RIGHT_LIMIT_CLASS);
                        } else if (xValue >= 0) {
                            xValue = 0;
                            positionX = xValue;
                            $element.addClass(LEFT_LIMIT_CLASS);
                        } else {
                            $element.removeClass(LEFT_LIMIT_CLASS + ' ' + RIGHT_LIMIT_CLASS);
                        }
                        if (save) {
                            positionX = xValue;
                        }

                        $scope.slideIndex = Math.abs(parseInt(positionX / itemWidth, 10));

                        if (oldSlideIndex !== $scope.slideIndex) {
                            oldSlideIndex = $scope.slideIndex;
                            $scope.$apply();
                        }

                        moveContainer.style[TRANSFORM_PROPERTY] = 'translateX(' + xValue + 'px)';
                    };

                    // Animate to a given index
                    var slideToIndex = function (i) {
                        positionX = itemWidth * i * -1;
                        moveContainer.style[TRANSFORM_PROPERTY] = 'translateX(' + positionX + 'px)';
                    };

                    // Set to a given index without animating
                    var setToIndex = function (i) {
                        moveContainer.style[TRANSITION_PROPERTY] = 'none';
                        slideToIndex(i);
                        /* jshint ignore:start */
                        var forceRepaint = moveContainer.offsetHeight;
                        /* jshint ignore:end */
                        moveContainer.style[TRANSITION_PROPERTY] = '';
                    };

                    var autoScroll = function (timestamp) {
                        var delta, position;

                        if (!start) {
                            start = parseInt(timestamp, 10);
                        }
                        progress = parseInt(timestamp, 10) - start;
                        delta    = -amplitude * Math.exp(-progress / TIME_CONSTANT);
                        position = parseInt(target + delta, 10);

                        if (delta >= 1 || delta <= -1) {
                            scroll(position);
                            running = $window.requestAnimationFrame(autoScroll);
                        } else {
                            start = null;
                            progress = null;
                            scroll(position, true);
                        }
                    };

                    var mc = new Hammer.Manager(moveContainer);

                    var horizontal = new Hammer.Pan({
                        direction: Hammer.DIRECTION_HORIZONTAL,
                        threshold: 10,
                        touchAction: 'pan'
                    });

                    mc.add(horizontal);

                    mc.on('panstart', function (e) {
                        e.preventDefault();
                        $window.cancelAnimationFrame(running);
                        savedPositionX = positionX;
                        positionX = savedPositionX + parseInt(e.deltaX, 10);
                        scroll(positionX);
                    });

                    mc.on('panend', function (e) {
                        e.preventDefault();

                        var velocity = parseFloat((Math.abs(e.deltaX) / e.deltaTime).toFixed(1));

                        savedPositionX = positionX;

                        // Initialize autoscrolling
                        if ((positionX > maxMovement || positionX < 0)) {
                            if (velocity >= 0.5) {
                                target = Math.round(positionX + e.deltaX * Math.max(velocity, 1));
                                if (snap) {
                                    var newTarget = Math.round(target / snap) * snap;
                                    var delta = Math.abs(Math.abs(target) - Math.abs(savedPositionX));
                                    // If it's higher than 4, newTarget is rounded down to the old position and nothing happens
                                    if (snap / delta > 4) {
                                        // Left
                                        if (e.direction === 2) {
                                            newTarget = Math.round((target - snap) / snap) * snap;
                                        // Right
                                        } else if (e.direction === 4) {
                                            newTarget = Math.round((target + snap) / snap) * snap;
                                        }
                                    }
                                    target = newTarget;
                                }
                                running = $window.requestAnimationFrame(autoScroll);
                            } else if (snap) {
                                // Snap back to initial position
                                amplitude = parseInt(WEIGHT_FACTOR / displayItemCount, 10);
                                target    = Math.round(positionX / snap) * snap;
                                running   = $window.requestAnimationFrame(autoScroll);
                            }
                        }
                    });

                    mc.on('panmove', function (e) {
                        e.preventDefault();
                        lastMove = e;
                        positionX = savedPositionX + parseInt(e.deltaX, 10);
                        scroll(positionX);
                    });

                    // We build our own repeater here to assure getting the right scope for each item
                    var buildItems = function () {
                        var width = itemWidthPercent % 1 === 0 ? itemWidthPercent : itemWidthPercent.toFixed(5);

                        $moveContainer.innerHTML = '';

                        for (var i = 0; i < $scope.items.length; i += 1) {
                            var childScope   = $scope.$new();
                            childScope.item  = $scope.items[i];
                            childScope.index = i;

                            /*jshint loopfunc: true */
                            // "Don't make functions within a loop"
                            transclude(childScope, function (clone) {
                                var li = document.createElement('li');
                                li.className = 'sofa-touch-slider__item';
                                if (FLEX_PROPERTY) {
                                    li.style[FLEX_PROPERTY] = '1 0 ' + width + '%';
                                } else {
                                    li.style.width = itemWidth + 'px';
                                }
                                sliderItems.push(li);
                                // TODO: this is a case for documentFragment. Reduce DOM touches!
                                $moveContainer.append(angular.element(li).append(clone));
                            });
                            /*jshint loopfunc: false */
                        }
                    };

                    buildItems();

                    return {
                        slideToIndex: slideToIndex,
                        setToIndex: setToIndex,
                        reset: reset
                    };
                };

                // Items may come async...
                if (!$scope.items || $scope.items.length === 0) {
                    var off = $scope.$watch('items', function (newValue) {
                        if (newValue && newValue.length) {
                            api = initialize();
                            off();
                        }
                    });
                } else {
                    api = initialize();
                }

            }
        };
    }]);
