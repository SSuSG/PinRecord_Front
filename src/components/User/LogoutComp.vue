<template>
	<button id="logoutButton" @click="doLogout">
		<!-- <v-icon>mdi-logout</v-icon> -->
		로그아웃
	</button>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
	name: "LogoutComp",
	computed: {
		...mapGetters("userStore", ["getLoginUserUserId"]),
	},
	methods: {
		...mapActions("userStore", ["logout"]),
		async doLogout() {
			await this.logout(this.getLoginUserUserId);
		},
	},
};
</script>
<style scoped lang="scss">
#logoutButton {
	/* background-color: #3182f6; */
	color: #454545;
	font-weight: 600;
	border-radius: 5px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
}
#logoutButton:hover {
	background-color: Gainsboro;
}
</style>
