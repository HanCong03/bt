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
                'workbookreday': this.__onworkbookready,
                'sheetschange': this.__onsheetschange,
                'rangechange': this.__onrangechange,
                'loaded': this.__onloaded,
                'beforedataready': this.__onbeforedataready,
                'dataready': this.__ondataready,
                'standardchange': this.__onstandardchange,
                'namedefinechange': this.__onnamedefinechange,
                'formularemoved': this.__onformularemoved,
                'formulaadded': this.__onformulaadded
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

        __onsheetschange: function () {
            this.__$ctx.emitAll('sheetschange');
        },

        __onrangechange: function () {
            this.__$ctx.emitAll('rangechange');
        },

        __onloaded: function () {
            this.__$ctx.emitAll('loaded');
        },

        __onbeforedataready: function () {
            this.__$ctx.emitAll('beforedataready');
        },

        __ondataready: function () {
            this.__$ctx.emitAll('dataready');
        },

        __onstandardchange: function () {
            this.__$ctx.emitAll('standardchange');
        },

        __onnamedefinechange: function () {
            this.__$ctx.emitAll('namedefinechange');
        },

        __onformularemoved: function (row, col) {
            this.__$ctx.emitAll('formularemoved', row, col);
        },

        __onformulaadded: function (row, col) {
            this.__$ctx.emitAll('formulaadded', row, col);
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