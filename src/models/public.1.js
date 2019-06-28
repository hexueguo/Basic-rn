/**
 * @Author: liu.yang
 * @Date: 2018-09-17 18:13:11
 * 公共Model
 */

import * as api from "services/public";

export default {
  namespace: "public",
  state: {
    showVerifyGesture: false, // 是否显示手势密码验证遮盖组件（用于切出App长时间后再进入App、人员管理功能）
    personVerifyState: false, // 是否已完成人员列表的手势密码验证，只需验证一次通过，无需重复验证
  },

  effects: {
    /**
     * 图片上传
     */
    *upload({ payload }, { call }) {
      const res = yield call(api.upload, payload);
      return res;
    },

    /**
     * 获取登录密码加密值
     */
    *getPasswdSalt({ payload }, { call }) {
      const res = yield call(api.getPasswdSalt, payload);
      return res;
    },

    /**
     * 获取手势密码加密值
     */
    *getGestruePasswdSalt({ payload }, { call }) {
      const res = yield call(api.getGestruePasswdSalt, payload);
      return res;
    },

    /**
     * 验证手势密码
     */
    *verifyGestruePwd({ payload }, { call }) {
      const res = yield call(api.verifyGestruePwd, payload);
      return res;
    },

    /**
     * 获取短信验证码
     */
    *getVerifyCode({ payload }, { call }) {
      const res = yield call(api.getVerifyCode, payload);
      return res;
    },
  },
  reducers: {
    // 显示/隐藏-手势密码验证遮盖组件
    "toggle/verifyGesture": (state, { payload }) => ({
      ...state,
      showVerifyGesture: payload.showVerifyGesture || false,
    }),
    // 是否已验证完成人员列表的手势密码
    "change/personVerifyState": (state, { payload }) => ({
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
