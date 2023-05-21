<template>
	<div id="detail_comment">
		{{ prop }}
	</div>
</template>

<script>
export default {
	name: "DetailComment",
	data() {
		return {
			postId: Number,
		};
	},
	props: {
		prop: Array,
	},
};
</script>

<style></style>
