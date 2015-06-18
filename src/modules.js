/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        env: {
            standardSize: require('./env/standard-size'),
            theme: require('./env/theme'),
            style: require('./env/style'),
            userStyle: require('./env/user-style'),
            border: require('./env/border'),
            clear: require('./env/clear'),
            comment: require('./env/comment'),
            dimension: require('./env/dimension'),
            mergeCell: require('./env/merge-cell'),
            rowColumn: require('./env/row-column')
        },
        core: {
            //visualData: require('./core/visual-data'),
            //cellSize: require('./core/cell-size'),
            //rowData: require('./core/row-data'),
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