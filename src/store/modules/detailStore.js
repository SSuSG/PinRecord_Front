import {
	getTravelDetail,
	deleteTravelDetail,
	postComment,
	deleteComment,
	editComment,
	getCommentList,
} from "@/apis/travel";

const detailStore = {
	namespaced: true,
	state: {
		detailData: {},
	},
	getters: {
		getDetailData(state) {
			// console.log("DETAIL DATA", state.detailData);
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
		SET_COMMENTLIST(state, data) {
			state.detailData.commentList = { ...state.detailData.commentList, ...data };
		},
		DELETE_COMMENTLIST(state, data) {
			state.detailData.commentList = [...state.detailData.commentList].filter((e) => e.commentId != data);
		},
		EDIT_COMMENT(state, editData) {
			state.detailData.commentList = [...state.detailData.commentList].map((e) => {
				if (e.commentId === editData.commentId) {
					e = { ...e, content: editData.content };
				}
			});
		},
		ADD_ZZIM_CNT(state) {
			state.detailData.zzimCnt = state.detailData.zzimCnt + 1;
		},
		MINUS_ZZIM_CNT(state) {
			state.detailData.zzimCnt = state.detailData.zzimCnt - 1;
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
				const res = await getCommentList(postId);
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
				commit("DELETE_COMMENTLIST", commentId);
				return res.data.statusCode;
			} catch (e) {
				return e;
			}
		},
		async editComment({ commit, state }, editData) {
			try {
				const res = await editComment(editData);
				commit("EDIT_COMMENT", editData);
				return res.data.statusCode;
			} catch (e) {
				return e;
			}
		},
	},
};

export default detailStore;
