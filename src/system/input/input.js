/**
 * @file 控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var FACE_THEME = require('definition/face-theme');

    module.exports = $$.createClass('Control', {
        base: require('module'),

        inputWrap: null,
        inputNode: null,

        mixin: [
            require('./handlers/active')
        ],

        init: function () {
            this.__initInput();
            this.__initEvent();
            this.__initMessage();
        },

        __initInput: function () {
            this.inputWrap = document.createElement('div');
            this.inputWrap.className = 'btb-input-wrap';

            this.inputWrap.style.borderColor = 'red' || FACE_THEME.color;

            this.inputWrap.innerHTML = '<div contenteditable="true" class="btb-input"></div>';
            this.inputNode = $('.btb-input', this.inputWrap)[0];

            this.getTopContainer().appendChild(this.inputWrap);

            this.inputNode.focus();
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
                'control.active': this.active
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
            this.inputNode.focus();
        },

        active: function (row, col) {
            var mergecells = this.queryCommandValue('mergecell', {
                row: row,
                col: col
            }, {
                row: row,
                col: col
            });

            if ($$.isNdef(mergecells)) {
                this.__activeNormalCell(row, col);
                return;
            }

            var keys = Object.keys(mergecells);
            this.__activeMergeCell(mergecells[keys[0]]);
        }
    });
});