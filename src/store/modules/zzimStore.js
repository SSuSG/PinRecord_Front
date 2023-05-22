import { doZzim, isZzim } from "@/apis/zzim";

const zzimStore = {
	namespaced: true,
	state: {
		show: false,
	},
	getters: {},
	mutations: {},
	actions: {
		isZzim({ commit }, zzimRequestDto) {
			return isZzim(zzimRequestDto);
		},
		doZzim({ commit }, zzimRequestDto) {
			return doZzim(zzimRequestDto);
		},
	},
};

export default zzimStore;
