/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var Workbook = require('../kernel/src/workbook-facade');

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

        getActiveHeap: function (module) {
            return this.__$workbook.getActiveHeap(module.__$mid);
        },

        execCommand: function () {
            return this.__$workbook.execCommand.apply(this.__$workbook, arguments);
        },

        queryCommandValue: function () {
            return this.__$workbook.queryCommandValue.apply(this.__$workbook, arguments);
        }
    });
});