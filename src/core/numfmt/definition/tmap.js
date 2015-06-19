/**
 * @file 解析类型到单元格值类型的映射关系
 * @author hancong03@baiud.com
 */

define({
    /*
     s => 'string',
     n => 'number',
     ns => 'number_string',
     f => 'formula',
     t => 'time',
     dt = > 'datetime',
     c => 'currency',
     u => 'custom === > user',
     a => 'accountant',
     p => 'percent',
     f => 'fraction',
     sc => 'scientific'
     */

    number: 'n',
    currency: 'c',
    date: 'dt',
    time: 't',
    datetime: 'dt',
    percentage: 'p',
    fraction: 'f',
    scientific: 'sc',
    text: 's',
    logical: 'l',
    error: 'e'
});