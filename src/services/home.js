/**
 * 主页
 */
import { get } from "utils/fetch";

// 查询用户的二维码信息
export const getQrCodeUrl = param => get(`getQrCodeUrl/${param}`);
