/**
 * @file 控制模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var Mask = require('./mask/mask');

    module.exports = $$.createClass('Control', {
        base: require('module'),

        init: function () {
            this.__initMessage();
            this.__initMask();
        },

        __initMessage: function () {
            this.onMessage({
                'depute.input.control': this.addInput
            });
        },

        __initMask: function () {
            this.mask = this.createComponent(Mask);
            this.mask.appendTo(this.getTopContainer());
        },

        addInput: function (inputNode) {
            this.mask.addInput(inputNode);
        }
    });
});