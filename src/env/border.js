/**
 * @file 提供边框存取服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NONE = require('./definition/none');

    module.exports = $$.createClass('Border', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        setBorder: function (borderOptions, start, end) {
            this.__$api.setBorder(borderOptions, start, end);
        },

        unsetBorder: function (start, end) {
            this.__$api.unsetBorder(start, end);
        },

        addLeftBorder: function (borderValue, start, end) {
            this.__$api.addLeftBorder(borderValue, start, end);
        },

        addRightBorder: function (borderValue, start, end) {
            this.__$api.addRightBorder(borderValue, start, end);
        },

        addTopBorder: function (borderValue, start, end) {
            this.__$api.addTopBorder(borderValue, start, end);
        },

        addBottomBorder: function (borderValue, start, end) {
            this.__$api.addBottomBorder(borderValue, start, end);
        },

        addOuterBorder: function (borderValue, start, end) {
            this.__$api.addOuterBorder(borderValue, start, end);
        },

        addInnerBorder: function (borderValue, start, end) {
            this.__$api.addInnerBorder(borderValue, start, end);
        },

        removeLeftBorder: function (start, end) {
            this.__$api.removeLeftBorder(start, end);
        },

        removeRightBorder: function (start, end) {
            this.__$api.removeRightBorder(start, end);
        },

        removeTopBorder: function (start, end) {
            this.__$api.removeTopBorder(start, end);
        },

        removeBottomBorder: function (start, end) {
            this.__$api.removeBottomBorder(start, end);
        },

        removeOuterBorder: function (start, end) {
            this.__$api.removeOuterBorder(start, end);
        },

        removeInnerBorder: function (start, end) {
            this.__$api.removeInnerBorder(start, end);
        },

        getBorder: function (row, col) {
            var borders = this.__$api.getBorder(row, col);

            if (borders.top === NONE) {
                borders.top = null;
            }

            if (borders.left === NONE) {
                borders.left = null;
            }

            if (borders.right === NONE) {
                borders.right = null;
            }

            if (borders.bottom === NONE) {
                borders.bottom = null;
            }

            if (borders['top'] === null
                && borders['left'] === null
                && borders['right'] === null
                && borders['bottom'] === null) {
                return null;
            }
        },

        getLeftBorder: function (start, end) {
            return this.__$api.getLeftBorder(start, end);
        },

        getRightBorder: function (start, end) {
            return this.__$api.getRightBorder(start, end);
        },

        getTopBorder: function (start, end) {
            return this.__$api.getTopBorder(start, end);
        },

        getBottomBorder: function (start, end) {
            return this.__$api.getBottomBorder(start, end);
        },

        getOuterBorder: function (start, end) {
            var borders = this.__$api.getOuterBorder(start, end);

            if (borders['top'] === null
                && borders['left'] === null
                && borders['right'] === null
                && borders['bottom'] === null) {
                return null;
            }

            return borders;
        }
    });
});