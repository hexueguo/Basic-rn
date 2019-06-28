import api from "../services/messageService";

/**
 * 消息中心Model
 */
export default {
  namespace: "messageCenter",
  state: {
    messageList: [], // 通知列表数据列表
    messageDetail: {}, // 通知列表详情
    total: 0, // 通知列表总数
    feach: false, // 判断是否加载完成
  },

  effects: {
    /**
     * 消息通知列表查询接口
     */
    *messageListGet({ payload }, { call, put }) {
      yield put({ type: "save/feach", payload: true });
      const res = yield call(api.messageListGet, payload);
      yield put({ type: "save/feach", payload: false });
      const { errCode, data = [], totalCount } = res;

      if (errCode === "0") {
        yield put({ type: "save/totalCount", payload: totalCount });
        yield put({
          type: "save/messageList",
          payload: {
            messageList: data,
          },
        });
      }
      return res;
    },
    /**
     * 消息详情获取接口
     */
    *messageDetailGet({ payload }, { call, put }) {
      yield put({ type: "save/feach", payload: true });
      const res = yield call(api.messageDetailGet, payload);
      yield put({ type: "save/feach", payload: false });
      const { data = {} } = res;
      yield put({
        type: "save/messageDetail",
        payload: {
          messageDetail: data,
        },
      });
      return res;
    },
    // 更改已读状态
    *updateReadStatus({ payload }, { call }) {
      const res = yield call(api.updateReadStatus, payload);
      return res;
    },
  },

  reducers: {
    "save/messageList": (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    "save/messageDetail": (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    "save/totalCount": (state, { payload }) => ({
      ...state,
      total: payload,
    }),
    "save/feach": (state, { payload }) => ({
      ...state,
      feach: payload,
    }),
  },
};
