<template>
	<div id="detail_page">
		<div id="detail_left">
			<div v-if="!isLoading">
				<detail-travel :prop="getDetailData" :zzim="zzim" @cancel-zzim="cancelZzim" @do-zzim="doZzim" />
				<hr />
				<detail-comment :prop="getDetailData.commentList" :loginUser="getLoginUser" :postId="postId" />
			</div>
		</div>
		<detail-kakao-map :pinList="getDetailPinList" />
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import DetailKakaoMap from "@/components/DetailKakaoMap/DetailKakaoMap.vue";
import DetailTravel from "@/components/DetailTravel/DetailTravel.vue";
import DetailComment from "@/components/DetailComment/DetailComment.vue";
import LoadingSpinnerComp from "@/components/User/LoadingSpinnerComp.vue";

export default {
	name: "DetailPage",
	components: {
		DetailKakaoMap,
		DetailTravel,
		DetailComment,
		// LoadingSpinnerComp,
	},
	data() {
		return {
			postId: null,
			zzim: null,
			isLoading: true,
		};
	},

	async mounted() {
		this.postId = this.$route.params.postId;
		const response = await this.$store.dispatch("detailStore/getDetail", this.postId);
		this.isUserZzim(this.getDetailData.travelId, this.getLoginUserUserId);
		this.isLoading = false;
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
	watch: {},
};
</script>

<style lang="scss" scoped>
#detail_page {
	display: flex;
	flex-direction: row;
	height: 100%;
	padding-top: 70px; // 헤더 높이
	color: #454545;
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
