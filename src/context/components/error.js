/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var ERROR_MESSAGE = require('error-msg');

    module.exports = $$.createClass('ErrorManager', {
        __$ctx: null,
        __listeners: null,

        constructor: function (ctx) {
            this.__$ctx = ctx;
            this.__listeners = [];
        },

        listen: function (cb) {
            this.__listeners.push(cb);
        },

        emit: function (key) {
            var listeners = this.__listeners;

            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i](key, ERROR_MESSAGE[key] || '');
            }
        }
    });
});