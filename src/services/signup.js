/**
 * 注册流程API
 */
import { post } from "utils/fetch";

// 注册第一步，验证学校和手机号码、验证码是否正确
export const checkInfo = param => post("appTerminal/checkInfo", param);

// 接送人注册
export const simpleRegister = param =>
  post("appTerminal/simpleRegister", param);

// 查询宝贝信息
export const selectBabyInfo = param => post("appTerminal/babyInfo", param);

// 添加手势密码
export const addGestruePwd = param => post("gestruePasswd/create", param);

// 注册
export const register = param => post("appTerminal/register", param);
