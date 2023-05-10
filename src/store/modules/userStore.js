// import { login, joinUser, validateEmail, validateLoginId } from "../../api/users";
import { login, joinUser, validateEmail, validateLoginId } from "@/apis/users";

const userStore = {
	namespaced: true,
	state: {
		loginUser: {
			userId: "",
			loginid: "",
			nickname: "",
		},
	},
	getters: {},
	mutations: {
		SET_LOGIN_USER(state, data) {
			state.loginUser = data;
		},
	},
	actions: {
		async login({ commit }, loginRequestDto) {
			let res = await login(loginRequestDto);
			console.log(res.data);

			if (res.data.statusCode == 200) {
				alert("로그인 성공");
				commit("SET_LOGIN_USER", res.data.data);
				return true;
			}
			alert(res.data.developerMessage);
			return false;
		},

		async joinUser({ commit }, createUserAccountRequestDto) {
			console.log(commit);
			let res = await joinUser(createUserAccountRequestDto);
			return res;
		},

		async validateEmail({ commit }, email) {
			console.log(commit);
			let res = await validateEmail(email);
			return res;
		},

		async validateLoginId({ commit }, loginId) {
			console.log(commit);
			let res = await validateLoginId(loginId);
			return res;
		},
	},
};

export default userStore;
