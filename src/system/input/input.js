/**
 * @file 控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var FACE_THEME = require('definition/face-theme');
    var STATUS = require('./definition/status');

    module.exports = $$.createClass('Control', {
        base: require('module'),

        inputWrap: null,
        inputNode: null,

        __focusStatus: false,

        // 当前的激活状态: normal -> 未激活；active -> 激活
        status: null,

        mixin: [
            require('./handlers/active'),
            require('./handlers/input'),
            require('./handlers/shadow'),
            require('./handlers/content'),
            require('./handlers/left-rect')
        ],

        init: function () {
            this.__initInput();
            this.__initEvent();
            this.__initMessage();
            this.__initShadowBox();
            this.__reset();
        },

        __initInput: function () {
            this.inputWrap = document.createElement('div');
            this.inputWrap.className = 'btb-input-wrap';

            this.inputWrap.style.borderColor = FACE_THEME.color;

            this.inputWrap.innerHTML = '<div contenteditable="true" spellcheck="false" class="btb-input"></div>';
            this.inputNode = $('.btb-input', this.inputWrap)[0];

            this.getTopContainer().appendChild(this.inputWrap);

            this.inputNode.focus();
        },

        __reset: function () {
            this.__resetActive();
            this.__resetUserContent();
            this.__focus();
        },

        __initEvent: function () {
            this.on({
                'ready': this.__ready,
                'refresh': this.__refresh
            });
        },

        __initMessage: function () {
            this.onMessage({
                'control': this.focus,
                'control.focus': this.focus,
                //'control.blur': this.blur,
                'control.input.mouse.active': this.mouseActive,
                'control.input.input.active': this.inputActive,

                'controle.input': this.__input,
                'control.write': this.__write,

                'control.input.inactive': this.__reset,

                'control.newline': this.__newLine
            });
        },

        __refresh: function () {
            var visualData = this.rs('get.visual.data');
            this.inputWrap.style.transform = 'translate(' + visualData.headWidth + 'px, ' + visualData.headHeight + 'px)';

            this.visualData = visualData;
        },

        __ready: function () {
            // 将input的控制权交给感兴趣的模块
            this.postMessage('depute.input.control', this.inputNode);
        },

        focus: function () {
            if (this.__focusStatus) {
                return;
            }

            this.__focus();
        },

        __focus: function () {
            this.__focusStatus = true;

            var docSelection = window.getSelection();
            var range = document.createRange();

            range.selectNode(this.inputNode.firstChild.firstChild);
            range.collapse(true);

            docSelection.removeAllRanges();
            docSelection.addRange(range);
        },

        /**
         * 鼠标（双击）激活
         * @param row
         * @param col
         */
        mouseActive: function (row, col) {
            var mergeInfo = this.queryCommandValue('mergecell', row, col);

            if ($$.isNdef(mergeInfo)) {
                this.__activeNormalCell(row, col);
            } else {
                this.__activeMergeCell(mergeInfo);
            }

            this.__syncContent();
        },

        /**
         * 输入（内容）激活
         * 注：激活过程大致与mouseActive()一致，区别在于该激活方式不同步内容。
         * @param row
         * @param col
         */
        inputActive: function (row, col) {
            var mergeInfo = this.queryCommandValue('mergecell', row, col);

            if ($$.isNdef(mergeInfo)) {
                this.__activeNormalCell(row, col);
            } else {
                this.__activeMergeCell(mergeInfo);
            }
        }
    });
});