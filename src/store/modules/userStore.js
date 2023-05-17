import jwtDecode from "jwt-decode";
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
		},
	},
	getters: {
		getLoginUserNickname(state) {
			return state.login_user.nickname;
		},
		getLoginUserUserId(state) {
			return state.login_user.userId;
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
			console.log(res);

			if (res.data.statusCode == 200) {
				alert("로그인 성공");
				let accessToken = res.headers["access-token"];
				let refreshToken = res.headers["refresh-token"];

				commit("SET_LOGIN_USER", res.data.data);
				commit("SET_IS_LOGIN", true);
				commit("SET_IS_VALID_TOKEN", true);
				sessionStorage.setItem("access-token", accessToken);
				sessionStorage.setItem("refresh-token", refreshToken);
				return true;
			}
			alert(res.data.developerMessage);
			return false;
		},

		async logout({ commit }, loginId) {
			let res = await logout(loginId);
			if (res.data.statusCode == 200) {
				alert("로그아웃 성공");
				//document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				commit("REMOVE_LOGIN_USER");
				commit("SET_IS_LOGIN", false);
				commit("SET_IS_VALID_TOKEN", false);
				if (router.path !== "/") {
					router.push("/");
				} else {
					router.go(router.currentRoute);
				}

				return true;
			}
			return false;
		},

		async getLoginUserInfo({ commit, dispatch }, token) {
			let decodeToken = jwtDecode(token);
			console.log("2. getUserInfo() decodeToken :: ", decodeToken);

			let res = await findLoginUserByloginId(decodeToken.loginId);
			console.log(res.data);

			if (res.data.statusCode !== 200) {
				console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ");
				commit("SET_IS_VALID_TOKEN", false);
				await dispatch("tokenRegeneration");
			} else {
				commit("SET_LOGIN_USER", res.data.data);
			}
		},

		async tokenRegeneration({ commit, dispatch, state }) {
			console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
			console.log(state);
			let res = await tokenRegeneration(state.login_user.loginId);
			console.log(res.data);
			if (res.data.statusCode === 200) {
				let accessToken = res.headers["access-token"];
				console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
				sessionStorage.setItem("access-token", accessToken);
				commit("SET_IS_VALID_TOKEN", true);
			} else {
				console.log("갱신 실패");
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
	},
};

export default userStore;
