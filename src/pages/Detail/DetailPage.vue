<template>
	<div id="detail_page">
		<div id="detail_left">
			<detail-travel :prop="getDetailData" :zzim="zzim" @cancel-zzim="cancelZzim" @do-zzim="doZzim" />
			<hr />
			<detail-comment :prop="getDetailData.commentList" :loginUser="getLoginUser" :postId="postId" />
		</div>
		<detail-kakao-map :pinList="getDetailPinList" />
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
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
			postId: null,
			zzim: null,
		};
	},

	async mounted() {
		this.$nextTick(async function () {
			this.postId = this.$route.params.postId;
			const response = await this.$store.dispatch("detailStore/getDetail", this.postId);
			this.isUserZzim(this.getDetailData.travelId, this.getLoginUserUserId);
		});
	},

	methods: {
		...mapMutations("detailStore", ["ADD_ZZIM_CNT", "MINUS_ZZIM_CNT"]),
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
		cancelZzim() {
			this.zzim = false;
			this.MINUS_ZZIM_CNT();
		},
		doZzim() {
			this.zzim = true;
			this.ADD_ZZIM_CNT();
		},
	},
	computed: {
		...mapGetters("userStore", ["getLoginUserUserId"]),
		...mapGetters("detailStore", ["getDetailData"]),
		...mapGetters("detailStore", ["getDetailPinList"]),
		...mapGetters("userStore", ["getLoginUser"]),
	},
	watch: {
		getDetailData() {
			// console.log("parent", { ...this.getDetailData.commentList });
		},
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
	min-width: 650px;
}
</style>
