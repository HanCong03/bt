/**
 * @file 提供样式存取服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NONE = require('./definition/none');
    var GENERAL = require('./definition/general');

    module.exports = $$.createClass('Style', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        /* ---- 字体 start ---- */
        setFont: function (fontName, start, end) {
            this.__$api.setStyle('name', fontName, start, end);
        },

        setFontForMajor: function (start, end) {
            this.__$api.setStyle('name', {
                type: 'major',
                value: this.queryCommandValue('majorfont')
            }, start, end);
        },

        setFontForMinor: function (start, end) {
            this.__$api.setStyle('name', {
                type: 'minor',
                value: this.queryCommandValue('minorfont')
            }, start, end);
        },

        getFont: function (row, col) {
            var font = this.__$api.getStyle('name', row, col);

            if (typeof font === 'object') {
                return font.value;
            }

            return font;
        },

        isBold: function (row, col) {
            return this.__$api.getStyle('bold', row, col);
        },

        toggleBold: function (start, end) {
            var bold = this.__$api.getStyle('bold', start.row, start.col);
            this.__$api.setStyle('bold', !bold, start, end);
        },

        isItalic: function (row, col) {
            return this.__$api.getStyle('italic', row, col);
        },

        toggleItalic: function (start, end) {
            var italic = this.__$api.getStyle('italic', start.row, start.col);
            this.__$api.setStyle('italic', !italic, start, end);
        },

        setUnderline: function (line, start, end) {
            this.__$api.setStyle('underline', line, start, end);
        },

        getUnderline: function (row, col) {
            var underline = this.__$api.getStyle('underline', row, col);

            if (underline === NONE) {
                return null;
            }

            return underline;
        },

        toggleThroughline: function (start, end) {
            var throughline = this.__$api.getStyle('throughline', start.row, start.col);
            this.__$api.setStyle('throughline', !throughline, start, end);
        },

        hasThroughline: function (row, col) {
            return this.__$api.getStyle('throughline', row, col);
        },

        setFontSize: function (fontsize, start, end) {
            return this.__$api.setStyle('size', fontsize, start, end);
        },

        getFontSize: function (row, col) {
            return this.__$api.getStyle('size', row, col);
        },
        /* ---- 字体 end ---- */

        /* ---- 颜色设置 ---- start */
        setColor: function (color, start, end) {
            this.__$api.setStyle('color', color, start, end);
        },

        setColorForTheme: function (theme, tint, start, end) {
            theme = theme - 0;
            tint = tint - 0;

            this.__$api.setStyle('color', {
                theme: theme,
                tint: tint,
                value: this.queryCommandValue('themecolor', theme, tint)
            }, start, end);
        },

        getColor: function (row, col) {
            var color = this.__$api.getStyle('color', row, col);

            if (typeof color === 'object') {
                return color.value;
            }

            return color;
        },
        /* ---- 颜色设置 ---- end */

        /* --- 格式化 start --- */
        setNumberFormat: function (code, start, end) {
            this.__$api.setStyle('numfmt', code, start, end);
        },

        getNumberFormat: function (row, col) {
            var numfmt = this.__$api.getStyle('numfmt', row, col);

            if (numfmt === NONE) {
                return GENERAL;
            }

            return numfmt;
        },
        /* --- 格式化 end --- */

        /* --- 填充 start --- */
        setFill: function (val, start, end) {
            this.__$api.setStyle('fill', val, start, end);
        },

        getFill: function (row, col) {
            var fill = this.__$api.getStyle('fill', row, col);

            if (fill === NONE) {
                return null;
            }

            return fill;
        },
        /* --- 填充 end --- */

        /* --- 对齐 start --- */
        setHorizontalAlign: function (val, start, end) {
            this.__$api.setStyle('horizontal', val, start, end);
        },

        getHorizontalAlign: function (row, col) {
            return this.__$api.getStyle('horizontal', row, col);
        },

        setVerticalAlign: function (val, start, end) {
            this.__$api.setStyle('vertical', val, start, end);
        },

        getVerticalAlign: function (row, col) {
            return this.__$api.getStyle('vertical', row, col);
        },

        toggleWraptext: function (start, end) {
            var wraptext = this.__$api.getStyle('wraptext', start.row, start.col);
            this.__$api.setStyle('wraptext', !wraptext, start, end);
        },

        isWraptext: function (row, col) {
            return this.__$api.getStyle('wraptext', row, col);
        },
        /* --- 对齐 end --- */

        getSettedCellStyle: function (styleName, row, col) {
            return this.__$api.getSettedCellStyle(styleName, row, col);
        },
        /**
         * 获取指定的行样式
         * @param styleName
         * @param row
         * @returns {*}
         */
        getSettedRowStyle: function (styleName, row) {
            return this.__$api.getSettedRowStyle(styleName, row);
        },

        /**
         * 获取指定的列样式
         * @param styleName
         * @param col
         * @returns {*}
         */
        getSettedColumnStyle: function (styleName, col) {
            return this.__$api.getSettedColumnStyle(styleName, col);
        },

        getSettedGlobalStyle: function (styleName) {
            return this.__$api.getSettedGlobalStyle(styleName);
        }
    });
});