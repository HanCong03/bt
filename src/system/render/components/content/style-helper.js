/**
 * @file 样式生成器
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    module.exports = {
        getCssFont: function (fonts) {
            var styles = [];

            if (fonts.italic) {
                styles.push('italic');
            }

            if (fonts.bold) {
                styles.push('bold');
            }

            styles.push(fonts.size + 'pt/1');
            styles.push('"' + fonts.name + '"');


            return styles.join(' ');
        }
    };
});