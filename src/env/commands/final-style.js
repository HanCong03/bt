/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'finalStyle',

        $query: [
            'finalfonts',
            'finalaligments',

            'finalfont',
            'finalhorizontal'
        ],

        query: function (name, args) {
            switch (name) {
                case 'finalfonts':
                    return this.$dep.getFinalFonts(args[0], args[1]);

                case 'finalaligments':
                    return this.$dep.getFinalAlignments(args[0], args[1]);

                case 'finalfont':
                    return this.$dep.getFinalFont(args[0], args[1]);
                    break;

                case 'finalhorizontal':
                    return this.$dep.getFinalHorizontal(args[0], args[1]);

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

                case 'userfonts':
                    return this.$dep.getFonts(args[0], args[1]);
            }
        }
    });
});