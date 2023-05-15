import Vue from "vue";
import Vuex from "vuex";
import travelStore from "@/store/modules/travelStore";
import userStore from "@/store/modules/userStore";
import followStore from "@/store/modules/followStore";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		userStore,
		travelStore,
		followStore,
	},
	//vuex plugin 명시
	plugins: [
		createPersistedState({
			paths: ["userStore"],
		}),
	],
});
