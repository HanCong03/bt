/**
 * @file 提供对底层style到css style的转换功能
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = require('utils').createClass('StyleFormat', {
        base: require('evn-module'),

        init: function () {
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'fonts.to.css': this.formatFonts
            });
        },

        formatFonts: function (styles) {
            var cssStyles = {};
        }
    });
});