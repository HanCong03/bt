/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var STATUS = require('../definition/status');
    var KEY_CODE = require('definition/key-code');

    module.exports = {
        __onkeydown: function (evt) {
            if (this.status === STATUS.NORMAL) {
                return;
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
            // 输入状态
            if (this.status === STATUS.INPUT) {
                evt.preventDefault();

                // 推送写入消息
                this.postMessage('control.write');

                // 主动释放控制，返回控制权到主控模块。
                this.postMessage('control.free');

                // 执行左移
                this.execCommand('move', 0, -1);
            }

            // EDIT状态下交由系统处理
        },

        __keyTop: function (evt) {
            evt.preventDefault();
        },

        __keyRight: function (evt) {
            evt.preventDefault();
        },

        __keyBottom: function (evt) {
            evt.preventDefault();
        }
    };
});