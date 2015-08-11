/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('CommandConverter', {
        __$ctx: null,

        constructor: function (ctx) {
            this.__$ctx = ctx;
        },

        getArguments: function (command, args) {
            return args;
        }
    });
});