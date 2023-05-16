import {
	getTravelListByUserId,
	getZzimTravelListByUserId,
	getTravelListForHomeView,
	getTravelListByCity,
} from "@/apis/travel";

const travelStore = {
	namespaced: true,
	state: {},
	getters: {},
	mutations: {},
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
	},
};

export default travelStore;
