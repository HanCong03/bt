/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        __syncContent: function () {

            var row = this.__cellStart.row;
            var col = this.__cellStart.col;

            var formattedContent = this.rs('get.formatted.content', row, col);

            if (!formattedContent) {
                return;
            }

            var userContent = formattedContent.split(/\n/g);

            for (var i = 0, len = userContent.length; i < len; i++) {
                userContent[i] = '<div>' + (userContent[i] || '<br/>') + '</div>';
            }

            userContent = userContent.join('');

            this.inputNode.innerHTML = userContent;

            // 根据内容获取大小
            var rect = this.__calculateContentRect(userContent);

            this.__relocation(rect);
        },

        __resetUserContent: function () {
            this.inputNode.innerHTML = '<div><br/></div>';
        },

        __getUserContent: function () {
            return parseContent(this.inputNode);
        },

        /**
         * 由于手动修改的内容不触发事件，所以需要主动调用以便同步输入框大小
         * @private
         */
        __newLine: function () {
            this.__input();
        }
    };

    function parseContent(node) {
        var childs = node.childNodes;
        var current;
        var contents = [];

        for (var i = 0, len = childs.length; i < len; i++) {
            current = childs[i];

            if (current.nodeType === 3) {
                contents.push(current.data);
            } else if (current.nodeType === 1) {
                contents.push(current.innerText);
            }
        }

        return contents.join('\uFEFF').replace(/\n/g, '').split('\uFEFF').join('\n');
    }
});