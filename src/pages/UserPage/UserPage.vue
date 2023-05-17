<template>
	<div id="user_page">
		<!-- <v-row no-gutters> -->
		<v-col cols="12" lg="4">
			<v-row no-gutters>
				<v-col>
					<user-info-comp :user="user" @update-profile-image="updateProfileimage" />
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col>
					<user-tabs-info-comp
						:userNickname="user.nickname"
						:travelList="writeTravelList"
						:zzimTravelList="zzimTravelList"
					/>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12" lg="8" class="pl-2">
			<user-page-map-comp :travelList="writeTravelList" />
		</v-col>
		<!-- </v-row> -->
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
				userId: "",
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
			this.user.profileImage = image;
		},
	},
};
</script>

<style scoped></style>
