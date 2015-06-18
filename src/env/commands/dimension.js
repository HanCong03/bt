/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'dimension',

        $query: [
            'dimension'
        ],

        query_dimension: function () {
            return this.$dep.getDimension();
        }
    });
});