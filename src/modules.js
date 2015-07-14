/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        env: {
            _renderInfo: require('./env/_render-info'),
            standard: require('./env/standard'),
            theme: require('./env/theme'),
            style: require('./env/style'),
            cellStyle: require('./env/cell-style'),
            typeStyle: require('./env/type-style'),
            userStyle: require('./env/user-style'),
            border: require('./env/border'),
            clear: require('./env/clear'),
            comment: require('./env/comment'),
            hyperlink: require('./env/hyperlink'),
            dimension: require('./env/dimension'),
            mergeCell: require('./env/merge-cell'),
            rowColumn: require('./env/row-column'),
            view: require('./env/view'),
            content: require('./env/content'),
            insert: require('./env/insert'),
            formatBrush: require('./env/format-brush')
        },
        core: {
            columnWidth: require('./core/column-width'),
            rowHeight: require('./core/row-height'),
            content: require('./core/cell/content'),
            formattedContent: require('./core/cell/formatted-content'),
            displayContent: require('./core/cell/display-content'),
            numfmt: require('./core/numfmt/numfmt'),
            visualData: require('./core/visual-data/visual-data'),
            selection: require('./core/selection/selection'),
            rowColumn: require('./core/row-column'),
            hyperlink: require('./core/hyperlink')
        },
        system: {
            rect: require('./system/rect/rect'),
            render: require('./system/render/render'),
            control: require('./system/control/control'),
            selection: require('./system/selection/selection'),
            input: require('./system/input/input'),
            scroll: require('./system/scroll/scroll'),
            scrollbar: require('./system/scrollbar/scrollbar'),
            header: require('./system/header/header'),
            comment: require('./system/comment/comment'),
            hyperlink: require('./system/hyperlink/hyperlink')
        },
        ext: {}
    };
});