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

        // 当前的内容同步状态，如果为false，表示当前的内容还未同步，否则，表示当前内容已经同步。
        // 初始状态为未同步
        syncStatus: false,

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
            // 内容未同步时，发送同步消息
            if (!this.syncStatus) {
                this.postMessage('control.write');
            }

            this.__reset();
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
            this.syncStatus = false;
        },

        __sync: function () {
            // 更改同步状态
            this.syncStatus = true;
            // 推送写入消息
            this.postMessage('control.write');
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