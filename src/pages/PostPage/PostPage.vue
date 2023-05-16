<template>
	<div id="post_page">
		<review-input :pinList="pinList" @removePin="removePinList" @addImageList="addImageList"></review-input>
		<kakao-map @addPin="setPinList" />
	</div>
</template>

<script>
import ReviewInput from "@/components/ReviewInput/ReviewInput.vue";
import KakaoMap from "@/components/PostKakaoMap/KakaoMap.vue";
export default {
	components: { ReviewInput, KakaoMap },
	name: "PostPage",

	data() {
		return {
			pinList: [],
		};
	},

	methods: {
		setPinList(value) {
			this.pinList = [...this.pinList, value];
		},
		removePinList(value) {
			this.pinList = [...this.pinList].filter((e) => e.id !== value);
		},
		addImageList(value) {
			this.pinList = [...this.pinList].map((e) => {
				if (e.id === value.id) return { ...e, imageList: value.imageList };
				else return { ...e };
			});
		},
	},
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
