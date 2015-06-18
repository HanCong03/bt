/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'userStyle',

        $query: [
            'userfont',
            'userfontsize',
            'usercolor',
            'usernumfmt',
            'userbold',
            'useritalic',
            'userunderline',
            'userthroughline',
            'userfill',
            'userhalign',
            'uservalign',
            'userwraptext'
        ],

        query: function (name, args) {
            switch (name) {
                case 'userfont':
                    return this.$dep.getFont(args[0], args[1]);
                    break;

                case 'usercolor':
                    return this.$dep.getColor(args[0], args[1]);

                case 'usernumfmt':
                    return this.$dep.getNumberFormat(args[0], args[1]);

                case 'userbold':
                    return this.$dep.isBold(args[0], args[1]);

                case 'useritalic':
                    return this.$dep.isItalic(args[0], args[1]);

                case 'userunderline':
                    return this.$dep.getUnderline(args[0], args[1]);

                case 'userthroughline':
                    return this.$dep.hasThroughline(args[0], args[1]);

                case 'userfontsize':
                    return this.$dep.getFontSize(args[0], args[1]);

                case 'userfill':
                    return this.$dep.getFill(args[0], args[1]);

                case 'userhalign':
                    return this.$dep.getHorizontalAlign(args[0], args[1]);

                case 'uservalign':
                    return this.$dep.getVerticalAlign(args[0], args[1]);

                case 'userwraptext':
                    return this.$dep.isWraptext(args[0], args[1]);
            }
        }
    });
});