<template>
	<StyledHeader>
		<router-link to="/" id="title">PINRECORD</router-link>
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
				<search-user></search-user>
			</ButtonLi>
			<ButtonLi>
				<logout-comp></logout-comp>
			</ButtonLi>
			<ButtonLi>
				<mention-list-comp />
			</ButtonLi>
			<ButtonLi>
				<button id="myPageButton" @click="toWriteTravelPage" darks icon class="ma-2" text small>여행후기작성</button>
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
import MentionListComp from "../User/MentionListComp.vue";
import SearchUser from "../User/SearchUser.vue";

export default {
	name: "HeaderComponent",
	components: {
		StyledHeader,
		LoginComp,
		JoinComp,
		ButtonLi,
		ButtonList,
		LogoutComp,
		MentionListComp,
		SearchUser,
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
	/* background-color: #3182f6; */
	color: #454545;
	font-weight: 600;
	border-radius: 5px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
}
#myPageButton:hover {
	background-color: Gainsboro;
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
	/* font-family: "TTWanjudaedunsancheB"; */
	font-family: "LOTTERIACHAB";
	/* font-family: "HSJiptokki-Round"; */
	/* font-family: "EF_jejudoldam"; */
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
