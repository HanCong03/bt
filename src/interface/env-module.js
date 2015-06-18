/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('EnvModule', {

        base: require('module'),

        execBasicCommand: function () {
            return this.__$ctx.execBasicCommand.apply(this.__$ctx, arguments);
        },

        queryBasicCommandValue: function () {
            return this.__$ctx.queryBasicCommandValue.apply(this.__$ctx, arguments);
        }
    });
});