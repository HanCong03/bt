/**
 * @file
 * @author hancong03@baiud.com
 */
/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var MODE = require('../definition/mode');

    module.exports = {
        __onmousewheel: function (evt) {
            this.postMessage('control.scroll', evt);

            // 阻止所有子组件的处理
            return false;
        }
    };
});