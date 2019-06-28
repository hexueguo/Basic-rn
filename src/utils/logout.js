/**
 * 注销用户相关方法
 */
import { storage } from "@cbd/utils-rn";
import { NavigationActions } from "react-navigation";

/**
 * 注销用户请求
 * @param {*} dispatch
 * @param {*} userName
 * @param {*} callback
 */
export const logoutRequest = (dispatch, userName, callback) => {
  if (dispatch && typeof dispatch === "function") {
    dispatch({
      type: "login/loginOut",
      payload: {
        userName, // 用户名
      },
    }).then(() => {
      // if (res && res.errCode === "0") {
      callback();
      // }
    });
  }
};

/**
 * 清除用户信息，跳转到登录页
 * @param {*} callback
 */
export const clearUserInfo = (callback = () => {}) => {
  storage.set("userInfo", null).then(() => {
    GLOBAL.userInfo = {};
    const navigateAction = NavigationActions.navigate({ routeName: "Login" });
    global.app.getStore().dispatch(navigateAction);
    // 关闭手势密码验证组件遮盖
    global.app.getStore().dispatch({
      type: "public/toggle/verifyGesture",
      payload: {
        showVerifyGesture: false,
      },
    });
    callback();
  });
};
