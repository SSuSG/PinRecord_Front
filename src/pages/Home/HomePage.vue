<template>
	<div id="home_page">
		<div id="select_container">
			<select v-if="isPlaceSearch" name="특별/광역시, 도" class="select" @change="setSelectedSi">
				<option value="none">시/도 선택</option>
				<option v-for="data in si" v-bind:key="data.code" :value="data.code">
					{{ data.name }}
				</option>
			</select>
			<select v-if="isPlaceSearch" name="구/동" class="select" @change="setSelectedGu">
				<!-- <option value="none">구, 동</option> -->
				<option v-for="data in gu" v-bind:key="data.code" :value="data.code">
					{{ data.name }}
				</option>
			</select>
			<v-btn v-if="isPlaceSearch" @click="searchTravelByCity()">검색</v-btn>

			<vue-tags-input v-if="!isPlaceSearch" v-model="tag" :tags="tags" @tags-changed="(newTags) => (tags = newTags)" />
			<v-btn v-if="!isPlaceSearch" @click="searchTravelListByTag()">검색</v-btn>

			<v-btn v-if="isPlaceSearch" @click="change()">태그 검색</v-btn>
			<v-btn v-else @click="change()">장소 검색</v-btn>
		</div>
		<grid-component :travelList="travelList"></grid-component>
	</div>
</template>

<script>
import GridComponent from "@/components/Grid/GridComponent.vue";
import { getSido, getGu } from "@/apis/sido";
import { mapActions } from "vuex";
import VueTagsInput from "@johmun/vue-tags-input";

export default {
	name: "HomePage",
	data() {
		return {
			isPlaceSearch: true,
			si: [],
			selectedSi: String,
			gu: [],
			selectedGu: String,
			state: null,
			city: null,
			tag: "",
			tags: [],
			travelList: null,
		};
	},
	components: {
		GridComponent,
		VueTagsInput,
	},
	created() {
		this.getTravelList();
	},
	mounted() {
		this.setSi();
	},

	methods: {
		...mapActions("travelStore", ["getTravelListByCity", "getTravelListForHomeView", "searchTravelByTag"]),
		async setSi() {
			const response = await getSido();
			this.si = [...response];
		},

		async setGu(code) {
			const response = await getGu(code);
			const guArray = [...response];
			guArray.shift();
			this.gu = guArray;
		},

		setSelectedSi(e) {
			this.selectedSi = e.target.value;
			const siCode = this.selectedSi[0] + this.selectedSi[1];
			for (let i = 0; i < this.si.length; i++) {
				if (this.si[i].code === this.selectedSi) {
					this.state = this.si[i].name;
					break;
				}
			}

			this.setGu(siCode);
		},

		setSelectedGu(e) {
			this.selectedGu = e.target.value;
			for (let i = 0; i < this.gu.length; i++) {
				if (this.gu[i].code === this.selectedGu) {
					const temp = this.gu[i].name.split(" ");
					this.state = temp[0];
					this.city = temp[1];
					break;
				}
			}
		},

		async getTravelList() {
			let res = await this.getTravelListForHomeView();
			this.travelList = res.data.data;
		},

		toTravelPage() {
			console.log("toTravelPage");
		},

		change() {
			this.isPlaceSearch = !this.isPlaceSearch;
		},

		async searchTravelByCity() {
			var dto = {
				state: this.state,
				city: this.city,
			};
			let res = await this.getTravelListByCity(dto);
			this.travelList = res.data.data;
		},

		async searchTravelListByTag() {
			const submitData = [];
			this.tags.forEach((e) => {
				submitData.push(e.text);
			});

			let res = await this.searchTravelByTag(submitData);
			this.travelList = res.data.data;
		},
	},
};
</script>

<style scoped>
#home_page {
	padding-top: 70px;
}
#select_container {
	width: 500px;
	margin: 50px auto;
	display: flex;
	justify-content: center;
	gap: 10px;
	padding: 10px;
}
.select {
	width: 200px;
	height: 45px;
	background-color: whitesmoke;
	border: 2px solid lightgray;
	border-radius: 5px;
	text-align: center;
	font-weight: bold;
}

.vue-tags-input {
	background: white;
	padding: 5px;
	border-radius: 5px;
	min-width: 500px;
	font-weight: 500;
	letter-spacing: 1px;
}
</style>
