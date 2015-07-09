/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: '_renderInfo',

        $query: [
            '_renderinfo'
        ],

        query__renderinfo: function (rows, cols) {
            return this.$dep.getRenderInfo(rows, cols);
        }
    });
});