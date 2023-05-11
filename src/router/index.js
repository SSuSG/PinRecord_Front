import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/pages/Home/HomePage";
import DetailPage from "@/pages/Detail/DetailPage";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: HomePage,
	},
	{
		path: "/detail/:postId",
		name: "detail",
		component: DetailPage,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
