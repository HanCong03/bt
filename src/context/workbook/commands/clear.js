/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('../i-command'),

        $exec: [
            'clearall'
        ],

        /* ---- gridline ---- */
        exec_clearall: function (start, end) {
            this.getAPI().clearAll(start, end);
        }
    });
});