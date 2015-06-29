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
            this.__initEvent();
        },

        __initEvent: function () {
            this.on({
                'ready': this.__init
            });
        },

        __init: function () {
            this.mask = this.createComponent(Mask);
            this.mask.appendTo(this.getTopContainer());
        }
    });
});