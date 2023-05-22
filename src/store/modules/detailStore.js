import { getTravelDetail, deleteTravelDetail, postComment, deleteComment, getCommentList } from "@/apis/travel";

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
			// console.log(state.detailData.commentList);
		},
		SET_COMMENTLIST(state, data) {
			state.detailData.commentList = { ...state.detailData.commentList, ...data };
		},
		DELETE_COMMENTLIST(state, data) {
			state.detailData.commentList = { ...state.detailData.commentList, ...data };
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
		async getCommentList({ commit, state }, postId) {
			try {
				console.log("getCommentList");
				const res = await getCommentList(postId);
				console.log(res.data);
				commit("SET_COMMENTLIST", res.data.data);
				return res.data.data;
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
				commit("SET_COMMENTLIST", state.detailData.commentList);
				return res.data.statusCode;
			} catch (e) {
				return e;
			}
		},
	},
};

export default detailStore;
