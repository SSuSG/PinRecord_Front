<template>
	<div>detail{{ $route.params.postId }}</div>
</template>

<script>
export default {
	name: "DetailPage",

	data() {
		return {
			postId: Number,
		};
	},

	mounted() {
		const postId = this.$route.params.postId;
		console.log(postId);
	},

	methods: {},
};
</script>

<style lang="scss" scoped></style>
