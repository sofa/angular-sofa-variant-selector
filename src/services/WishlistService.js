angular.module('sdk.services.wishlistService', [
        // TODO: Investigate. I'm not sold this should be handled on this level.
        store.enabled ? 'sdk.services.localStorageService' : 'sdk.services.memoryStorageService'
    ]);

angular
    .module('sdk.services.wishlistService')
    .factory('wishlistService', ['storageService', function(storageService){
        return new cc.WishlistService(storageService);
}]);
