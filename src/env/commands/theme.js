/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'theme',

        $query: [
            'majorfont',
            'minorfont',
            'themecolor'
        ],

        query_majorfont: function () {
            return this.$dep.getMajorFont();
        },

        query_minorfont: function () {
            return this.$dep.getMinorFont();
        },

        query_themecolor: function (theme, tint) {
            return this.$dep.getThemeColor(theme, tint);
        }
    });
});