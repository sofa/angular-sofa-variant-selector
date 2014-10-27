angular.module('sdk.directives.sofaLazyValidation', []);

/**
 * Lazy validation extends the modelController with alternative valid and invalid properties,
 * which are set with a delay. This way, the user isn't disturbed by error messages while filling
 * out a field.
 * The new properties to use in your template are
 * - ccValid
 * - ccInvalid
 */

angular.module('sdk.directives.sofaLazyValidation')
    .directive('ccLazyValidation', function () {

        'use strict';

        var DEBOUNCE_MS_DEFAULT = 2000;

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, controller) {

                var DEBOUNCE_MS = DEBOUNCE_MS_DEFAULT,
                    offCalled = false;

                if (attrs.ccLazyValidation && typeof $scope.$eval(attrs.ccLazyValidation) === 'number') {
                    DEBOUNCE_MS = $scope.$eval(attrs.ccLazyValidation);
                }

                var checkValidity = function () {
                    // stop all remaining watches once the user starts interacting with the field
                    if (!offCalled) {
                        off();
                        offCalled = true;
                    }
                    if (controller.$valid) {
                        setValid();
                    } else {
                        if (controller.$dirty) {
                            debouncedError();
                        }
                    }
                };

                var debouncedError = cc.Util.debounce(function (stop) {
                    if (!stop && (element[0].value === undefined || element[0].value.length > 0)) {
                        setInvalid();
                    }
                }, DEBOUNCE_MS);


                var validate = function () {
                    if (controller.$dirty) {
                        if (controller.$valid) {
                            setValid();
                        } else {
                            setInvalid();
                        }
                    }
                };

                var setValid = function () {
                    debouncedError(true);
                    $scope.$apply(function () {
                        controller.ccValid = true;
                        controller.ccInvalid = false;
                    });
                };

                var setInvalid = function () {
                    $scope.$apply(function () {
                        controller.ccValid = false;
                        controller.ccInvalid = true;
                    });
                };

                element.bind('keyup keydown', checkValidity);
                element.bind('blur', validate);

                // In case there are values coming from a controller we need to watch for changes
                var off = $scope.$watch(function () { return controller.$viewValue; }, function (newValue) {
                    if (newValue && newValue.length) {
                        controller.ccValid = controller.$valid;
                        controller.ccInvalid = controller.$invalid;
                        off();
                        offCalled = true;
                    }
                });

                // Initially set to be neither valid nor invalid
                controller.ccValid = false;
                controller.ccInvalid = false;
            }
        };
    });
