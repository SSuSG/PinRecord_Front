<template>
	<div>
		<v-btn icon darks @click="doLogout">
			<v-icon>mdi-logout</v-icon>
		</v-btn>
	</div>
</template>
<script>
import { mapActions } from "vuex";

export default {
	name: "LogoutComp",
	methods: {
		...mapActions("userStore", ["logout"]),
		doLogout() {
			console.log("로그아웃 성공");
			if (this.logout()) {
				if (this.$route.path !== "/") {
					this.$router.push("/");
				} else {
					this.$router.go();
				}
			} else {
				alert("로그아웃 실패");
			}
		},
	},
};
</script>
<style></style>
