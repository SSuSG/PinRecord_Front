<template>
	<div id="detailTravel">
		<div id="writer_info">
			<span>작성자</span>
			<span>
				{{ prop.writer }}
			</span>
		</div>
		<div id="travel_info">
			<div class="info_wrapper">
				<span>지역</span>
				<span>{{ prop.city }}</span>
			</div>
			<div class="info_wrapper">
				<span>지역</span>
				<span>{{ prop.city }}</span>
			</div>
			<div class="info_wrapper">
				<span>여행 기간</span>
				<span>{{ prop.startDate }}</span>
				<span>{{ prop.endDate }}</span>
			</div>
			<div class="info_wrapper">
				<span>비용</span>
				<span>{{ prop.cost }}</span>
			</div>
			<div class="info_wrapper">
				<span>여행 후기</span>
				<span>{{ prop.content }}</span>
			</div>
		</div>
		<comment-comp :commentList="travelInfo.commentList" />
	</div>
</template>

<script>
import CommentComp from "./CommentComp.vue";
export default {
	components: { CommentComp },
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

	methods: {},

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
	flex-direction: column;
	gap: 5px;
	background-color: white;
	border-radius: 5px;
}
.info_wrapper > span {
	font-weight: bold;
}
</style>
