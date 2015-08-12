/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'standard',

        commands: {
            standard: {
                query: function () {
                    return this.$dep.getStandard();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            standardfont: {
                query: function () {
                    return this.$dep.getStandardFont();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            standardfontsize: {
                query: function () {
                    return this.$dep.getStandardFontSize();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            standardcolor: {
                query: function () {
                    return this.$dep.getStandardColor();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            standardwidth: {
                query: function () {
                    return this.$dep.getStandardWidth();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            standardheight: {
                query: function () {
                    return this.$dep.getStandardHeight();
                },

                query_arguments: function (args) {
                    return args;
                }
            }
        }
    });
});