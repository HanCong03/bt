/**
 * @file 写入控制器状态
 * @author hancong03@baiud.com
 */

define({
    // 正常状态：该状态是非编辑状态。
    NORMAL: 1,
    // 编辑状态：该状态下，方向键不能退出编辑状态。
    EDIT: 2,
    // 输入状态：该状态下，方向键将导致退出编辑状态。
    INPUT: 4
});