angular.module('sdk.services.stateResolverService', []);

angular
    .module('sdk.services.stateResolverService')
    .factory('stateResolverService', ['$q', '$http', 'configService', function($q, $http, configService){
        return new sofa.StateResolverService($q, $http, configService);
}]);
