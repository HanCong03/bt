/**
 * @file 选区控制器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var STATUS = require('./definition/status');
    var ControlUtils = require('system/control/utils');

    // 操作间隔阈值
    var THRESHOLD = 17;

    module.exports = $$.createClass('SelectionController', {
        base: require('component'),

        container: null,
        status: null,

        // 最仅一次移动记录，用于限制操作频度
        __lastRecord: {},

        mixin: [
            require('./handlers/key'),
            require('./handlers/key-enter'),
            require('./handlers/shift-move'),
            require('./handlers/mouse/mouse'),
            require('./handlers/contextmenu'),
            require('./handlers/hover')
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

        __checkRecord: function(type, time) {
            var record = this.__lastRecord;

            if (record.type === type && time - record.time < THRESHOLD) {
                return false;
            }

            record.type = type;
            record.time = time;

            return true;
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
                r: index.r,
                c: index.c,
                row: row,
                col: col
            };
        }
    });
});