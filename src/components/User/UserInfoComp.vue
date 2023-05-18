<template>
	<v-card class="flex-column" outlined>
		<v-sheet color="white" elevation="1" class="d-flex flex-column" width="100%">
			<v-row justify="center" class="mt-4">
				<v-avatar size="130" style="position: relative">
					<v-img v-if="user.urlProfileImage" :src="'data:image/png;base64,' + user.urlProfileImage"></v-img>
					<v-img v-else src="@/assets/default.png"></v-img>
					<upload-image-comp
						:userId="user.userId"
						v-if="user.nickname === getLoginUserNickname"
						@update-profile-image="updateProfileimage"
						class="overlay-icon"
					/>
				</v-avatar>
			</v-row>

			<v-row justify="center">
				<v-card-text>{{ user.nickname }}</v-card-text>
			</v-row>

			<v-row justify="center" class="pb-2">
				<follower-comp :followerList="followerList" />
				<following-comp :followingList="followingList" />
			</v-row>

			<v-row justify="center" class="pb-6">
				<v-btn text>
					<v-icon>mdi-account-plus</v-icon>
				</v-btn>
				<v-btn text>
					<v-icon>mdi-account-remove</v-icon>
				</v-btn>
			</v-row>
		</v-sheet>
	</v-card>
</template>

<script>
import FollowerComp from "./FollowerComp.vue";
import FollowingComp from "./FollowingComp.vue";
import { mapActions, mapGetters } from "vuex";
import UploadImageComp from "./UploadImageComp.vue";

export default {
	name: "UserInfoComp",
	props: {
		user: Object,
	},
	data() {
		return {
			profileImage: null,
			followerList: null,
			followingList: null,
		};
	},
	components: {
		FollowerComp,
		FollowingComp,
		UploadImageComp,
	},
	methods: {
		...mapActions("followStore", ["findFollowingByUserId", "findFollowerByUserId"]),
		...mapActions("userStore", ["getUserProfileImage"]),
		async getUserFollowInfo(userId) {
			let res1 = await this.findFollowerByUserId(userId);
			this.followerList = res1.data.data;

			let res2 = await this.findFollowingByUserId(userId);
			this.followingList = res2.data.data;
		},
		updateProfileimage(image) {
			this.$emit("update-profile-base64Image", image);
		},
		async getProfileImage(userId) {
			console.log("유저 프로필 이미지 조회!!" + userId);
			let res = await this.getUserProfileImage(userId);
			console.log(res.data.data);
			return res;
		},
	},
	computed: {
		...mapGetters("userStore", ["getLoginUserNickname"]),
	},
	created() {
		this.getUserFollowInfo(this.$route.params.userId);
	},
};
</script>

<style>
.overlay-icon {
	position: absolute;
	top: 90%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
