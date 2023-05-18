<template>
	<!-- <GridWrapper> -->
	<!-- <div v-for="(data, index) in dummy" v-bind:key="index">
				<router-link :to="{ name: 'detail', params: { postId: index } }">
					{{ index }}
				</router-link>
			</div> -->
	<!-- </GridWrapper> -->

	<!-- <v-item-group>
		<v-container>
			<v-row v-for="k in 3" :key="k" justify="center">
				<v-col v-for="n in 3" :key="n" cols="3">
					<v-hover>
						<template v-slot:default="{ hover }">
							<v-card>
								<v-img
									:src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
									:lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
									aspect-ratio="1"
									class="grey lighten-2"
									max-height="300px"
									max-width="300px"
								>
									<v-overlay v-if="hover" absolute color="#036358">
										<v-btn @click="toTravelPage()">보기</v-btn>
									</v-overlay>
								</v-img>
							</v-card>
						</template>
					</v-hover>
				</v-col>
			</v-row>
		</v-container>
	</v-item-group> -->

	<v-container>
		<v-row class="ml-10 fill-height" justify="center">
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
	</v-container>
</template>

<script>
import { GridWrapper } from "./style";
import { mapActions } from "vuex";

export default {
	name: "GridComponent",

	data() {
		return {
			travelList: null,
			overlay: false,
			icons: ["mdi-rewind", "mdi-play", "mdi-fast-forward"],
			items: [
				{
					title: "타이틀",
					text: `경상북도 안동시`,
					subtext: "태그1 태그2 태그3 태그4",
					img: "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80",
				},
				{
					title: "타이틀",
					text: `경상북도 안동시`,
					subtext: "태그1 태그2 태그3 태그4",
					img: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
				},
				{
					title: "타이틀",
					text: `경상북도 안동시`,
					subtext: "태그1 태그2 태그3 태그4",
					img: "https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80",
				},
				{
					title: "타이틀",
					text: `경상북도 안동시`,
					subtext: "태그1 태그2 태그3 태그4",
					img: "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80",
				},
				{
					title: "타이틀",
					text: `경상북도 안동시`,
					subtext: "태그1 태그2 태그3 태그4",
					img: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
				},
				{
					title: "타이틀",
					text: `경상북도 안동시`,
					subtext: "태그1 태그2 태그3 태그4",
					img: "https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80",
				},
				{
					title: "타이틀",
					text: `경상북도 안동시`,
					subtext: "태그1 태그2 태그3 태그4",
					img: "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80",
				},
				{
					title: "타이틀",
					text: `경상북도 안동시`,
					subtext: "태그1 태그2 태그3 태그4",
					img: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
				},
				{
					title: "타이틀",
					text: `경상북도 안동시`,
					subtext: "태그1 태그2 태그3 태그4",
					img: "https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80",
				},
			],
			transparent: "rgba(255, 255, 255, 0)",
		};
	},
	components: {
		// GridWrapper,
	},
	created() {
		this.getTravelList();
	},
	mounted() {},

	methods: {
		...mapActions("travelStore", ["getTravelListForHomeView"]),
		async getTravelList() {
			let res = await this.getTravelListForHomeView();
			this.travelList = res.data.data;
		},
		toTravelPage() {
			console.log("toTravelPage");
		},
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
