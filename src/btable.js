/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var Context = require('./context/context');

    module.exports = require('utils').createClass('Btable', {
        __$ctx: null,

        constructor: function (node) {
            this.__$ctx = new Context(node);
        },

        onError: function (listener) {
            var _self = this;

            this.__$ctx.onError(function (key, msg) {
                listener.call(_self, key, msg);
            });
        },

        on: function (type, listener) {
            this.__$ctx.addOuterListener(this, type, listener);
        },

        execCommand: function (commandName) {
            var result;
            console.time(commandName)
            result = this.__$ctx.execCommand.apply(this.__$ctx, arguments);
            console.timeEnd(commandName);

            return result;
        },

        queryCommandValue: function () {
            return this.__$ctx.queryCommandValue.apply(this.__$ctx, arguments);
        }
    });
});
