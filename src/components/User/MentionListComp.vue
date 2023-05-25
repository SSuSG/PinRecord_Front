<template>
	<v-dialog v-model="dialog" max-width="800" v-if="mentionList">
		<template v-slot:activator="{ on, attrs }">
			<button id="mentionButton" v-bind="attrs" v-on="on" icon darks>알림</button>
		</template>

		<v-card max-width="800" class="mx-auto">
			<div id="mention_title">My Mention List</div>
			<v-container>
				<div id="mention_container" v-if="mentionList.length > 0">
					<div id="mention" v-for="mention in mentionList" :key="mention.mentionId" cols="12">
						<!--  -->
						<div id="logo">
							<v-icon left color="#4169E1"> mdi-pandora </v-icon>
							<span style="color: royalblue; font-weight: 600; font-size: 19px">PinRecord</span>
						</div>
						<span> [{{ mention.nickname }}]님이 [{{ mention.title }}] 을(를) 공유했어요! </span>
						<button id="linkButton" @click="toTravelPage(mention.travelId)" plain>바로가기</button>
						<!--  -->
					</div>
				</div>
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
#mention_title {
	background-color: #4169e1;
	color: white;
	height: 70px;
	display: flex;
	justify-content: start;
	align-items: center;
	padding: 10px;
	font-size: 20px;
	font-weight: bold;
}
#mention_container {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	justify-content: center;
	align-items: center;
	padding: 10px;
}
#mention {
	width: 80%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-radius: 5px;
	background-color: whitesmoke;
	font-weight: 600;
	color: #8a8a8a;
}
#logo {
	display: flex;
	justify-content: center;
	align-items: center;
}
#linkButton {
	color: royalblue;
	font-weight: 600;
	border-radius: 5px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
}
#linkButton:hover {
	background-color: Gainsboro;
}
#mentionButton {
	color: #454545;
	font-weight: 600;
	border-radius: 5px;
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
