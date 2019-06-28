import { post } from "utils/fetch";

// 图片上传
export const upload = param => post("oss/uploadByBase", param);

// 验证手势密码
export const verifyGestruePwd = param => post("gestruePasswd/verify", param);

// 获取短信验证码
export const getVerifyCode = param => post("appTerminal/sendVerifyCode", param);

// 获取登录密码加密值
export const getPasswdSalt = param => post("appTerminal/salt ", param);

// 获取手势密码加密值
export const getGestruePasswdSalt = param => post("gestruePasswd/salt", param);
