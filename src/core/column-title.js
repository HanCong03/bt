/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('ColumnTitle', {
        base: require('module'),

        getColumnTitle: function (col) {
            return $$.indexToTitle(col);
        }
    });
});