/**
 * @file 通用缓存清理器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        clean: function (cache, start, end) {
            var rangeType = $$.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    return [];
                    break;

                case 'row':
                    cleanRow(cache, start.row, end.row);
                    break;

                case 'column':
                    cleanColumn(cache, start.col, end.col);
                    break;

                case 'range':
                    cleanRange(cache, start, end);
                    break;
            }

            return cache;
        }
    };

    function cleanRow (cache, startIndex, endIndex) {
        var keys = Object.keys(cache);

        var indexCount = endIndex - startIndex + 1;
        var cacheCount = keys.length;

        if (indexCount > cacheCount) {
            cleanRowByCache(cache, keys, startIndex, endIndex);
        } else {
            cleanRowByIndex(cache, startIndex, endIndex);
        }
    }

    function cleanRowByCache(cache, keys, startIndex, endIndex) {
        var row;

        for (var i = 0, len = keys.length; i < len; i++) {
            row = keys[i];

            if (row > endIndex) {
                break;
            }

            if (row < startIndex) {
                continue;
            }

            delete cache[row];
        }
    }

    function cleanRowByIndex(cache, startIndex, endIndex) {
        for (var i = startIndex; i <= endIndex; i++) {
            if (cache[i] !== undefined) {
                delete cache[i];
            }
        }
    }

    function cleanColumn(cache, startIndex, endIndex) {
        $$.forEach(cache, function (rowCache) {
            if (rowCache.length <= startIndex) {
                return;
            }

            var limit = Math.min(endIndex, rowCache.length - 1);

            for (var i = startIndex; i <= limit; i++) {
                if (rowCache[i] !== undefined) {
                    delete rowCache[i];
                }
            }
        });
    }

    function cleanRange(cache, start, end) {
        var keys = Object.keys(cache);

        var indexCount = end.row - start.row + 1;
        var cacheCount = keys.length;

        if (indexCount > cacheCount) {
            cleanRangeByCache(cache, keys, start, end);
        } else {
            cleanRangeByIndex(cache, start, end);
        }
    }

    function cleanRangeByCache(cache, keys, start, end) {
        var row;

        var startRow = start.row;
        var endRow = end.row;
        var startCol = start.col;
        var endCol = end.col;

        var currentRow;
        var limit;

        for (var i = 0, len = keys.length; i < len; i++) {
            row = keys[i];

            if (row > endRow) {
                break;
            }

            if (row < startRow) {
                continue;
            }

            currentRow = cache[row];

            if (startCol >= currentRow.length) {
                continue;
            }

            limit = Math.min(endCol, currentRow.length - 1);

            for (var j = startCol; j <= limit; j++) {
                if (currentRow[j] !== undefined) {
                    delete currentRow[j];
                }
            }
        }
    }

    function cleanRangeByIndex(cache, start, end) {
        var startRow = start.row;
        var endRow = end.row;
        var startCol = start.col;
        var endCol = end.col;

        var currentRow;
        var limit;

        for (var i = startRow; i <= endRow; i++) {
            currentRow = cache[i];

            if (!currentRow) {
                continue;
            }

            if (startCol >= currentRow.length) {
                continue;
            }

            limit = Math.min(endCol, currentRow.length - 1);

            for (var j = startCol; j <= limit; j++) {
                if (currentRow[j] !== undefined) {
                    delete currentRow[j];
                }
            }
        }
    }
});