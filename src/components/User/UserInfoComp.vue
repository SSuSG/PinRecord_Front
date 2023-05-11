<template>
	<v-card class="d-flex flex-column" outlined>
		<v-sheet color="white" elevation="1" class="d-flex flex-column mx-auto" width="100%">
			<v-row justify="center" class="mt-4">
				<v-avatar size="130">
					<v-img v-bind:src="'data:image/jpeg;base64,' + user.profileImage"></v-img>
				</v-avatar>
			</v-row>

			<v-row justify="center">
				<v-col>
					<v-card-text>{{ user.nickname }}</v-card-text>
				</v-col>
			</v-row>

			<v-row justify="center">
				<v-btn text>팔로워목록</v-btn>
				<v-btn text>팔로잉목록</v-btn>
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
export default {
	name: "UserInfoComp",
	props: ["user"],
	data() {
		return {};
	},
	methods: {},
	created() {},
};
</script>

<style></style>
