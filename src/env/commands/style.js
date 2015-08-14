/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'style',

        commands: {
            font: {
                exec: function (font, start, end) {
                    this.$dep.setFont(font, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getFont(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            unsetstyle: {
                exec: function (styleName, start, end) {
                    this.$dep.unsetStyle(styleName, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                }
            },

            ismajor: {
                query: function (row, col) {
                    return this.$dep.isMajor(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start.row, range.start.col];

                    return args;
                }
            },

            fontdetail: {
                query: function (row, col) {
                    return this.$dep.getFontDetail(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start.row, range.start.col];

                    return args;
                }
            },

            colordetail: {
                query: function (row, col) {
                    return this.$dep.getColorDetail(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start.row, range.start.col];

                    return args;
                }
            },

            filldetail: {
                query: function (row, col) {
                    return this.$dep.getFill(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start.row, range.start.col];

                    return args;
                }
            },

            isminor: {
                query: function (row, col) {
                    return this.$dep.isMinor(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start.row, range.start.col];

                    return args;
                }
            },

            isthemecolor: {
                query: function (row, col) {
                    return this.$dep.isThemeColor(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start.row, range.start.col];

                    return args;
                }
            },

            majorfont: {
                exec: function (start, end) {
                    this.$dep.setFontForMajor(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            minorfont: {
                exec: function (start, end) {
                    this.$dep.setFontForMinor(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            fontsize: {
                exec: function (fontsize, start, end) {
                    this.$dep.setFontSize(fontsize, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getFontSize(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            color: {
                exec: function (color, start, end) {
                    this.$dep.setColor(color, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getColor(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            themecolor: {
                exec: function (theme, tint, start, end) {
                    this.$dep.setColorForTheme(theme, tint, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                }
            },

            numfmt: {
                exec: function (code, start, end) {
                    this.$dep.setNumberFormat(code, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getNumberFormat(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            bold: {
                exec: function (start, end) {
                    this.$dep.toggleBold(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.isBold(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            italic: {
                exec: function (start, end) {
                    this.$dep.toggleItalic(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.isItalic(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            underline: {
                exec: function (line, start, end) {
                    this.$dep.setUnderline(line, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getUnderline(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            toggleunderline: {
                exec: function (line, start, end) {
                    this.$dep.toggleUnderline(line, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                }
            },

            throughline: {
                exec: function (start, end) {
                    this.$dep.toggleThroughline(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.hasThroughline(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            fill: {
                exec: function (val, start, end) {
                    this.$dep.setFill(val, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                },

                query: function (row, col) {
                    var result = this.$dep.getFill(row, col);

                    if (result) {
                        return result.value;
                    }

                    return null;
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            horizontal: {
                exec: function (val, start, end) {
                    this.$dep.setHorizontalAlign(val, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getHorizontalAlign(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            vertical: {
                exec: function (val, start, end) {
                    this.$dep.setVerticalAlign(val, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getVerticalAlign(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            wraptext: {
                exec: function (start, end) {
                    this.$dep.toggleWraptext(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.isWraptext(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            settedcellstyle: {
                query: function (styleName, row, col) {
                    return this.$dep.getSettedCellStyle(styleName, row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.start, range.end);

                    return args;
                }
            },

            settedrowstyle: {
                query: function (styleName, row) {
                    return this.$dep.getSettedRowStyle(styleName, row);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.entry.row);

                    return args;
                }
            },

            settedcolumnstyle: {
                query: function (styleName, col) {
                    return this.$dep.getSettedColumnStyle(styleName, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args.push(range.entry.col);

                    return args;
                }
            },

            settedglobalstyle: {
                query: function (styleName) {
                    return this.$dep.getSettedGlobalStyle(styleName);
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            defaultfonts: {
                query: function () {
                    return this.$dep.getDefaultFonts();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            defaultalignments: {
                query: function () {
                    return this.$dep.getDefaultAlignments();
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            fonts: {
                query: function (cells) {
                    return this.$dep.getFonts(cells);
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            alignments: {
                query: function (cells) {
                    return this.$dep.getAlignments(cells);
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            styles: {
                query: function (cells) {
                    return this.$dep.getStyles(cells);
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            cellfonts: {
                query: function (row, col) {
                    return this.$dep.getCellFonts(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            cellalignments: {
                query: function (row, col) {
                    return this.$dep.getCellAlignments(row, col);
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