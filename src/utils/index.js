import {
  StyleSheet,
  PermissionsAndroid,
  findNodeHandle,
  UIManager,
} from "react-native";
import forge from "node-forge";
import ImagePicker from "react-native-image-picker";
import { wgs84togcj02 } from "./coordinateTransfer";

// export { NavigationActions, StackActions } from "react-navigation";

// export { default as Storage } from './storage'

export const delay = t => new Promise(r => setTimeout(r, t));

export const createStyles = styles => StyleSheet.create(styles);

// export const createAction = type => payload => ({ type, payload });

export const getQuery = obj => {
  if (obj) {
    return Object.keys(obj)
      .map(key => {
        return `${key}=${obj[key] || ""}`;
      })
      .join("&");
  }
};

/**
 * 日期转换
 */
export function dateFormat(fmt, date) {
  // author: meizz
  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // dateFormat("yyyy-MM-dd hh:mm:ss.S",date) ==> 2006-07-02 08:09:04.423
  // dateFormat("yyyy-M-d h:m:s.S",date)      ==> 2006-7-2 8:9:4.18
  const o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  let res = fmt;
  if (/(y+)/.test(res))
    res = res.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  for (const k in o)
    if (new RegExp(`(${k})`).test(res))
      res = res.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  return res;
}

/**
 * 时间转为时间戳
 * @param time 时间(00:00:00)
 * @returns {string} 时间戳（单位：秒）
 */
export function timeToSecond(time) {
  let s = "";

  const hour = time.split(":")[0];
  const min = time.split(":")[1];
  const sec = time.split(":")[2];

  s = Number(hour * 3600) + Number(min * 60) + Number(sec);

  return s;
}

// ---------------  图片上传  begin----------------

const imgThen = (func, options, resolve, reject) => {
  func(options, response => {
    // console.log("Response = ", response);

    if (response.didCancel) {
      // console.log("User cancelled image picker");
      reject(response);
    } else if (response.error) {
      // console.log("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      // console.log("User tapped custom button: ", response.customButton);
    } else {
      // const source = { uri: response.uri };
      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      resolve(response);
    }
  });
};

export const launchCamera = (options = {}) => {
  return new Promise((resolve, reject) => {
    imgThen(ImagePicker.launchCamera, options, resolve, reject);
  });
};

export const chooseLibraryImage = (options = {}) => {
  return new Promise((resolve, reject) => {
    imgThen(ImagePicker.launchImageLibrary, options, resolve, reject);
  });
};

export const showImageChooser = (customOpts = {}) => {
  const options = {
    title: "选择图片",
    customButtons: [
      // { name: "fb", title: "Choose Photo from Facebook" },
    ],
    cancelButtonTitle: "取消",
    takePhotoButtonTitle: "拍照",
    chooseFromLibraryButtonTitle: "从相册选取",
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
    ...customOpts,
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info below in README)
   */
  return new Promise((resolve, reject) => {
    imgThen(ImagePicker.showImagePicker, options, resolve, reject);
  });
};

// ---------------  图片上传  end----------------

/**
 * 经纬度
 * @param {*} coords
 */
export const coordsGPS2Amap = coords => {
  const [longitude, latitude] = wgs84togcj02(coords.longitude, coords.latitude);
  return { longitude, latitude };
};

/**
 * 获取指多个权限
 * @param permissionType 权限类型数组
 * 详细见官方文档 https://reactnative.cn/docs/permissionsandroid/
 */
export const getMultiplPermissions = permissionTypes => {
  return new Promise(resolve => {
    resolve(PermissionsAndroid.requestMultiple(permissionTypes));
  });
};

/**
 * 检查是否已获取指定权限
 * @param permissionType 权限类型
 * 详细见官方文档 https://reactnative.cn/docs/permissionsandroid/
 */
export const checekPermissions = permissionType => {
  return new Promise(resolve => {
    resolve(PermissionsAndroid.check(permissionType));
  });
};

/**
 * 工具方法，获取一个UUID
 * @returns UUID
 */
export const getUUID = () => {
  // return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * md5加密操作
 * @param password 密码
 * @param key 加密值
 * @returns 加密之后的字符串
 */
export const md5Encryption = (password, key) => {
  const md = forge.md.md5.create();
  md.update(`${password}${key}`);
  return md.digest().toHex();
};

/**
 * 动态获取某个组件的位置和高度、宽度信息
 * @param ref 组件的实例
 */
export const measureRef = ref => {
  const handle = findNodeHandle(ref);
  return new Promise(resolve => {
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      resolve({
        x,
        y,
        width,
        height,
        pageX,
        pageY,
      });
    });
  });
};
