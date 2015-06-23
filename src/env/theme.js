/**
 * @file 样式池，负责维护当前工作簿内部的样式索引
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Theme', {
        base: require('env-module'),

        /**
         * 根据给定的theme和tint计算颜色值
         * @param theme
         * @param tint
         * @returns {*}
         */
        getThemeColor: function (theme, tint) {
            return this.getAPI().getThemeColor(theme, tint);
        },

        getMajorFont: function () {
            return this.getAPI().getMajorFont();
        },

        getMinorFont: function () {
            return this.getAPI().getMinorFont();
        },

        getBaseSize: function () {
            return this.getAPI().getBaseSize();
        }
    });
});