/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        env: {
            standard: require('./env/standard'),
            theme: require('./env/theme'),
            style: require('./env/style'),
            userStyle: require('./env/user-style'),
            border: require('./env/border'),
            clear: require('./env/clear'),
            comment: require('./env/comment'),
            dimension: require('./env/dimension'),
            mergeCell: require('./env/merge-cell'),
            rowColumn: require('./env/row-column'),
            view: require('./env/view'),
            content: require('./env/content')
        },
        core: {
            //visualData: require('./core/visual-data'),
            rowHeight: require('./core/row-height'),
            rowData: require('./core/row-data'),
            content: require('./core/cell/content'),
            formattedContent: require('./core/cell/formatted-content'),
            displayContent: require('./core/cell/display-content')
            //style: require('./core/style'),
            //cellContent: require('./core/cell/content'),
            //displayContent: require('./core/cell/display-content'),
            //formattedContent: require('./core/cell/formatted-content'),
            //numfmt: require('./core/numfmt/numfmt')
        },
        system: {},
        ext: {}
    };
});