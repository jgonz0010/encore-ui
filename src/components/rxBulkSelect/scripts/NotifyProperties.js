angular.module('encore.ui.rxBulkSelect')
/**
 * @ngdoc service
 * @name rxBulkSelect.service:NotifyProperties
 * @description
 *
 * This factory provides functionality for abstracting "properties", and allowing
 * other directives/controllers/etc. to register for notifications when the properties
 * change. It would normally be used for a parent directive's controller, and child element
 * directives that "require" that controller.
 *
 * For example, say you have a value you want to track, which we'll call `numSelected`.
 * This will be a plain integer value that you have complete control over. What you want
 * is for other directives/controllers/etc to be able to register for notifications whenever
 * `numSelected` changes.
 *
 * The `registrationFn` method here sets all of this up. In your directive/controller where
 * you want your property to live, do something like:
 *
 * ```
 * stats = { _numSelected: 0 };
 * scope.registerForNumSelected = NotifyProperties.registrationFn(stats, 'numSelected', '_numSelected');
 * ```
 *
 * This is saying "We have a property `_numSelected` in `stats`, and we want it exposted as `numSelected`
 * in `stats`. Whenever `stats.numSelected` is modified, other directives/controllers should be notified"
 *
 * Anyone that wants to register for notifications can call `registerForNumSelected(notificationFunction)`. Then,
 * whenever `numSelected` changes, it will call `notificationFunction(newValue, oldValue)`
 *
 * This means that if you do `stats.numSelected = 20`, everyone that registered for notifications will
 * get their notification function called.
 */
.factory('NotifyProperties', function ($timeout) {
    var NotifyProperties = {};

    NotifyProperties.registrationFn = function (dst, name, sourceName) {
        var listeners = [];
        var notify = function (newVal, oldVal) {
            _.each(listeners, function (fn) {
                $timeout(function () { fn(newVal, oldVal); });
                fn(newVal, oldVal);
            });
        };

        Object.defineProperty(dst, name, {
            get: function () { return dst[sourceName]; },
            set: function (newVal) {
                var oldVal = dst[sourceName];
                dst[sourceName] = newVal;
                notify(newVal, oldVal);
            }
        });
        return function register (fn) {
            listeners.push(fn);
        };

    };

    return NotifyProperties;
});
