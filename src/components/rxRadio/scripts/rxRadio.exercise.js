var _ = require('lodash');
var rxRadio = require('./rxRadio.page').rxRadio;

/**
 * @description rxRadio exercises
 * @exports encore.exercise.rxRadio
 * @param {Object} [options=] - Test options. Used to build valid tests.
 * @param {rxRadio} [options.instance=] - Component to exercise.
 * @param {String} [options.cssSelector=] - DEPRECATED: Fallback selector string to initialize widget with.
 * @param {Boolean} [options.disabled=false] - Determines if the radio is disabled.
 * @param {Boolean} [options.selected=false] - Determines if the radio is selected.
 * @param {Boolean} [options.visible=true] - Determines if the radio is visible.
 * @param {Boolean} [options.valid=true] - Determines if the radio is valid.
 */
exports.rxRadio = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        selected: false,
        visible: true,
        valid: true
    });

    return function () {
        var component;

        before(function () {
            if (options.instance !== undefined) {
                component = options.instance;
            }

            if (options.cssSelector !== undefined) {
                console.warn('Deprecated exercise option `cssSelector` will be removed in favor of `instance`');
                component = rxRadio.initialize($(options.cssSelector));
            }
        });

        it('should be present', function () {
            expect(component.isPresent()).to.eventually.be.true;
        });

        it('should be a radio button', function () {
            expect(component.isRadio()).to.eventually.be.true;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should ' + (options.disabled ? 'be' : 'not be') + ' disabled', function () {
            expect(component.isDisabled()).to.eventually.eq(options.disabled);
        });

        it('should ' + (options.selected ? 'be' : 'not be') + ' selected', function () {
            expect(component.isSelected()).to.eventually.eq(options.selected);
        });

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', function () {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });
    };
};
