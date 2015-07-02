/**
 * @file 选区控制器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var STATUS = require('./definition/status');
    var ControlUtils = require('system/control/utils');

    module.exports = $$.createClass('SelectionController', {
        base: require('component'),

        container: null,
        status: null,

        mixin: [
            require('./handlers/key'),
            require('./handlers/key-enter'),
            require('./handlers/shift-move'),
            require('./handlers/mouse')
        ],

        init: function () {
            this.container = this.getMainContainer();
            this.__reset();

            this.__initEvent();
        },

        // 模式切换时的收尾工作。
        exit: function () {
            this.__abort();
        },

        // 请求选区变化，新的选区将更改为给定的单元格
        // 如果给定的单元格是一个合并单元格，则选区的变更将包含该合并单元格的所有部分。
        // 注：该接口提供给主控模块，以满足在用户通过输入内容激活write模块时使用。
        change: function (row, col) {
            this.postMessage('control.compolete.cell.selection', {
                row: row,
                col: col
            }, {
                row: row,
                col: col
            });
        },

        __initEvent: function () {
            this.on({
               'refresh': this.__refresh
            });
        },

        __reset: function () {
            this.status = STATUS.NORMAL;
        },

        __refresh: function () {
            this.visualData = this.rs('get.visual.data');
        },

        __abort: function () {
            this.__abortMouse();
            this.__abortKey();
            this.__reset();
        },

        __getIndex: function (evt) {
            var visualData = this.visualData;
            var index = ControlUtils.calculateCellIndex(this.container, visualData, evt.clientX, evt.clientY);

            var row = index.r;
            var col = index.c;

            if (index.r >= 0) {
                row = visualData.rows[index.r];
            }

            if (index.c >= 0) {
                col = visualData.cols[index.c];
            }

            return {
                row: row,
                col: col
            };
        }
    });
});