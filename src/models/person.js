/**
 * @Author: liu.yang
 * @Date: 2018-09-17 18:13:11
 * 公共Model
 */

import * as api from "services/person";

export default {
  namespace: "person",
  state: {
    personList: [],
  },

  effects: {
    /**
     * 接送人员列表
     */
    *list({ payload }, { call, put }) {
      const res = yield call(api.list, payload);
      const { data = [], errCode = "" } = res;
      if (errCode !== "0") return;
      yield put({
        type: "save/personList",
        payload: { personList: data instanceof Array ? data : [] },
      });
      return res;
    },

    /**
     * 置顶接送人
     */
    *top({ payload }, { call }) {
      const res = yield call(api.top, payload);
      return res;
    },

    /**
     * 删除接送人
     */
    *del({ payload }, { call }) {
      const res = yield call(api.del, payload);
      return res;
    },

    /**
     * 关闭/打开权限
     */
    *auth({ payload }, { call }) {
      const res = yield call(api.auth, payload);
      return res;
    },

    /**
     * 新增接送人
     */
    *add({ payload }, { call }) {
      const res = yield call(api.add, payload);
      return res;
    },
  },
  reducers: {
    "save/personList": (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  // subscriptions: {
  //   setup({ dispatch }) {
  //     dispatch({ type: 'loadStorage' })
  //   },
  // },
};
