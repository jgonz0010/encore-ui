var _ = require('lodash');
var rxMetadata = require('./rxMetadata.page').rxMetadata;

/**
 * rxMetadata exercises
 * @exports encore.exercise.rxMetadata
 * @param {Object} [options=] Test options. Used to build valid tests.
 * @param {string} [options.cssSelector=] Fallback selector string to initialize widget with.
 * @param {Boolean} [options.present=true] Determines if the metadata is present in the DOM
 * @param {Boolean} [options.visible=true] Determines if the metadata is visible
 * @param {Object} [transformFns=] - Transformation functions to be passed to rxMetadata
 * @param {Object} [options.terms=] The expected label text of each metadata entry
 * @example
 * ```js
 * describe('metadata', encore.exercise.rxMetadata({
 *     transformFns: {
 *         'Signup Date': function (elem) {
 *             return elem.getText().then(function (text) {
 *                 return new Date(text);
 *             });
 *         },
 *         'Overdue Balance': function (elem) {
 *             return elem.getText().then(encore.rxMisc.currencyToPennies);
 *         },
 *         'Current Due': function (elem) {
 *             return elem.getText().then(encore.rxMisc.currencyToPennies);
 *         },
 *         'Expiration Date' function (elem) {
 *             return elem.getText().then(function (text) {
 *                 return new Date(text);
 *             });
 *         }
 *     },
 *     terms: {
 *         'Signup Date': new Date('March 1st, 2011'),
 *         'Overdue Balance': 13256,
 *         'Current Due': 64400,
 *         'Expiration Date': new Date('January 1st, 2021')
 *     }
 * }));
 * ```
 */
exports.rxMetadata = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        present: true,
        visible: true
    });

    return function () {
        var component;

        before(function () {
            if (options.cssSelector === undefined) {
                // don't use main -- you need to be able to supply `transformFns` via `initialize`
                component = rxMetadata.initialize($('rx-metadata'), options.transformFns);
            } else {
                component = rxMetadata.initialize($(options.cssSelector), options.transformFns);
            }
        });

        it('should ' + (options.present ? 'be' : 'not be') + ' present', function () {
            expect(component.isPresent()).to.eventually.eq(options.present);
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should have every term present and in the correct order', function () {
            expect(component.terms).to.eventually.eql(Object.keys(options.terms));
        });

        _.forEach(options.terms, function (definition, term) {
            it('should have the correct definition for ' + term, function () {
                if (_.isObject(definition) || _.isArray(definition)) {
                    expect(component.term(term)).to.eventually.eql(definition);
                } else {
                    expect(component.term(term)).to.eventually.equal(definition);
                }
            });
        });

    };
};
