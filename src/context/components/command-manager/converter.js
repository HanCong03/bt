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
            if (!command.args_processor) {
                return args;
            }

            return command.args_processor.call(command.provider, args);
        }
    });
});