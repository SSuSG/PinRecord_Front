<template>
	<div>
		<v-btn icon darks @click="doLogout">
			<v-icon>mdi-logout</v-icon>
		</v-btn>
	</div>
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
