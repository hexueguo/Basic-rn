/**
 * 登录流程
 * 包括：登录相关接口、重设密码、注销登录
 * 不含注册流程相关接口
 */
import { post } from "utils/fetch";

// 登录接口--通过账号登录
export const loginAccount = param => post("appTerminal/login", param);

// 登录接口--通过手势登录
export const loginGesture = param => post("gestruePasswd/login", param);

// 注销登录
export const loginOut = param => post("appTerminal/logout", param);

// 忘记密码--重设密码
export const resetPassword = param => post("appTerminal/forgetPwd", param);
