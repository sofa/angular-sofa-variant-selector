
describe('Unit: sofa-select-box', function () {

    var $scope,
        vm,
        $element,
        element,
        select,
        chooseOption,
        valueElement;

    var getValueElement = function (element) {
        return element.querySelector('.sofa-select-box__value');
    };
    
    beforeEach(module('sdk.directives.sofaSelectBox'));

    describe('with model value of null and chooseText defined', function () {

        beforeEach(inject(function ($rootScope, $compile) {
            $scope = $rootScope.$new();

            vm = $scope.vm = {};

            vm.model = null;
            vm.data = ['test', 'foo'];
            vm.propertyName = 'test_property';
            vm.chooseText = 'choose';

            $element = angular.element(
                '<div>' +
                    '<cc-select-box' +
                    ' model="vm.model" ' +
                    ' data="vm.data" ' +
                    ' property-name="{{vm.propertyName}}" ' +
                    ' choose-text="vm.chooseText">' +
                    ' </cc-select-box> ' +
                '</div>');

            $compile($element)($scope);
            $scope.$digest();

            element = $element[0];
            valueElement = getValueElement(element);
            select = element.querySelector('select');
            chooseOption = select.querySelector('option[ng-if]');
        }));

        it('should have an empty select value', function () {
            expect(select.value).toBe('');
        });

        it('should display the chooseText', function () {
            expect(valueElement.innerHTML).toBe(vm.chooseText);
        });

        it('should display an option with the choose text', function () {
            expect(chooseOption).toBeDefined();
            expect(chooseOption.value).toBe('');
            expect(angular.element(chooseOption).css('display')).toBe('');
            expect(chooseOption.innerHTML.search(/choose/) > -1).toBe(true);
        });

        it('should set the choose value if the selected value disappears', function() {
            expect(valueElement.innerHTML).toBe('choose');

            $scope.$apply(function () {
                $scope.vm.model = 'test';
            });

            expect(valueElement.innerHTML).toBe('test');

            $scope.$apply(function () {
                $scope.vm.data.splice(0, 1);
            });

            expect(valueElement.innerHTML).toBe('choose');
        });

    });

    describe('with model value of null and no chooseText given', function () {

        beforeEach(inject(function ($rootScope, $compile) {
            $scope = $rootScope.$new();

            vm = $scope.vm = {};

            vm.model = null;
            vm.data = ['test', 'foo'];
            vm.propertyName = 'test_property';

            $element = angular.element(
                '<div>' +
                    '<cc-select-box' +
                    ' model="vm.model" ' +
                    ' data="vm.data" ' +
                    ' property-name="{{vm.propertyName}}">' +
                    ' </cc-select-box> ' +
                '</div>');

            $compile($element)($scope);
            $scope.$digest();

            element = $element[0];
            valueElement = getValueElement(element);
            select = element.querySelector('select');
            chooseOption = select.querySelector('option[ng-if]');
        }));

        it('should have a select value of "0"', function () {
            expect(select.value).toBe('0');
        });

        it('should have a display value equal to the first options\' label', function () {
            expect(valueElement.innerHTML).toBe('test');
        });

        it('should not display a choose option', function () {
            expect(chooseOption).toBe(null);
        });

    });

    describe('with a model value provided', function () {

        describe('(string)', function () {
            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};

                vm.model = 'preselected_value';
                vm.data = ['preselected_value', 'test', 'foo'];
                vm.propertyName = 'test_property';

                $element = angular.element(
                    '<div>' +
                        '<cc-select-box' +
                        ' model="vm.model" ' +
                        ' data="vm.data" ' +
                        ' property-name="{{vm.propertyName}}">' +
                        ' </cc-select-box> ' +
                    '</div>');

                $compile($element)($scope);
                $scope.$digest();

                element = $element[0];
                valueElement = getValueElement(element);
                select = element.querySelector('select');
            }));

            it('should display the selected value', function () {
                expect(valueElement.innerHTML).toBe('preselected_value');
            });

            it('should have a select value that equals the model value', function () {
                var value = select.querySelector('option[value="' + select.value + '"]').innerHTML;
                expect(value).toEqual(vm.model);
            });

            it('should select the right value according to model change', function() {
                expect(valueElement.innerHTML).toBe('preselected_value');

                $scope.$apply(function () {
                    $scope.vm.model = 'test';
                });

                expect(valueElement.innerHTML).toBe('test');
            });

            it('should select the first of the remaining values if the selected one disappears', function() {
                expect(valueElement.innerHTML).toBe('preselected_value');

                $scope.$apply(function () {
                    $scope.vm.data.splice(0, 1);
                });

                expect(valueElement.innerHTML).toBe('test');
            });

            it('it should update model on change', function() {
                expect(select.value).toBe('0');
                expect(valueElement.innerHTML).toBe('preselected_value');

                select.value = '1';
                browserTrigger(select, 'change');

                expect(select.value).toBe('1');
                expect(valueElement.innerHTML).toBe('test');
            });

        });

        describe('(object)', function () {
            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};

                vm.model = {
                    title: 'test_title',
                    value: 'test_value'
                };
                vm.data = [
                    {
                        title: 'test_title',
                        value: 'test_value'
                    }
                ];
                vm.propertyName = 'test_property';
                vm.displayValueExp = 'title';

                $element = angular.element(
                    '<div>' +
                        '<cc-select-box' +
                        ' model="vm.model" ' +
                        ' data="vm.data" ' +
                        ' display-value-exp="vm.displayValueExp" ' +
                        ' property-name="{{vm.propertyName}}">' +
                        ' </cc-select-box> ' +
                    '</div>');

                $compile($element)($scope);
                $scope.$digest();

                element = $element[0];
                valueElement = getValueElement(element);
                select = element.querySelector('select');
            }));

        });

        describe('(object)', function () {
            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};

                vm.model = {
                    title: 'test_title',
                    value: 'test_value'
                };
                vm.data = [
                    {
                        title: 'test_title',
                        value: 'test_value'
                    }
                ];
                vm.propertyName = 'test_property';
                vm.displayValueExp = 'title';

                $element = angular.element(
                    '<div>' +
                        '<cc-select-box' +
                        ' model="vm.model" ' +
                        ' data="vm.data" ' +
                        ' display-value-exp="vm.displayValueExp" ' +
                        ' property-name="{{vm.propertyName}}">' +
                        ' </cc-select-box> ' +
                    '</div>');

                $compile($element)($scope);
                $scope.$digest();

                element = $element[0];
                valueElement = getValueElement(element);
                select = element.querySelector('select');
            }));

            it('should display the selected value', function () {
                expect(valueElement.innerHTML).toBe('test_title');
            });

            it('should have a select value that equals the model value', function () {
                var value = select.querySelector('option[value="' + select.value + '"]').innerHTML;
                expect(value).toEqual(vm.model.title);
            });

            it('should restore the selected value if the dataset is updated with equal values', function() {

                $scope.$apply(function () {
                    $scope.vm.data = [
                        {
                            title: 'test_title',
                            value: 'test_value'
                        }
                    ];
                });

                expect(select.value).toBe('0');
                expect(valueElement.innerHTML).toBe('test_title');
            });

        });
    });

    describe('within a form directive', function () {

        var count = 1;

        var getFormName = function (counter) {
            return 'test_form_' + counter;
        };

        describe('(property-name as string)', function () {

            var i = count++;

            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};

                vm.model = null;
                vm.data = ['test', 'foo'];
                vm.required = true;
                vm.propertyName = 'test_property';

                $element = angular.element(
                    '<form name="' + getFormName(i) + '">' +
                        '<cc-select-box' +
                        ' model="vm.model" ' +
                        ' data="vm.data" ' +
                        ' property-name="{{vm.propertyName}}">' +
                        ' </cc-select-box> ' +
                    '</form>');

                $compile($element)($scope);
                $scope.$digest();
            }));

            it('should have the form property on its scope', function () {
                expect($scope[getFormName(i)]).toBeDefined();
            });

            it('should have the field name bound to the form object', function () {
                expect($scope[getFormName(i)].test_property).toBeDefined();
            });

        });

        describe('(property-name as expression)', function () {

            var i = count++;

            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};

                vm.model = null;
                vm.data = ['test', 'foo'];
                vm.required = true;
                vm.suffix = 'suffix';

                $element = angular.element(
                    '<form name="' + getFormName(i) + '">' +
                        '<cc-select-box' +
                        ' model="vm.model" ' +
                        ' data="vm.data" ' +
                        ' property-name="test_property_{{vm.suffix}}">' +
                        ' </cc-select-box> ' +
                    '</form>');

                $compile($element)($scope);
                $scope.$digest();
            }));

            it('should have a field name that equals the given expression', function () {
                expect($scope[getFormName(i)].test_property_suffix).toBeDefined();
            });

        });

        describe('(required, no preselected model value)', function () {

            var i = count++;

            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};

                vm.model = null;
                vm.data = ['test', 'foo'];
                vm.required = true;
                vm.propertyName = 'test_property';

                $element = angular.element(
                    '<form name="' + getFormName(i) + '">' +
                        '<cc-select-box' +
                        ' model="vm.model" ' +
                        ' data="vm.data" ' +
                        ' required="vm.required" ' +
                        ' property-name="{{vm.propertyName}}">' +
                        ' </cc-select-box> ' +
                    '</form>');

                $compile($element)($scope);
                $scope.$digest();

                element = $element[0];
                valueElement = getValueElement(element);
                select = element.querySelector('select');
            }));

            it('should not set the corresponding form controller error', function () {
                expect($scope[getFormName(i)].$error.required).toBe(false);
            });

            it('should initially be valid', function () {
                expect($scope[getFormName(i)].test_property.$valid).toBe(true);
            });
        });

        describe('(not required, no preselected model value)', function () {

            var i = count++;

            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};

                vm.model = null;
                vm.data = ['test', 'foo'];
                vm.propertyName = 'test_property';

                $element = angular.element(
                    '<form name="' + getFormName(i) + '">' +
                        '<cc-select-box' +
                        ' model="vm.model" ' +
                        ' data="vm.data" ' +
                        ' property-name="{{vm.propertyName}}">' +
                        ' </cc-select-box> ' +
                    '</form>');

                $compile($element)($scope);
                $scope.$digest();

                element = $element[0];
                valueElement = getValueElement(element);
                select = element.querySelector('select');
            }));

            it('should not set the corresponding form controller error', function () {
                expect($scope[getFormName(i)].$error.required).toBe(false);
            });

            it('should initially be invalid', function () {
                expect($scope[getFormName(i)].test_property.$valid).toBe(true);
            });
        });

        describe('(required, with a preselected model value)', function () {

            var i = count++;

            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};

                vm.model = 'test_value';
                vm.data = ['test_value', 'test', 'foo'];
                vm.required = true;
                vm.propertyName = 'test_property';

                $element = angular.element(
                    '<form name="' + getFormName(i) + '">' +
                        '<cc-select-box' +
                        ' model="vm.model" ' +
                        ' data="vm.data" ' +
                        ' required="vm.required" ' +
                        ' property-name="{{vm.propertyName}}">' +
                        ' </cc-select-box> ' +
                    '</form>');

                $compile($element)($scope);
                $scope.$digest();

                element = $element[0];
                valueElement = getValueElement(element);
                select = element.querySelector('select');
            }));

            it('should not set the corresponding form controller error', function () {
                expect($scope[getFormName(i)].$error.required).toBe(false);
            });

            it('should initially be valid', function () {
                expect($scope[getFormName(i)].test_property.$valid).toBe(true);
            });
        });

        describe('(two select boxes)', function () {

            var i = count++;
            var vm2, valueElements, selects;

            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};
                vm2 = $scope.vm2 = {};

                vm.model = 'test_value';
                vm.data = ['test_value', 'test', 'foo'];
                vm.required = true;
                vm.propertyName = 'test_property_1';

                vm2.model = null;
                vm2.data = ['test', 'foo'];
                vm2.required = true;
                vm2.propertyName = 'test_property_2';

                $element = angular.element(
                    '<form name="' + getFormName(i) + '">' +
                        '<cc-select-box' +
                            ' model="vm.model" ' +
                            ' data="vm.data" ' +
                            ' property-name="{{vm.propertyName}}">' +
                        ' </cc-select-box> ' +
                        '<cc-select-box' +
                            ' model="vm2.model" ' +
                            ' data="vm2.data" ' +
                            ' property-name="{{vm2.propertyName}}">' +
                        ' </cc-select-box> ' +
                    '</form>');

                $compile($element)($scope);
                $scope.$digest();

                element = $element[0];
                valueElements = element.querySelectorAll('.sofa-select-box .sofa-select-box__display-value');
                selects = element.querySelectorAll('select');
            }));

            it('should have both form fields defined in the form object', function () {
                expect($scope[getFormName(i)].test_property_1).toBeDefined();
                expect($scope[getFormName(i)].test_property_2).toBeDefined();
            });
        });

    });

    describe('with display value expression', function () {
       
        describe('not provided (default)', function () {
            
            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};

                vm.model = 'test_value';
                vm.data = ['test_value', 'test', 'foo'];
                vm.propertyName = 'test_property';
                vm.chooseText = 'choose';

                $element = angular.element(
                    '<div>' +
                        '<cc-select-box' +
                        ' model="vm.model" ' +
                        ' data="vm.data" ' +
                        ' property-name="{{vm.propertyName}}" ' +
                        ' choose-text="vm.chooseText">' +
                        ' </cc-select-box> ' +
                    '</div>');

                $compile($element)($scope);
                $scope.$digest();

                element = $element[0];
                valueElement = getValueElement(element);
                select = element.querySelector('select');
                chooseOption = select.querySelector('option[ng-if]');
            }));

            it('should display the preselected model\'s value', function () {
                expect(valueElement.innerHTML).toBe('test_value');
            });

        });

        describe('being a string', function () {

            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};

                vm.model = {
                    title: 'test_title',
                    value: 'test_value'
                };
                vm.data = [
                    {
                        title: 'test_title',
                        value: 'test_value'
                    }
                ];
                vm.propertyName = 'test_property';
                vm.chooseText = 'choose';
                vm.displayValueExp = 'title';

                $element = angular.element(
                    '<div>' +
                        '<cc-select-box' +
                        ' model="vm.model" ' +
                        ' data="vm.data" ' +
                        ' property-name="{{vm.propertyName}}" ' +
                        ' choose-text="vm.chooseText" ' +
                        ' display-value-exp="vm.displayValueExp">' +
                        ' </cc-select-box> ' +
                    '</div>');

                $compile($element)($scope);
                $scope.$digest();

                element = $element[0];
                valueElement = getValueElement(element);
                select = element.querySelector('select');
                chooseOption = select.querySelector('option[ng-if]');
            }));

            it('should display the preselected model\'s value expression (from string)', function () {
                expect(valueElement.innerHTML).toBe('test_title');
            });

        });

        describe('being a function', function () {

            var options;

            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();

                vm = $scope.vm = {};

                vm.model = {
                    title: 'test_title',
                    value: 'test_value',
                    titleSuffix: 'some suffix'
                };
                vm.data = [
                    {
                        title: 'test_title',
                        value: 'test_value',
                        titleSuffix: 'some suffix'
                    },
                    {
                        title: 'other_test_title',
                        value: 'other_test_value',
                        titleSuffix: 'some suffix'
                    }
                ];
                vm.propertyName = 'test_property';
                vm.chooseText = 'choose';
                vm.displayFunction = function (data) {
                    return data.title + ' ' + data.titleSuffix;
                };

                $element = angular.element(
                    '<div>' +
                        '<cc-select-box' +
                        ' model="vm.model" ' +
                        ' data="vm.data" ' +
                        ' property-name="{{vm.propertyName}}" ' +
                        ' choose-text="vm.chooseText" ' +
                        ' display-value-exp="vm.displayFunction">' +
                        ' </cc-select-box> ' +
                    '</div>');

                $compile($element)($scope);
                $scope.$digest();

                element = $element[0];
                valueElement = getValueElement(element);
                select = element.querySelector('select');
                options = select.querySelectorAll('option');
                chooseOption = select.querySelector('option[ng-if]');
            }));

            it('should display the display function\'s return value', function () {
                expect(valueElement.innerHTML).toBe('test_title some suffix');
                expect(options[0].innerHTML.search(/choose/) > -1).toBe(true);
                expect(options[1].innerHTML).toBe('test_title some suffix');
                expect(options[2].innerHTML).toBe('other_test_title some suffix');
            });

            it('should set the correct option to selected', function () {
                var selectedOption = select.querySelector('option[selected]');
                expect(selectedOption).toBeDefined();
                expect(selectedOption.innerHTML).toBe('test_title some suffix');
            });

        });

    });

});
