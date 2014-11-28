angular.module('sofa.dateField')
    .directive('sofaDateField', ['sofaDateFieldService', function (sofaDateFieldService) {

        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                fieldName: '=',
                isRequired: '=',
                model: '=ngModel'
            },
            controller: 'sofaDateFieldController',
            controllerAs: 'dateFieldCtrl',
            bindToController: true,
            require: ['ngModel'],
            templateUrl: 'src/directives/sofaDateField/sofa-date-field.tpl.html',
            link: function (scope, element, attrs, controllers) {

                var modelController = controllers[0];
                // Give it a name so ngModelController can attach the date-field to a given formController
                modelController.$name = scope.fieldName;

                // Create a custom field validation of type "sofa-date"
                // TODO ng1.3: refactor to work with angular.js 1.3+
                modelController.$parsers.unshift(function (viewValue) {
                    if (sofaDateFieldService.getDatRegEx().test(viewValue)) {
                        modelController.$setValidity('sofaDate', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        modelController.$setValidity('sofaDate', false);
                        return undefined;
                    }
                });

                scope.innerModel = {
                    day: '',
                    month: '',
                    year: ''
                };

                scope.$watch('innerModel', function (newVal, oldVal) {
                    if (newVal && newVal !== oldVal) {
                       scope.model = sofaDateFieldService.getUpdatedModel(newVal);
                       sofaDateFieldService.updateModelController(modelController, newVal);
                    }
                }, true);

                scope.$watch('model', function (newVal) {
                    if (newVal && sofaDateFieldService.isSuitableModel(newVal)) {
                        scope.innerModel = sofaDateFieldService.splitModel(newVal);
                    }
                });
            }
        };
    }]);
