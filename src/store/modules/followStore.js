import { findFollowingByUserId, findFollowerByUserId } from "@/apis/follow";

const followStore = {
	namespaced: true,
	state: {},
	getters: {},
	mutations: {},
	actions: {
		findFollowingByUserId({ commit }, userId) {
			return findFollowingByUserId(userId);
		},

		findFollowerByUserId({ commit }, userId) {
			return findFollowerByUserId(userId);
		},
	},
};

export default followStore;
