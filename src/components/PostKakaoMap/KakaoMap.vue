<template>
	<div id="kakao_map">
		<div id="map"></div>
		<ResultContainer v-if="toogle">
			<ResultWrapper>
				<Result
					v-for="result in searchResults"
					:key="result.id"
					:ref="'result' + result.id"
					:style="[clickedMarkerData == result.id ? clickedStyle : null]"
					@click="moveMap(result)"
				>
					<ResultInfo>
						<span id="place_name">{{ result.place_name }}</span>
						<span id="place_address">{{ result.address_name }}</span>
					</ResultInfo>
					<v-icon @click="addPin(result)">mdi-plus-thick</v-icon>
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
import { Result, ButtonGroup, ResultContainer, ResultWrapper, SearchButton, KeywordInput, ResultInfo } from "./style";
export default {
	name: "KakaoMap",
	data() {
		return {
			currentPosition: [37.50131674626866, 127.13954813425226],
			searchKeyword: "해운대",
			searchResults: [],
			markers: [],
			infowindow: null,
			toogle: false,
			clickedMarkerData: 0,
			clickedStyle: {
				"background-color": "royalblue",
				"color": "white",
			},
			anti: {
				"background-color": "white",
				"color": "royalblue",
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
		ResultInfo,
	},
	mounted() {
		if (window.kakao && window.kakao.maps) {
			this.getCurrentPosition().then((pos) => {
				this.currentPosition = [pos.coords.latitude, pos.coords.longitude];
				this.initMap(this.currentPosition[0], this.currentPosition[1]);
			});
		} else {
			const script = document.createElement("script");
			script.onload = () => kakao.maps.load(this.initMap);
			script.src =
				"//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1c5e9cd2b6c4bf84ba35470e216b0a63&libraries=services";
			document.head.appendChild(script);
		}
	},
	methods: {
		getCurrentPosition(options) {
			return new Promise(function (resolve, reject) {
				navigator.geolocation.getCurrentPosition(resolve, reject, options);
			});
		},
		initMap(latitude, longitude) {
			const mapContainer = document.getElementById("map");
			const mapOptions = {
				center: new kakao.maps.LatLng(latitude, longitude),
				level: 4,
			};
			this.map = new kakao.maps.Map(mapContainer, mapOptions);
			this.overlay = new kakao.maps.CustomOverlay({
				content: "",
				// content: `<div style="margin-bottom: 100px; background-color:pink">${data.place_name}</div>`,
				map: this.map,
				position: null,
			});
		},

		searchPlaces() {
			const search = new kakao.maps.services.Places();
			search.keywordSearch(this.searchKeyword, this.searchCallback);
			this.overlay.setMap(null);
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
			this.searchResults = [];
		},
		resetSearchResults() {
			this.searchResults = [];
		},
		addPin(result) {
			const pin = {
				addressName: result.address_name,
				categoryGroupCode: result.category_group_code,
				categoryGroupName: result.category_group_name,
				categoryName: result.category_name,
				content: "content",
				imageList: [],
				phone: result.phone,
				placeName: result.place_name,
				placeUrl: result.place_url,
				roadAddressName: result.road_address_name,
				tagList: [],
				id: result.id,
				x: result.x,
				y: result.y,
			};
			this.$store.commit("travelStore/ADD_PIN_LIST", { ...pin });
		},
		changeToggle(status) {
			this.toogle = status;
		},
		addMarkerEvent(marker, data) {
			kakao.maps.event.addListener(marker, "click", () => {
				this.moveMap(data);

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
			this.clickedMarkerData = data.id;
		},
		setPanTo(movePosition) {
			this.map.panTo(movePosition);
		},
		moveMap(data) {
			const movePosition = new kakao.maps.LatLng(data.y, data.x);
			this.setPanTo(movePosition);
			this.showInfo(data, movePosition);
			this.setClick(data);
		},
		showInfo(data, position) {
			const content = `<div style="margin-bottom: 120px; background-color:whitesmoke; color:#238CFA; padding:5px; border-radius: 5px; font-weight:bold"; box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.9);>${data.place_name}</div>`;
			this.overlay.setPosition(position);
			this.overlay.setContent(content);
			this.overlay.setZIndex(3);
			this.overlay.setMap(this.map);
		},
		setLevel(movePosition) {
			this.map.setLevel(3, { animate: true }, { anchor: movePosition });
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
#place_name {
	font-weight: 700;
	text-align: left;
}
#place_address {
	font-weight: 400;
	text-align: left;
	font-size: medium;
}
/* #plus_btn {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	padding: 5px;
	width: 30px;
	height: 30px;
	font-size: 20px;
	font-weight: bold;
	transition: all 0.1s;
}
#plus_btn:hover {
	transform: scale(0.95);
} */
</style>
