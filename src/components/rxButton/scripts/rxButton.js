angular.module('encore.ui.rxButton')
/**
 * @ngdoc directive
 * @name rxButton.directive:rxButton
 * @restrict E
 * @scope
 * @description
 * Renders a button which will disable when clicked and show a loading message,
 * and re-enable when the operation is complete. If you set `classes` attributes `<rx-button>`,
 * those will get passed to the `<button>` instance as `class`.
 *
 * ## Button State
 *
 * The state of the button is controlled via the `toggle` attribute, which disables the button and replaces the
 * `default-msg` with the `toggle-msg` as the button's text.  There are no defaults for these messages, so they must
 * be defined if the toggle behavior is desired.  While the button is in the toggled state, it is also disabled (no
 * matter what the value of `disable` is.
 *
 * The button does not modify the variable passed to `toggle`; it should be modified in the handler provided to
 * `ng-click`.  Usually, the handler will set the variable to `true` immediately, and then to `false` once the the
 * process (e.g. an API call) is complete.
 *
 * To disable the button, use the `disable` attribute instead of the normal `ng-disabled` - the behavior is the same.
 *
 * @param {String} loadingMsg Text to be displayed when an operation is in progress.
 * @param {String} defaultMsg Text to be displayed by default when no operation is in progress.
 * @param {Boolean=} [toggle=false] When true, the button will display the loading text.
 * @param {Boolean=} [disable=false] When true, the button will be disabled.
 * @param {String=} [classes=""] The class names to be applied to the button.
 *
 */
.directive('rxButton', function () {
    return {
        templateUrl: 'templates/rxButton.html',
        restrict: 'E',
        scope: {
            toggleMsg: '@',
            defaultMsg: '@',
            toggle: '=',
            disable: '=?',
            classes: '@?'
        }
    };
});
