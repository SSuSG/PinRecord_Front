import API from "./index";

function login(loginRequestDto) {
	console.log("로그인 API");
	return API.post("/users/login", loginRequestDto);
}

function logout() {
	console.log("로그아웃 API");
	return API.get("/users/logout");
}

function joinUser(createUserAccountRequestDto) {
	console.log("회원가입 API");
	return API.post("/users", createUserAccountRequestDto);
}

function validateLoginId(loginId) {
	console.log("로그인ID 중복 확인 API");
	return API.get("/users/duplication-loginId/" + loginId);
}

function validateEmail(email) {
	console.log("이메일 중복 확인 API");
	return API.get("/users/duplication-email/" + email);
}

function findPassword(findPasswordRequestDto) {
	console.log("비밀번호 찾기 API");
	return API.post("/users/password", findPasswordRequestDto);
}

function updatePassword(updatePasswordRequestDto) {
	console.log("비밀번호 변경 API");
	return API.post("/users/new-password", updatePasswordRequestDto);
}

function unlockAccount(unlockAccountRequestDto) {
	console.log("계정잠금해제 인증번호 인증 API");
	return API.post("/users/unlock", unlockAccountRequestDto);
}

function updateProfileImage(updateProfileImageRequestDto) {
	console.log("유저 프로필 이미지 변경 API");
	return API.post("/users/images", updateProfileImageRequestDto);
}

function getUserByUserId(userId) {
	console.log("유저페이지의 유저 정보 API");
	return API.get("/users/" + userId);
}

export {
	login,
	logout,
	joinUser,
	validateLoginId,
	validateEmail,
	findPassword,
	updatePassword,
	unlockAccount,
	updateProfileImage,
	getUserByUserId,
};
