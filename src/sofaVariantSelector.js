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

            var contains = function (data,key) {
                for (var i=0;i<data.length;i++) {
                    if (data[i].value===key) {
                        return true;
                    }
                }
                return false;
            }

            // extract available variants
            var variants = applyFilters ? $filter('filter')(values, selected, comparator) : values;

            // extract flat values for the curent property
            var result = [];
            variants.forEach(function (variant) {
                if (!contains(result,variant.properties[key].value)  && variant.stock > 0) {
                    result.push({value:variant.properties[key].value,
                                 selected:false,
                                 available: true});
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

                scope.images = {};

                scope.selectProperty = function(property, variant) {
                    console.log('Selected '+property+':'+variant);
                    if (!variant.available) {
                        scope.selectedProperties = {};
                    }
                    scope.selectedProperties[property]=variant.value;
                };

                var getDataByProperty = function (property) {
                    console.debug('Filtering for  '+JSON.stringify(property));
                    var rawResult = $filter('sofaVariantFilter')(scope.variants, {}, property);
                    var filteredResult = $filter('sofaVariantFilter')(scope.variants, scope.selectedProperties, property);

                    // Apply selection
                    var selection = scope.selectedProperties[property];
                    for (var i=0;i<rawResult.length;i++) {
                        if (rawResult[i].value===selection) {
                            rawResult[i].selected=true;
                        }
                        rawResult[i].available=false;
                        for (var j=0;j<filteredResult.length;j++) {
                            if (rawResult[i].value===filteredResult[j].value) {
                                rawResult[i].available=true;
                            }
                        }
                    }


                    console.debug('data '+JSON.stringify(rawResult));

                    return rawResult;
                };

                var setData = function () {
                    angular.forEach(scope.properties, function (property) {
                        var dataByProperty = getDataByProperty(property.name);
                        scope.data[property.name] = dataByProperty;
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

                var findImage = function(propertyGroup,property) {
                    for (var i=0; i<scope.variants.length;i++) {
                        var variant = scope.variants[i];
                        variant.selectable=true;

                        if (variant.images &&
                            variant.images.length &&
                            variant.properties[propertyGroup].value===property) {
                            for (var j=0;j<variant.images.length;j++) {
                                if (variant.images[j].main) {
                                    console.log('Found image for '+propertyGroup+' with '+property+' in '+JSON.stringify(variant));
                                    return variant.images[j];
                                }
                            }
                        }
                    }
                    return null;
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


                // Read images for all properties
                setData();


                // Check if an image is available for each property in each group
                for (var propertyGroup in scope.properties) {
                   scope.images[propertyGroup] = {};
                   for (var i=0;i<scope.data[propertyGroup].length;i++) {
                        var prop = scope.data[propertyGroup][i];
                        var img = findImage(propertyGroup,prop);
                        if (img === null) {
                            // At least one image is missing for this property
                            // we'll remove all images to indicating no proper data
                            scope.images[propertyGroup] = null;
                            break;
                        }
                        scope.images[propertyGroup][prop] = img;
                   }
                }

                scope.$watch('selectedProperties', function (newVal) {
                    scope.variant = findVariant(scope.variants, newVal);
                    setData();
                }, true);
            }
        };
    }]);
