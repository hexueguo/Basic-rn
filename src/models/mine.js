import api from "../services/mineService";

// 个人中心
export default {
  namespace: "myCenter",
  state: {
    personData: {},
  },

  effects: {
    // 个人中心-个人信息-查询
    *personDataGet({ payload }, { call, put }) {
      const res = yield call(api.personDataGet, payload);
      const { data = [] } = res;
      yield put({
        type: "save/personData",
        payload: {
          personData: data,
        },
      });
      return res;
    },
  },

  reducers: {
    "save/personData": (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
};
