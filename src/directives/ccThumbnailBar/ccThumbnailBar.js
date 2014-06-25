angular.module('sdk.directives.ccThumbnailBar', ['src/directives/ccThumbnailBar/cc-thumbnail-bar.tpl.html']);

angular.module('sdk.directives.ccThumbnailBar')
    .directive('ccThumbnailBar', function () {

        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            scope: {
                images: '=',
                onChange: '&'
            },
            templateUrl: 'src/directives/ccThumbnailBar/cc-thumbnail-bar.tpl.html',
            controller: ['$scope', function ($scope) {

                $scope.setSelectedImage = function (index) {
                    $scope.selectedImageIndex = index;

                    $scope.onChange({imageUrl: $scope.images[index].image});
                };

                $scope.$watch('images', function (newValue) {
                    // reset the image index when images ref changes
                    if (angular.isArray(newValue)) {
                        $scope.setSelectedImage(0);
                    }
                });
            }]
        };
    });
