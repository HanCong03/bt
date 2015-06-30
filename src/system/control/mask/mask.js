/**
 * @file 渲染画布对象
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');
    var STATUS = require('../definition/status');
    var MaskUtils = require('./mask-utils');

    module.exports = $$.createClass('Mask', {
        base: require('component'),

        status: null,
        maskNode: null,
        container: null,
        visualData: null,

        start: null,
        end: null,

        mixin: [
            require('./handlers/mouse'),
            require('./handlers/outer'),
            require('./handlers/key')
        ],

        init: function () {
            this.maskNode = this.__createMaskNode();

            this.__reset();
            this.__initEvent();
            this.__initDomEvent();
        },

        __initEvent: function () {
            this.on({
                'refresh': this.refresh
            });
        },

        appendTo: function (container) {
            this.container = container;
            container.appendChild(this.maskNode);
        },

        addInput: function (inputNode) {
            var _self = this;

            this.inputNode = inputNode;

            $(this.inputNode).on('keydown', function (evt) {
                evt.stopPropagation();

                _self['__' + evt.type](evt);
            });
        },

        refresh: function () {
            this.visualData = this.rs('get.visual.data');
        },

        getIndex: function (x, y) {
            var index = MaskUtils.calculateCellIndex(this.container, this.visualData, x, y);

            var row = index.r;
            var col = index.c;

            if (row >= 0) {
                row = this.visualData.rows[row];
            }

            if (col >= 0) {
                col = this.visualData.cols[col];
            }

            return {
                row: row,
                col: col
            };
        },

        __reset: function () {
            this.status = STATUS.NORMAL;
            this.start = null;
            this.end = null;
        },

        __initDomEvent: function () {
            var _self = this;

            $(this.maskNode).on('mousedown mousemove mouseup mouseleave mouseenter', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                _self['__' + evt.type](evt);
            });
        },

        __createMaskNode: function () {
            var node = document.createElement('div');
            node.className = 'btb-mask';

            return node;
        }
    });
});