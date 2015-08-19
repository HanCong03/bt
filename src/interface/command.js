/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Command', {
        __$ctx: null,

        constructor: function (ctx) {
            this.__$ctx = ctx;
        },

        getActiveRange: function () {
            return this.__$ctx.getAPI().getActiveRange();
        },

        queryCommandValue: function () {
            return this.__$ctx.queryCommandValue.apply(this.__$ctx, arguments);
        }
    });
});