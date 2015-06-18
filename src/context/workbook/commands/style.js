/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({

        base: require('../i-command'),

        $deps: 'style',

        $exec: [
            'color',
            'themecolor',
            'font',
            'majorfont',
            'minorfont',

            'unsetcolor',
            'unsetfont'
        ],

        $query: [
            'fullstyle'
        ],

        exec_color: function (color, start, end) {
            this.getAPI().setColor(color, start, end);
        },

        exec_themecolor: function (theme, tint, start, end) {
            this.getAPI().setThemeColor(theme, tint, start, end);
        },

        exec_unsetcolor: function (start, end) {
            this.getAPI().unsetColor(start, end);
        },

        exec_font: function (fontName, start, end) {
            this.getAPI().setFont(fontName, start, end);
        },

        exec_majorfont: function (start, end) {
            this.getAPI().setFontToMajor(start, end);
        },

        exec_minorfont: function (start, end) {
            this.getAPI().setFontToMinor(start, end);
        },

        query_fullstyle: function (row, col) {
            return this.getAPI().getFullStyle(row, col);
        }
    });
});