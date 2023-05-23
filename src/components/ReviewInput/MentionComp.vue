<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn icon v-bind="attrs" v-on="on"> <v-icon> mdi-account-plus </v-icon> </v-btn>
		</template>
		<v-card>
			<v-list subheader two-line>
				<v-subheader>Follower List</v-subheader>
				<v-divider></v-divider>
				<v-list-item v-for="(follower, index) in this.getFollowerList" :key="follower.followerUserId" ripple>
					<v-list-item-avatar>
						<v-img v-if="follower.image" :src="'data:image/png;base64,' + follower.image"></v-img>
						<v-img v-else src="@/assets/default.png"></v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>{{ follower.nickname }}</v-list-item-title>
						<v-list-item-subtitle>{{ follower.name }}</v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-icon>
						<v-btn plain @click="add(index)"> 추가 </v-btn>
					</v-list-item-icon>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list subheader>
				<v-subheader>Mention List</v-subheader>
				<v-divider></v-divider>
				<v-list-item v-for="(mentionUser, index) in this.getPreMentionList" :key="mentionUser.followerUserId" ripple>
					<v-list-item-avatar>
						<v-img v-if="mentionUser.image" :src="'data:image/png;base64,' + mentionUser.image"></v-img>
						<v-img v-else src="@/assets/default.png"></v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>{{ mentionUser.nickname }}</v-list-item-title>
						<v-list-item-subtitle>{{ mentionUser.name }}</v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-icon>
						<v-btn plain @click="remove(index)"> 삭제 </v-btn>
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
import { mapGetters, mapMutations } from "vuex";
export default {
	name: "MentionComp",
	computed: {
		...mapGetters("travelStore", ["getFollowerList", "getPreMentionList"]),
	},
	methods: {
		...mapMutations("travelStore", ["ADD_USER_TO_MENTION_LIST", "ADD_USER_TO_FOLLOWER_LIST"]),
		add(index) {
			this.ADD_USER_TO_MENTION_LIST(index);
		},
		remove(index) {
			this.ADD_USER_TO_FOLLOWER_LIST(index);
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
