import API from "./index";

function findFollowingByUserId(userId) {
	console.log("유저의 팔로워 리스트 API");
	return API.get("/follows/follower/" + userId);
}

function findFollowerByUserId(userId) {
	console.log("유저의 팔로잉 리스트 API");
	return API.get("/follows/following/" + userId);
}

export { findFollowingByUserId, findFollowerByUserId };
