// import { login, joinUser, validateEmail, validateLoginId } from "../../api/users";
import { login, logout, joinUser, validateEmail, validateLoginId } from "@/apis/users";

const userStore = {
	namespaced: true,
	state: {
		login_user: {
			userId: "",
			loginid: "",
			nickname: "",
		},
	},
	getters: {
		getLoginUserNickname(state) {
			return state.login_user.nickname;
		},
	},
	mutations: {
		SET_LOGIN_USER(state, data) {
			state.login_user = data;
		},
		REMOVE_LOGIN_USER(state) {
			state.login_user.userId = "";
			state.login_user.loginid = "";
			state.login_user.nickname = "";
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

		async logout({ commit }) {
			let res = await logout();
			if (res.data.statusCode == 200) {
				alert("로그아웃 성공");
				console.log("로그아웃성공");
				document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				commit("REMOVE_LOGIN_USER");
				return true;
			}
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
