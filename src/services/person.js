import { post } from "utils/fetch";

// 接送人员列表
export const list = param => post("guardian/list", param);

// 置顶接送人
export const top = param => post("guardian/top", param);

// 删除接送人
export const del = param => post("guardian/delete", param);

// 权限打开/关闭
export const auth = param => post("guardian/close", param);

// 添加接送人
export const add = param => post("guardian/add", param);
