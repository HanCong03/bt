/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'theme',

        commands: {
            majorfont: {
                query: function () {
                    return this.$dep.getMajorFont();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            minorfont: {
                query: function () {
                    return this.$dep.getMinorFont();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            themecolor: {
                query: function (theme, tint) {
                    return this.$dep.getThemeColor(theme, tint);
                },

                query_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});