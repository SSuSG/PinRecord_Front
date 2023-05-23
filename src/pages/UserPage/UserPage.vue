<template>
	<div id="user_page">
		<div id="user_side">
			<user-info-comp
				:user="user"
				@update-profile-base64Image="updateProfileimage"
				@plus-follower-cnt="plusFollowerCnt"
				@minus-follower-cnt="minusFollowerCnt"
			/>
			<user-tabs-info-comp
				:userNickname="user.nickname"
				:travelList="writeTravelList"
				:zzimTravelList="zzimTravelList"
			/>
		</div>
		<user-page-map-comp :travelList="writeTravelList" />
	</div>
</template>

<script>
import UserInfoComp from "@/components/User/UserInfoComp.vue";
import UserTabsInfoComp from "@/components/User/UserTabsInfoComp.vue";
import UserPageMapComp from "@/components/User/UserPageMapComp.vue";
import { mapActions } from "vuex";

export default {
	name: "UserPage",
	components: { UserInfoComp, UserTabsInfoComp, UserPageMapComp },
	data() {
		return {
			user: {
				userId: Number,
				email: "",
				nickname: "",
				name: "",
				profileImage: "",
				urlProfileImage: null,
				followerCnt: null,
				followingCnt: null,
			},
			writeTravelList: null,
			zzimTravelList: null,
		};
	},
	created() {
		console.log("유저id : " + this.$route.params.userId);
		this.getUserInfo(this.$route.params.userId);
		this.getUserTravelList(this.$route.params.userId);
		this.getUserZzimTravelList(this.$route.params.userId);
	},

	methods: {
		...mapActions("userStore", ["getUserByUserId"]),
		...mapActions("travelStore", ["getTravelListByUserId", "getZzimTravelListByUserId"]),
		async getUserInfo(userId) {
			let res = await this.getUserByUserId(userId);
			console.log(res);
			this.user = res.data.data;
		},
		async getUserTravelList(userId) {
			let res = await this.getTravelListByUserId(userId);
			this.writeTravelList = res.data.data;
		},
		async getUserZzimTravelList(userId) {
			let res = await this.getZzimTravelListByUserId(userId);
			this.zzimTravelList = res.data.data;
		},
		updateProfileimage(image) {
			this.user.urlProfileImage = image;
		},
		plusFollowerCnt() {
			this.user.followerCnt = this.user.followerCnt + 1;
		},
		minusFollowerCnt() {
			this.user.followerCnt = this.user.followerCnt - 1;
		},
	},
};
</script>

<style lang="scss" scoped>
#user_page {
	display: flex;
	flex-direction: row;
	height: 100%;
	padding-top: 70px; // 헤더 높이
}
#user_side {
	height: 100%;
	min-width: 650px;
}
</style>
