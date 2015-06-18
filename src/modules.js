/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        env: {
            startardSize: require('./env/standard-size'),
            theme: require('./env/theme'),
            style: require('./env/style')
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