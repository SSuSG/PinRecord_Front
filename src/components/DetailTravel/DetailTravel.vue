<template>
	<div id="detailTravel">
		<div id="writer_info">
			<span>
				<v-icon size="xlarge" color="red-darken-2">mdi-account-search </v-icon>
			</span>
			<span @click="toUserPage(prop.userId)">
				{{ prop.writer }}
			</span>
		</div>
		<div id="travel_info">
			<div class="info_wrapper">
				<span>
					<v-icon size="xlarge" color="red-darken-2">mdi-airplane </v-icon>
				</span>
				<span>{{ prop.title }}</span>
			</div>
			<div class="info_wrapper">
				<span>
					<v-icon size="xlarge" color="red-darken-2">mdi-map-marker-outline </v-icon>
				</span>
				<span>{{ prop.city }}</span>
			</div>
			<div class="info_wrapper">
				<span>
					<v-icon size="xlarge" color="red-darken-2">mdi-calendar-range </v-icon>
				</span>
				<span>{{ this.convertDate(prop.startDate) }}</span>
				<span>~</span>
				<span>{{ this.convertDate(prop.endDate) }}</span>
			</div>
			<div class="info_wrapper">
				<span>
					<v-icon size="xlarge" color="red-darken-2">mdi-currency-krw</v-icon>
				</span>
				<span>{{ numberWithCommas }}</span>
			</div>
			<div class="info_wrapper">
				<span>
					<v-icon size="xlarge" color="red-darken-2">mdi-comment-processing-outline </v-icon>
				</span>
				<span>{{ prop.content }}</span>
			</div>
		</div>
		<!-- <comment-comp :commentList="travelInfo.commentList" /> -->
	</div>
</template>

<script>
// import CommentComp from "./CommentComp.vue";
export default {
	// components: { CommentComp },
	name: "DetailTravel",

	data() {
		return {
			writerInfo: {
				userId: "",
				writer: "",
			},

			travelInfo: {
				city: "",
				state: "",
				title: "",
				content: "",
				cost: "",
				endDate: "",
				startDate: "",
				commentList: "",
				travelId: "",
				zzimCnt: "",
			},
			// pinList
		};
	},
	props: {
		prop: Object,
	},

	mounted() {},

	methods: {
		toUserPage(userId) {
			// console.log(userId);
			this.$router.push("/user/" + userId);
		},
		convertDate(dateString) {
			const date = new Date(dateString);
			const year = date.getFullYear();
			const month = ("0" + (date.getMonth() + 1)).slice(-2);
			const day = ("0" + date.getDate()).slice(-2);
			const convertedDate = year + ". " + month + ". " + day;
			return convertedDate;
		},
	},

	watch: {
		prop() {
			this.writerInfo = {
				userId: this.prop.userId,
				writer: this.prop.writer,
			};
			this.travelInfo = {
				city: this.prop.city,
				commentList: this.prop.commentList,
				content: this.prop.content,
				cost: this.prop.cost,
				endDate: this.prop.endDate,
				startDate: this.prop.startDate,
				state: this.prop.state,
				title: this.prop.title,
				travelId: this.prop.travelId,
				zzimCnt: this.prop.zzimCnt,
			};
		},
	},
	computed: {
		numberWithCommas() {
			return String(this.prop.cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
	},
};
</script>

<style lang="scss" scoped>
#detailTravel {
	width: 100%;
	background-color: whitesmoke;
}
#travel_info {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.info_wrapper {
	padding: 5px;
	display: flex;
	/* flex-direction: column; */
	gap: 15px;
	background-color: white;
	border-radius: 5px;
	font-size: 15px;
	font-weight: 500;
	color: #343434;
}
.info_wrapper > span {
	font-weight: bold;
}
</style>
