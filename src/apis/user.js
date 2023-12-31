import { API } from "./index";
import axios from "axios";
import { IMAGE_API } from "./index";

function login(loginRequestDto) {
	// console.log("로그인 API");
	return API.post("/users/login", loginRequestDto);
}

function logout(loginId) {
	// console.log("로그아웃 API");
	return API.get("/users/logout/" + loginId);
}

function findLoginUserByloginId(loginId) {
	API.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
	return API.get(`/users/info/${loginId}`);
}

function tokenRegeneration(loginId) {
	API.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
	return API.get(`/users/refresh/${loginId}`);
}

function joinUser(createUserAccountRequestDto) {
	// console.log("회원가입 API");
	return API.post("/users", createUserAccountRequestDto);
}

function validateLoginId(loginId) {
	// console.log("로그인ID 중복 확인 API");
	return API.get("/users/duplication-loginId/" + loginId);
}

function validateEmail(email) {
	// console.log("이메일 중복 확인 API");
	return API.get("/users/duplication-email/" + email);
}

function findLoginIdByEmail(email) {
	// console.log("로그인ID 찾기 API");
	return API.get("/users/loginId/" + email);
}

function findPasswordByLoginIdAndEmail(findPasswordRequestDto) {
	// console.log("비밀번호 찾기 API");
	return API.post("/users/new-password", findPasswordRequestDto);
}

function updatePassword(updatePasswordRequestDto) {
	// console.log("비밀번호 변경 API");
	return API.post("/users/password", updatePasswordRequestDto);
}

function unlockAccount(unlockAccountRequestDto) {
	// console.log("계정잠금해제 인증번호 인증 API");
	return API.post("/users/unlock", unlockAccountRequestDto);
}

function updateProfileImage(dto) {
	console.log("유저 프로필 이미지 변경 API");
	return IMAGE_API.post("/users/images/" + dto.userId, dto.profileImage);
}
function searchUser(nickname) {
	return API.get(`/users/search/${nickname}`);
}

// function updateProfileImage(dto) {
// 	console.log("유저 프로필 이미지 변경 API");
// 	return API.post("/users/images", dto);
// }

function getUserByUserId(userId) {
	// console.log("유저페이지의 유저 정보 API");
	return API.get("/users/" + userId);
}

function getUserProfileImage(userId) {
	// console.log("유저페이지의 유저 프로필 이미지 API");
	return API.get("/users/profile-image/" + userId);
}

function authAccount(authAccountRequestDto) {
	// console.log("회원가입 후 첫 본인 인증 API");
	return API.post("/users/auth", authAccountRequestDto);
}

function getMentionListByUserId(userId) {
	return API.get("/mentions/" + userId);
}

export {
	login,
	logout,
	joinUser,
	validateLoginId,
	validateEmail,
	findLoginIdByEmail,
	findPasswordByLoginIdAndEmail,
	updatePassword,
	unlockAccount,
	updateProfileImage,
	getUserByUserId,
	getUserProfileImage,
	findLoginUserByloginId,
	tokenRegeneration,
	authAccount,
	getMentionListByUserId,
	searchUser,
};
