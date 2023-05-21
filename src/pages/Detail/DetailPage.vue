<template>
	<div id="detail_page">
		<div id="detail_left">
			<detail-travel :prop="getDetailData" />
			<hr />
			<detail-comment :prop="getDetailData.commentList" :loginUser="getLoginUser" :postId="postId" />
		</div>
		<detail-kakao-map :pinList="getDetailPinList" />
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import DetailKakaoMap from "@/components/DetailKakaoMap/DetailKakaoMap.vue";
import DetailTravel from "@/components/DetailTravel/DetailTravel.vue";
import DetailComment from "@/components/DetailComment/DetailComment.vue";
export default {
	name: "DetailPage",
	components: {
		DetailKakaoMap,
		DetailTravel,
		DetailComment,
	},

	data() {
		return {
			postId: String,
		};
	},

	async mounted() {
		this.postId = this.$route.params.postId;
		const response = await this.$store.dispatch("detailStore/getDetail", this.postId);
		if (response !== 200) alert("불러오기 실패");
	},

	methods: {},
	computed: {
		...mapGetters("detailStore", ["getDetailData"]),
		...mapGetters("detailStore", ["getDetailPinList"]),
		...mapGetters("userStore", ["getLoginUser"]),
	},
};
</script>

<style lang="scss" scoped>
#detail_page {
	display: flex;
	flex-direction: row;
	height: 100%;
	padding-top: 70px; // 헤더 높이
}
#detail_left {
	display: flex;
	flex-direction: column;
	width: 50%;
	padding: 20px;
	gap: 18px;
	background-color: whitesmoke;
	z-index: 2;
}
</style>
