/*jshint node:true*/
var Page = require('astrolabe').Page;

/**
   @namespace
 */
var rxCharacterCount = {

    eleParent: {
        get: function () {
            return this.rootElement.element(by.xpath('../..'));
        }
    },

    lblRemaining: {
        get: function () {
            return this.eleParent.element(by.binding('remaining'));
        }
    },

    txtComment: {
        get: function () {
            return this.rootElement;
        }
    },

    /**
       @function
       @returns {Boolean} Whether the root element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
       Get and set the comment's textual content. Will erase the current text when setting new text.
       @param {String} text - The desired comment to be sent via `.sendKeys(text)`.
       @returns {String} The current comment's text, via `.getAttribute('value')`.
       @example
       ```js
       it('should erase all text and replace it with new text on update', function () {
           rxCharacterCount.comment = 'Bar';
           expect(rxCharacterCount.comment).to.eventually.equal('Bar');
       });
       ```
     */
    comment: {
        get: function () {
            return this.txtComment.getAttribute('value');
        },

        set: function (text) {
            this.txtComment.clear();
            this.txtComment.sendKeys(text);
        }
    },

    /**
       @returns {Number} The remaining number of characters that can be entered.
     */
    remaining: {
        get: function () {
            return this.lblRemaining.getText().then(parseInt);
        }
    },

    /**
       @function
       @returns {Boolean} Whether or not the 'near-limit' class is displayed.
     */
    isNearLimit: {
        value: function () {
            return this.lblRemaining.getAttribute('class').then(function (classNames) {
                return classNames.indexOf('near-limit') > -1;
            });
        }
    },

    /**
       @function
       @returns {Boolean} Whether or not the 'over-limit' class is displayed.
     */
    isOverLimit: {
        value: function () {
            return this.lblRemaining.getAttribute('class').then(function (classNames) {
                return classNames.indexOf('over-limit') > -1;
            });
        }
    },

    /**
       @returns {String} The characters that are over the limit.
     */
    overLimitText: {
        get: function () {
            return this.eleParent.$('.over-limit-text').getText();
        }
    }

};

/**
   @exports encore.rxCharacterCount
 */
exports.rxCharacterCount = {

    /**
       @function
       @param {WebElement} rxCharacterCountElement - WebElement to be transformed into an rxCharacterCountElement object
       @returns {rxCharacterCount} Page object representing the rxCharacterCount object.
     */
    initialize: function (rxCharacterCountElement) {
        rxCharacterCount.rootElement = {
            get: function () { return rxCharacterCountElement; }
        };
        return Page.create(rxCharacterCount);
    },

    /**
       @returns {rxCharacterCount} Page object representing the _first_ rxCharacterCount object found on the page.
     */
    main: (function () {
        rxCharacterCount.rootElement = {
            get: function () { return $('[rx-character-count]'); }
        };
        return Page.create(rxCharacterCount);
    })()

};
