<template>
	<div id="home_page">
		<div id="select_container">
			<button id="toggleButton" v-if="isPlaceSearch" @click="change()">태그 검색</button>
			<button id="toggleButton" v-else @click="change()">장소 검색</button>
			<v-select
				v-if="isPlaceSearch"
				id="select"
				:items="si"
				item-text="name"
				item-value="code"
				label="특별/광역시, 도"
				solo
				@change="setSelectedSi"
				v-model="selectedSi"
				:flat="true"
				:outlined="true"
				loader-height="1"
				:dense="true"
			></v-select>
			<v-select
				v-if="isPlaceSearch"
				id="select"
				:items="gu"
				item-text="name"
				item-value="code"
				label="구/동"
				solo
				@change="setSelectedGu"
				v-model="selectedGu"
				no-data-text="시/도를 입력해주세요."
				:flat="true"
				:outlined="true"
				:dense="true"
			></v-select>

			<button id="searchButton" v-if="isPlaceSearch" @click="searchTravelByCity()">
				<v-icon color="#4169e1">mdi-map-search-outline </v-icon>
			</button>

			<vue-tags-input v-if="!isPlaceSearch" v-model="tag" :tags="tags" @tags-changed="(newTags) => (tags = newTags)" />
			<button id="searchButton" v-if="!isPlaceSearch" @click="searchTravelListByTag()">
				<v-icon color="#4169e1">mdi-tag-search-outline </v-icon>
			</button>
			<div class="text-center">
				<v-menu offset-y>
					<template v-slot:activator="{ on, attrs }">
						<button id="sortButton" color="#4169e1" v-bind="attrs" v-on="on">정렬</button>
					</template>
					<v-list>
						<v-list-item v-for="(item, index) in items" :key="index">
							<v-list-item-title @click="newTravelList(index)">{{ item.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</div>
		</div>
		<grid-component
			v-if="travelList"
			:travelList="travelList"
			:pagination="pagination"
			@to-travel-page="toTravelPage"
			@increasePageNum="increasePageNum"
		></grid-component>
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
			travelList: [],
			items: [{ title: "최신순" }, { title: "찜순" }, { title: "댓글순" }],
			pageNum: 0,
			pagination: true,
		};
	},
	components: {
		GridComponent,
		VueTagsInput,
	},
	created() {},
	mounted() {
		this.getTravelList(this.pageNum);
		this.setSi();
	},

	methods: {
		...mapActions("travelStore", [
			"getTravelListByCity",
			"searchTravelByTag",
			"getTravelListByTime",
			"getTravelListByComment",
			"getTravelListByZzim",
		]),

		async getTravelList(pageNum) {
			const res = await this.getTravelListByTime(pageNum);
			if (res.data.data.length < 4) {
				this.pagination = false;
			}
			[...res.data.data].forEach((e) => {
				this.travelList.push(e);
			});
		},

		async newTravelList(index) {
			this.travelList = [];
			var res = null;
			if (index === 0) {
				this.pageNum = 0;
				this.pagination = true;
				this.getTravelList(0);
			} else if (index === 1) {
				res = await this.getTravelListByComment(0);
				this.travelList = res.data.data;
			} else if (index === 2) {
				res = await this.getTravelListByZzim(0);
				this.travelList = res.data.data;
			}
		},

		increasePageNum() {
			this.pageNum += 1;
			this.getTravelList(this.pageNum);
		},
		initPageNum() {
			this.pageNum = 0;
		},

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
			for (let i = 0; i < this.gu.length; i++) {
				if (this.gu[i].code === this.selectedGu) {
					const temp = this.gu[i].name.split(" ");
					this.state = temp[0];
					this.city = temp[1];
					break;
				}
			}
		},

		toTravelPage(travelId) {
			this.$router.push("/detail/" + travelId);
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

<style scoped lang="css">
#home_page {
	padding-top: 70px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
#select_container {
	width: 930px;
	display: flex;
	justify-content: center;
	gap: 10px;
	padding: 20px;
	height: 100px;
}
.v-input__control {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80px;
}

.vue-tags-input {
	width: 100%;
	font-weight: 500;
	letter-spacing: 1px;
}
#searchButton {
	height: 40px;
	border: 2px solid royalblue;
	color: white;
	font-weight: 600;
	border-radius: 5px;
	padding: 5px 20px;
}
#sortButton {
	height: 40px;
	border: 2px solid royalblue;
	background-color: royalblue;
	color: white;
	font-weight: 600;
	border-radius: 5px;
	padding: 5px 20px;
}
#toggleButton {
	height: 40px;
	border: 2px solid royalblue;
	color: royalblue;
	font-weight: 600;
	border-radius: 5px;
	padding: 5px 20px;
}
</style>
