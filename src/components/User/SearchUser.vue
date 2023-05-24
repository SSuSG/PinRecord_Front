<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<button id="search_user_button" v-bind="attrs" v-on="on">유저 검색</button>
		</template>
		<v-card>
			<div id="search_box_wrapper">
				<div id="search_box">
					<div id="search_text">
						<span> 유저 검색 </span>
					</div>
					<input id="search_input" type="text" v-model="nickname" />
					<button id="search_button" @click="searchUser(nickname)">검색</button>
				</div>
				<v-list-item v-for="user in userList" :key="user.userId" ripple>
					<v-list-item-avatar>
						<v-img v-if="user.urlProfileImage" :src="'data:image/png;base64,' + user.urlProfileImage"></v-img>
						<v-img v-else src="@/assets/default.png"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ user.nickname }}</v-list-item-title>
						<v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-icon>
						<v-btn plain @click="toUserPage(user.userId)">
							<v-icon> mdi-account-details </v-icon>
						</v-btn>
					</v-list-item-icon>
				</v-list-item>
			</div>
		</v-card>
	</v-dialog>
</template>

<script>
import { searchUser } from "@/apis/user";

export default {
	name: "SearchUser",

	data() {
		return {
			dialog: false,
			nickname: "",
			userList: Array,
		};
	},

	methods: {
		async searchUser(nickname) {
			const response = await searchUser(nickname);
			this.userList = [...response.data.data];
			this.nickname = "";
		},
		toUserPage(userId) {
			this.dialog = false;
			this.$router.replace({ name: "user", params: { userId: userId } });
		},
	},
};
</script>

<style lang="scss" scoped>
#search_user_button {
	color: #454545;
	font-weight: 600;
	border-radius: 5px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
}
#search_user_button:hover {
	background-color: Gainsboro;
}
#search_box_wrapper {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 30px;
}
#search_text {
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	color: #8a8a8a;
}
#search_box {
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 20px;
	padding: 0px;
}

#search_input {
	border: 1px solid #8a8a8a;
	border-radius: 5px;
	padding: 5px;
}

#search_button {
	background-color: #3182f6;
	color: white;
	font-weight: 500;
	border-radius: 5px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
}
#search_button:hover {
	background-color: #1364d6;
}
#close_button {
	background-color: indianred;
	color: white;
	font-weight: 500;
	border-radius: 5px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
}
#close_button:hover {
	background-color: brown;
}
</style>
