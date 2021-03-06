/*jshint node:true*/
var Page = require('astrolabe').Page;
var _ = require('lodash');

/**
 * @namespace
 */
var rxFieldName = {
    eleRequiredSymbol: {
        get: function () {
            return this.rootElement.$('.required-symbol');
        }
    },

    eleContent: {
        get: function () {
            return this.rootElement.$('.rx-field-name-content');
        }
    },

    /**
     * @function
     * @returns {Boolean}
     *   True if field name displays as required (symbol is currently displayed).
     */
    isSymbolVisible: {
        value: function () {
            return this.eleRequiredSymbol.isDisplayed();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the required symbol is present in the DOM.
     */
    isSymbolPresent: {
        value: function () {
            return this.eleRequiredSymbol.isPresent();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the root element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the root element is present on the page.
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    }
};//rxFieldName

/**
 * @exports encore.rxForm
 */
exports.rxForm = {
    /**
     * @namespace
     */
    textField: {
        /**
         * @function
         * @description
         * Generates a getter and a setter for a text field on your page.
         * Text fields include text boxes, text areas, anything that responds to `.clear()` and `.sendKeys()`.
         * @param {WebElement} elem - The WebElement for the text field.
         * @returns {Object} A getter and a setter to be applied to a text field in a page object.
         *
         * @example
         * ```js
         * var yourPage = Page.create({
         *     plainTextbox: rxForm.textField.generateAccessor(element(by.model('username')));
         * });
         *
         * it('should fill out the text box', function () {
         *     yourPage.plainTextbox = 'My Username'; // setter
         *     expect(yourPage.plainTextbox).to.eventually.equal('My Username'); // getter
         * });
         * ```
         */
        generateAccessor: function (elem) {
            return {
                get: function () {
                    return elem.getAttribute('value');
                },
                set: function (input) {
                    elem.clear();
                    elem.sendKeys(input);
                }
            };
        }
    },

    form: {
        /**
         * @private
         * @description
         * This is an alias to the new `rxForm.fill`, which was formally `rxForm.form.fill`.
         * It is kept here to remain backwards compatible with previous versions of the library.
         */
        fill: function (reference, formData) {
            exports.rxForm.fill(reference, formData);
        }
    },

    /**
     * @description
     * Set `value` in `formData` to the page object's current method `key`.
     * Aids in filling out form data via javascript objects.
     * For an example of this in use, see [encore-ui's end to end tests]{@link http://goo.gl/R7Frwv}.
     * @param {Object} reference - Context to evaluate under as `this` (typically, `this`).
     * @param {Object} formData - Key-value pairs of deeply-nested form items, and their values to fill.
     *
     * @example
     * ```js
     * var yourPage = Page.create({
     *     form: {
     *         set: function (formData) {
     *             rxForm.fill(this, formData);
     *         }
     *     }
     * });
     *
     * yourPage.form = {
     *     aTextbox: 'My Name',
     *     aRadioButton: 'Second Option'
     *     aSelectDropdown: 'My Choice'
     *     aModule: {
     *         hasMethods: 'Can Accept Input Too',
     *         deepNesting: {
     *             might: 'be overkill at this level'
     *         }
     *     }
     * };
     * ```
     */
    fill: function (reference, formData) {
        var next = this;
        var page = reference;
        _.forEach(formData, function (value, key) {
            if (_.isPlainObject(value)) {
                // There is a deeply-nested function call in the form.
                reference = page[key];
                next.fill(reference, value);
            } else {
                page[key] = value;
            }
        });
    },

    //TODO: split out into exports.rxFieldName (src/rxForm/scripts/rxFieldName.page.js)
    /**
     * @namespace
     */
    fieldName: {
        /**
         * @function
         * @param {WebElement} rxFieldNameElement - WebElement to be transformed into an rxFieldNameElement object.
         * @returns {rxFieldName} Page object representing the rxFieldName object.
         */
        initialize: function (rxFieldNameElement) {
            rxFieldName.rootElement = {
                get: function () { return rxFieldNameElement; }
            };
            return Page.create(rxFieldName);
        }
    },

    /**
     * @namespace
     * @deprecated
     * @description
     * **ALIASED** Directly uses <a href="#encore.module_rxCheckbox">encore.rxCheckbox</a>.
     */
    checkbox: {
        get initialize() { return exports.rxCheckbox.initialize; },
        get generateAccessor() { return exports.rxCheckbox.generateAccessor; }
    },

    /**
     * @namespace
     * @description
     * **ALIASED** Directly uses <a href="#encore.module_rxRadio">encore.rxRadio</a>.
     */
    radioButton: {
        get initialize() { return exports.rxRadio.initialize; },
        get generateAccessor() { return exports.rxRadio.generateAccessor; }
    },

    /**
     * @namespace
     * @description
     * **ALIASED** Directly uses <a href="#encore.module_rxSelect">encore.rxSelect</a>.
     */
    dropdown: {
        get initialize() { return exports.rxSelect.initialize; },
        get generateAccessor() { return exports.rxSelect.generateAccessor; }
    },

    /**
     * @deprecated
     * @description
     * **ALIASED**: Please use {@link rxMisc.currencyToPennies} instead.
     * This function will be removed in a future release of the EncoreUI framework.
     */
    currencyToPennies: function (currencyString) {
        return exports.rxMisc.currencyToPennies(currencyString);
    },

    /**
     * @deprecated
     * @description
     * **ALIASED**: Please use {@link rxMisc.slowClick} instead.
     * This function will be removed in a future release of the EncoreUI framework.
     */
    slowClick: function (elem) {
        return exports.rxMisc.slowClick(elem);
    }
};
