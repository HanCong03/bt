/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'clear',

        $exec: [
            'clearall'
        ],

        /* ---- gridline ---- */
        exec_clearall: function (start, end) {
            this.$dep.clearAll(start, end);
        }
    });
});