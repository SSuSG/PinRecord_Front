<template>
	<v-container>
		<v-row class="ml-10 fill-height" justify="center" v-if="travelList">
			<template v-for="(travel, i) in travelList">
				<v-col :key="i" cols="12" md="4">
					<v-hover v-slot="{ hover }">
						<v-card height="300px" width="500px" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
							<v-img
								:src="'data:image/png;base64,' + travel.pinList[0].imageList[0].image"
								height="300px"
								width="500px"
							>
								<v-card-title class="text-h6">
									<v-row class="fill-height flex-column" justify="space-between">
										<p class="mt-4 subheading text-left">
											{{ travel.title }}
										</p>

										<div>
											<p class="ma-0 text-body-1 font-weight-bold font-italic text-left">
												{{ travel.state }} {{ travel.city }}
											</p>
											<p class="text-caption font-weight-medium font-italic text-left">
												{{ travel.content }}
											</p>
										</div>

										<div class="align-self-center">
											<!-- <v-btn :class="{ 'show-btns': hover }" :color="transparent" icon>
													<v-icon :class="{ 'show-btns': hover }">
														{{ icons[1] }}
													</v-icon>
												</v-btn> -->
											<v-overlay v-if="hover" absolute :color="transparent">
												<v-btn @click="toTravelPage()">보기</v-btn>
											</v-overlay>
										</div>
									</v-row>
								</v-card-title>
							</v-img>
						</v-card>
					</v-hover>
				</v-col>
			</template>
		</v-row>
		<v-row v-if="travelList.length === 0">
			<v-col>
				<v-alert border="right" colored-border type="info" elevation="2"> 검색 결과가 없습니다. </v-alert>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { GridWrapper } from "./style";
import { mapActions } from "vuex";

export default {
	name: "GridComponent",
	props: {
		travelList: Array,
	},
	data() {
		return {
			overlay: false,
			transparent: "rgba(255, 255, 255, 0)",
		};
	},
	components: {
		// GridWrapper,
	},
};
</script>

<style lang="scss" scoped>
#content_wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: left;
	align-items: left;
	background-color: rgba($color: #036358, $alpha: 0.4);
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
</style>
