/**
 * 学校查询和选择model
 */
import { selectSchool } from "../services/school";

export default {
  namespace: "school",
  state: {
    schoolList: [
      { schoolAddrss: "静安区", schoolName: "希望幼儿园", schoolCode: "1" },
      { schoolAddrss: "浦东新区", schoolName: "东方明珠", schoolCode: "2" },
      {
        schoolAddrss: "浦东新区",
        schoolName: "希望幼儿园",
        schoolCode: "K001",
      },
    ],
  },

  effects: {
    // 查询学校列表
    *selectSchool({ payload }, { call, put }) {
      const res = yield call(selectSchool, payload);
      const { errCode, data = [] } = res;
      if (errCode === "0") {
        yield put({ type: "save/schoolList", payload: data });
      }
      return res;
    },

    // 更新学校数据列表
    *updateSchoolList({ payload }, { put }) {
      yield put({ type: "update/schoolList", payload });
      return new Promise(resolve => {
        resolve();
      });
    },
  },
  reducers: {
    "save/schoolList": (state, { payload }) => ({
      ...state,
      schoolList: payload,
    }),

    // 根据页面选择更新学校数据
    "update/schoolList": (state, { payload }) => ({
      ...state,
      schoolList: payload,
    }),
  },
  // subscriptions: {
  //   setup({ dispatch }) {
  //     dispatch({ type: 'loadStorage' })
  //   },
  // },
};
