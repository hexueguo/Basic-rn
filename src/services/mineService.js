import { post } from "utils/fetch";

/**
 * 我的个人中心
 */

// 个人中心-个人信息
const personDataGet = data => post("personCenter/query", data);

export default {
  personDataGet,
};
