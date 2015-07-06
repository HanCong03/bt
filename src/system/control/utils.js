define(function (require, exports, module) {
    var $$ = require('utils');

    var HEAD = -1;
    var HEAD_OUTER = -2;
    var SPACE = -3;
    var OUTER = -4;

    module.exports = {
        /**
         * 获取点击位置
         * 注意： 返回值有几个比较有特殊意义的值：-1 -> 点击到头部；-2 -> 点击在头部之上或者左侧； -3 -> 点击在内容区空白处； -4 -> 点击在内容区右侧或者下部。
         * @param node
         * @param visualData
         * @param x
         * @param y
         * @returns {{r: *, c: *}}
         */
        calculateCellIndex: function (node, visualData, x, y) {
            var position = $$.getRect(node);
            var colPoints = visualData.colPoints;
            var rowPoints = visualData.rowPoints;

            x -= Math.round(position.left);
            y -= Math.round(position.top);

            var result = {
                x: x,
                y: y
            };

            /* --- 计算点击处的行列索引 start --- */
            var r;
            var c;

            if (x < 0) {
                c = HEAD_OUTER;
            } else if (x >= 0 && x <= visualData.headWidth) {
                c = HEAD;
            } else {
                x -= visualData.headWidth;

                for (var i = 1, len = visualData.colCount; i < len; i++) {
                    if (x <= colPoints[i]) {
                        c = i - 1;
                        break;
                    }
                }

                if ($$.isNdef(c)) {
                    if (x <= visualData.boundaryWidth) {
                        c = visualData.colCount - 1;
                    } else if (x > visualData.boundaryWidth && x <= visualData.spaceWidth) {
                        c = SPACE;
                    } else {
                        c = OUTER;
                    }
                }
            }

            if (y < 0) {
                r = HEAD_OUTER;
            } else if (y >= 0 && y <= visualData.headHeight) {
                r = HEAD;
            } else {
                y -= visualData.headHeight;

                for (var i = 1, len = visualData.rowCount; i < len; i++) {
                    if (y <= rowPoints[i]) {
                        r = i - 1;
                        break;
                    }
                }

                if ($$.isNdef(r)) {
                    if (y <= visualData.boundaryHeight) {
                        r = visualData.rowCount - 1;
                    } else if (y > visualData.boundaryHeight && y <= visualData.spaceHeight) {
                        r = SPACE;
                    } else {
                        r = OUTER;
                    }
                }
            }

            result.r = r;
            result.c = c;

            return result;
            /* --- 计算点击处的行列索引 end --- */
        }
    };
});