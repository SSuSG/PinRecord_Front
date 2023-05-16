import API from "./index";

function getTravelListByUserId(userId) {
	console.log("유저페이지의 유저가 작성한 여행후기 API");
	return API.get("/travels/users/" + userId);
}

function getZzimTravelListByUserId(userId) {
	console.log("유저페이지의 유저가 찜한 여행후기 API");
	return API.get("/travels/" + userId + "/zzims");
}

function getTravelListForHomeView() {
	console.log("메인화면에 보여줄 여행리스트 API");
	return API.get("/travels");
}

function getTravelListByCity(dto) {
	console.log("도시로 검색결과 여행리스트 API");
	const state = dto.state;
	const city = dto.city;
	return API.get("/travels/location", {
		params: {
			state,
			city,
		},
	});
}

export { getTravelListByUserId, getZzimTravelListByUserId, getTravelListForHomeView, getTravelListByCity };
