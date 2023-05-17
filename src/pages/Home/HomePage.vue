<template>
	<div id="home_page">
		<div id="select_container">
			<select name="특별/광역시, 도" class="select" @change="setSelectedSi">
				<option value="none">시/도 선택</option>
				<option v-for="data in si" v-bind:key="data.code" :value="data.code">
					{{ data.name }}
				</option>
			</select>
			<select name="구/동" class="select" @change="setSelectedGu">
				<!-- <option value="none">구, 동</option> -->
				<option v-for="data in gu" v-bind:key="data.code" :value="data.code">
					{{ data.name }}
				</option>
			</select>
			<v-btn @click="searchTravelByCity()">검색</v-btn>
		</div>
		<grid-component></grid-component>
	</div>
</template>

<script>
import GridComponent from "@/components/Grid/GridComponent.vue";
import { getSido, getGu } from "@/apis/sido";
import { mapActions } from "vuex";
export default {
	name: "HomePage",
	data() {
		return {
			si: [],
			selectedSi: String,
			gu: [],
			selectedGu: String,
			state: null,
			city: null,
		};
	},
	components: {
		GridComponent,
	},
	mounted() {
		this.setSi();
	},

	methods: {
		...mapActions("travelStore", ["getTravelListByCity"]),
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
		async searchTravelByCity() {
			var dto = {
				state: this.state,
				city: this.city,
			};
			let res = await this.getTravelListByCity(dto);
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
</style>
