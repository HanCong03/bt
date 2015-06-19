/**
 * @file 显示内容管理模块
 * 提供对单元格的可视化内容的维护服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('DisplayContent', {
        base: require('module'),

        init: function () {
            this.__initService();
        },

        __initService: function () {
            this.registerService({
               'get.display.content': this.getDisplayContent
            });
        },

        getDisplayContent: function (row, col) {
            var formattedContent = this.rs('get.formatted.content', row, col);

            debugger;
        }
    });
});