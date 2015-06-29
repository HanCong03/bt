define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        /**
         * 从给定的一组合并单元格数据中找到包含指定单元格的合并单元格数据。
         * 如果给定的所有合并单元格都不包含指定的单元格，则返回null。
         * @param mergecells
         */
        findMergeCell: function (mergecells, row, col) {
            var result;

            for (var key in mergecells) {
                if (!mergecells.hasOwnProperty(key)) {
                    continue;
                }

                result = findCell(mergecells[key], row, col);

                if (result) {
                    return $$.clone(mergecells[key]);
                }
            }

            function findCell(mergecell, row, col) {
                var start = mergecell.start;
                var end = mergecell.end;

                if (row >= start.row && row <= end.row
                    && col >= start.col && col <= end.col) {
                    return true;
                }

                return false;
            }

            return null;
        }
    };
});