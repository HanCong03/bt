/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Hyperlink', {
        base: require('module'),

        setHyperlink: function (text, link, row, col) {
            this.rs('set.content', text, row, col);
            this.rs('set.hyperlink', link, row, col);
        },

        clearHyperlink: function (start, end) {
            this.rs('clear.hyperlink', start, end);
        },

        getHyperlink: function (row, col) {
            return this.rs('get.hyperlink', row, col);
        },

        hasHyperlink: function (start, end) {
            return this.rs('has.hyperlink', start, end);
        }
    });
});