import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/pages/Home/HomePage";
import UserPage from "@/pages/UserPage/UserPage";

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
];

const router = new VueRouter({
	routes,
	mode: "history",
});

export default router;
