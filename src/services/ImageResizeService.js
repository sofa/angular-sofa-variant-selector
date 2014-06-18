angular.module('sdk.services.imageResizeService', ['sdk.services.configService']);

angular
    .module('sdk.services.imageResizeService')
    .factory('imageResizeService', ['configService', '$window', function(configService, $window) {
        return new sofa.ImageResizerService(configService, $window);
}]);


