<template>
	<div id="grid_component">
		<GridWrapper>
			<GridBox
				v-for="travel in travelList"
				:key="travel.travelId"
				@mouseover="showOverlay(travel.travelId)"
				@mouseleave="closeOverlay"
			>
				<ImgBox :src="'data:image/png;base64,' + travel.pinList[0].imageList[0].image" />
				<OverlayInfoWrapper v-if="overlayToggle === travel.travelId" @click="toTravelPage(travel.travelId)">
					<OverlayInfo>
						<CountInfo>
							<div>
								<v-icon size="large" fixed color="red lighten-0">mdi-cards-heart</v-icon>
								<span class="ms-2" style="color: #f44336">{{ travel.zzimCnt }}</span>
							</div>
							<div>
								<v-icon size="large" fixed color="blue lighten-0">mdi-comment-multiple</v-icon>
								<span class="ms-2" style="color: #2196f3">{{ travel.commentList.length }}</span>
							</div>
						</CountInfo>
						<TextInfo>
							<h2>{{ travel.title }}</h2>
							<span>{{ travel.state }} {{ travel.city }}</span>
							<span>{{ travel.content }} </span>
						</TextInfo>
					</OverlayInfo>
				</OverlayInfoWrapper>
			</GridBox>
		</GridWrapper>
		<infinite-loading v-if="pagination && travelList" @infinite="infiniteHandler" spinner="circles"></infinite-loading>
		<div v-if="!pagination">
			<h2>마지막 페이지 입니다.</h2>
		</div>
	</div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { GridWrapper, GridBox, ImgBox, OverlayInfoWrapper, OverlayInfo, CountInfo, TextInfo } from "./style";
export default {
	name: "GridComponent",
	props: {
		travelList: Array,
		pagination: Boolean,
	},
	data() {
		return {
			overlay: false,
			transparent: "rgba(255, 255, 255, 0)",
			overlayToggle: null,
		};
	},
	components: {
		GridWrapper,
		GridBox,
		ImgBox,
		OverlayInfoWrapper,
		OverlayInfo,
		TextInfo,
		CountInfo,
		InfiniteLoading,
	},
	methods: {
		toTravelPage(travelId) {
			this.$emit("to-travel-page", travelId);
		},
		showOverlay(travelId) {
			this.overlayToggle = travelId;
		},
		closeOverlay() {
			this.overlayToggle = null;
		},
		infiniteHandler() {
			setTimeout(() => {
				this.$emit("increasePageNum");
			}, 200);
			// this.$emit("increasePageNum");
		},
	},
};
</script>

<style lang="scss" scoped>
#grid_component {
	width: 100%;
	height: 100%;
}

.v-card {
	transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
	opacity: 0.6;
}

.show-btns {
	color: rgba(255, 255, 255, 1) !important;
}

#noSearch {
	margin-left: 400px;
}
</style>
