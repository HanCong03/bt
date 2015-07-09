/**
 * @file 获取边框布局数据
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var WIDTH = GRIDLINE_CONFIG.width;
    var OFFSET = GRIDLINE_CONFIG.offset;

    module.exports = {
        parse: function (layoutData) {
            var hBorders = [];
            var vBorders = [];

            var topRow;
            var bottomRow;

            var topBorder;

            $$.forEach(layoutData, function (rowLayout, i) {
                if (i === 0) {
                    topRow = [];
                    hBorders.push(topRow);
                } else {
                    topRow = bottomRow;
                }

                bottomRow = [];
                hBorders.push(bottomRow);

                $$.forEach(rowLayout, function (currentLayout, j) {
                    if (!currentLayout) {
                        return;
                    }

                    var border = currentLayout.border;
                    var rc = j + 1;

                    topBorder = border.top;

                    if (topBorder) {
                        topRow[j] = topBorder;
                    }

                    bottomRow[j] = border.bottom;

                    if (!vBorders[j]) {
                        vBorders[j] = [];
                    }

                    if (border.left) {
                        vBorders[j][i] = border.left;
                    }

                    if (!vBorders[rc]) {
                        vBorders[rc] = [];
                    }

                    vBorders[rc][i] = border.right;
                });
            });

            return {
                h: mergeHBorder(hBorders),
                v: mergeVBorder(vBorders)
            };
        }
    };

    function mergeHBorder(borders) {
        var result = {};
        var count = 0;

        $$.forEach(borders, function (rowBorders, r) {
            $$.forEach(rowBorders, function (border, c) {
                if (!border) {
                    return;
                }

                var key = border.style + ',' + border.color;

                if (!result[key]) {
                    count++;
                    result[key] = [];
                    result[key].border = border;
                }

                result[key].push({
                    r: r,
                    c: c
                });
            });
        });

        if (count === 0) {
            return null;
        }

        return result;
    }

    function mergeVBorder(borders) {
        var result = {};
        var count = 0;

        $$.forEach(borders, function (colBorders, c) {
            $$.forEach(colBorders, function (border, r) {
                if (!border) {
                    return;
                }

                var key = border.style + ',' + border.color;

                if (!result[key]) {
                    count++;
                    result[key] = [];
                    result[key].border = border;
                }

                result[key].push({
                    r: r,
                    c: c
                });
            });
        });

        if (count === 0) {
            return null;
        }

        return result;
    }
});