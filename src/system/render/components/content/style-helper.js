/**
 * @file 样式生成器
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        getCssFont: function (fonts) {
            var styles = [];

            if (fonts.italic) {
                styles.push('font-style: italic');
            }

            if (fonts.bold) {
                styles.push('font-weight: bold');
            }

            styles.push('font-size: ' + fonts.size + 'pt');
            styles.push('line-height: 1');
            styles.push('font-family: ' + fonts.name);

            return styles.join(';');
        }
    };
});