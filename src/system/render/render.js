/**
 * @file 渲染模块
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var Screen = require('../screen/screen');

    module.exports = $$.createClass('Render', {
        base: require('module'),

        mixin: [
            require('./components/layout'),
            require('./components/gridline'),
            require('./components/header'),
            require('./components/fill'),
            require('./components/border/border'),
            require('./components/content/content'),
            require('./components/box'),
            require('./components/pane')
        ],

        visualData: null,
        layoutData: null,

        visibleScreen: null,
        invisibleScreen: null,

        __pauseStatus: false,

        init: function () {
            this.__initScreen();
            this.__initEvent();
            this.__initService();
        },

        __initEvent: function () {
            this.on({
                'refresh': this.refresh
            });
        },

        __initService: function () {
            this.registerService({
                'render.pause': this.__pause,
                'render.recovery': this.__recovery
            })
        },

        __initScreen: function () {
            var size = this.getContentContainerSize();
            this.gridlineScreen = new Screen('btb-gl-screen', this.getMiddleContainer(), size.width, size.height);
            this.contentScreen = new Screen('btb-cnt-screen', this.getMiddleContainer(), size.width, size.height);
            this.borderScreen = new Screen('btb-border-screen', this.getMiddleContainer(), size.width, size.height);
            this.paneScreen = new Screen('btb-pane-screen', this.getTopContainer(), size.width, size.height);
        },

        __pause: function () {
            this.__pauseStatus = true;
        },

        __recovery: function () {
            this.__pauseStatus = false;
        },

        refresh: function () {
            if (this.__pauseStatus) {
                return;
            }

            this.__refreshData();
            this.__render();
            this.__toggleScreen();
        },

        __refreshData: function () {
            this.visualData = this.rs('get.visual.data');
            this.layoutData = this.__getLayout();
        },

        __render: function () {
            this.__drawGridLine();
            this.__drawHeader();
            this.__fill();
            this.__drawBorder();
            this.__drawContent();
            this.__drawBox();
            this.__drawPaneLine();
        },

        __toggleScreen: function () {
            this.gridlineScreen.toggle();
            this.contentScreen.toggle();
            this.borderScreen.toggle();
            this.paneScreen.toggle();
        }
    });
});