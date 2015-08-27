/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {

    module.exports = {
        __paste: function (evt) {
            evt.stopPropagation();
            evt.preventDefault();

            var heap = this.getWorkbookHeap();
            var data = heap.data;

            if (!data) {
                alert("暂不支持外部数据的复制粘贴");
            }

            var range = this.queryCommandValue('range');

            if (data.type === 'copy') {
                this.rs('copy', data.range, range);
            } else {
                this.rs('cut', data.range, range);
            }
        }
    };
});