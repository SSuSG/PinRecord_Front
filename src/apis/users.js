import API from "./index";

function login(loginRequestDto) {
	console.log("로그인 API");
	return API.post("/users/login", loginRequestDto);
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

export { login, joinUser, validateLoginId, validateEmail };
