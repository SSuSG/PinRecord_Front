import { getTravelDetail, deleteTravelDetail } from "@/apis/travel";

const detailStore = {
	namespaced: true,
	state: {
		travelData: {
			// city: "",
			// content: "",
			// cost: 0,
			// endDate: "",
			// mentionList: [0],
			// pinList: [],
			// startDate: "",
			// userId: 0,
		},
	},
	getters: {},
	mutations: {},
	actions: {
		async getTravel({ commit, state }, postId) {
			// console.log("postTravel", data);
			try {
				const res = await getTravelDetail(postId);
				console.log(res.data);
				return res.data.statusCode;
			} catch (e) {
				return e;
			}
		},
	},
};

export default detailStore;
