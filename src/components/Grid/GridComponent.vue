<template>
	<!-- <GridWrapper> -->
	<!-- <div v-for="(data, index) in dummy" v-bind:key="index">
				<router-link :to="{ name: 'detail', params: { postId: index } }">
					{{ index }}
				</router-link>
			</div> -->
	<!-- </GridWrapper> -->
	<v-item-group>
		<v-container>
			<v-row v-for="k in 3" :key="k" justify="center">
				<v-col v-for="n in 3" :key="n" cols="3">
					<v-hover>
						<template v-slot:default="{ hover }">
							<v-img
								:src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
								:lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
								aspect-ratio="1"
								class="grey lighten-2"
								max-height="300px"
								max-width="300px"
							>
								<v-fade-transition>
									<!-- <div id="content_wrapper" v-if="hover" absolute>
										<span>title</span>
									</div> -->
									<v-overlay v-if="hover" absolute color="#036358">
										<v-btn @click="toTravelPage()">보기</v-btn>
									</v-overlay>
								</v-fade-transition>
							</v-img>
						</template>
					</v-hover>
				</v-col>
			</v-row>
		</v-container>
	</v-item-group>
</template>

<script>
import { GridWrapper } from "./style";
import { mapActions } from "vuex";

export default {
	name: "GridComponent",

	data() {
		return {
			overlay: false,
			dummy: [
				{ content: "1" },
				{ content: "2" },
				{ content: "3" },
				{ content: "4" },
				{ content: "5" },
				{ content: "6" },
				{ content: "7" },
				{ content: "8" },
			],
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
</style>
