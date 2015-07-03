/**
 * @file 滚动条
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Scrollbar', {
        base: require('module'),

        visualData: null,

        mixin: [
            require('./resource'),
            require('./collector'),
            require('./update')
        ],

        init: function () {
            this.__initBar();
            this.__initEvent();
        },

        __initEvent: function () {
            this.on({
                'refresh': this.__refresh
            });
        },

        __refresh: function () {
            this.visualData = this.rs('get.visual.data');

            this.__update(this.__collectInfo());
        }
    });
});