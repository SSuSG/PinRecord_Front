import { API } from "./index";

function findFollowingByUserId(userId) {
	// console.log("유저의 팔로잉 리스트 API");
	return API.get("/follows/following/" + userId);
}

function findFollowerByUserId(userId) {
	// console.log("유저의 팔로워 리스트 API");
	return API.get("/follows/follower/" + userId);
}

function follow(followRequestDto) {
	console.log("팔로우 하기 API");
	return API.post("/follows", followRequestDto);
}

function cancelFollow(followRequestDto) {
	console.log("팔로우 취소 API");
	return API.post("/follows/delete", followRequestDto);
}

function followRelation(followRequestDto) {
	return API.post("/follows/follow", followRequestDto);
}

export { findFollowingByUserId, findFollowerByUserId, follow, cancelFollow, followRelation };
