<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn text v-bind="attrs" v-on="on"> Follower </v-btn>
		</template>
		<v-card>
			<v-list subheader two-line>
				<v-subheader>Follower List</v-subheader>
				<v-divider></v-divider>
				<v-list-item v-for="follower in followerList" :key="follower.followerUserId" ripple>
					<v-list-item-avatar>
						<v-img v-if="follower.image" :src="'data:image/png;base64,' + follower.image"></v-img>
						<v-img v-else src="@/assets/default.png"></v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>{{ follower.nickname }}</v-list-item-title>
						<v-list-item-subtitle>{{ follower.name }}</v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-icon>
						<v-btn @click="toUserPage(follower.followerUserId)">
							<v-icon> mdi-message-outline </v-icon>
						</v-btn>
					</v-list-item-icon>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="dialog = false"> 닫기 </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: "FollowerComp",
	props: {
		followerList: Array,
	},
	methods: {
		toUserPage(userId) {
			this.dialog = false;
			this.$router.replace({ name: "user", params: { userId: userId } });
		},
	},
	data() {
		return {
			dialog: false,
		};
	},
};
</script>

<style></style>
