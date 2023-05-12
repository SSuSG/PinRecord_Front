import { findFollowingByUserId, findFollowerByUserId } from "@/apis/follow";

const followStore = {
	namespaced: true,
	state: {},
	getters: {},
	mutations: {},
	actions: {
		findFollowingByUserId({ commit }, userId) {
			console.log("팔로잉");
			return findFollowingByUserId(userId);
		},

		findFollowerByUserId({ commit }, userId) {
			console.log("팔로워");
			return findFollowerByUserId(userId);
		},
	},
};

export default followStore;
