<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn text v-bind="attrs" v-on="on"> Following </v-btn>
		</template>

		<v-card>
			<v-list subheader two-line>
				<v-subheader>Following List</v-subheader>

				<v-list-item v-for="following in followingList" :key="following.name" ripple>
					<v-list-item-avatar>
						<v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>{{ following.nickname }}</v-list-item-title>
						<v-list-item-subtitle>{{ following.name }}</v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-icon>
						<v-icon> mdi-message-outline </v-icon>
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
	data() {
		return {
			dialog: false,
			recent: [
				{
					avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
				},
				{
					avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
				},
				{
					avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
				},
				{
					avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
				},
			],
		};
	},
};
</script>

<style></style>
