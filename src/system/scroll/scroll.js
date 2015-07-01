/**
 * @file 控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var TIME_STEP = 50;

    // 步长
    var ROW_STEP = 20;
    var COLUMNE_STEP = 20;

    var ROW_UNIT = 100;
    // 列滚动单位
    var COLUMN_UNIT = 20;

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

            if (x >= COLUMNE_STEP) {
                col = -1 * xDirection * Math.ceil(x / COLUMN_UNIT);
                this.bufferX = 0;
            }

            if (y >= ROW_STEP) {
                row = -1 * yDirection * Math.ceil(y / ROW_UNIT);
                this.bufferY = 0;
            }

            if (row === 0 && col === 0) {
                return;
            }

            console.log(row, col)
            this.execCommand('scroll', 1, 0);
        }
    });
});