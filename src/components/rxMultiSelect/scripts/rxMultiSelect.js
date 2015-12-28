angular.module('encore.ui.rxMultiSelect')
/**
 * @ngdoc directive
 * @name rxMultiSelect.directive:rxMultiSelect
 * @restrict E
 * @scope
 * @description
 * This component is a multi-select dropdown with checkboxes for each option.
 * It is a replacement for `<select multiple>` when space is an issue, such as
 * in the header of a table.
 * The options for the control can be specified by passing an array of strings
 * (corresponding to the options' values) to the `options` attribute of the
 * directive, or using `<rx-select-option>`s. An 'All' option is automatically
 * set as the first option for the dropdown, which allows all options to be
 * toggled at once.
 *
 * The following two dropdowns are equivalent.
 * <pre>
 * <!-- $scope.available = [2014, 2015] -->
 * <rx-multi-select ng-model="selected" options="available"></rx-multi-select>
 *
 * <rx-multi-select ng-model="selected">
 *   <rx-select-option value="2014"></rx-select-option>
 *   <rx-select-option value="2015"></rx-select-option>
 * </rx-multi-select>
 * </pre>
 *
 * This component requires the `ng-model` attribute and binds the model to an
 * array of the selected options.
 *
 *
 * The preview text (what is shown when the element is not active) follows the following rules:
 * * If no items are selected, show "None".
 * * If only one item is selected from the dropdown, its label will display.
 * * If > 1 but < n-1 items are selected, show "[#] Selected".
 * * If all but one item is selected, show "All except [x]"
 * * If all items are selected, show "All Selected".
 *
 * @param {String} ng-model The scope property that stores the value of the input
 * @param {Array=} options A list of the options for the dropdown
 */
.directive('rxMultiSelect', function ($document, rxDOMHelper, rxSelectDirective) {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxMultiSelect.html',
        transclude: true,
        require: ['rxMultiSelect', 'ngModel'],
        scope: {
            selected: '=ngModel',
            options: '=?'
        },
        controller: function ($scope) {
            if (_.isUndefined($scope.selected)) {
                $scope.selected = [];
            }

            this.options = [];
            this.addOption = function (option) {
                if (option !== 'all') {
                    this.options = _.union(this.options, [option]);
                    this.render();
                }
            };
            this.removeOption = function (option) {
                if (option !== 'all') {
                    this.options = _.without(this.options, option);
                    this.unselect(option);
                    this.render();
                }
            };

            this.select = function (option) {
                $scope.selected = option === 'all' ? _.clone(this.options) : _.union($scope.selected, [option]);
            };
            this.unselect = function (option) {
                $scope.selected = option === 'all' ? [] : _.without($scope.selected, option);
            };
            this.isSelected = function (option) {
                if (option === 'all') {
                    return this.options.length === $scope.selected.length;
                } else {
                    return _.contains($scope.selected, option);
                }
            };

            this.render = function () {
                if (this.ngModelCtrl) {
                    this.ngModelCtrl.$render();
                }
            };
        },
        link: function (scope, element, attrs, controllers) {
            rxSelectDirective[0].link.apply(this, arguments);

            var previewElement = rxDOMHelper.find(element, '.preview')[0];

            var documentClickHandler = function (event) {
                if (event.target !== previewElement) {
                    scope.listDisplayed = false;
                    scope.$apply();
                }
            };

            $document.on('click', documentClickHandler);
            scope.$on('$destroy', function () {
                $document.off('click', documentClickHandler);
            });

            scope.listDisplayed = false;

            scope.toggleDisplay = function (event) {
                if (event.target === previewElement) {
                    scope.listDisplayed = !scope.listDisplayed;
                } else {
                    event.stopPropagation();
                }
            };

            var selectCtrl = controllers[0];
            var ngModelCtrl = controllers[1];

            ngModelCtrl.$render = function () {
                scope.$evalAsync(function () {
                    scope.preview = (function () {
                        function getLabel (option) {
                            var optionElement = rxDOMHelper.find(element, '[value="' + option + '"]');
                            return optionElement.text().trim();
                        }

                        if (_.isEmpty(scope.selected)) {
                            return 'None';
                        } else if (scope.selected.length === 1) {
                            return getLabel(scope.selected[0]) || scope.selected[0];
                        } else if (scope.selected.length === selectCtrl.options.length - 1) {
                            var option = _.first(_.difference(selectCtrl.options, scope.selected));
                            return 'All except ' + getLabel(option) || scope.selected[0];
                        } else if (scope.selected.length === selectCtrl.options.length) {
                            return 'All Selected';
                        } else {
                            return scope.selected.length + ' Selected';
                        }
                    })();
                });
            };

            selectCtrl.ngModelCtrl = ngModelCtrl;
        }
    };
});
