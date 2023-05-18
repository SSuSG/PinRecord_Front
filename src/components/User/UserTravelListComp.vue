<template>
	<v-card center>
		<v-row v-for="travel in travelList" :key="travel.title" align-content="center">
			<v-col cols="12" md="1"></v-col>
			<v-col cols="12" md="10">
				<v-card class="mx-auto my-6" max-width="700">
					<v-row>
						<v-col cols="12" md="6">
							<v-avatar size="180" width="90%" style="border-radius: 15%">
								<v-carousel hide-delimiters show-arrows-on-hover height="180">
									<v-carousel-item
										v-for="(image, i) in travel.pinList[0].imageList"
										:key="i"
										:src="'data:image/png;base64,' + image.image"
										reverse-transition="fade-transition"
									>
									</v-carousel-item>
								</v-carousel>
							</v-avatar>
						</v-col>
						<v-divider vertical></v-divider>
						<v-col cols="12" md="6">
							<v-btn class="mx-4 my-0 pa-0" plain text>
								<div center class="ms-2">
									{{ travel.title }}
								</div>
							</v-btn>

							<v-divider class="row mx-4 my-0"></v-divider>

							<v-card-text class="row mx-0 my-0 py-2 pb-0">
								<v-icon fixed> mdi-account </v-icon>
								<div class="ms-2">
									{{ travel.writer }}
								</div>
							</v-card-text>
							<v-card-text class="row mx-0 my-0 py-0 pb-0">
								<v-icon fixed> mdi-map-outline </v-icon>
								<div class="ms-2">{{ travel.state }} {{ travel.city }}</div>
							</v-card-text>
							<v-card-text class="row mx-0 my-0 py-0 pb-0">
								<v-icon fixed> mdi-currency-krw </v-icon>
								<div class="ms-2">{{ travel.cost }}</div>
							</v-card-text>
							<v-card-text class="row mx-0 my-0 py-1 pb-0">
								<v-icon fixed> mdi-calendar </v-icon>
								<div class="ms-2">{{ travel.startDate | formatDate }} ~ {{ travel.endDate | formatDate }}</div>
							</v-card-text>

							<div class="row mx-5 my-2 py-0">
								<div>
									<v-icon fixed color="blue lighten-0">mdi-comment-multiple</v-icon>
									<span class="ms-2" style="color: #2196f3">{{ travel.commentList.length }}</span>
								</div>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<div>
									<v-icon fixed color="red lighten-0">mdi-cards-heart</v-icon>
									<span class="ms-2" style="color: #f44336">{{ travel.zzimCnt }}</span>
								</div>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<div>
									<v-icon fixed color="yellow ">mdi-map-marker</v-icon>
									<span class="ms-2">{{ travel.pinList.length }}</span>
								</div>
							</div>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: "UserTravelListComp",
	props: {
		travelList: Array,
	},
	watch: {},
	data() {
		return {};
	},
	filters: {
		formatDate(value) {
			const date = new Date(value);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");
			return `${year}-${month}-${day}`;
		},
	},
};
</script>

<style></style>
