<template>
	<div id="user_travel_list">
		<div id="travel_info" v-for="travel in travelList" :key="travel.title">
			<div id="image_carousel">
				<v-carousel hide-delimiters show-arrows-on-hover height="100%">
					<v-carousel-item
						v-for="(image, i) in travel.pinList[0].imageList"
						:key="i"
						reverse-transition="fade-transition"
					>
						<div id="travel_img">
							<img :src="'data:image/png;base64,' + image.image" style="object-fit: fill" />
						</div>
					</v-carousel-item>
				</v-carousel>
			</div>
			<!--  -->
			<div id="right_side">
				<div id="right_top">
					<h3 @click="toTravelPage(travel.travelId)">
						{{ travel.title }}
					</h3>
					<v-divider class="row mx-4 my-0"></v-divider>
				</div>

				<div id="right_mid">
					<div id="text_box">
						<v-icon fixed> mdi-account </v-icon>
						<div class="ms-2">
							{{ travel.writer }}
						</div>
					</div>
					<div id="text_box">
						<v-icon fixed> mdi-map-outline </v-icon>
						<div class="ms-2">{{ travel.state }} {{ travel.city }}</div>
					</div>
					<div id="text_box">
						<v-icon fixed> mdi-currency-krw </v-icon>
						<div class="ms-2">{{ numberWithCommas(travel.cost) }}</div>
					</div>
					<div id="text_box">
						<v-icon fixed> mdi-calendar </v-icon>
						<div class="ms-2">{{ travel.startDate | formatDate }} ~ {{ travel.endDate | formatDate }}</div>
					</div>
				</div>
				<!--  -->
				<div id="right_bot">
					<div>
						<v-icon fixed color="blue lighten-0">mdi-comment-multiple</v-icon>
						<span class="ms-2" style="color: #2196f3">{{ travel.commentList.length }}</span>
					</div>
					<div>
						<v-icon fixed color="red lighten-0">mdi-cards-heart</v-icon>
						<span class="ms-2" style="color: #f44336">{{ travel.zzimCnt }}</span>
					</div>
					<div>
						<v-icon fixed color="green ">mdi-map-marker</v-icon>
						<span class="ms-2" style="color: green">{{ travel.pinList.length }}</span>
					</div>
				</div>
				<!--  -->
			</div>
		</div>
	</div>
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
	methods: {
		toTravelPage(travelId) {
			this.$router.push("/detail/" + travelId);
		},
		numberWithCommas(cost) {
			return String(cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
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
	computed: {},
};
</script>

<style scoped lang="scss">
#user_travel_list {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 15px;
	align-items: center;
	justify-content: center;
	padding: 20px;
	color: #585858;
}

#travel_info {
	display: flex;
	height: 250px;
	width: 100%;
	box-shadow: 2px 1px 4px rgba(0, 0, 0, 0.2);
	background-color: whitesmoke;
	border-radius: 5px;
	padding: 10px;
	gap: 10px;
	transition: 0.2s ease-in-out;
}
#travel_info:hover {
	/* transform: scale(1.02); */
}
#image_carousel {
	width: 300px;
}
#travel_img {
	width: 300px;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
}
#right_side {
	width: 60%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: start;
}
#right_top {
	display: flex;
	justify-content: start;
	cursor: pointer;
}
#right_mid {
	display: flex;
	flex-direction: column;
	justify-content: start;
	gap: 10px;
}
#right_bot {
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
#text_box {
	display: flex;
	font-weight: 600;
	color: #585858;
}
</style>
