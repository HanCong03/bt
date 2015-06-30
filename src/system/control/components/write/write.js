/**
 * @file 写入控制器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var STATUS = require('./definition/status');
    var ControlUtils = require('system/control/utils');

    module.exports = $$.createClass('WriteController', {
        base: require('component'),

        container: null,
        status: null,

        mixin: [
            require('./handlers/active'),
            require('./handlers/input'),
            require('./handlers/key')
        ],

        init: function () {
            this.container = this.getMainContainer();
            this.__reset();

            this.__initEvent();
        },

        // 模式切换时的收尾工作。
        exit: function () {
            // 发送退出消息
            this.postMessage('control.input.inactive');
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