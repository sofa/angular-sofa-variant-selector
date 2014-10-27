
angular.module('sdk.directives.sofaZippy', ['src/directives/sofaZippy/sofa-zippy.tpl.html']);

angular.module('sdk.directives.sofaZippy')
    .directive('ccZippy', function() {

        'use strict';

        var defaultIfUndefined = function(scope, property, defaultVal){
            scope[property] = scope[property] === undefined ? defaultVal : scope[property];
        };

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                caption: '=?',
                opened: '=?'
            },
            templateUrl: 'src/directives/sofaZippy/sofa-zippy.tpl.html',
            link: function(scope, $element, attrs){
                var element = $element[0],
                    $caption = angular.element(element.querySelectorAll('.sofa-zippy__caption')[0]),
                    $icon = angular.element(element.querySelectorAll('.sofa-zippy-icon')[0]),
                    openedIconClass = 'sofa-zippy-icon--opened',
                    closedIconClass = 'sofa-zippy-icon--closed';

                defaultIfUndefined(scope, 'caption', 'default');

                scope.opened = attrs.initOpened === undefined ? false : (attrs.initOpened === "true");

                var setOpen = function(opened){
                    $element.removeClass(opened ? 'sofa-zippy--closed' : 'sofa-zippy--opened');
                    $element.addClass(opened ? 'sofa-zippy--opened' : 'sofa-zippy--closed');
                    $icon.removeClass(opened ? closedIconClass : openedIconClass);
                    $icon.addClass(opened ? openedIconClass : closedIconClass);
                };

                var toggle = function(){
                    scope.opened = !scope.opened;
                    setOpen(scope.opened);
                };

                $caption.bind('click', toggle);

                scope.$watch('opened', setOpen);

                setOpen(scope.opened);
            }
        };
    });