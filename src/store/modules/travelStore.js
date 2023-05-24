import {
	getTravelListByUserId,
	getZzimTravelListByUserId,
	getTravelListForHomeView,
	getTravelListByCity,
	postTravel,
	searchTravelByTag,
	getTravelListForHomeViewOrderByZzim,
	getTravelListForHomeViewOrderByCommentCnt,
} from "@/apis/travel";

import { findFollowerByUserId } from "@/apis/follow";

import lodash from "lodash";

const travelStore = {
	namespaced: true,
	state: {
		travelData: {
			city: "",
			content: "",
			cost: 0,
			endDate: "",
			mentionList: [],
			pinList: [],
			startDate: "",
			userId: 0,
		},
		followerList: [],
		preMentionList: [],
	},
	getters: {
		getTravelData(state) {
			return state.travelData;
		},
		getPinList(state) {
			return state.travelData.pinList;
		},
		getFollowerList(state) {
			return state.followerList;
		},
		getPreMentionList(state) {
			return state.preMentionList;
		},
	},
	mutations: {
		SET_POST_INPUT(state, data) {
			state.travelData = { ...state.travelData, ...data };
		},
		ADD_PIN_LIST(state, data) {
			// console.log("ADD_PIN_LIST", state.travelData.pinList);
			state.travelData.pinList.push(data);
		},
		REMOVE_PIN_LIST(state, id) {
			// console.log("REMOVE_PIN_LIST", state.travelData.pinList);
			state.travelData.pinList = [...state.travelData.pinList].filter((e) => e.id !== id);
		},
		ADD_IMAGELIST_TO_PIN(state, data) {
			// console.log("ADD_IMAGELIST_TO_PIN");
			const { base64Images, dataId } = { ...data };
			console.log(base64Images);
			state.travelData.pinList = [...state.travelData.pinList].map((e) => {
				if (e.id === dataId) return { ...e, imageList: base64Images };
				else return e;
			});
			console.log(state.travelData.pinList);
			// state.travelData.pinList = [];
		},
		ADD_TAGS_TO_PIN(state, data) {
			const tagList = data.submitData;
			const dataId = data.dataId;
			state.travelData.pinList = [...state.travelData.pinList].map((e) => {
				if (e.id === dataId) return { ...e, tagList: tagList };
				else return e;
			});
		},
		ADD_CONTENT_TO_PIN(state, data) {
			const content = data.submitData;
			const dataId = data.dataId;
			state.travelData.pinList = [...state.travelData.pinList].map((e) => {
				if (e.id === dataId) return { ...e, content: content };
				else return e;
			});
		},
		SET_FOLLOWER_LIST(state, data) {
			console.log(data);
			state.followerList = data;
			console.log(state.followerList);
		},
		ADD_USER_TO_MENTION_LIST(state, data) {
			state.preMentionList.push(state.followerList[data]);
			state.followerList.splice(data, 1);
		},
		ADD_USER_TO_FOLLOWER_LIST(state, data) {
			state.followerList.push(state.preMentionList[data]);
			state.preMentionList.splice(data, 1);
		},
	},
	actions: {
		getZzimTravelListByUserId({ commit }, userId) {
			return getZzimTravelListByUserId(userId);
		},

		getTravelListByUserId({ commit }, userId) {
			return getTravelListByUserId(userId);
		},

		getTravelListForHomeView({ commit }) {
			return getTravelListForHomeView();
		},

		getTravelListForHomeViewOrderByZzim({ commit }) {
			return getTravelListForHomeViewOrderByZzim();
		},

		getTravelListForHomeViewOrderByCommentCnt({ commit }) {
			return getTravelListForHomeViewOrderByCommentCnt();
		},

		getTravelListByCity({ commit }, dto) {
			return getTravelListByCity(dto);
		},

		searchTravelByTag({ commit }, tagList) {
			console.log(tagList);
			return searchTravelByTag(tagList);
		},

		async postTravel({ commit, state }, data) {
			// console.log("postTravel", data);
			commit("SET_POST_INPUT", data);
			try {
				for (var i = 0; i < state.preMentionList.length; i++) {
					state.travelData.mentionList.push(state.preMentionList[i].followerUserId);
				}

				const res = await postTravel(state.travelData);
				return res.data.statusCode;
			} catch (e) {
				return e;
			}
		},

		async findFollowerByUserId({ commit }, userId) {
			const res = await findFollowerByUserId(userId);
			commit("SET_FOLLOWER_LIST", res.data.data);
		},
	},
};

export default travelStore;
