angular.module('sdk.services.localeService', []);

angular
    .module('sdk.services.localeService')
    .factory('localeService', ['$window', '$exceptionHandler', function ($window, $exceptionHandler) {

        'use strict';

        var localeData = $window.cc.Lang;

        var self = {};

        self.getTranslation = function (path) {

            if (!path) {
                return localeData;
            }

            var objects = path.split('.');
            var locale  = '';
            var length  = objects.length;
            var ln      = localeData;

            objects.every(function (el, i) {
                try {
                    if (!ln[el]) {
                        throw new Error('No translation found for: "' + el + '"');
                    } else {
                        if (i + 1 !== length) {
                            ln = ln[el];
                            return true;
                        } else {
                            locale = ln[el];
                            return false;
                        }
                    }
                } catch (e) {
                    $exceptionHandler(e);
                }
            });

            return locale;
        };

        return self;
    }]);
