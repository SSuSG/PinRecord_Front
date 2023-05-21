import { getTravelDetail, deleteTravelDetail } from "@/apis/travel";

const detailStore = {
	namespaced: true,
	state: {
		detailData: {},
	},
	getters: {
		getDetailData(state) {
			return state.detailData;
		},
		getDetailPinList(state) {
			return state.detailData.pinList;
		},
	},
	mutations: {
		SET_Detail(state, data) {
			state.detailData = { ...state.detailData, ...data };
		},
	},
	actions: {
		async getDetail({ commit, state }, postId) {
			try {
				const res = await getTravelDetail(postId);

				commit("SET_Detail", res.data.data);
				return res.data.statusCode;
			} catch (e) {
				return e;
			}
		},
	},
};

export default detailStore;
