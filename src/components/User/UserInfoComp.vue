<template>
	<v-card class="d-flex flex-column" outlined>
		<v-sheet color="white" elevation="1" class="d-flex flex-column mx-auto" width="100%">
			<v-row justify="center" class="mt-4">
				<v-avatar size="130">
					<v-img v-bind:src="'data:image/jpeg;base64,' + user.profileImage"></v-img>
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
import { mapActions } from "vuex";

export default {
	name: "UserInfoComp",
	props: {
		user: Object,
	},
	data() {
		return {
			followerList: null,
			followingList: null,
		};
	},
	components: {
		FollowerComp,
		FollowingComp,
	},
	methods: {
		...mapActions("followStore", ["findFollowingByUserId", "findFollowerByUserId"]),
		async getUserFollowInfo(userId) {
			let res1 = await this.findFollowerByUserId(userId);
			console.log(res1);
			this.followerList = res1.data.data;

			let res2 = await this.findFollowingByUserId(userId);
			console.log(res2);
			this.followingList = res2.data.data;
		},
	},
	created() {
		this.getUserFollowInfo(this.$route.params.userId);
	},
};
</script>

<style></style>
