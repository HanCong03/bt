/**
 * @file 输入控制组件
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var FACE_THEME = require('definition/face-theme');
    var InputWrapper = require('common/input-wrapper');

    module.exports = $$.createClass('Control', {
        base: require('module'),

        inputOuterBox: null,
        inputNode: null,
        inputWrapper: null,

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
            this.__initService();
            this.__initMessage();
            this.__initShadowBox();
            this.__reset();
        },

        __initInput: function () {
            this.inputOuterBox = document.createElement('div');
            this.inputOuterBox.className = 'btb-input-wrap';

            this.inputOuterBox.style.borderColor = FACE_THEME.color;

            this.inputOuterBox.innerHTML = '<div contenteditable="true" spellcheck="false" class="btb-input"></div>';
            this.inputNode = $('.btb-input', this.inputOuterBox)[0];

            this.inputWrapper = new InputWrapper(this.inputNode);

            this.getTopContainer().appendChild(this.inputOuterBox);

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
                'control.blur': this.blur,
                'control.input.mouse.active': this.mouseActive,
                'control.input.input.active': this.inputActive,

                'controle.input': this.__input,

                'control.input.inactive': this.__reset,

                'control.newline': this.__newLine
            });
        },

        __initService: function () {
            this.registerService({
                'write.content': this.__write,
                'active.input': this.mouseActive,
                'sync.outer.content': this.__syncOuterContent
            });
        },

        __refresh: function () {
            var visualData = this.rs('get.visual.data');
            this.inputOuterBox.style.transform = 'translate(' + visualData.headWidth + 'px, ' + visualData.headHeight + 'px)';

            this.visualData = visualData;
        },

        __ready: function () {
            // 将input的控制权交给感兴趣的模块
            this.postMessage('depute.input.control', this.inputNode);
        },

        focus: function () {
            //if (this.__focusStatus) {
            //    return;
            //}

            this.__focus();
        },

        blur: function () {
            //this.__focusStatus = false;
        },

        __focus: function () {
            this.__focusStatus = true;

            this.inputWrapper.focus();
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