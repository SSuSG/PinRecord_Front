<template>
	<v-btn icon darks @click="doLogout" class="ma-2" text small>
		<!-- <v-icon>mdi-logout</v-icon> -->
		로그아웃
	</v-btn>
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
<style></style>
