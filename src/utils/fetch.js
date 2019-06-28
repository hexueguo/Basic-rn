import { Toast } from "@ant-design/react-native";
import config from "config";
import { getQuery } from "./index";
import { clearUserInfo } from "./logout";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  const error = new Error(response.statusText);
  error.errCode = response.errCode;
  error.errortext = errortext;
  throw error;
}

// 业务成功检查
const checkCode = response => {
  const { errCode } = config;
  // 登录的权限失效
  if (`${response.errCode}` === "1000000") {
    // 清除用户信息，跳转到登录页
    Toast.info("登录已过期！", 1);
    clearUserInfo();
    return response;
  } else if (`${response.errCode}` === `${errCode}`) {
    // 正常的请求返回
    return response;
  }
  // if (`${response.errCode}` === "-1" || `${response.errCode}` === -1) {
  //   // 权限无效处理
  //   // 强迫刷新页面到login
  //   if (errRedirectURL && !/\/login/.test(window.location.href)) {
  //     window.location.href = errRedirectURL;
  //   }
  // }

  // 错误的返回处理
  const errortext = response.errMsg || "后端接口返回异常";
  const error = new Error(response.errCode);
  error.errCode = response.errCode;
  error.errortext = errortext;
  throw error;
};

const _fetch = (url, params, headers = {}) => {
  return fetch(url, {
    credentials: "include",
    ...params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  })
    .then(checkStatus)
    .then(response => response.json())
    .then(checkCode)
    .catch(err => {
      const { errortext } = err;
      // if (errCode <= 504 && errCode >= 500) {
      //   router.push("/exception/500");
      // }
      // if (errCode >= 404 && errCode < 422) {
      //   router.push("/exception/404");
      // }
      // if (errCode === "-1") {
      //   router.push(`/exception/500?msg=${errortext}`);
      // }
      Toast.fail(errortext, 2);
      return { ...err, message: JSON.stringify({ url, params }) };
    });
};

export const get = (url, query, headers) => {
  const {
    server: { target = "" },
  } = config;
  const url2 = query ? `${target}${url}?${getQuery(query)}` : `${target}${url}`;
  return _fetch(
    url2,
    {
      method: "GET",
    },
    {
      ...headers,
      // verifyCode: "17c024f9-719b-4121-91ef-9a0d38dab71b",
    }
  );
};

export const post = (url, body, headers) => {
  const {
    server: { target = "" },
  } = config;
  return _fetch(
    `${target}${url}`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    {
      ...headers,
      // verifyCode: "17c024f9-719b-4121-91ef-9a0d38dab71b",
    }
  );
};
