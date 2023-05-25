<template>
	<StyledHeader>
		<router-link to="/" id="title">PINRECORD</router-link>
		<ButtonList v-if="isLogin === false">
			<help-comp></help-comp>
			<login-comp></login-comp>
			<join-comp></join-comp>
		</ButtonList>
		<ButtonList v-else>
			<help-comp></help-comp>
			<search-user></search-user>
			<logout-comp></logout-comp>
			<mention-list-comp />
			&nbsp;
			<div style="display: flex">
				<button id="myPageButton" @click="toWriteTravelPage">여행후기작성</button>
				<button id="myPageButton" @click="toMyPage">마이페이지</button>
			</div>
		</ButtonList>
	</StyledHeader>
</template>

<script>
import { StyledHeader, ButtonLi, ButtonList } from "@/components/Header/style";
import LoginComp from "../User/LoginComp.vue";
import JoinComp from "../User/JoinComp.vue";
import { mapState, mapGetters } from "vuex";
import LogoutComp from "../User/LogoutComp.vue";
import MentionListComp from "../User/MentionListComp.vue";
import SearchUser from "../User/SearchUser.vue";
import HelpComp from "../Help/HelpComp.vue";

export default {
	name: "HeaderComponent",
	components: {
		StyledHeader,
		LoginComp,
		JoinComp,
		ButtonList,
		LogoutComp,
		MentionListComp,
		SearchUser,
		HelpComp,
	},
	computed: {
		...mapState("userStore", ["isLogin"]),
		...mapGetters("userStore", ["getLoginUserUserId"]),
	},
	methods: {
		toMyPage() {
			this.$router.push("/user/" + this.getLoginUserUserId).catch(() => {});
		},
		toWriteTravelPage() {
			this.$router.push("/post");
		},
	},
};
</script>
<style scoped>
#myPageButton {
	color: royalblue;
	font-weight: 600;
	border-radius: 5px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
	margin: 0px;
}
#myPageButton:hover {
	background-color: whitesmoke;
}

@font-face {
	font-family: "LOTTERIACHAB";
	src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/LOTTERIACHAB.woff2") format("woff2");
	font-weight: normal;
	font-style: normal;
}
@font-face {
	font-family: "TTWanjudaedunsancheB";
	src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/TTWanjudaedunsancheB.woff2") format("woff2");
	font-weight: 700;
	font-style: normal;
}
@font-face {
	font-family: "HSJiptokki-Round";
	src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/HSJiptokki-Round.woff2") format("woff2");
	font-weight: 800;
	font-style: normal;
}
@font-face {
	font-family: "EF_jejudoldam";
	src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-EF@1.0/EF_jejudoldam.woff2") format("woff2");
	font-weight: normal;
	font-style: normal;
}
#title {
	font-family: "LOTTERIACHAB";
	font-size: 32px;
	color: royalblue;
	transition: 0.2s ease-in-out;
}
#title:hover {
	/* animation: vibrate 0.05s linear infinite; */
	color: rgb(0, 44, 177);
}
@keyframes vibrate {
	from {
		transform: rotate(10deg);
	}
	to {
		transform: rotate(-10deg);
	}
}
</style>
