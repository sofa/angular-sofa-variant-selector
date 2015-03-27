/**
 * angular-sofa-variant-selector - v0.1.2 - Fri Mar 27 2015 18:58:51 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
angular.module('sofa-variant-selector.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('sofa-variant-selector.tpl.html',
    '<ul class="sofa-variant-selector" ng-if="variants.length">\n' +
    '    <li class="sofa-variant-selector__item" ng-repeat="property in properties">\n' +
    '        <label class="sofa-variant-selector__label" ng-bind="property.label"></label>\n' +
    '        <cc-select-box\n' +
    '                model="selectedProperties[property.name]"\n' +
    '                data="data[property.name]"\n' +
    '                choose-text="property.label"\n' +
    '                property-name="variant_{{property.name}}">\n' +
    '        </cc-select-box>\n' +
    '    </li>\n' +
    '</ul>\n' +
    '');
}]);

angular.module('sofa.variantSelector', ['sofa-variant-selector.tpl.html', 'sofa.selectBox']);

angular.module('sofa.variantSelector')
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
                        if (obj[textKey].value !== text[textKey]) {
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
                    result.push(variant.properties[key].value);
                }
            });

            return result;
        };
    }])

    .directive('sofaVariantSelector', ['$filter', 'localeService', function ($filter, localeService) {

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
            templateUrl: 'sofa-variant-selector.tpl.html',
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
                            if (variant.properties[property].value !== selectedProperties[property]) {
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
                                label: localeService.getTranslation('variantSelector.' + property) || variant.properties[property].label
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
}(angular));
