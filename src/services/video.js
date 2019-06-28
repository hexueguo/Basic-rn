import { post } from "utils/fetch";

// 成长相册查询
export const albumList = param => post("babyGrowingAlbum/get", param);

// 接送记录
export const record = param => post("shuttleRecord/dataForDay", param);

// 在线视频
export const onlineVideo = param => post("video/playList", param);

// 获取某一个摄像头的url
export const getUrl = param => post("app/video/play", param);

// 获取摄像头在线时间
export const getPeriod = param => post("school/video/period", param);
