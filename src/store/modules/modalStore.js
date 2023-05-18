const modalStore = {
	namespaced: true,
	state: {
		show: false,
	},
	getters: {
		getShow(state) {
			console.log("state", state);
			return state.show;
		},
	},
	mutations: {
		OPEN(state) {
			state.show = true;
		},
		CLOSE(state) {
			state.show = false;
		},
	},
	actions: {},
};

export default modalStore;
