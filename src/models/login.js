/**
 * 登录模块（包括：登录、注销登录、忘记密码；但不含注册流程相关接口）
 */
import { loginAccount, resetPassword, loginOut } from "../services/login";

export default {
  namespace: "login",
  state: {},

  effects: {
    // 账号密码登录
    *loginAccount({ payload }, { call }) {
      const res = yield call(loginAccount, payload);
      return res;
    },

    // 重设密码
    *resetPassword({ payload }, { call }) {
      const res = yield call(resetPassword, payload);
      return res;
    },

    // 注销
    *loginOut({ payload }, { call }) {
      const res = yield call(loginOut, payload);
      return res;
    },
  },
  reducers: {},
  // subscriptions: {
  //   setup({ dispatch }) {
  //     dispatch({ type: 'loadStorage' })
  //   },
  // },
};
