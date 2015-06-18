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

        execCommand: function () {
            return this.__$ctx.execCommand.apply(this.__$ctx, arguments);
        },

        queryCommandValue: function () {
            return this.__$ctx.queryCommandValue.apply(this.__$ctx, arguments);
        }
    });
});
