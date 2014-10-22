angular.module('sdk.directives.sofaDateField', [
        'src/directives/sofaDateField/sofa-date-field.tpl.html',
        'sdk.services.localeService'
    ]).directive('sofaDateField', ['localeService', function (localeService) {

        'use strict';

        // Matches a full-date string (e.g., "1980-11-27") as in http://tools.ietf.org/html/rfc3339#page-6
        var DATE_REGEXP = /^[1-9][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;

        return {
            restrict: 'E',
            replace: true,
            scope: {
                fieldName: '=',
                isRequired: '=',
                model: '=ngModel'
            },
            require: ['ngModel'],
            templateUrl: 'src/directives/sofaDateField/sofa-date-field.tpl.html',
            link: function ($scope, $element, attrs, controllers) {

                var modelController = controllers[0];

                // Give it a name so ngModelController can attach the date-field to a given formController
                modelController.$name = $scope.fieldName;

                // Create a custom field validation of type "sofa-date"
                // TODO ng1.3: refactor to work with angular.js 1.3+
                modelController.$parsers.unshift(function (viewValue) {
                    if (DATE_REGEXP.test(viewValue)) {
                        modelController.$setValidity('sofa-date', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        modelController.$setValidity('sofa-date', false);
                        return undefined;
                    }
                });

                $scope.innerModel = {
                    day: '',
                    month: '',
                    year: ''
                };

                $scope.ln = localeService.getTranslation('sofaDateField');

                var getDateString = function (model) {
                    return model.year + '-' + model.month + '-' + model.day;
                };

                var updateModel = function (newModel) {
                    $scope.model = getDateString(newModel);
                };

                var updateFromController = function (newModel) {
                    modelController.$setViewValue(getDateString(newModel));
                };

                $scope.$watch('innerModel', function (newVal, oldVal) {
                    if (newVal && newVal !== oldVal) {
                        updateModel(newVal);
                        updateFromController(newVal);
                    }
                }, true);

            }
        };
    }]);
