<template>
	<div id="user_info_comp">
		<div id="user_info_wrapper">
			<v-avatar size="180" style="position: relative">
				<v-img v-if="user.urlProfileImage" :src="'data:image/png;base64,' + user.urlProfileImage"></v-img>
				<v-img v-else src="@/assets/default.png"></v-img>
				<upload-image-comp
					:userId="user.userId"
					v-if="user.nickname === getLoginUserNickname"
					@update-profile-image="updateProfileimage"
					class="overlay-icon"
				/>
			</v-avatar>
		</div>

		<div id="follow_wrapper">
			<h2>{{ user.nickname }}</h2>
			<div id="follow_box">
				<div>
					<h3>{{ user.followerCnt }}</h3>
					<follower-comp :followerList="followerList" />
				</div>
				<div>
					<h3>{{ user.followingCnt }}</h3>
					<following-comp :followingList="followingList" />
				</div>
			</div>
			<div id="follow_box" v-if="getLoginUserUserId !== user.userId">
				<v-btn text @click="doFollow(user.userId)">
					<v-icon>mdi-account-plus</v-icon>
				</v-btn>
				<v-btn text @click="doCancelFollow(user.userId)">
					<v-icon>mdi-account-remove</v-icon>
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script>
import FollowerComp from "./FollowerComp.vue";
import FollowingComp from "./FollowingComp.vue";
import { mapActions, mapGetters } from "vuex";
import UploadImageComp from "./UploadImageComp.vue";
import swal from "sweetalert";

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
		...mapActions("followStore", ["findFollowingByUserId", "findFollowerByUserId", "follow", "cancelFollow"]),
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
			let res = await this.getUserProfileImage(userId);
			return res;
		},
		async doFollow(userId) {
			if (this.getLoginUserUserId === userId) {
				swal("실패!", "자기 자신은 팔로우가 불가능 합니다!", "error");
				return;
			}
			var followRequestDto = {
				userIdFrom: this.getLoginUserUserId,
				userIdTo: userId,
			};

			let res = await this.follow(followRequestDto);

			if (res.data.statusCode === 200) {
				swal("성공!", "팔로우 성공!", "success");

				var loginUser = {
					followerUserId: this.getLoginUser.userId,
					image: this.getLoginUser.image,
					name: this.getLoginUser.name,
					nickname: this.getLoginUser.nickname,
				};

				this.followerList.push(loginUser);
			} else {
				swal("실패!", res.data.developerMessage, "error");
			}
		},
		async doCancelFollow(userId) {
			if (this.getLoginUserUserId === userId) {
				swal("실패!", "자기 자신을 팔로우 취소 할 수 없습니다!", "error");
				return;
			}
			var followRequestDto = {
				userIdFrom: this.getLoginUserUserId,
				userIdTo: userId,
			};
			let res = await this.cancelFollow(followRequestDto);

			if (res.data.statusCode === 200) {
				swal("성공!", "팔로우 취소 성공!", "success");
				this.followerList = this.followerList.filter((o) => o.followerUserId !== this.getLoginUserUserId);
			} else {
				swal("실패!", res.data.developerMessage, "error");
			}
		},
	},
	computed: {
		...mapGetters("userStore", ["getLoginUserNickname", "getLoginUserUserId", "getLoginUser"]),
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
#user_info_comp {
	height: 30%;
	display: flex;
	align-items: center;
	border: 1px solid #acacac;
	padding: 10px 40px;
}
#user_info_wrapper {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
#follow_wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 30px;
	gap: 8px;
}
#follow_box {
	display: flex;
	width: 100%;
	justify-content: space-around;
}
</style>
