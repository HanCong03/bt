/**
 * @file 外部输入控制器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var KEY_CODE = require('system/definition/key-code');
    var InputWrapper = require('common/input-wrapper');

    module.exports = $$.createClass('OuterInput', {
        base: require('module'),

        inputNode: null,
        __ignore: false,
        __activeStatus: false,

        bind: function (node) {
            this.inputNode = node;
            this.inputWrapper = new InputWrapper(node);

            this.__initEvent();
            this.__initDOMEvent();
            this.__initMessage();
        },

        __initEvent: function () {
            this.on({
                'refresh': this.__refresh
            });
        },

        __initDOMEvent: function () {
            var _self = this;
            var inputNode = this.inputNode;

            $(inputNode).on('focus', function () {
                // 如果当前不是选区模式下，则不进行后续操作
                if (!_self.rs('control.is.selection.mode')) {
                    return;
                }

                _self.__activeStatus = true;
                _self.__focus();
                _self.__resetEeditContent();

                var range = _self.queryCommandValue('range');

                _self.postMessage('outer.start', range.entry.row, range.entry.col);

            }).on('input', function () {
                _self.rs('sync.outer.content', inputNode.innerHTML);
            }).on('keydown', function (evt) {

                switch (evt.keyCode) {
                    case KEY_CODE.ENTER:
                        _self.__keyEnter(evt);
                        break;

                    case KEY_CODE.ESC:
                        _self.__keyEsc(evt);
                        break;

                    case KEY_CODE.TAB:
                        _self.__keyTab(evt);
                        break;
                }
            });
        },

        __initMessage: function () {
            this.onMessage({
                'control.input.inactive': this.__reset
            });
        },

        __reset: function () {
            this.__ignore = false;
            this.__activeStatus = false;
        },

        __resetContent: function () {
            if (this.__activeStatus) {
                return;
            }

            var range = this.queryCommandValue('range');
            var formatInfo = this.rs('get.formatted.info', range.entry.row, range.entry.col);

            if (!formatInfo) {
                this.inputWrapper.reset();
            } else {
                this.inputWrapper.setContent(formatInfo.showText);
            }
        },

        __resetEeditContent: function () {
            var range = this.queryCommandValue('range');
            var formatInfo = this.rs('get.formatted.info', range.entry.row, range.entry.col);

            if (!formatInfo) {
                this.inputWrapper.reset();
            } else {
                this.inputWrapper.setContent(formatInfo.standard);
            }
        },

        __refresh: function () {
            if (this.__ignore) {
                this.__ignore = false;
                return;
            }

            if (this.inputNode) {
                this.__resetContent();
            }
        },

        __focus: function () {
            this.inputWrapper.focus();
        },

        __keyEnter: function (evt) {
            evt.preventDefault();

            // 换行
            if (evt.altKey) {
                this.inputWrapper.newLine();
                this.rs('sync.outer.content', this.inputWrapper.getHTML());
                return;
            }

            this.__ignore = true;

            // 同步失败
            if (!this.rs('write.content', evt.ctrlKey && evt.shiftKey)) {
                return;
            }

            this.__activeStatus = false;
            this.postMessage('outer.exit');
            // 请求其他组件处理选区
            this.rs('control.process.enter.key', evt);
            this.__resetContent();
        },

        __keyEsc: function (evt) {
            evt.preventDefault();
            this.postMessage('outer.exit');
            this.__activeStatus = false;
            this.__resetContent();
        },

        __keyTab: function (evt) {
            evt.preventDefault();

            this.__ignore = true;

            // 同步失败
            if (!this.rs('write.content', evt.ctrlKey && evt.shiftKey)) {
                return;
            }

            this.__activeStatus = false;
            this.postMessage('outer.exit');
            this.rs('control.process.tab.key', evt);
            this.__resetContent();
        },

        __newLine: function () {
            var docSelection = window.getSelection();
            var range = docSelection.getRangeAt(0);
            var placeholder = document.createTextNode('\uFEFF');

            range = range.cloneRange();

            range.deleteContents();
            range.insertNode(placeholder);
            range.insertNode(document.createElement('br'));
            range.selectNode(placeholder);
            range.collapse(false);

            docSelection.removeAllRanges();
            docSelection.addRange(range);
        }
    });
});