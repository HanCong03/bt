/**
 * @file 提供对底层style到css style的转换功能
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('style', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        /* ---- 字体设置 ---- start */
        setFont: function (fontName, start, end) {
            this.__$api.setStyle('name', fontName, start, end);
        },

        setFontToMajor: function (start, end) {
            this.__$api.setStyle('name', {
                type: 'major',
                value: this.queryCommandValue('majorfont')
            }, start, end);
        },

        setFontToMinor: function (start, end) {
            this.__$api.setStyle('name', {
                type: 'minor',
                value: this.queryCommandValue('minorfont')
            }, start, end);
        },

        unsetFont: function (start, end) {
            this.__$api.unsetStyle('name', start, end);
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
            this.setStyle('color', color, start, end);
        },

        setThemeColor: function (theme, tint, start, end) {
            theme = theme - 0;
            tint = tint - 0;

            this.setStyle('color', {
                theme: theme,
                tint: tint,
                value: this.rs('get.theme.color', theme, tint)
            }, start, end);
        },

        unsetColor: function (start, end) {
            this.unsetStyle('color', start, end);
        },

        getColor: function (row, col) {
            return this.getStyle('color', row, col);
        },
        /* ---- 颜色设置 ---- end */

        /* --- 格式化 start --- */
        setNumberFormat: function (code, start, end) {
            this.setStyle('numfmt', code, start, end);
        },

        getNumberFormat: function (row, col) {
            return this.getStyle('numfmt', row, col);
        }
    });
});