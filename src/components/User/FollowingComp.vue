<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn text v-bind="attrs" v-on="on"> Following </v-btn>
		</template>

		<v-card>
			<v-list subheader>
				<v-subheader>Following List</v-subheader>
				<v-divider></v-divider>
				<v-list-item v-for="following in followingList" :key="following.nickname">
					<v-list-item-avatar>
						<v-img v-if="following.image" :src="'data:image/png;base64,' + following.image"></v-img>
						<v-img v-else src="@/assets/default.png"></v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>{{ following.nickname }}</v-list-item-title>
						<v-list-item-subtitle>{{ following.name }}</v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-icon>
						<v-btn plain @click="toUserPage(following.followingUserId)">
							<v-icon> mdi-account-details </v-icon>
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
	name: "FollowingComp",
	props: {
		followingList: Array,
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
