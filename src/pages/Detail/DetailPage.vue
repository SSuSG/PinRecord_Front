<template>
	<div id="detail_page">detail{{ $route.params.postId }}</div>
</template>

<script>
export default {
	name: "DetailPage",

	data() {
		return {
			postId: Number,
		};
	},

	async mounted() {
		const postId = this.$route.params.postId;
		const response = await this.$store.dispatch("travelStore/postTravel", {
			...this.travelInfo,
		});
	},

	methods: {},
};
</script>

<style lang="scss" scoped>
#detail_page {
	display: flex;
	flex-direction: row;
	height: 100%;
	padding-top: 70px; // 헤더 높이
}
</style>
