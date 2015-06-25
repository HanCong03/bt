/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        $dep: 'style',

        $exec: [
            'font',
            'majorfont',
            'minorfont',
            'fontsize',
            'color',
            'themecolor',
            'numfmt',
            'bold',
            'italic',
            'underline',
            'throughline',
            'fill',
            'halign',
            'valign',
            'wraptext'
        ],

        $query: [
            'font',
            'fontsize',
            'color',
            'numfmt',
            'bold',
            'italic',
            'underline',
            'throughline',
            'fill',
            'halign',
            'valign',
            'wraptext',
            'settedcellstyle',
            'settedrowstyle',
            'settedcolumnstyle',
            'settedglobalstyle',
            'defaultfonts',
            'defaultalignments',
            'fonts',
            'alignments'
        ],

        exec_font: function (font, start, end) {
            this.$dep.setFont(font, start, end);
        },

        exec_majorfont: function (start, end) {
            this.$dep.setFontForMajor(start, end);
        },

        exec_minorfont: function (start, end) {
            this.$dep.setFontForMinor(start, end);
        },

        exec_fontsize: function (fontsize, start, end) {
            this.$dep.setFontSize(fontsize, start, end);
        },

        exec_color: function (color, start, end) {
            this.$dep.setColor(color, start, end);
        },

        exec_themecolor: function (theme, tint, start, end) {
            this.$dep.setColorForTheme(theme, tint, start, end);
        },

        exec_numfmt: function (code, start, end) {
            this.$dep.setNumberFormat(code, start, end);
        },

        exec_bold: function (start, end) {
            this.$dep.toggleBold(start, end);
        },

        exec_italic: function (start, end) {
            this.$dep.toggleItalic(start, end);
        },

        exec_underline: function (line, start, end) {
            this.$dep.setUnderline(line, start, end);
        },

        exec_throughline: function (start, end) {
            this.$dep.toggleThroughline(start, end);
        },

        exec_fill: function (val, start, end) {
            this.$dep.setFill(val, start, end);
        },

        exec_halign: function (val, start, end) {
            this.$dep.setHorizontalAlign(val, start, end);
        },

        exec_valign: function (val, start, end) {
            this.$dep.setVerticalAlign(val, start, end);
        },

        exec_wraptext: function (start, end) {
            this.$dep.toggleWraptext(start, end);
        },

        query: function (name, args) {
            switch (name) {
                case 'font':
                    return this.$dep.getFont(args[0], args[1]);
                    break;

                case 'color':
                    return this.$dep.getColor(args[0], args[1]);

                case 'numfmt':
                    return this.$dep.getNumberFormat(args[0], args[1]);

                case 'bold':
                    return this.$dep.isBold(args[0], args[1]);

                case 'italic':
                    return this.$dep.isItalic(args[0], args[1]);

                case 'underline':
                    return this.$dep.getUnderline(args[0], args[1]);

                case 'throughline':
                    return this.$dep.hasThroughline(args[0], args[1]);

                case 'fontsize':
                    return this.$dep.getFontSize(args[0], args[1]);

                case 'fill':
                    return this.$dep.getFill(args[0], args[1]);

                case 'halign':
                    return this.$dep.getHorizontalAlign(args[0], args[1]);

                case 'valign':
                    return this.$dep.getVerticalAlign(args[0], args[1]);

                case 'wraptext':
                    return this.$dep.isWraptext(args[0], args[1]);
            }
        },

        query_settedcellstyle: function (styleName, row, col) {
            return this.$dep.getSettedCellStyle(styleName, row, col);
        },

        query_settedrowstyle: function (styleName, row) {
            return this.$dep.getSettedRowStyle(styleName, row);
        },

        query_settedcolumnstyle: function (styleName, col) {
            return this.$dep.getSettedColumnStyle(styleName, col);
        },

        query_settedglobalstyle: function (styleName) {
            return this.$dep.getSettedGlobalStyle(styleName);
        },

        query_defaultfonts: function () {
            return this.$dep.getDefaultFonts();
        },

        query_defaultalignments: function () {
            return this.$dep.getDefaultAlignments();
        },

        query_fonts: function (row, col) {
            return this.$dep.getFonts(row, col);
        },

        query_alignments: function (row, col) {
            return this.$dep.getAlignments(row, col);
        }
    });
});