/**
 * @file 列宽，行高计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('ColumnWidth', {
        base: require('module'),

        getColumnWidth: function (col) {
            // 查看用户设置的宽度
            var userColumnWidth = this.rs('get.column.width', col);

            if ($$.isDefined(userColumnWidth)) {
                return userColumnWidth;
            }

            // 用户未设置宽度，则返回标准宽度
            return this.queryCommandValue('standardwidth');
        }
    });
});