/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'standard',

        $query: [
            'standard',
            'standardfont',
            'standardfontsize',
            'standardcolor',
            'standardwidth',
            'standardheight'
        ],

        query_standard: function () {
            return this.$dep.getStandard();
        },

        query_standardfont: function () {
            return this.$dep.getStandardFont();
        },

        query_standardfontsize: function () {
            return this.$dep.getStandardFontSize();
        },

        query_standardcolor: function () {
            return this.$dep.getStandardColor();
        },

        query_standardwidth: function () {
            return this.$dep.getStandardWidth();
        },

        query_standardheight: function () {
            return this.$dep.getStandardHeight();
        }
    });
});