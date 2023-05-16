<template>
	<div id="kakao_map">
		<div id="map"></div>
		<ResultContainer v-if="toogle">
			<ResultWrapper>
				<Result
					v-for="result in searchResults"
					:key="result.id"
					:ref="'result' + result.id"
					:style="[clickedMarker == result.id ? clickedStyle : null]"
					@click="moveMap(result)"
				>
					<span @click="addPin(result)">{{ result.place_name }}</span>
					<span>{{ result.address_name }}</span>
				</Result>
			</ResultWrapper>
		</ResultContainer>
		<ButtonGroup>
			<KeywordInput type="text" placeholder="검색어 입력" v-model="searchKeyword" />
			<SearchButton @click="searchPlaces()">검색</SearchButton>
			<SearchButton @click="resetMarker()">리셋</SearchButton>
		</ButtonGroup>
	</div>
</template>

<script>
import { Result, ButtonGroup, ResultContainer, ResultWrapper, SearchButton, KeywordInput } from "./style";
export default {
	name: "KakaoMap",
	data() {
		return {
			searchKeyword: "강남역",
			searchResults: [],
			markers: [],
			infowindow: null,
			toogle: false,
			clickedMarker: 0,
			clickedStyle: {
				"background-color": "royalblue",
				"color": "white",
			},
		};
	},
	components: {
		Result,
		ButtonGroup,
		ResultContainer,
		ResultWrapper,
		SearchButton,
		KeywordInput,
	},
	mounted() {
		if (window.kakao && window.kakao.maps) {
			this.initMap();
		} else {
			const script = document.createElement("script");
			script.onload = () => kakao.maps.load(this.initMap);
			script.src =
				"//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1c5e9cd2b6c4bf84ba35470e216b0a63&libraries=services";
			document.head.appendChild(script);
		}
	},
	methods: {
		initMap() {
			const mapContainer = document.getElementById("map");
			const mapOptions = {
				center: new kakao.maps.LatLng(37.5012860931305, 127.039604663862),
				level: 5,
			};
			this.map = new kakao.maps.Map(mapContainer, mapOptions);
		},

		searchPlaces() {
			const search = new kakao.maps.services.Places();
			search.keywordSearch(this.searchKeyword, this.searchCallback);
		},

		searchCallback(datas, status) {
			if (status === kakao.maps.services.Status.OK && datas.length > 0) {
				this.changeToggle(true);
				let bounds = new kakao.maps.LatLngBounds();
				this.resetSearchResults();
				this.resetMarker();
				datas.forEach((data) => {
					const position = new kakao.maps.LatLng(data.y, data.x);
					const marker = this.addMarker(position);
					this.addMarkerEvent(marker, data);
					bounds.extend(new kakao.maps.LatLng(data.y, data.x));
					this.searchResults.push(data);
				});
				this.map.setBounds(bounds);
			} else {
				alert("검색 결과가 없습니다.");
				this.searchKeyword = "";
			}
		},

		addMarker(position) {
			const newMarker = new kakao.maps.Marker({
				map: this.map,
				position: position,
				clickable: true,
			});
			this.markers.push(newMarker);
			this.setMarkers();
			return newMarker;
		},
		setMarkers() {
			this.markers.forEach((marker) => {
				marker.setMap(this.map);
			});
		},
		resetMarker() {
			this.markers.forEach((marker) => {
				marker.setMap(null);
			});
			this.markers = [];
		},
		resetSearchResults() {
			this.searchResults = [];
		},
		addPin(result) {
			this.$emit("addPin", { ...result });
		},
		changeToggle(status) {
			this.toogle = status;
		},
		addMarkerEvent(marker, data) {
			kakao.maps.event.addListener(marker, "click", () => {
				const movePosition = new kakao.maps.LatLng(data.y, data.x);
				this.setPanTo(movePosition);
				this.setClick(data);
				// const target = `result${data.id}`;
				// console.log(this.$refs[target][0]);
				// if (this.$refs[target]) {
				// 	this.$refs[target].$el.scrollIntoView({
				// 		behavior: "smooth",
				// 	});
				// }
			});
		},
		setClick(data) {
			this.clickedMarker = data.id;
		},
		setPanTo(movePosition) {
			this.map.panTo(movePosition);
		},
		moveMap(data) {
			const movePosition = new kakao.maps.LatLng(data.y, data.x);
			this.setPanTo(movePosition);
			this.setClick(data);

			// overlay.setMap(null);
			const overlay = new kakao.maps.CustomOverlay({
				content: "<div>HiHi</div>",
				map: this.map,
				position: movePosition,
			});
			console.log(overlay);
			overlay.setMap(this.map);
		},
	},
};
</script>

<style>
#kakao_map {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
}

#map {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
}
</style>
