import API from "./index";

function getTravelListByUserId(userId) {
	console.log("유저페이지의 유저가 작성한 여행후기 API");
	return API.get("/travels/users/" + userId);
}

function getZzimTravelListByUserId(userId) {
	console.log("유저페이지의 유저가 찜한 여행후기 API");
	return API.get("/travels/" + userId + "/zzims");
}

export { getTravelListByUserId, getZzimTravelListByUserId };
