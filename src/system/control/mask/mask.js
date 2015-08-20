/**
 * @file 渲染画布对象
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;

    var STATUS = {
        NORMAL: 1,
        HEADER: 2
    };

    module.exports = $$.createClass('Mask', {
        base: require('component'),

        maskNode: null,
        hHeader: null,
        vHeader: null,
        $headers: null,
        hSpace: null,
        vSpace: null,
        hBtns: null,
        vBtns: null,

        promptContainer: null,

        __ignore: false,

        __hRefreshed: false,
        __vRefreshed: false,

        // 监听器
        listener: function () {},

        init: function () {
            this.maskNode = this.__createMaskNode();
            this.hHeader = $('.btb-h-header', this.maskNode)[0];
            this.vHeader = $('.btb-v-header', this.maskNode)[0];
            this.$headers = $('.btb-headers', this.maskNode);
            this.hSpace = $('.btb-h-header-space', this.maskNode)[0];
            this.vSpace = $('.btb-v-header-space', this.maskNode)[0];
            this.hBtns = $('.btb-h-header-btns', this.maskNode)[0];
            this.vBtns = $('.btb-v-header-btns', this.maskNode)[0];

            this.promptContainer = $('.btb-prompt-contianer', this.maskNode)[0];

            this.__initDomEvent();
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
                'ignore.header.control': this.__ignoreHeader,
                'recover.header.control': this.__recoverHeader,

                'get.prompt.container': this.getPromptConcatiner
            })
        },

        __initDomEvent: function () {
            var _self = this;
            var lastMouseupX = 0;
            var lastMouseupY = 0;
            var lastMousedownX = 0;
            var lastMousedownY = 0;

            $(this.maskNode).on('mousedown contextmenu', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                if (evt.type === 'mousedown') {
                    lastMousedownX = evt.clientX;
                    lastMousedownY = evt.clientY;
                }

                if (evt.originalEvent.button !== 2) {
                    _self.listener('mousedown', evt);
                } else if (evt.type === 'contextmenu') {
                    _self.listener('contextmenu', evt);
                }
            })

            $(this.maskNode).on('dblclick mousemove mouseleave mouseenter mousewheel DOMMouseScroll', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                if (evt.type === 'DOMMouseScroll') {
                    _self.listener('mosuewheel', evt);
                    return;

                // 检测位置，防止误判dblclick
                } else if (evt.type === 'dblclick') {
                    if (Math.abs(lastMousedownX - lastMouseupX) > 10 || Math.abs(lastMousedownY - lastMouseupY) > 10) {
                        return;
                    }
                }

                _self.listener(evt.type, evt);
            }).on('mouseup', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                _self.listener('mouseup', evt);
                _self.status = STATUS.NORMAL;

                lastMouseupX = evt.clientX;
                lastMouseupY = evt.clientY;
            });

            $([this.hSpace, this.vSpace]).on('mousemove', function (evt) {
                if (_self.__ignore) {
                    return;
                }

                _self.listener('headerover', evt);
            }).on('mouseout', function (evt) {
                if (_self.__ignore) {
                    return;
                }

                _self.listener('headerout', evt);
            });

            $(this.hHeader).on('mousedown', '.btb-h-header-btn', function (evt) {
                if (_self.__ignore) {
                    return;
                }

                evt.stopPropagation();
                evt.preventDefault();

                _self.listener('hheaderbtn', evt);
                _self.__startGlobalListen();
            });

            $(this.vHeader).on('mousedown', '.btb-v-header-btn', function (evt) {
                if (_self.__ignore) {
                    return;
                }

                evt.stopPropagation();
                evt.preventDefault();

                _self.listener('vheaderbtn', evt);
            });

            // 屏蔽浮层上的事件冒泡。
            $(this.promptContainer).on('mousedown contextmenu dblclick mousemove mouseleave mouseenter mousewheel DOMMouseScroll', function (evt) {
                evt.stopPropagation();
            });
        },

        getPromptConcatiner: function () {
            return this.promptContainer;
        },

        appendTo: function (container) {
            this.container = container;
            container.appendChild(this.maskNode);
        },

        addInput: function (inputNode) {
            var _self = this;

            this.inputNode = inputNode;

            $(this.inputNode).on('keydown copy paste cut input blur focus', function (evt) {
                evt.stopPropagation();

                _self.listener(evt.type, evt);
            });
        },

        setListener: function (listener) {
            this.listener = listener;
        },

        __refresh: function () {
            this.__refreshHBtns();
            this.__refreshVBtns();

            var visualData = this.rs('get.visual.data');
            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            this.hHeader.style.height = headHeight + 'px';
            this.hHeader.style.left = headWidth + 'px';

            this.vHeader.style.width = headWidth + 'px';
            this.vHeader.style.top = headHeight + 'px';
        },

        __refreshHBtns: function () {
            var visualData = this.rs('get.visual.data');
            var colPoints = visualData.colPoints;
            var btns = [];

            for (var i = 1, len = colPoints.length; i < len; i++) {
                btns.push('<div class="btb-h-header-btn" data-index="' + (i - 1) + '" style="left: ' + (colPoints[i] - OFFSET) + 'px;"></div>')
            }

            this.hBtns.innerHTML = btns.join('');
        },

        __refreshVBtns: function () {
            var visualData = this.rs('get.visual.data');
            var rowPoints = visualData.rowPoints;
            var btns = [];

            for (var i = 1, len = rowPoints.length; i < len; i++) {
                btns.push('<div class="btb-v-header-btn" data-index="' + (i - 1) + '" style="top: ' + (rowPoints[i] - OFFSET) + 'px;"></div>')
            }

            this.vBtns.innerHTML = btns.join('');
        },

        __ignoreHeader: function () {
            if (this.__ignore) {
                return;
            }

            this.$headers.addClass('btb-ignored');
            this.__ignore = true;
        },

        __recoverHeader: function () {
            if (!this.__ignore) {
                return;
            }

            this.$headers.removeClass('btb-ignored');
            this.__ignore = false;
        },

        __startGlobalListen: function () {
            var _self = this;

            $(document).on('mousemove.btbMask', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                _self.listener('mousemove', evt);

            }).one('mouseup.btbMask', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                $(this).off('mousemove.btbMask');

                _self.listener('mouseup', evt);
                _self.status = STATUS.NORMAL;
            });
        },

        __createMaskNode: function () {
            var node = document.createElement('div');
            node.className = 'btb-mask';

            node.innerHTML = '<div class="btb-prompt-contianer"></div>' +
                            '<div class="btb-headers">' +
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