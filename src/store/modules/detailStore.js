import {
	getTravelDetail,
	deleteTravelDetail,
	postComment,
	deleteComment,
	editComment,
	getCommentList,
} from "@/apis/travel";
import lodash from "lodash";

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
		SET_COMMENTLIST(state, data) {
			state.detailData = { ...state.detailData, commentList: [...data] };
		},
		DELETE_COMMENTLIST(state, data) {
			state.detailData.commentList = [...state.detailData.commentList].filter((e) => e.commentId != data);
		},
		EDIT_COMMENT(state, editData) {
			state.detailData.commentList = [...state.detailData.commentList].map((e) => {
				if (e.commentId === editData.commentId) return { ...e, content: editData.content };
				else return e;
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
				await commit("SET_COMMENTLIST", res.data.data);
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
		async deleteComment({ commit, state }, commentId) {
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
				console.log("수정 요청");
				commit("EDIT_COMMENT", editData);
				return res.data.statusCode;
			} catch (e) {
				return e;
			}
		},
		deleteTravelDetail({ commit }, travelId) {
			return deleteTravelDetail(travelId);
		},
	},
};

export default detailStore;
