/**
 * 注册流程model
 */
import {
  checkInfo,
  simpleRegister,
  selectBabyInfo,
  register,
  addGestruePwd,
} from "../services/signup";

// 初始化时注册流程表单数据
const initFormData = {
  school: {
    schoolName: "",
    schoolCode: "",
    schoolAddrss: "",
  }, // 学校
  phone: "", // 手机号
  code: "", // 验证码
  password: "", // 密码

  // 宝贝信息,根据注册第一步查询得到的宝贝具体信息
  babyInfo: {
    babyClass: "无数据", // 班级信息
    calssCode: "", // 班级编码
    name: "无数据", // 名字
    sex: "1", // 性别
    birthday: "无数据", // 生日
  },
  selectOption: "", // 注册人与宝贝的关系，如:妈妈，爸爸
  relationshipCode: "", // 关系代码，爸爸-1，妈妈-2 ...

  parentPhoto: [], // 家长照片
  parentPhotoPath: "", // 家长照片上传成功后的路径
  babyPhoto: [], // 宝贝照片
  babyPhotoPath: "", // 宝贝照片上传成功后的路径
  birthId: "", // 出生证明编号
};

export default {
  namespace: "signup",
  state: {
    ...initFormData,
  },

  effects: {
    // 验证第一步输入的学校、手机号、验证码等信息是否能相互关联上
    *checkInfo({ payload }, { call }) {
      const res = yield call(checkInfo, payload);
      return res;
    },

    // 接送人注册，checkInfo验证通过即可以进行注册
    *simpleRegister({ payload }, { call }) {
      const res = yield call(simpleRegister, payload);
      return res;
    },

    // 查询并保存宝贝信息
    *selectBabyInfo({ payload }, { call, put }) {
      const res = yield call(selectBabyInfo, payload);
      const { errCode } = res;
      if (errCode === "0") {
        const { data = {} } = res;
        const {
          babyName = "",
          babySex = "",
          babyBirth = "",
          calssCode = "",
          calssName = "",
        } = data;
        const babyInfo = {
          name: babyName,
          sex: babySex,
          birthday: babyBirth,
          calssCode,
          babyClass: calssName,
        };
        yield put({ type: "save/babyInfo", payload: babyInfo });
      }
      return res;
    },

    // 保存家长/宝贝图片上传成功后的路径
    *savePhoto({ payload }, { put }) {
      yield put({ type: "save/formValue", payload });
      return new Promise(resolve => {
        resolve();
      });
    },

    // 注册账号
    *register({ payload }, { call }) {
      const res = yield call(register, payload);
      return res;
    },

    // 添加手势密码
    *addGestruePwd({ payload }, { call }) {
      const res = yield call(addGestruePwd, payload);
      return res;
    },
  },
  reducers: {
    // 保存表单数据的改变
    "save/formValue": (state, { payload }) => {
      const { key, value } = payload;
      // 单个修改
      if (typeof key === "string") {
        state[key] = value;
        return { ...state };
        // 可以批量修改
      } else if (Array.isArray(key)) {
        for (const i of key) {
          state[i] = value[i];
        }
        return { ...state };
      } else {
        return state;
      }
    },
    // 清空、初始化表单数据
    "clear/formValue": state => {
      return { ...state, ...initFormData, parentPhoto: [], babyPhoto: [] };
    },

    // 保存宝贝信息
    "save/babyInfo": (state, { payload }) => {
      return { ...state, babyInfo: payload };
    },
  },
  // subscriptions: {
  //   setup({ dispatch }) {
  //     dispatch({ type: 'loadStorage' })
  //   },
  // },
};
