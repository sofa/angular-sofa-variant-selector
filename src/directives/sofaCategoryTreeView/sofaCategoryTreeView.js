angular.module('sdk.directives.sofaCategoryTreeView')
    .directive('ccCategoryTreeView', ['couchService', 'categoryTreeViewRemote', function (couchService, categoryTreeViewRemote) {

        'use strict';

        return {
            restrict: 'EA',
            scope: {},
            replace: true,
            templateUrl: 'src/directives/sofaCategoryTreeView/sofa-category-tree-view.tpl.html',
            link: function ($scope) {
                couchService
                    .getCategory()
                    .then(function (rootCategory) {
                        $scope.items = rootCategory && rootCategory.children ? rootCategory.children : [];
                        $scope.item = rootCategory;
                        $scope.isRoot = true;
                        categoryTreeViewRemote.toggleVisibility(rootCategory);

                        $scope.items.forEach(function (item) {
                            categoryTreeViewRemote.setItemLevel(item, 1);
                        });

                    });
            }
        };
    }]);