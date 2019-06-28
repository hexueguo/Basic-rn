/**
 * 学校查询
 */
import { post } from "utils/fetch";

// 学校查询
export const selectSchool = param => post("school/list", param);

// 学校查询--通过位置进行范围查询
export const selectByPosition = param => post("school/list", param);

// 学校查询--通过关键字查询
// export const selectByKeyword = param => post("/school/list", param);
