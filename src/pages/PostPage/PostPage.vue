<template>
	<div id="post_page">
		<review-input></review-input>
		<kakao-map />
	</div>
</template>

<script>
import ReviewInput from "@/components/ReviewInput/ReviewInput.vue";
import KakaoMap from "@/components/PostKakaoMap/KakaoMap.vue";
export default {
	components: { ReviewInput, KakaoMap },
	name: "PostPage",

	data() {
		return {};
	},

	methods: {},
};
</script>

<style lang="scss" scoped>
#post_page {
	display: flex;
	flex-direction: row;
	height: 100%;
	padding-top: 70px; // 헤더 높이
}
</style>
