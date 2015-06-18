/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({

        base: require('../i-command'),

        $query: [
            'dimension'
        ],

        query_dimension: function () {
            return this.getAPI().getDimension();
        }
    });
});