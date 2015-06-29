/**
 * @file 控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Control', {
        base: require('module'),

        inputWrap: null,
        inputNode: null,

        init: function () {
            this.__initInput();
            this.__initEvent();
        },

        __initInput: function () {
            this.inputWrap = document.createElement('div');
            this.inputWrap.className = 'btb-input-wrap';

            this.inputWrap.innerHTML = '<input type="text" class="btb-input">';
            this.inputNode = $('.btb-input', this.inputWrap)[0];

            this.getTopContainer().appendChild(this.inputWrap);

            this.inputNode.focus();
        },

        __initEvent: function () {
            this.on({
                'ready': this.__ready
            });
        },

        __ready: function () {
            // 将input的控制权交给感兴趣的模块
            this.postMessage('depute.input.control', this.inputNode);
        }

    });
});