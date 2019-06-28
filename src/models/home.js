/**
 * 登录模块（包括：登录、注销登录、忘记密码；但不含注册流程相关接口）
 */
import { getQrCodeUrl } from "../services/home";

export default {
  namespace: "home",
  state: {},

  effects: {
    // 获取二维码
    *getQrCodeUrl({ payload }, { call }) {
      const res = yield call(getQrCodeUrl, payload);
      return res;
    },
  },
  reducers: {
    render: state => ({
      ...state,
    }),
  },
  // subscriptions: {
  //   setup({ dispatch }) {
  //     dispatch({ type: 'loadStorage' })
  //   },
  // },
};
