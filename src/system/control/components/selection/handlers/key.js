/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var STATUS = require('../definition/status');
    var KEY_CODE = require('system/definition/key-code');

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

                case KEY_CODE.DOWN:
                    this.__keyDown(evt);
                    break;

                case KEY_CODE.ENTER:
                    this.__keyEnter(evt);
            }
        },

        __keyLeft: function (evt) {
            evt.preventDefault();

            if (evt.shiftKey) {
                this.__shiftLeft(evt);
            } else {
                // move
                this.execCommand('move', 0, -1);
            }
        },

        __keyTop: function (evt) {
            evt.preventDefault();

            if (evt.shiftKey) {
                this.__shiftTop(evt);
            } else {
                // move
                this.execCommand('move', -1, 0);
            }
        },

        __keyRight: function (evt) {
            evt.preventDefault();

            if (evt.shiftKey) {
                this.__shiftRight(evt);
            } else {
                // move
                this.execCommand('move', 0, 1);
            }
        },

        __keyDown: function (evt) {
            evt.preventDefault();

            if (evt.shiftKey) {
                this.__shiftDown(evt);
            } else {
                // move
                this.execCommand('move', 1, 0);
            }
        },

        __abortKey: function () {}
    };
});