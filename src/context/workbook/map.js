/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        value: require('./commands/value'),
        style: require('./commands/style'),
        comment: require('./commands/comment'),
        view: require('./commands/view'),
        mergeCell: require('./commands/merge-cell'),
        clear: require('./commands/clear'),
        rowColumn: require('./commands/row-column'),
        border: require('./commands/border'),
        theme: require('./commands/theme'),
        dimension: require('./commands/dimension')
    };
});