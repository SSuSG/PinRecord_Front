import jwtDecode from "jwt-decode";
import swal from "sweetalert";

import {
	login,
	logout,
	joinUser,
	validateEmail,
	validateLoginId,
	getUserByUserId,
	findLoginIdByEmail,
	findPasswordByLoginIdAndEmail,
	updateProfileImage,
	getUserProfileImage,
	unlockAccount,
	findLoginUserByloginId,
	tokenRegeneration,
	updatePassword,
	authAccount,
	getMentionListByUserId,
} from "@/apis/user";
import router from "@/router";

const userStore = {
	namespaced: true,
	state: {
		isLogin: false,
		isValidToken: false,
		login_user: {
			userId: "",
			loginId: "",
			nickname: "",
			name: "",
			image: null,
		},
	},
	getters: {
		getLoginUserNickname(state) {
			return state.login_user.nickname;
		},
		getLoginUserUserId(state) {
			return state.login_user.userId;
		},
		getLoginUserLoginId(state) {
			return state.login_user.loginId;
		},
		getLoginUser(state) {
			return state.login_user;
		},
		checkToken: function (state) {
			return state.isValidToken;
		},
		checkUserInfo: function (state) {
			return state.login_user;
		},
	},
	mutations: {
		SET_LOGIN_USER(state, data) {
			state.login_user = data;
		},
		REMOVE_LOGIN_USER(state) {
			state.login_user.userId = "";
			state.login_user.loginId = "";
			state.login_user.nickname = "";
		},
		SET_IS_LOGIN: (state, isLogin) => {
			state.isLogin = isLogin;
		},

		SET_IS_VALID_TOKEN: (state, isValidToken) => {
			state.isValidToken = isValidToken;
		},
	},
	actions: {
		async login({ commit }, loginRequestDto) {
			let res = await login(loginRequestDto);

			if (res.data.statusCode == 200) {
				swal("성공!", "로그인을 성공하였습니다!", "success");
				let accessToken = res.headers["access-token"];
				let refreshToken = res.headers["refresh-token"];

				commit("SET_LOGIN_USER", res.data.data);
				commit("SET_IS_LOGIN", true);
				commit("SET_IS_VALID_TOKEN", true);
				sessionStorage.setItem("access-token", accessToken);
				sessionStorage.setItem("refresh-token", refreshToken);
				return true;
			} else if (res.data.statusCode == 423) {
				alert(res.data.developerMessage);
				swal("실패!", "계정이 잠금되었습니다!", "error");
				return "lock";
			} else if (res.data.statusCode == 418) {
				swal("실패!", "계정이 인증되지 않았습니다!", "error");
				return "noAuth";
			}
			swal("실패!", res.data.developerMessage, "error");
			return false;
		},

		async logout({ commit }, loginId) {
			let res = await logout(loginId);
			if (res.data.statusCode == 200) {
				swal("성공!", "로그아웃을 성공하였습니다!", "success");
				//document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				commit("REMOVE_LOGIN_USER");
				commit("SET_IS_LOGIN", false);
				commit("SET_IS_VALID_TOKEN", false);
				if (router.currentRoute.fullPath !== "/") {
					router.push("/");
				} else {
					router.go(router.currentRoute.fullPath);
				}

				return true;
			}
			return false;
		},

		async getLoginUserInfo({ commit, dispatch }, token) {
			let decodeToken = jwtDecode(token);
			let res = await findLoginUserByloginId(decodeToken.loginId);

			if (res.data.statusCode !== 200) {
				commit("SET_IS_VALID_TOKEN", false);
				await dispatch("tokenRegeneration");
			} else {
				commit("SET_LOGIN_USER", res.data.data);
			}
		},

		async tokenRegeneration({ commit, dispatch, state }) {
			console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
			let res = await tokenRegeneration(state.login_user.loginId);
			if (res.data.statusCode === 200) {
				let accessToken = res.headers["access-token"];
				sessionStorage.setItem("access-token", accessToken);
				commit("SET_IS_VALID_TOKEN", true);
			} else {
				// 다시 로그인 전 DB에 저장된 RefreshToken 제거.
				await dispatch("logout", state.login_user.loginId);
			}
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
			return findPasswordByLoginIdAndEmail(findPasswordRequestDto);
		},

		updateProfileImage({ commit }, dto) {
			return updateProfileImage(dto);
		},

		getUserProfileImage({ commit }, userId) {
			return getUserProfileImage(userId);
		},

		unlockAccount({ commit }, unlockAccountRequestDto) {
			return unlockAccount(unlockAccountRequestDto);
		},

		updatePassword({ commit }, updatePasswordRequestDto) {
			console.log(updatePasswordRequestDto);
			return updatePassword(updatePasswordRequestDto);
		},

		authAccount({ commit }, authAccountRequestDto) {
			return authAccount(authAccountRequestDto);
		},
		getMentionListByUserId({ commit }, userId) {
			return getMentionListByUserId(userId);
		},
	},
};

export default userStore;
