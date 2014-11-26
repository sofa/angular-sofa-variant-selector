angular.module('sdk.services.checkoutService', [
    'sdk.services.basketService',
    'sdk.services.loggingService',
    store.enabled ? 'sdk.services.localStorageService' : 'sdk.services.memoryStorageService',
    'sdk.services.userService'
]);

angular
    .module('sdk.services.checkoutService')
    .factory('checkoutService', [
        '$http', '$q', 'basketService', 'loggingService', 'configService', 'storageService', 'userService',
        function ($http, $q, basketService, loggingService, configService, storageService, userService) {
            return new cc.CheckoutService($http, $q, basketService, loggingService, configService, storageService, userService);
        }
    ]);


