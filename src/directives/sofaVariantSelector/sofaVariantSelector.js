angular.module('sdk.directives.sofaVariantSelector', ['src/directives/sofaVariantSelector/sofa-variant-selector.tpl.html', 'sdk.directives.sofaSelectBox']);

angular.module('sdk.directives.sofaVariantSelector')
    .filter('sofaVariantFilter', ['$filter', function ($filter) {

        'use strict';

        // variants, selectedProperties, propertyKey
        return function (values, selectedValues, key) {
            var selected = {
                properties: {}
            },
            applyFilters = false;

            // reformat for built in filter and exclude current property
            for (var property in selectedValues) {
                if (key !== property && selectedValues[property] !== null && selectedValues[property] !== undefined) {
                    selected.properties[property] = selectedValues[property];
                    applyFilters = true;
                }
            }

            var comparator = function (obj, text) {
                if (obj && text && typeof obj === 'object' && typeof text === 'object') {
                    for (var textKey in text) {
                        if (obj[textKey] !== text[textKey]) {
                            return false;
                        }
                    }
                    return true;
                }
            };

            // extract available variants
            var variants = applyFilters ? $filter('filter')(values, selected, comparator) : values;

            // extract flat values for the curent property
            var result = [];
            variants.forEach(function (variant) {
                if (result.indexOf(variant.properties[key]) === -1 && variant.stock > 0) {
                    result.push(variant.properties[key]);
                }
            });

            return result;
        };
    }])

    .directive('ccVariantSelector', ['$filter', 'localeService', function ($filter, localeService) {

        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                variants: '=',
                variant: '=?',
                selectedProperties: '=?',
                chooseText: '=?'
            },
            templateUrl: 'src/directives/sofaVariantSelector/sofa-variant-selector.tpl.html',
            link: function (scope) {

                // extract flat list of available properties
                // maybe iterating on the first variant is enough ?
                scope.properties = {};
                scope.selectedProperties = scope.selectedProperties || {};
                scope.data = {};

                var getDataByProperty = function (property) {
                    return $filter('sofaVariantFilter')(scope.variants, scope.selectedProperties, property);
                };

                var setData = function () {
                    angular.forEach(scope.properties, function (property) {
                        scope.data[property.name] = getDataByProperty(property.name);
                    });
                };

                var findVariant = function (variants, selectedProperties) {
                    var filteredVariants = variants.filter(function (variant) {
                        for (var property in variant.properties) {
                            if (variant.properties[property] !== selectedProperties[property]) {
                                return false;
                            }
                        }

                        return true;
                    });

                    return filteredVariants.length ? filteredVariants[0] : null;
                };

                scope.variants.forEach(function (variant) {
                    for (var property in variant.properties) {
                        //create a placeholder value on the selectedProperties hash
                        //for each available property. So we can later figure out
                        //which are missing.
                        scope.selectedProperties[property] = null;
                        if (!scope.properties[property]) {
                            scope.properties[property] = {
                                name: property,
                                label: localeService.getTranslation('variantSelector.' + property) || property
                            };
                        }
                    }
                });

                scope.$watch('selectedProperties', function (newVal) {
                    scope.variant = findVariant(scope.variants, newVal);
                    setData();
                }, true);
            }
        };
    }]);
