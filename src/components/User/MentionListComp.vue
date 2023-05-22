<template>
	<v-dialog v-model="dialog" max-width="800">
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on" icon darks>
				<!-- <v-icon>mdi-account-plus</v-icon> -->
				Mention
			</v-btn>
		</template>

		<v-card max-width="800" class="mx-auto">
			<v-app-bar dark color="blue">
				<v-toolbar-title>My Mention List</v-toolbar-title>

				<v-spacer></v-spacer>
			</v-app-bar>
			<v-container>
				<v-row v-if="mentionList.length > 0">
					<v-col v-for="mention in mentionList" :key="mention.mentionId" cols="12">
						<v-card class="mx-auto" color="#26c6da" dark max-width="650">
							<v-card-title>
								<v-icon large left> mdi-twitter </v-icon>
								<span class="text-h6 font-weight-light">PinRecord</span>
								<v-spacer></v-spacer>
								<v-btn @click="toTravelPage(mention.travelId)">바로가기</v-btn>
							</v-card-title>

							<v-card-text class="text-h5 font-weight-bold">
								[{{ mention.nickname }}]님이 [{{ mention.title }}] 을(를) 공유했어요!
							</v-card-text>
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

<style></style>
