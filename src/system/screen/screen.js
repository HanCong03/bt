/**
 * @file 渲染画布对象
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Screen', {
        visibleCanvas: null,
        invisibleCanvas: null,

        visibleCtx: null,
        invisibleCtx: null,

        className: null,
        parent: null,

        width: -1,
        height: -1,
        zoom: 1,

        constructor: function (zoom, className, container, width, height) {
            this.className = className;
            this.width = width;
            this.height = height;
            this.zoom = zoom;

            this.visibleCanvas = document.createElement('canvas');
            this.visibleCanvas.className = 'btb-screen ' + className;

            this.invisibleCanvas = document.createElement('canvas');
            this.invisibleCanvas.className = 'btb-screen ' + className;

            this.__update(this.visibleCanvas, width, height, zoom);
            this.__update(this.invisibleCanvas, width, height, zoom);

            this.visibleCtx = this.visibleCanvas.getContext('2d');
            this.invisibleCtx = this.invisibleCanvas.getContext('2d');

            this.parent = container;
            container.appendChild(this.visibleCanvas);
        },

        __update: function (node, width, height, zoom) {
            node.width = width * zoom;
            node.height = height * zoom;
            node.style.width = width + 'px';
            node.style.height = height + 'px';
            node.getContext('2d').scale(zoom, zoom);
        },

        resetZoom: function (zoom) {
            this.zoom = zoom;
            this.__update(this.visibleCanvas, this.width, this.height, this.zoom);
            this.__update(this.invisibleCanvas, this.width, this.height, this.zoom);
        },

        resize: function (width, height) {
            this.width = width;
            this.height = height;

            this.__update(this.visibleCanvas, this.width, this.height, this.zoom);
            this.__update(this.invisibleCanvas, this.width, this.height, this.zoom);
        },

        setCompositeOperation: function (type) {
            this.invisibleCtx.globalCompositeOperation = type;
        },

        clear: function () {
            this.invisibleCanvas.width = this.invisibleCanvas.width;
            this.invisibleCtx.scale(this.zoom, this.zoom);
        },

        getWidth: function () {
            return this.invisibleCanvas.width;
        },

        getHeight: function () {
            return this.invisibleCanvas.height;
        },

        sync: function () {
            this.invisibleCtx.drawImage(this.visibleCanvas, 0, 0);
        },

        toggle: function () {
            this.parent.replaceChild(this.invisibleCanvas, this.visibleCanvas);

            // 擦除换下来的画布内容
            this.visibleCanvas.width = this.visibleCanvas.width;
            this.visibleCtx.scale(this.zoom, this.zoom);

            var tmp = this.invisibleCanvas;
            this.invisibleCanvas = this.visibleCanvas;
            this.visibleCanvas = tmp;

            tmp = this.invisibleCtx;
            this.invisibleCtx = this.visibleCtx;
            this.visibleCtx = tmp;
        },

        beginPath: function () {
            this.invisibleCtx.beginPath();
        },

        closePath: function () {
            this.invisibleCtx.closePath();
        },

        save: function () {
            this.invisibleCtx.save();
        },

        fillColor: function (color) {
            this.invisibleCtx.fillStyle = color;
        },

        fillPattern: function (pattern) {
            this.invisibleCtx.fillStyle = pattern;
        },

        fill: function () {
            this.invisibleCtx.fill();
        },

        stroke: function () {
            this.invisibleCtx.stroke();
        },

        getVisibleImageData: function (x, y, width, height) {
            x = x || 0;
            y = y || 0;
            width = width || this.visibleCanvas.width;
            height = height || this.visibleCanvas.height;

            return this.visibleCtx.getImageData(x, y, width, height);
        },

        getInvisibleImageData: function (x, y, width, height) {
            x = x || 0;
            y = y || 0;
            width = width || this.invisibleCanvas.width;
            height = height || this.invisibleCanvas.height;

            return this.invisibleCtx.getImageData(x, y, width, height);
        },

        putImageData: function (imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
            this.invisibleCtx.putImageData.apply(this.invisibleCtx, arguments);
        },

        createPattern: function (image, repetition) {
            return this.invisibleCtx.createPattern(image, repetition);
        },

        strokeColor: function (color) {
            this.invisibleCtx.strokeStyle = color;
        },

        restore: function () {
            this.invisibleCtx.restore();
        },

        line: function (x1, y1, x2, y2) {
            this.invisibleCtx.moveTo(x1, y1);
            this.invisibleCtx.lineTo(x2, y2);
        },

        moveTo: function (x, y) {
            this.invisibleCtx.moveTo(x, y);
        },

        lineTo: function (x, y) {
            this.invisibleCtx.lineTo(x, y);
        },

        hline: function (x, y, width) {
            this.line(x, y, x + width, y);
        },

        vline: function (x, y, height) {
            this.line(x, y, x, y + height);
        },

        translate: function (x, y) {
            this.invisibleCtx.translate(x, y);
        },

        textBaseline: function (val) {
            this.invisibleCtx.textBaseline = val;
        },

        textAlign: function (val) {
            this.invisibleCtx.textAlign = val;
        },

        fillText: function (content, x, y) {
            this.invisibleCtx.fillText(content + '', x, y);
        },

        strokeText: function (content, x, y) {
            this.invisibleCtx.strokeText(content + '', x, y);
        },

        fillRect: function (x, y, width, height) {
            this.invisibleCtx.fillRect(x, y, width, height);
        },

        strokeRect: function (x, y, width, height) {
            this.invisibleCtx.strokeRect(x, y, width, height);
        },

        setLineDashOffset: function (val) {
            this.invisibleCtx.lineDashOffset = val;
        },

        setLineWidth: function (val) {
            this.invisibleCtx.lineWidth = val;
        },

        measureText: function (text) {
            return this.invisibleCtx.measureText(text);
        },

        setLineDash: function (val) {
            this.invisibleCtx.setLineDash(val);
        },

        rect: function (x, y, width, height) {
            this.invisibleCtx.rect(x, y, width, height);
        },

        font: function (font) {
            this.invisibleCtx.font = font;
        },

        clip: function () {
            this.invisibleCtx.clip();
        },

        clearRect: function (x, y, width, height) {
            this.invisibleCtx.clearRect(x, y, width, height);
        }
    });
});