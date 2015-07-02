define(function (require, exports, module) {
    module.exports = {
        /**
         * 标准化区域
         * @param start
         * @param end
         */
        standardRange: function (start, end) {
            var startRow = start.row;
            var startCol = start.col;
            var endRow = end.row;
            var endCol = end.col;

            return {
                start: {
                    row: Math.min(startRow, endRow),
                    col: Math.min(startCol, endCol)
                },
                end: {
                    row: Math.max(startRow, endRow),
                    col: Math.max(startCol, endCol)
                }
            };
        }
    };
});