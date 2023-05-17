<template>
	<StyledHeader>
		<div>로고</div>
		<ButtonList v-if="isLogin === false">
			<ButtonLi>
				<login-comp></login-comp>
			</ButtonLi>
			<ButtonLi>
				<join-comp></join-comp>
			</ButtonLi>
		</ButtonList>
		<ButtonList v-else>
			<ButtonLi>
				<logout-comp></logout-comp>
			</ButtonLi>
			<ButtonLi>
				<v-btn @click="toMyPage"><v-icon> mdi-account</v-icon></v-btn>
			</ButtonLi>
		</ButtonList>
	</StyledHeader>
</template>

<script>
import { StyledHeader, ButtonLi, ButtonList } from "@/components/Header/style";
import LoginComp from "../User/LoginComp.vue";
import JoinComp from "../User/JoinComp.vue";
import { mapState } from "vuex";
import LogoutComp from "../User/LogoutComp.vue";

export default {
	name: "HeaderComponent",
	components: {
		StyledHeader,
		LoginComp,
		JoinComp,
		ButtonLi,
		ButtonList,
		LogoutComp,
	},
	computed: {
		...mapState("userStore", ["isLogin"]),
	},
	methods: {
		toMyPage() {
			this.$router.push("/user/" + this.getLoginUserUserId);
		},
	},
};
</script>
<style></style>
