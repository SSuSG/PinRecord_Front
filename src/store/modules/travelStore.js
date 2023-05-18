import {
	getTravelListByUserId,
	getZzimTravelListByUserId,
	getTravelListForHomeView,
	getTravelListByCity,
	postTravel,
} from "@/apis/travel";
import lodash from "lodash";

const travelStore = {
	namespaced: true,
	state: {
		travelData: {
			city: "",
			content: "",
			cost: 0,
			endDate: "",
			mentionList: [0],
			pinList: [],
			startDate: "",
		},
	},
	getters: {
		getTravelData(state) {
			return state.travelData;
		},
		getPinList(state) {
			return state.travelData.pinList;
		},
		// getTagList(state, id) {
		// 	let result = [];
		// 	state.travelData.pinList.forEach((e) => {
		// 		if (e.id === id) result = [...e.tagList];
		// 	});
		// 	return result;
		// },
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
			state.travelData.pinList = [...state.travelData.pinList].map((e) => {
				if (e.id === dataId) return { ...e, imageList: base64Images };
				else return e;
			});
			// console.log(state.travelData.pinList);
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

		getTravelListByCity({ commit }, dto) {
			return getTravelListByCity(dto);
		},
		async postTravel({ commit, state }, data) {
			// console.log("postTravel", data);
			commit("SET_POST_INPUT", data);

			try {
				const res = await postTravel(state.travelData);
				return res.data.statusCode;
			} catch (e) {
				return e;
			}
		},
	},
};

export default travelStore;
