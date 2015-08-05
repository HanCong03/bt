var workbook = {
    // 当前活动工作表
    active: 0,

    sheetNames: [{
        name: 'Sheet1'
    }, {
        name: 'Sheet2'
    }],

    sheets: [{
        // 视图设置
        view: {
            // 是否显示窗格线
            //showGridLine: true,
            // 是否显示行列标题栏
            //showRowColHeader: true,
            // 窗格信息
            //pane: {
            //    start: {
            //        row: -1,
            //        col: -1
            //    },
            //    end: {
            //        row: -1,
            //        col: -1
            //    }
            //},

            // 标准行高
            //rowHeight: 13.5,
            // 标准列宽
            //colWidth: 8.38,

            //zeroHeight: false,
            //zeroWidth: false
        },
        cell: {
            rows: [{
                row: 1,

                // 手动设置的高度值
                //height: 100,

                // 自适应高度
                //bestFit: 1,

                // 是否隐藏当前行
                //hidden: false,

                cells: [{
                    col: 1,

                    // 数组公式
                    //array: {
                    //    // 公式引用起点
                    //    start: {row: 1, col: 1},
                    //    // 公式引用终点
                    //    end: {row: 3, col: 3},
                    //    formula: '=a1+a2'
                    //},

                    // 普通公式
                    //formula: '=a1+a2',

                    // 单元格注解索引
                    //comment: 0,
                    // 超链接索引
                    //hyperlink: 0,
                    // 单元格类型: s -> 'string', n -> 'number', l -> 'logical', e -> 'error'
                    type: 's',
                    // 单元格值（所有值都是字符串）
                    value: '120'
                }]
            }],

            // 列属性
            cols: [{
                // 列索引的起始索引和终止索引
                col: [1, 1],

                // 手动设置的列宽度
                //width: -1,
                // 自适应宽度
                //bestFit: 1,
                // 是否隐藏
                //hidden: false

                // 样式索引
                s: 1
            }]
        },

        // 合并单元格记录
        mergeCells: [{
            start: {
                row: 1,
                col: 1
            },
            end: {
                row: 2,
                col: 2
            }
        }],
        // 超链接列表
        hyperlinks: [{
            link: 'http://www.baidu.com/'
        }],
        // 注解列表
        comments: [{
            content: '你好，我是注解'
        }]
    }],

    // 书写方向: ltr, rtl
    dir: 'ltr',

    // 主题
    theme: [{
        name: 'office 主题',
        font: {
            name: 'Office',
            // 主字体
            major: {
                // latin语言字体
                latin: 'Cambria',
                // 东亚语言字体
                ea: '宋体'
            },
            // 副字体
            minor: {
                // latin语言字体
                latin: 'Calibri',
                // 东亚语言字体
                ea: '宋体'
            }
        },
        // 颜色， 按注释顺序存储
        color: {
            name: 'Office',
            values: [
                // lt1
                'ffffff',
                // dk1
                '000000',
                // lt2
                'e7e6e6',
                // dk2
                '44546a',
                // accent1
                '5b9bd5',
                // accent2
                'ed7d31',
                // accent3
                'a5a5a5',
                // accent4
                'ffc000',
                // accent5
                '4472c4',
                // accent6
                '70ad47',
                // hlink
                '0563c1',
                // folHlink
                '954f72'
            ]
        }
    }],

    // 名称定义
    names: [{
        name: '税率',
        // 所属工作表索引
        sheet: 0,
        // 名称作用域
        scope: 0,
        // 注释
        comment: 'comment',
        // 引用区域
        ref: {
            start: {
                row: 0,
                col: 1
            },
            end: {
                row: 3,
                col: 4
            }
        }
    }],

    styleSheet: {
        numfmts: [{
            id: 44,
            code: '0.00'
        }],
        fonts: [{
            size: 11,
            // 颜色有两种表示形式
            //color: {
            //    theme: 1,
            //    tint: 0.5
            //}
            color: '#ff0000',
            name: '宋体',
            minor: true,
            major: false,
            bold: false,
            italic: false,
            // underline: "single" or "double" or "none"
            underline: 'single',
            throughline: true
        }],
        fills: [{
            type: 'solid',
            //color: {
            //    theme: 1,
            //    tint: 0.3
            //}
            color: '#ff0000'
        }],
        borders: [{
            top: {
                style: 'thin',
                //color: {
                //    theme: 1,
                //    tint: 0.3
                //}
                color: '#ff0000'
            },
            bottom: null,
            right: null,
            left: null
        }],

        // 普通样式列表
        cellXfs: [{
            numfmts: 0,
            fonts: 0,
            fills: 0,
            borders: 0,
            alignments: {
                // left, right, center
                horizontal: 'right',
                wraptext: true,
                // top, middle, bottom
                vertical: 'middle'
            },
            xf: 0,

            applyNumfmt: 0,
            applyFont: 0,
            applyFill: 0,
            applyBorder: 0,
            applyAlignment: 0
        }],

        // 单元格样式列表
        cellStyleXfs: [{
            numfmts: 0,
            fonts: 0,
            fills: 0,
            borders: 0,
            alignments: {
                // left, right, center
                horizontal: 'right',
                wraptext: true,
                // top, middle, bottom
                vertical: 'middle'
            },

            applyNumfmt: 1,
            applyFont: 1,
            applyFill: 1,
            applyBorder: 1,
            applyAlignment: 1
        }],

        // 单元格样式引用关系
        cellStyles: [{
            // 名称
            name: '常规',
            // 单元格样式id
            xfId: 0,
            // 是否是用户自定义
            //custom: 1,
            builtinId: 0
        }]
    }
};