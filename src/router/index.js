import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/pages/Home/HomePage";
import UserPage from "@/pages/UserPage/UserPage";
import DetailPage from "@/pages/Detail/DetailPage";
import PostPage from "@/pages/PostPage/PostPage";
import store from "@/store";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
	const checkUserInfo = store.getters["userStore/checkUserInfo"];
	const checkToken = store.getters["userStore/checkToken"];
	let token = sessionStorage.getItem("access-token");
	// console.log("로그인 처리 전", checkUserInfo, token);

	if (checkUserInfo != null && token && token !== "undefined") {
		// console.log("토큰 유효성 체크하러 가자!!!!");
		await store.dispatch("userStore/getLoginUserInfo", token);
	}
	if (!checkToken || checkUserInfo === null) {
		alert("로그인이 필요한 페이지입니다..");
		// next({ name: "login" });
		if (router.currentRoute.fullPath !== "/") {
			router.push("/");
		}
	} else {
		// console.log("로그인 했다!!!!!!!!!!!!!.");
		next();
	}
};

const routes = [
	{
		path: "/",
		name: "home",
		component: HomePage,
	},
	{
		path: "/user/:userId",
		name: "user",
		beforeEnter: onlyAuthUser,
		component: UserPage,
	},
	{
		path: "/detail/:postId",
		name: "detail",
		beforeEnter: onlyAuthUser,
		component: DetailPage,
	},
	{
		path: "/post",
		name: "post",
		beforeEnter: onlyAuthUser,
		component: PostPage,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
