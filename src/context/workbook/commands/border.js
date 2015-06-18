/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('../i-command'),

        $exec: [
            // overall
            'border',
            'clearborder',

            // single add
            'leftborder',
            'topborder',
            'rightborder',
            'bottomborder',
            'outerborder',
            'innerborder',

            // single remove
            'clearleftborder',
            'cleartopborder',
            'clearrightborder',
            'clearbottomborder',
            'clearouterborder',
            'clearinnerborder'
        ],

        /* ---- 完整边框设置 ---- */
        exec_border: function (borderOptions, start, end) {
            this.getAPI().setBorder(borderOptions, start, end);
        },

        /* ---- 边框擦除 ---- */
        exec_clearborder: function (start, end) {
            this.getAPI().unsetBorder(start, end);
        },

        /* ---- 单边添加 ---- */
        exec_topborder: function (borderOptions, start, end) {
            this.getAPI().addTopBorder(borderOptions, start, end);
        },

        exec_bottomborder: function (borderOptions, start, end) {
            this.getAPI().addBottomBorder(borderOptions, start, end);
        },

        exec_leftborder: function (borderOptions, start, end) {
            this.getAPI().addLeftBorder(borderOptions, start, end);
        },

        exec_rightborder: function (borderOptions, start, end) {
            this.getAPI().addRightBorder(borderOptions, start, end);
        },

        exec_outerborder: function (borderOptions, start, end) {
            this.getAPI().addOuterBorder(borderOptions, start, end);
        },

        exec_innerborder: function (borderOptions, start, end) {
            this.getAPI().addInnerBorder(borderOptions, start, end);
        },

        /* ------ 单边擦除 ----- */
        exec_cleartopborder: function (start, end) {
            this.getAPI().removeTopBorder(start, end);
        },

        exec_clearbottomborder: function (start, end) {
            this.getAPI().removeBottomBorder(start, end);
        },

        exec_clearleftborder: function (start, end) {
            this.getAPI().removeLeftBorder(start, end);
        },

        exec_clearrightborder: function (start, end) {
            this.getAPI().removeRightBorder(start, end);
        },

        exec_clearouterborder: function (start, end) {
            this.getAPI().removeOuterBorder(start, end);
        },

        exec_clearinnerborder: function (start, end) {
            this.getAPI().removeInnerBorder(start, end);
        }
    });
});