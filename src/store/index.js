import Vue from "vue";
import Vuex from "vuex";
import travelStore from "@/store/modules/travelStore";
import userStore from "@/store/modules/userStore";
import followStore from "@/store/modules/followStore";
import modalStore from "@/store/modules/modalStore";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		userStore,
		travelStore,
		followStore,
		modalStore,
	},
	//vuex plugin 명시
	plugins: [
		createPersistedState({
			// 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
			paths: ["userStore", "travelStore"],
		}),
	],
});
