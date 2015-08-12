/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass({
        base: require('command'),

        $dep: 'border',

        commands: {
            border: {
                exec: function (borderOptions, start, end) {
                    this.$dep.setBorder(borderOptions, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getBorder(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            borders: {
                query: function (cells) {
                    return this.$dep.getBorders(cells);
                },

                query_arguments: function (args) {
                    return args;
                }
            },

            clearborder: {
                exec: function (start, end) {
                    this.$dep.unsetBorder(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            leftborder: {
                exec: function (borderOptions, start, end) {
                    this.$dep.addLeftBorder(borderOptions, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getLeftBorder(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            rightborder: {
                exec: function (borderOptions, start, end) {
                    this.$dep.addRightBorder(borderOptions, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getRightBorder(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            rightborder: {
                exec: function (borderOptions, start, end) {
                    this.$dep.addRightBorder(borderOptions, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getRightBorder(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            topborder: {
                exec: function (borderOptions, start, end) {
                    this.$dep.addTopBorder(borderOptions, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getTopBorder(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            bottomborder: {
                exec: function (borderOptions, start, end) {
                    this.$dep.addBottomBorder(borderOptions, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getBottomBorder(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            outerborder: {
                exec: function (borderOptions, start, end) {
                    this.$dep.addOuterBorder(borderOptions, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    return this.$dep.getOuterBorder(row, col);
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            innerborder: {
                exec: function (borderOptions, start, end) {
                    this.$dep.addInnerBorder(borderOptions, start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                },

                query: function (row, col) {
                    console.log('未实现');
                },

                query_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.entry.row, range.entry.col];

                    return args;
                }
            },

            clearleftborder: {
                exec: function (start, end) {
                    this.$dep.removeLeftBorder(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            cleartopborder: {
                exec: function (start, end) {
                    this.$dep.removeTopBorder(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            clearrightborder: {
                exec: function (start, end) {
                    this.$dep.removeRightBorder(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            clearbottomborder: {
                exec: function (start, end) {
                    this.$dep.removeBottomBorder(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            clearouterborder: {
                exec: function (start, end) {
                    this.$dep.removeOuterBorder(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            },

            clearinnerborder: {
                exec: function (start, end) {
                    this.$dep.removeInnerBorder(start, end);
                },

                exec_arguments: function (args) {
                    var range = this.getActiveRange();
                    args = [range.start, range.end];

                    return args;
                }
            }
        }
    });
});