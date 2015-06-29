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
            columnWidth: require('./core/column-width'),
            rowHeight: require('./core/row-height'),
            content: require('./core/cell/content'),
            formattedContent: require('./core/cell/formatted-content'),
            displayContent: require('./core/cell/display-content'),
            numfmt: require('./core/numfmt/numfmt'),
            visualData: require('./core/visual-data/visual-data')
        },
        system: {
            render: require('./system/render/render'),
            control: require('./system/control/control'),
            selection: require('./system/selection/selection'),
            input: require('./system/input/input')
        },
        ext: {}
    };
});