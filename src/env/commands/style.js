/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'style',

        $query: [
            'font',
            'color',
            'numfmt'
        ],

        query: function (name, args) {
            switch (name) {
                case 'font':
                    return this.$dep.getFont(args[0], args[1]);
                    break;

                case 'color':
                    return this.$dep.getColor(args[0], args[1]);

                case 'numfmt':
                    return this.$dep.getNumberFormat(args[0], args[1]);
            }
        }
    });
});