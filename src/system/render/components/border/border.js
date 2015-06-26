/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var WIDTH = GRIDLINE_CONFIG.width;
    var OFFSET = GRIDLINE_CONFIG.offset;

    var BorderDrawers = {
        'thin': require('./drawer/thin'),
        'hair': require('./drawer/hair'),
        'dotted': require('./drawer/dotted'),
        'dashed': require('./drawer/dashed'),
        'dashdot': require('./drawer/dash-dot'),
        'dashdotdot': require('./drawer/dash-dot-dot'),
        'double': require('./drawer/double'),
        'medium': require('./drawer/medium'),
        'mediumdashed': require('./drawer/medium-dashed'),
        'mediumdashdot': require('./drawer/medium-dash-dot'),
        'mediumdashdotdot': require('./drawer/medium-dash-dot-dot'),
        'slantdashdot': require('./drawer/slant-dash-dot'),
        'thick': require('./drawer/thick')
    };

    module.exports = {
        __drawBorder: function () {
            var visualData = this.visualData;
            var screen = this.borderScreen;

            if (visualData.rowCount === 0 || visualData.colCount === 0) {
                return;
            }

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);

            this.__drawBorders();

            screen.restore();
        },

        __drawBorders: function () {
            var layoutData = this.layoutData;

            var currentRowLayout;
            var currentCellLayout;

            for (var i = 0, len = layoutData.length; i < len; i++) {
                currentRowLayout = layoutData[i];

                for (var j = 0, jlen = currentRowLayout.length; j < jlen; j++) {
                    currentCellLayout = currentRowLayout[j];

                    if (!currentCellLayout) {
                        continue;
                    }

                    if (!currentCellLayout.border) {
                        continue;
                    }

                    this.__drawCellBorder(currentCellLayout);
                }
            }
        },

        __drawCellBorder: function (layout) {
            var border = layout.border;
            var rect = this.__getBorderRect(layout);

            if (border.top) {
                this.__drawTopBorder(rect, border.top);
            }

            if (border.left) {
                this.__drawLeftBorder(rect, border.left);
            }

            if (border.right) {
                this.__drawRightBorder(rect, border.right);
            }

            if (border.bottom) {
                this.__drawBottomBorder(rect, border.bottom);
            }
        },

        __getBorderRect: function (layout) {
            if (layout.mergecell) {
                return this.__getMergeCellBorderLayout(layout);
            }

            var visualData = this.visualData;
            var r = layout.r;
            var c = layout.c;

            return {
                x: visualData.colPoints[c] - OFFSET,
                y: visualData.rowPoints[r] - OFFSET,
                width: visualData.colWidths[c] + 2 * WIDTH,
                height: visualData.rowHeights[r] + 2 * WIDTH
            };
        },

        __getMergeCellBorderLayout: function (layout) {
            var visualData = this.visualData;
            var sr = layout.r;
            var sc = layout.c;
            var er = layout.mergecell.er;
            var ec = layout.mergecell.ec;

            var width = -WIDTH;
            var height = -WIDTH;

            // height
            for (var i = sr; i <= er; i++) {
                height += visualData.rowHeights[i] + WIDTH;
            }

            // width
            for (var i = sc; i <= ec; i++) {
                width += visualData.colWidths[i] + WIDTH;
            }

            return {
                x: visualData.colPoints[sc] - OFFSET,
                y: visualData.rowPoints[sr] - OFFSET,
                width: width + 2 * WIDTH,
                height: height + 2 * WIDTH
            };
        },

        __drawTopBorder: function (rect, borderValue) {
            if (!BorderDrawers[borderValue.style]) {
                return;
            }

            BorderDrawers[borderValue.style].drawTop(this.borderScreen, rect, borderValue.color);
        },

        __drawLeftBorder: function (rect, borderValue) {
            if (!BorderDrawers[borderValue.style]) {
                return;
            }

            BorderDrawers[borderValue.style].drawLeft(this.borderScreen,rect, borderValue.color);
        },

        __drawRightBorder: function (rect, borderValue) {
            if (!BorderDrawers[borderValue.style]) {
                return;
            }

            BorderDrawers[borderValue.style].drawRight(this.borderScreen,rect, borderValue.color);
        },

        __drawBottomBorder: function (rect, borderValue) {
            if (!BorderDrawers[borderValue.style]) {
                return;
            }

            BorderDrawers[borderValue.style].drawBottom(this.borderScreen,rect, borderValue.color);
        }

    };
});