<template>
	<StyledHeader>
		<router-link to="/">홈화면</router-link>
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
				<update-password-comp />
			</ButtonLi>
			<ButtonLi>
				<mention-list-comp />
			</ButtonLi>
			<ButtonLi>
				<logout-comp></logout-comp>
			</ButtonLi>
			<ButtonLi>
				<button id="myPageButton" @click="toMyPage" darks icon class="ma-2" text small>마이페이지</button>
			</ButtonLi>
		</ButtonList>
	</StyledHeader>
</template>

<script>
import { StyledHeader, ButtonLi, ButtonList } from "@/components/Header/style";
import LoginComp from "../User/LoginComp.vue";
import JoinComp from "../User/JoinComp.vue";
import { mapState, mapGetters } from "vuex";
import LogoutComp from "../User/LogoutComp.vue";
import UpdatePasswordComp from "../User/UpdatePasswordComp.vue";
import MentionListComp from "../User/MentionListComp.vue";

export default {
	name: "HeaderComponent",
	components: {
		StyledHeader,
		LoginComp,
		JoinComp,
		ButtonLi,
		ButtonList,
		LogoutComp,
		UpdatePasswordComp,
		MentionListComp,
	},
	computed: {
		...mapState("userStore", ["isLogin"]),
		...mapGetters("userStore", ["getLoginUserUserId"]),
	},
	methods: {
		toMyPage() {
			this.$router.push("/user/" + this.getLoginUserUserId).catch(() => {});
		},
	},
};
</script>
<style scoped>
#myPageButton {
	/* background-color: #3182f6; */
	color: #454545;
	font-weight: 600;
	border-radius: 10px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
}
#myPageButton:hover {
	background-color: Gainsboro;
}
</style>
