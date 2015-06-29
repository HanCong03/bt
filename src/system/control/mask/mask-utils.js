define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        calculateCellIndex: function (node, visualData, x, y) {
            var position = $$.getRect(node);
            var colPoints = visualData.colPoints;
            var rowPoints = visualData.rowPoints;

            x -= Math.round(position.left);
            y -= Math.round(position.top);

            /* --- 计算点击处的行列索引 start --- */
            var r;
            var c;

            x -= visualData.headWidth;
            y -= visualData.headHeight;

            // 绘制点比行列数多1，所以和len比较时使用 <=
            for (var i = 0, len = visualData.colCount; i <= len; i++) {
                if (x <= colPoints[i]) {
                    c = i - 1;
                    break;
                }
            }

            // 右侧无单元格的位置
            if ($$.isNdef(c)) {
                c = -2;
            }

            // 绘制点比行列数多1，所以和len比较时使用 <=
            for (var i = 0, len = visualData.rowCount; i <= len; i++) {
                if (y <= rowPoints[i]) {
                    r = i - 1;
                    break;
                }
            }

            // 底部无单元格的位置
            if ($$.isNdef(r)) {
                r = -2;
            }

            return {
                r: r,
                c: c
            };
            /* --- 计算点击处的行列索引 end --- */
        }
    };
});