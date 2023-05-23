<template>
	<v-dialog v-model="dialog" max-width="800" v-if="mentionList">
		<template v-slot:activator="{ on, attrs }">
			<button id="mentionButton" v-bind="attrs" v-on="on" icon darks>
				<!-- <v-icon>mdi-account-plus</v-icon> -->
				알림
			</button>
		</template>

		<v-card max-width="800" class="mx-auto">
			<v-app-bar dark color="blue">
				<v-toolbar-title>My Mention List</v-toolbar-title>

				<v-spacer></v-spacer>
			</v-app-bar>
			<v-container>
				<v-row v-if="mentionList.length > 0">
					<v-col v-for="mention in mentionList" :key="mention.mentionId" cols="12">
						<v-card class="mx-auto" max-width="650">
							<v-card-title class="mention-title">
								<v-icon left> mdi-pandora </v-icon>
								<span>PinRecord</span>
								<v-spacer></v-spacer>
								<v-btn @click="toTravelPage(mention.travelId)" plain>바로가기</v-btn>
							</v-card-title>
							<v-spacer></v-spacer>
							<v-card-subtitle class="mention-content">
								[{{ mention.nickname }}]님이 [{{ mention.title }}] 을(를) 공유했어요!
							</v-card-subtitle>
						</v-card>
					</v-col>
				</v-row>
				<v-row v-else>
					<v-col>
						<v-alert border="right" colored-border type="info" elevation="2"> Mention이 존재하지 않습니다. </v-alert>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	name: "MentionListComp",
	created() {
		this.getMentionList(this.getLoginUserUserId);
	},
	data() {
		return {
			mentionList: null,
			dialog: false,
		};
	},
	methods: {
		...mapActions("userStore", ["getMentionListByUserId"]),
		async getMentionList(userId) {
			let res = await this.getMentionListByUserId(userId);
			this.mentionList = res.data.data;
		},
		toTravelPage(travelId) {
			this.dialog = false;
			this.$router.push("/detail/" + travelId);
		},
	},
	computed: {
		...mapGetters("userStore", ["getLoginUserUserId"]),
	},
};
</script>

<style scoped>
#mentionButton {
	/* background-color: #3182f6; */
	color: #454545;
	font-weight: 600;
	border-radius: 10px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
}
#mentionButton:hover {
	background-color: Gainsboro;
}
.mention-title {
	font-size: 30px;
}
.mention-content {
	font-size: 22px;
}
</style>
