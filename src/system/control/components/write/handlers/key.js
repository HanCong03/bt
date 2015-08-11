/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var STATUS = require('../definition/status');
    var KEY_CODE = require('system/definition/key-code');

    module.exports = {
        __onkeydown: function (evt) {
            if (this.status === STATUS.NORMAL) {
                return;
            }

            switch (evt.keyCode) {
                case KEY_CODE.LEFT:
                    this.__keyLeft(evt);
                    break;

                case KEY_CODE.UP:
                    this.__keyUp(evt);
                    break;

                case KEY_CODE.RIGHT:
                    this.__keyRight(evt);
                    break;

                case KEY_CODE.DOWN:
                    this.__keyDown(evt);
                    break;

                case KEY_CODE.ENTER:
                    this.__keyEnter(evt);
                    break;

                case KEY_CODE.ESC:
                    this.__keyEsc(evt);
                    break;

                case KEY_CODE.TAB:
                    this.__keyTab(evt);
                    break;
            }
        },

        __keyLeft: function (evt) {
            // 输入状态
            if (this.status === STATUS.INPUT) {
                evt.preventDefault();

                // 执行同步
                if (!this.__sync(evt.ctrlKey && evt.shiftKey)) {
                    return;
                }

                // 主动释放控制，返回控制权到主控模块。
                this.postMessage('control.free');

                // 执行左移
                this.execCommand('move', 0, -1);
            }

            // EDIT状态下交由系统处理
        },

        __keyUp: function (evt) {
            // 输入状态
            if (this.status === STATUS.INPUT) {
                evt.preventDefault();

                // 执行同步
                if (!this.__sync(evt.ctrlKey && evt.shiftKey)) {
                    return;
                }

                // 主动释放控制，返回控制权到主控模块。
                this.postMessage('control.free');

                // 执行上移
                this.execCommand('move', -1, 0);
            }

            // EDIT状态下交由系统处理
        },

        __keyRight: function (evt) {
            // 输入状态
            if (this.status === STATUS.INPUT) {
                evt.preventDefault();

                // 执行同步
                if (!this.__sync(evt.ctrlKey && evt.shiftKey)) {
                    return;
                }

                // 主动释放控制，返回控制权到主控模块。
                this.postMessage('control.free');

                // 执行右移
                this.execCommand('move', 0, 1);
            }

            // EDIT状态下交由系统处理
        },

        __keyDown: function (evt) {
            // 输入状态
            if (this.status === STATUS.INPUT) {
                evt.preventDefault();

                // 执行同步
                if (!this.__sync(evt.ctrlKey && evt.shiftKey)) {
                    return;
                }

                // 主动释放控制，返回控制权到主控模块。
                this.postMessage('control.free');

                // 执行下移
                this.execCommand('move', 1, 0);
            }

            // EDIT状态下交由系统处理
        },

        __keyEnter: function (evt) {
            evt.preventDefault();

            // 换行
            if (evt.altKey) {
                this.postMessage('control.newline');
                return;
            }

            evt.preventDefault();

            // 同步失败
            if (!this.__sync(evt.ctrlKey && evt.shiftKey)) {
                return;
            }

            // 主动释放控制，返回控制权到主控模块。
            this.postMessage('control.free');

            // 请求其他组件处理选区
            this.rs('control.process.enter.key', evt);
        },

        __keyEsc: function (evt) {
            evt.preventDefault();
            // 更改同步状态，防止退出时，写入脏内容
            this.syncStatus = true;
            // 主动释放控制，返回控制权到主控模块。
            this.postMessage('control.free');
        },

        __keyTab: function (evt) {
            evt.preventDefault();

            // 同步失败
            if (!this.__sync(evt.ctrlKey && evt.shiftKey)) {
                return;
            }

            // 主动释放控制，返回控制权到主控模块。
            this.postMessage('control.free');

            // 请求其他组件处理选区
            this.rs('control.process.tab.key', evt);
        }
    };
});