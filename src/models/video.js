import * as api from "services/video";

export default {
  namespace: "video",
  state: {
    loading: false,
    albumList: [],
    record: [],
    babyInfo: {},
    onlineVideo: [],
    period: {},
  },

  effects: {
    /**
     * 成长相册查询
     */
    *albumList({ payload }, { call, put }) {
      const res = yield call(api.albumList, payload);
      const { data = [] } = res;
      yield put({
        type: "save/albumList",
        payload: { albumList: data instanceof Array ? data : [] },
      });
      return res;
    },

    /**
     * 接送记录
     */
    *record({ payload }, { call, put }) {
      const res = yield call(api.record, payload);
      const {
        data: { babyName = "", babyPhoto = "", shuttles = [] },
      } = res;
      yield put({
        type: "save/record",
        payload: {
          record:
            shuttles.length > 0
              ? shuttles
              : [{ status: "进入" }, { status: "离开" }],
        },
      });
      yield put({
        type: "save/babyInfo",
        payload: { babyInfo: { babyName, babyPhoto } },
      });
      return res;
    },

    /**
     * 在线视频
     */
    *onlineVideo({ payload }, { call, put }) {
      const res = yield call(api.onlineVideo, payload);
      const { data = [] } = res;
      yield put({
        type: "save/onlineVideo",
        payload: { onlineVideo: data instanceof Array ? data : [] },
      });
      return res;
    },

    /**
     * 获取摄像头的url
     */
    *getUrl({ payload }, { call }) {
      const res = yield call(api.getUrl, payload);
      return res;
    },

    /**
     * 获取摄像头的在线时长
     */
    *getPeriod({ payload }, { call, put }) {
      const res = yield call(api.getPeriod, payload);
      const { data } = res;
      yield put({
        type: "save/period",
        payload: { period: data },
      });
      return res;
    },
  },
  reducers: {
    "save/albumList": (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    "save/record": (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    "save/babyInfo": (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    "save/onlineVideo": (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    "save/period": (state, { payload }) => ({
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
