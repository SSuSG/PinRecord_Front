// import { login, joinUser, validateEmail, validateLoginId } from "../../api/users";
import {
	login,
	logout,
	joinUser,
	validateEmail,
	validateLoginId,
	getUserByUserId,
	findLoginIdByEmail,
	findPasswordByLoginIdAndEmail,
} from "@/apis/user";

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
		getLoginUserUserId(state) {
			return state.login_user.userId;
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
				document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				commit("REMOVE_LOGIN_USER");
				return true;
			}
			return false;
		},

		joinUser({ commit }, createUserAccountRequestDto) {
			return joinUser(createUserAccountRequestDto);
		},

		validateEmail({ commit }, email) {
			return validateEmail(email);
		},

		validateLoginId({ commit }, loginId) {
			return validateLoginId(loginId);
		},

		getUserByUserId({ commit }, userId) {
			return getUserByUserId(userId);
		},

		findLoginIdByEmail({ commit }, email) {
			return findLoginIdByEmail(email);
		},
		findPasswordByLoginIdAndEmail({ commit }, findPasswordRequestDto) {
			console.log(findPasswordRequestDto);
			return findPasswordByLoginIdAndEmail(findPasswordRequestDto);
		},
	},
};

export default userStore;
