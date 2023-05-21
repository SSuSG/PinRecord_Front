import { getTravelDetail, deleteTravelDetail, postComment, deleteComment } from "@/apis/travel";

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
			console.log(state.detailData.commentList);
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
		async postComment({ commit, state }, data) {
			try {
				const res = await postComment(data);
				return res.data.statusCode;
			} catch (e) {
				return e;
			}
		},
		async deleeteComment({ commit, state }, commentId) {
			try {
				const res = await deleteComment(commentId);
				console.log(res.data);
				return res.data.statusCode;
			} catch (e) {
				return e;
			}
		},
	},
};

export default detailStore;
