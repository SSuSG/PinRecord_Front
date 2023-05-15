import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/pages/Home/HomePage";
import UserPage from "@/pages/UserPage/UserPage";
import DetailPage from "@/pages/Detail/DetailPage";
import PostPage from "@/pages/PostPage/PostPage";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: HomePage,
	},
	{
		path: "/user/:userId",
		name: "user",
		component: UserPage,
	},
	{
		path: "/detail/:postId",
		name: "detail",
		component: DetailPage,
	},
	{
		path: "/post",
		name: "post",
		component: PostPage,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
