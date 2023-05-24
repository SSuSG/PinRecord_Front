import { API } from "./index";
import { IMAGE_API } from "./index";
function getTravelListByUserId(userId) {
	return API.get("/travels/users/" + userId);
}

function getZzimTravelListByUserId(userId) {
	return API.get("/travels/" + userId + "/zzims");
}

// not
function getTravelListForHomeView() {
	return API.get("/travels");
}

// not
function getTravelListForHomeViewOrderByZzim() {
	return API.get("/travels/zzims");
}
// not
function getTravelListForHomeViewOrderByCommentCnt() {
	return API.get("/travels/comments");
}

// 홈화면 무한스크롤 API
function getTravelListByTime(pageNum) {
	return API.get(`/travels/home/${pageNum}`);
}
// 홈화면 무한스크롤 API
function getTravelListByComment(pageNum) {
	return API.get(`/travels/comments/${pageNum}`);
}
// 홈화면 무한스크롤 API
function getTravelListByZzim(pageNum) {
	return API.get(`/travels/zzims/${pageNum}`);
}

function getTravelListByCity(dto) {
	const state = dto.state;
	const city = dto.city;
	return API.get("/travels/location", {
		params: {
			state,
			city,
		},
	});
}

function searchTravelByTag(tags) {
	return API.get("/travels/tags", {
		params: {
			tagList: tags.join(","),
		},
	});
}

function postTravel(data) {
	return API.post("/travels", data);
}

function getTravelDetail(postId) {
	return API.get(`/travels/${postId}`);
}
function deleteTravelDetail(postId) {
	return API.delete(`/travels/${postId}`);
}

function getCommentList(travelId) {
	return API.get(`/comments/${travelId}`);
}

function postComment(data) {
	return API.post("/comments", data);
}
function deleteComment(commentId) {
	return API.delete(`/comments/${commentId}`);
}
function editComment(data) {
	return API.put("/comments", data);
}

function getZzim(data) {
	return API.get("/zzim", data);
}

function doZzim(data) {
	return API.post("/zzim", data);
}

export {
	getTravelListByUserId,
	getZzimTravelListByUserId,
	getTravelListForHomeView,
	getTravelListByCity,
	postTravel,
	searchTravelByTag,
	getTravelDetail,
	deleteTravelDetail,
	postComment,
	deleteComment,
	editComment,
	getCommentList,
	getTravelListForHomeViewOrderByZzim,
	getTravelListForHomeViewOrderByCommentCnt,
	getTravelListByTime,
	getTravelListByComment,
	getTravelListByZzim,
};
