<template>
	<div id="grid_component">
		<GridWrapper v-if="travelList.length > 0">
			<GridBox
				v-for="travel in travelList"
				:key="travel.travelId"
				@mouseover="showOverlay(travel.travelId)"
				@mouseleave="closeOverlay"
			>
				<ImgBox :src="'data:image/png;base64,' + travel.pinList[0].imageList[0].image" />
				<OverlayInfoWrapper v-if="overlayToggle === travel.travelId" @click="toTravelPage(travel.travelId)">
					<OverlayInfo>
						<h2>{{ travel.title }}</h2>
						<span>{{ travel.state }} {{ travel.city }}</span>
						<span>{{ travel.content }} </span>
					</OverlayInfo>
				</OverlayInfoWrapper>
			</GridBox>
		</GridWrapper>
		<v-alert
			width="1200px"
			id="noSearch"
			v-if="travelList.length === 0"
			border="right"
			colored-border
			type="info"
			elevation="2"
		>
			검색 결과가 존재하지 않습니다.
		</v-alert>
	</div>
</template>

<script>
import { GridWrapper, GridBox, ImgBox, OverlayInfoWrapper, OverlayInfo } from "./style";
export default {
	name: "GridComponent",
	props: {
		travelList: Array,
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
