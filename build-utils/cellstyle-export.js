/**
 * @file 单元格样式导出
 * @author hancong03@baiud.com
 */

var parseString = require('xml2js').parseString;
var NM_FS = require('fs');
var CellStyles = {};

var XFSTYLES = null;
var FONTS = null;
var FILLS = null;
var NUMFMTS = null;
var BORDERS = null;
var ALIGNMENTS = null;

var BUILTIN_NUMFMTS = {
    0: 'General',
    1: '0',
    2: '0.00',
    3: '#,##0',
    4: '#,##0.00',
    5: '$#,##0;\-$#,##0',
    6: '$#,##0;[Red]\-$#,##0',
    7: '$#,##0.00;\-$#,##0.00',
    8: '$#,##0.00;[Red]\-$#,##0.00',
    9: '0%',
    10: '0.00%',
    11: '0.00E+00',
    12: '# ?/?',
    13: '# ??/??',
    14: 'mm-dd-yy',
    15: 'd-mmm-yy',
    16: 'd-mmm',
    17: 'mmm-yy',
    18: 'h:mm AM/PM',
    19: 'h:mm:ss AM/PM',
    20: 'h:mm',
    21: 'h:mm:ss',
    22: 'm/d/yy h:mm',

    37: '#,##0 ;(#,##0)',
    38: '#,##0 ;[Red](#,##0)',
    39: '#,##0.00;(#,##0.00)',
    40: '#,##0.00;[Red](#,##0.00)',

    44: '_ "¥"* #,##0.00_ ;_ "¥"* \\-#,##0.00_ ;_ "¥"* "-"??_ ;_ @_ ',
    45: 'mm:ss',
    46: '[h]:mm:ss',
    47: 'mmss.0',
    48: '##0.0E+0',
    49: '@',

    27: '[$-404]yyyym/d',
    30: 'm/d/yy',
    36: '[$-404]yyyym/d',
    50: '[$-404]yyyym/d',
    57: '[$-404]yyyym/d',

    59: '0',
    60: '0.00',
    61: '#,##0',
    62: '#,##0.00',
    67: '0%',
    68: '0.00%',
    69: '# ?/?',
    70: '# ??/??',
};

parseString(NM_FS.readFileSync('./cellstyle/styles.xml', {
    encoding: 'UTF-8'
}), function (err, result) {
    start(result.styleSheet);
});


function start(xml) {
    XFSTYLES = xml.cellStyleXfs[0].xf;
    FONTS = xml.fonts[0].font;
    NUMFMTS = parseNumberFormat(xml.numFmts[0].numFmt);
    FILLS = xml.fills[0].fill;
    BORDERS = xml.borders[0].border;

    var cellStyles = xml.cellStyles[0].cellStyle;

    cellStyles.forEach(function (item, index) {
        processItem(item.$);
    });

    NM_FS.writeFileSync('./test.json', JSON.stringify(CellStyles, null, 4), {
        encoding: 'UTF-8'
    });
}

function parseNumberFormat(numfmts) {
    var result = {};

    for (var i = 0, len = numfmts.length; i < len; i++) {
        result[numfmts[i].$.numFmtId] = {
            code: numfmts[i].$.formatCode
        }
    }

    return result;
}

function processItem(item) {
    CellStyles[item.builtinId] = {
        name: item.name,
        format: processStyles(item.xfId)
    };
}

function processStyles(xfid) {
    var result = {};
    var styles = XFSTYLES[xfid].$;

    if (styles.applyFont !== '0') {
        processFont(result, styles.fontId);
    }

    if (styles.applyFill !== '0') {
        processFill(result, styles.fillId);
    }

    if (styles.applyAlignment !== '0') {
        processAlignment(result, styles);
    }

    if (styles.applyNumberFormat !== '0') {
        processNumFmt(result, styles.numFmtId);
    }

    if (styles.applyBorder !== '0') {
        processBorder(result, styles.borderId);
    }

    return result;
}

function processNumFmt(result, id) {
    if (NUMFMTS[id]) {
        result.numfmts = {
            numfmt: NUMFMTS[id].code
        };
    } else {
        result.numfmts = {
            numfmt: BUILTIN_NUMFMTS[id]
        };
    }
}

function processFont(result, id) {
    result.fonts = {
        name: processFontName(id),
        size: processFontSize(id),
        color: processFontColor(id),
        bold: processBold(id),
        italic: processItalic(id)
    };
}

function processFontName(id) {
    var fonts = FONTS[id];

    if (fonts.scheme) {
        return {
            type: fonts.scheme[0].$.val
        };
    }

    return {
        value: fonts.name[0].$.val
    };
}

function processFontSize(id) {
    var fonts = FONTS[id];
    return +fonts.sz[0].$.val;
}

function processFontColor(id) {
    var fonts = FONTS[id];

    if (fonts.color[0].$.theme) {
        return {
            theme: +fonts.color[0].$.theme,
            tint: fonts.color[0].$.tint ? +fonts.color[0].$.tint : 0
        };
    }

    return '#' + fonts.color[0].$.rgb.substring(2);
}

function processBold(id) {
    var fonts = FONTS[id];
    return !!fonts.b;
}

function processItalic(id) {
    var fonts = FONTS[id];
    return !!fonts.i;
}

function processFill(result, id) {
    if (!FILLS[id].patternFill[0].fgColor) {
        return null;
    }

    var fgColor = FILLS[id].patternFill[0].fgColor[0].$;

    if (fgColor.rgb) {
        result.fills = {
            fill: {
                value: '#' + fgColor.rgb.substring(2)
            }
        };
    }

    result.fills = {
        fill: {
            theme: +fgColor.theme,
            tint: fgColor.tint ? +fgColor.tint : 0
        }
    };
}


function processBorder(result, id) {
    var left = BORDERS[id].left[0];
    var right = BORDERS[id].right[0];
    var bottom = BORDERS[id].bottom[0];
    var top = BORDERS[id].top[0];

    if (!top && !left && !right && !bottom) {
        return;
    }

    result.borders = {
        border: {
            top: getBorder(top),
            right: getBorder(right),
            left: getBorder(left),
            bottom: getBorder(bottom)
        }
    };

    function getBorder(data) {
        if (!data) {
            return null;
        }

        if (data.color[0].$.theme) {
            return {
                style: data.$.style,
                color: {
                    theme: +data.color[0].$.theme,
                    tint: data.color[0].$.tint ? +data.color[0].$.tint : 0
                }
            };
        } else {
            return {
                style: data.$.style,
                color: {
                    value: '#' + data.color[0].$.rgb.substring(2)
                }
            };
        }
    }
}

function processAlignment(result, styles) {
    //console.log(styles)
}