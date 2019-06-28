import { post } from "utils/fetch";

/**
 * 消息中心
 */

// 消息中心 - 消息列表 - 查询
const messageListGet = data => post("publishMessage/list", data);

// 消息中心 - 消息详情
const messageDetailGet = data => post("publishMessage/details", data);

// 消息中心 - 消息详情-更新已读状态
const updateReadStatus = data => post("publishMessage/updateReadStatus", data);

export default {
  messageListGet,
  messageDetailGet,
  updateReadStatus,
};
