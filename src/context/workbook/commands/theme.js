/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({

        base: require('../i-command'),

        $deps: 'value',

        $query: [
            'majorfont',
            'minorfont',
            'themecolor'
        ],

        query_majorfont: function () {
            return this.getAPI().getMajorFont();
        },

        query_minorfont: function () {
            return this.getAPI().getMinorFont();
        },

        query_themecolor: function (theme, tint) {
            return this.getAPI().getThemeColor(theme, tint);
        }
    });
});