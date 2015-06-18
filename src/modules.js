/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        env: {
            visualData: require('./env/visual-data'),
            startardSize: require('./env/standard-size'),
            cellSize: require('./env/cell-size'),
            rowData: require('./env/row-data'),
            style: require('./env/style')
        },
        core: {},
        system: {},
        ext: {}
    };
});