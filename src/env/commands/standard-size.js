/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'standardSize',

        $query: [
            'standardsize',
            'standardwidth',
            'standardheight'
        ],

        query_standardsize: function () {
            return this.$dep.getStandardSize();
        },

        query_standardwidth: function () {
            return this.$dep.getStandardWidth();
        },

        query_standardheight: function () {
            return this.$dep.getStandardHeight();
        }
    });
});