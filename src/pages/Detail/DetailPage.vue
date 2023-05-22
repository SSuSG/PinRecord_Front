<template>
	<div id="detail_page">
		<div id="detail_left">
			<detail-travel :prop="getDetailData" :zzim="zzim" />
			<hr />
			<detail-comment :prop="getDetailData.commentList" :loginUser="getLoginUser" :postId="postId" />
			<!-- <comment-comp :commentList="getDetailData.commentList" /> -->
		</div>
		<detail-kakao-map :pinList="getDetailPinList" />
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DetailKakaoMap from "@/components/DetailKakaoMap/DetailKakaoMap.vue";
import DetailTravel from "@/components/DetailTravel/DetailTravel.vue";
import DetailComment from "@/components/DetailComment/DetailComment.vue";
// import CommentComp from "@/components/DetailTravel/CommentComp.vue";

export default {
	name: "DetailPage",
	components: {
		DetailKakaoMap,
		DetailTravel,
		DetailComment,
		// CommentComp,
	},
	data() {
		return {
			postId: String,
			zzim: Boolean,
		};
	},

	async mounted() {
		this.postId = this.$route.params.postId;
		const response = await this.$store.dispatch("detailStore/getDetail", this.postId);
		// if (response !== 200) alert("불러오기 실패");

		this.isUserZzim(this.getDetailData.travelId, this.getLoginUserUserId);
	},

	methods: {
		...mapActions("zzimStore", ["isZzim"]),
		async isUserZzim(travelId, userId) {
			var dto = {
				travelId: travelId,
				userId: userId,
			};
			let res = await this.isZzim(dto);
			if (res.data.statusCode === 400) {
				this.zzim = false;
			} else {
				this.zzim = true;
			}
		},
	},
	computed: {
		...mapGetters("userStore", ["getLoginUserUserId"]),
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
	color: #8a8a8a;
	font-weight: bold;
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
