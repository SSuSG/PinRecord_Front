<template>
	<div id="detailTravel">
		<div id="writer_info">
			{{ prop.writer }}
		</div>
	</div>
</template>

<script>
export default {
	name: "DetailTravel",

	data() {
		return {
			writerInfo: {
				userId: "",
				writer: "",
			},

			travelInfo: {
				city: "",
				commentList: "",
				content: "",
				cost: "",
				endDate: "",
				startDate: "",
				state: "",
				title: "",
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
</style>
