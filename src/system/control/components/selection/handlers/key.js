/**
 * @file
 * @author hancong03@baiud.com
 */
/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var STATUS = require('../definition/status');

    var KEY_CODE = {
        LEFT: 37,
        TOP: 38,
        RIGHT: 39,
        BOTTOM: 40
    };

    module.exports = {
        timer: null,

        __onkeydown: function (evt) {
            if (this.status !== STATUS.NORMAL) {
                // 终止所有操作
                this.__abort();
            }

            switch (evt.keyCode) {
                case KEY_CODE.LEFT:
                    this.__keyLeft(evt);
                    break;

                case KEY_CODE.TOP:
                    this.__keyTop(evt);
                    break;

                case KEY_CODE.RIGHT:
                    this.__keyRight(evt);
                    break;

                case KEY_CODE.BOTTOM:
                    this.__keyBottom(evt);
                    break;
            }
        },

        __keyLeft: function (evt) {
            if (evt.shiftKey) {

            } else {
                // move
                this.execCommand('move', 0, -1);
            }
        },

        __keyTop: function (evt) {
            if (evt.shiftKey) {

            } else {
                // move
                this.execCommand('move', -1, 0);
            }
        },

        __keyRight: function (evt) {
            if (evt.shiftKey) {

            } else {
                // move
                this.execCommand('move', 0, 1);
            }
        },

        __keyBottom: function (evt) {
            if (evt.shiftKey) {

            } else {
                // move
                this.execCommand('move', 1, 0);
            }
        },

        __abortKey: function () {}
    };
});