define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Rect', {
        base: require('module'),

        mixin: [
            require('./visible'),
            require('./real')
        ],

        visualData: null,

        init: function () {
            this.__initEvent();
            this.__initService();
        },

        __initEvent: function () {
            this.on({
                'refresh': this.__refresh
            });
        },

        __initService: function () {
            this.registerService({
                'get.visible.rect': this.getVisibleRect,
                'get.visible.layout': this.getVisibleRectLayout,
                'get.real.rect': this.getRealRect
            });
        },

        __refresh: function () {
            this.visualData = this.rs('get.visual.data');
        }
    });
});