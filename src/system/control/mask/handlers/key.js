define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');

    var SystemUtils = require('system/utils/utils');

    var STATUS = require('../../definition/status');

    var KEY_CODE = {
        'LEFT': 37,
        'UP': 38,
        'RIGHT': 39,
        'DOWN': 40
    };

    module.exports = {
        __keydown: function (evt) {
            // 输入状态，则不处理
            if (this.status === STATUS.WRITE) {
                return;
            }

            this.status = STATUS.NORMAL;

            switch (evt.keyCode) {
                case KEY_CODE.LEFT:
                    this.__keyLeft(evt);
                    break;

                case KEY_CODE.RIGHT:
                    this.__keyRight(evt);
                    break;

                case KEY_CODE.DOWN:
                    this.__keyDown(evt);
                    break;

                case KEY_CODE.UP:
                    this.__keyUp(evt);
                    break;
            }



            //this.start = this.getIndex(evt.clientX, evt.clientY);
            //this.end = this.start;

            // control status change
            //this.emit('controlstatuschange', this.start, this.end);
        },

        __keyLeft: function (evt) {
            evt.preventDefault();

        },

        __keyRight: function (evt) {
            evt.preventDefault();

        },

        __keyUp: function (evt) {
            evt.preventDefault();
        },

        __keyDown: function (evt) {
            evt.preventDefault();
        }
    };
});