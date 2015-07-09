/**
 * @file 获取边框布局数据
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        parse: function (layoutData, visualData) {
            var hBorders = [];
            var vBorders = [];

            var topRow;
            var bottomRow;

            var topBorder;

            var mergeCellLayouts = [];

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

                    if (currentLayout.mergecell) {
                        mergeCellLayouts.push(currentLayout);
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

            // 处理合并单元格
            for (var i = 0, len = mergeCellLayouts.length; i < len; i++) {
                parseMergeCell(visualData, mergeCellLayouts[i], hBorders, vBorders);
            }

            return {
                h: mergeHBorder(hBorders),
                v: mergeVBorder(vBorders)
            };
        }
    };

    function parseMergeCell(visualData, layout, hBorders, vBorders) {
        var mergeInfo = layout.mergecell;
        var coordinate = getRectCoordinate(visualData, mergeInfo.start, mergeInfo.end);
        var sr = coordinate.sr;
        var er = coordinate.er;
        var sc = coordinate.sc;
        var ec = coordinate.ec;

        var border = layout.border;
        var topBorder = border.top;
        var leftBorder = border.left;
        var rightBorder = border.right;
        var bottomBorder = border.bottom;

        var r;
        var c;

        if (topBorder) {
            r = sr;

            for (var i = sc; i <= ec; i++) {
                hBorders[r][i] = topBorder;
            }
        }

        if (bottomBorder) {
            r = er + 1;

            for (var i = sc; i <= ec; i++) {
                if (!hBorders[r][i]) {
                    hBorders[r][i] = bottomBorder;
                }
            }
        }

        if (leftBorder) {
            c = sc;

            for (var i = sr; i <= er; i++) {
                vBorders[c][i] = leftBorder;
            }
        }

        if (rightBorder) {
            c = ec + 1;

            for (var i = sr; i <= er; i++) {
                if (!vBorders[c][i]) {
                    vBorders[c][i] = rightBorder;
                }
            }
        }
    }

    function getRectCoordinate(visualData, start, end) {
        var rows = visualData.rows;
        var cols = visualData.cols;

        var startRow = start.row;
        var startCol = start.col;
        var endRow = end.row;
        var endCol = end.col;

        var sr;
        var sc;
        var er;
        var ec;

        // sr
        for (var i = 0, len = rows.length; i < len; i++) {
            if (rows[i] >= startRow) {
                sr = i;
                break;
            }
        }

        // er
        for (var i = rows.length - 1; i >= 0; i--) {
            if (rows[i] <= endRow) {
                er = i;
                break;
            }
        }

        // sc
        for (var i = 0, len = cols.length; i < len; i++) {
            if (cols[i] >= startCol) {
                sc = i;
                break;
            }
        }

        // ec
        for (var i = cols.length - 1; i >= 0; i--) {
            if (cols[i] <= endCol) {
                ec = i;
                break;
            }
        }

        return {
            sr: sr,
            er: er,
            sc: sc,
            ec: ec
        };
    }

    function mergeHBorder(borders) {
        var result = {};
        var count = 0;

        $$.forEach(borders, function (rowBorders, r) {
            $$.forEach(rowBorders, function (border, c) {
                if (!border) {
                    return;
                }

                var key = border.style + ',' + border.color.value;

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

                var key = border.style + ',' + border.color.value;

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