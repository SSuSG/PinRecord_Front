import Vue from "vue";
import Vuex from "vuex";
import travelStore from "@/store/modules/travelStore";
import userStore from "@/store/modules/userStore";
import followStore from "@/store/modules/followStore";
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		userStore,
		travelStore,
		followStore,
	},
});
