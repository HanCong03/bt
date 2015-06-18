/**
 * @file 提供对底层style到css style的转换功能
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NONE = require('./definition/none');
    var GENERAL = require('./definition/general');

    module.exports = $$.createClass('style', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        /* ---- 字体设置 ---- start */
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
        /* ---- 字体设置 ---- end */

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
        }
    });
});