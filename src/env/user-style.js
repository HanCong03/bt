/**
 * @file 提供对用户样式的读取服务；仅提供只读接口。
 * 该模块所提供的数据，可以帮助客户忽略掉默认样式。
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NONE = require('./definition/none');
    var GENERAL = require('./definition/general');

    module.exports = $$.createClass('UserStyle', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        /**
         * 批量获取用户设置的字体样式，如果用户未设置任何字体属性，则返回null。
         * 否则，返回的map里只包含用户设置过的属性
         */
        getFonts: function (row, col) {
            return this.__$api.getEffectiveClassifyStyle('fonts', row, col);
        },

        getFont: function (row, col) {
            var font = this.__$api.getEffectiveStyle('name', row, col);

            if ($$.isNdef(font)) {
                return null;
            }

            if (typeof font === 'object') {
                return font.value;
            }

            return font;
        },

        isBold: function (row, col) {
            return this.__$api.getEffectiveStyle('bold', row, col);
        },

        toggleBold: function (start, end) {
            var bold = this.__$api.getEffectiveStyle('bold', start.row, start.col);
            this.__$api.setStyle('bold', !bold, start, end);
        },

        isItalic: function (row, col) {
            return this.__$api.getEffectiveStyle('italic', row, col);
        },

        getUnderline: function (row, col) {
            var underline = this.__$api.getEffectiveStyle('underline', row, col);

            if (underline === NONE) {
                return null;
            }

            return underline;
        },

        hasThroughline: function (row, col) {
            return this.__$api.getEffectiveStyle('throughline', row, col);
        },

        getFontSize: function (row, col) {
            return this.__$api.getEffectiveStyle('size', row, col);
        },
        /* ---- 字体 end ---- */

        /* ---- 颜色 ---- start */
        getColor: function (row, col) {
            var color = this.__$api.getEffectiveStyle('color', row, col);

            if ($$.isNdef(color)) {
                return null;
            }

            if (typeof color === 'object') {
                return color.value;
            }

            return color;
        },
        /* ---- 颜色 ---- end */

        /* --- 格式化 start --- */
        getNumberFormat: function (row, col) {
            var numfmt = this.__$api.getEffectiveStyle('numfmt', row, col);

            if (numfmt === NONE) {
                return GENERAL;
            }

            return numfmt;
        },
        /* --- 格式化 end --- */

        /* --- 填充 start --- */
        getFill: function (row, col) {
            var fill = this.__$api.getEffectiveStyle('fill', row, col);

            if (fill === NONE) {
                return null;
            }

            return fill;
        },
        /* --- 填充 end --- */

        /* --- 对齐 start --- */
        getHorizontalAlign: function (row, col) {
            return this.__$api.getEffectiveStyle('horizontal', row, col);
        },

        getVerticalAlign: function (row, col) {
            return this.__$api.getEffectiveStyle('vertical', row, col);
        },

        isWraptext: function (row, col) {
            return this.__$api.getEffectiveStyle('wraptext', row, col);
        }
        /* --- 对齐 end --- */
    });
});