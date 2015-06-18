/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        env: {
            startardSize: require('./env/standard-size')
        },
        core: {
            visualData: require('./core/visual-data'),
            cellSize: require('./core/cell-size'),
            rowData: require('./core/row-data'),
            style: require('./core/style')
        },
        system: {},
        ext: {}
    };
});