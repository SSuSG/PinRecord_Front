import { findFollowingByUserId, findFollowerByUserId, follow, cancelFollow, followRelation } from "@/apis/follow";

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
		followRelation({ commit }, followRequestDto) {
			return followRelation(followRequestDto);
		},
	},
};

export default followStore;
