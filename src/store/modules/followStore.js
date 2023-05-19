import { findFollowingByUserId, findFollowerByUserId, follow, cancelFollow } from "@/apis/follow";

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
		follow({ commit }, followRequestDto) {
			return follow(followRequestDto);
		},
		cancelFollow({ commit }, followRequestDto) {
			return cancelFollow(followRequestDto);
		},
	},
};

export default followStore;
