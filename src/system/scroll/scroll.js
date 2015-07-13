/**
 * @file 工作表滚动控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var TIME_STEP = 50;

    // 缓冲阈值
    var ROW_HRESHOLD = 100;
    var COLUMN_HRESHOLD = 100;

    var ROW_UNIT = 100;
    // 列滚动单位
    var COLUMN_UNIT = 100;

    module.exports = $$.createClass('Scroll', {
        base: require('module'),

        lastTime: 0,
        bufferX: 0,
        bufferY: 0,

        init: function () {
            this.__initMessage();
        },

        __initMessage: function () {
            this.onMessage({
                'control.scroll': this.__onScroll
            });
        },

        __onScroll: function (evt) {
            evt = evt.originalEvent;
            var timeStamp = evt.timeStamp;
            // 滚动数量
            var row = 0;
            var col = 0;

            if (timeStamp - this.lastTime > TIME_STEP) {
                this.bufferX = 0;
                this.bufferY = 0;
            }

            this.lastTime = timeStamp;

            this.bufferX += evt.wheelDeltaX;
            this.bufferY += evt.wheelDeltaY;

            var xDirection = this.bufferX > 0 ? 1 : -1;
            var yDirection = this.bufferY > 0 ? 1 : -1;

            var x = Math.abs(this.bufferX);
            var y = Math.abs(this.bufferY);

            if (x >= COLUMN_HRESHOLD) {
                col = -1 * xDirection * Math.round(x / COLUMN_UNIT);
                this.bufferX = 0;
            }

            if (y >= ROW_HRESHOLD) {
                row = -1 * yDirection * Math.round(y / ROW_UNIT);
                this.bufferY = 0;
            }

            if (row === 0 && col === 0) {
                return;
            }

            this.execCommand('scroll', row, col);
        }
    });
});