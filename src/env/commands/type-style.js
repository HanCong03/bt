/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'typeStyle',

        commands: {
            typehorizontal: {
                query: function (row, col) {
                    return this.$dep.getTypeHorizontalAlignments(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            }
        }
    });
});