/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'writable',

        $query: [
            'writable'
        ],

        query_writable: function (start, end) {
            return this.$dep.isWritable(start, end);
        }
    });
});