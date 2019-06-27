import { delay } from "../utils";

export default {
  namespace: "home",
  state: {
    title: "...",
  },

  effects: {
    *fetch(_, { call, put }) {
      yield call(delay, 4000);
      yield put({ type: "save/title", payload: "首页" });
    },
  },
  reducers: {
    "save/title": (state, { payload }) => ({ ...state, title: payload }),
  },
  // subscriptions: {
  //   setup({ dispatch }) {
  //     dispatch({ type: 'loadStorage' })
  //   },
  // },
};
