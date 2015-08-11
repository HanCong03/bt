/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var Workbook = require('../../kernel/src/workbook-facade');

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
                'stylechange': this.__onstylechange,
                'contentchange': this.__oncontentchange,
                'rowheightchange': this.__onrowheightchange,
                'columnwidthchange': this.__oncolumnwidthchange,
                'sheetswitch': this.__onsheetswitch,
                'workbookreday': this.__onworkbookready
            });
        },

        // 通知内核进入ready阶段
        ready: function () {
            this.__$workbook.ready();
        },

        __onstylechange: function (start, end) {
            this.__$ctx.emitAll('stylechange', start, end);
        },

        __oncontentchange: function (start, end) {
            this.__$ctx.emitAll('contentchange', start, end);
        },

        __onrowheightchange: function (startIndex, endIndex) {
            this.__$ctx.emitAll('rowheightchange', startIndex, endIndex);
        },

        __oncolumnwidthchange: function (startIndex, endIndex) {
            this.__$ctx.emitAll('columnwidthchange', startIndex, endIndex);
        },

        __onsheetswitch: function () {
            this.__$ctx.emitAll('sheetswitch');
        },

        getAPI: function () {
            return this.__$workbook.getAPI();
        },

        getActiveHeap: function (module) {
            return this.__$workbook.getActiveHeap(module.__$mid);
        },

        getWorkbookHeap: function (module) {
            return this.__$workbook.getWorkbookHeap(module.__$mid);
        }
    });
});