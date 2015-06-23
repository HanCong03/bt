/**
 * @file 渲染模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var Screen = require('./screen');

    module.exports = $$.createClass('Screen', {
        base: require('module'),

        mixin: [
            require('./components/gridline'),
            require('./components/header')
        ],

        visibleScreen: null,
        invisibleScreen: null,

        init: function () {
            this.__initEvent();
        },

        __initEvent: function () {
            this.on({
                'ready': this.__init,
                'refresh': this.refresh
            });
        },

        __init: function () {
            var size = this.getContainerSize();
            this.gridlineScreen = new Screen(this.getMiddleContainer(), size.width, size.height);
        },

        refresh: function () {
            this.__render();
            this.__toggleScreen();
        },

        __render: function () {
            this.__refreshVisualData();
            this.__drawGridLine();
            this.__drawHeader();
        },

        __refreshVisualData: function () {
            this.visualData = this.rs('get.visual.data');
        },

        __toggleScreen: function () {
            this.gridlineScreen.toggle();
        }
    });
});