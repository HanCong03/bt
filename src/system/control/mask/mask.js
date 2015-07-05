/**
 * @file 渲染画布对象
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;

    module.exports = $$.createClass('Mask', {
        base: require('component'),

        maskNode: null,
        hHeader: null,
        vHeader: null,
        headers: null,
        hSpace: null,
        vSpace: null,
        hBtns: null,
        vBtns: null,

        __headerShow: true,
        __hRefreshed: false,
        __vRefreshed: false,

        // 监听器
        listener: function () {},

        init: function () {
            this.maskNode = this.__createMaskNode();
            this.hHeader = $('.btb-h-header', this.maskNode)[0];
            this.vHeader = $('.btb-v-header', this.maskNode)[0];
            this.headers = $('.btb-headers', this.maskNode)[0];
            this.hSpace = $('.btb-h-header-space', this.maskNode)[0];
            this.vSpace = $('.btb-v-header-space', this.maskNode)[0];
            this.hBtns = $('.btb-h-header-btns', this.maskNode)[0];
            this.vBtns = $('.btb-v-header-btns', this.maskNode)[0];

            this.__initDomEvent();
            this.__initEvent();
        },

        __initEvent: function () {
            this.on({
                'refresh': this.__refresh
            });
        },

        __initDomEvent: function () {
            var _self = this;

            $(this.maskNode).on('mousedown dblclick mousemove mouseup mouseleave mouseenter mousewheel DOMMouseScroll', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                if (evt.type === 'mousedown') {
                    _self.__hideHeader();
                }

                if (evt.type === 'mouseup') {
                    _self.__showHeader();
                } else if (evt.type === 'DOMMouseScroll') {
                    _self.listener('mosuewheel', evt);
                    return;
                }

                _self.listener(evt.type, evt);
            });

            $(this.hHeader).on('mouseenter', function (evt) {
                _self.__refreshHBtns();
            });

            $([this.hSpace, this.vSpace]).on('mousemove', function (evt) {
                _self.listener('headerover', evt);
            }).on('mouseout', function (evt) {
                _self.listener('headerout', evt);
            });

            $(this.hHeader).on('mousedown', '.btb-h-header-btn', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                _self.__hideHeader();
                _self.listener('hheaderbtn', evt);
            });

            $(this.vHeader).on('mouseenter', function () {
                _self.__refreshVBtns();
            });

            $(this.vHeader).on('mousedown', '.btb-v-header-btn', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                _self.__hideHeader();
                _self.listener('vheaderbtn', evt);
            });
        },

        appendTo: function (container) {
            this.container = container;
            container.appendChild(this.maskNode);
        },

        addInput: function (inputNode) {
            var _self = this;

            this.inputNode = inputNode;

            $(this.inputNode).on('keydown input', function (evt) {
                evt.stopPropagation();

                _self.listener(evt.type, evt);
            });
        },

        setListener: function (listener) {
            this.listener = listener;
        },

        __refresh: function () {
            this.__hRefreshed = true;
            this.__vRefreshed = true;

            this.__showHeader();

            var visualData = this.rs('get.visual.data');
            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            this.hHeader.style.height = headHeight + 'px';
            this.hHeader.style.left = headWidth + 'px';

            this.vHeader.style.width = headWidth + 'px';
            this.vHeader.style.top = headHeight + 'px';
        },

        __refreshHBtns: function () {
            if (!this.__hRefreshed) {
                return;
            }

            var visualData = this.rs('get.visual.data');
            var colPoints = visualData.colPoints;
            var btns = [];

            for (var i = 1, len = colPoints.length; i < len; i++) {
                btns.push('<div class="btb-h-header-btn" style="left: ' + (colPoints[i] - OFFSET) + 'px;"></div>')
            }

            this.hBtns.innerHTML = btns.join('');
        },

        __refreshVBtns: function () {
            if (!this.__vRefreshed) {
                return;
            }

            var visualData = this.rs('get.visual.data');
            var rowPoints = visualData.rowPoints;
            var btns = [];

            for (var i = 1, len = rowPoints.length; i < len; i++) {
                btns.push('<div class="btb-v-header-btn" style="top: ' + (rowPoints[i] - OFFSET) + 'px;"></div>')
            }

            this.vBtns.innerHTML = btns.join('');
        },

        __hideHeader: function () {
            if (!this.__headerShow) {
                return;
            }

            this.__headerShow = false;
            this.headers.style.display = 'none';
        },

        __showHeader: function () {
            if (this.__headerShow) {
                return;
            }

            this.__headerShow = true;
            this.headers.style.display = 'block';
        },

        __createMaskNode: function () {
            var node = document.createElement('div');
            node.className = 'btb-mask';

            node.innerHTML = '<div class="btb-headers">' +
                                '<div class="btb-h-header">' +
                                    '<div class="btb-h-header-space"></div>' +
                                    '<div class="btb-h-header-btns"></div>' +
                                '</div>' +
                                '<div class="btb-v-header">' +
                                    '<div class="btb-v-header-space"></div>' +
                                    '<div class="btb-v-header-btns"></div>' +
                                '</div>' +
                            '</div>';

            return node;
        }
    });
});