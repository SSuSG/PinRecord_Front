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
				<v-btn @click="toMyPage" darks icon class="ma-2" text small> 마이페이지 </v-btn>
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
			this.$router.push("/user/" + this.getLoginUserUserId);
		},
	},
};
</script>
<style></style>
