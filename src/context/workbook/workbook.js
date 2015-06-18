/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var Workbook = require('../../kernel/src/workbook-facade');
    var COMMANDS_MAP = require('./map');

    module.exports = require('utils').createClass('Workbook', {
        __$ctx: null,
        __$workbook: null,

        constructor: function (ctx) {
            this.__$ctx = ctx;
            this.__$workbook = new Workbook();

            this.__captureWorkbookEvent();
        },

        __captureWorkbookEvent: function () {
            this.__$workbook.on(this, {
                '*': this.__eventHandler
            });
        },

        __eventHandler: function () {
            console.log(arguments)
        },

        startup: function () {
            var commandManager = this.__$ctx.getManager('commandManager');
            commandManager.addBasicCommand(this, COMMANDS_MAP);
        },

        getAPI: function () {
            return this.__$workbook.getAPI();
        },

        getActiveHeap: function (module) {
            return this.__$workbook.getActiveHeap(module.__$mid);
        }
    });
});