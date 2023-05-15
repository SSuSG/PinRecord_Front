<template>
	<div id="kakao_map">
		<div id="map"></div>
		<div id="result_container">
			<div id="result_wrapper">
				<div id="result" v-for="result in searchResults" :key="result.id">
					<span>{{ result.place_name }}</span>
					<span>{{ result.address_name }}</span>
				</div>
			</div>
		</div>
		<div class="button-group">
			<input id="keyword_input" type="text" placeholder="검색어 입력" v-model="searchKeyword" />
			<button id="search_button" @click="searchPlaces()">검색</button>
			<button id="search_button" @click="resetMarker()">리셋</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "KakaoMap",
	data() {
		return {
			searchKeyword: "강남역",
			searchResults: [],
			markers: [],
			infowindow: null,
		};
	},
	mounted() {
		if (window.kakao && window.kakao.maps) {
			this.initMap();
		} else {
			const script = document.createElement("script");
			/* global kakao */
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
				center: new kakao.maps.LatLng(33.450701, 126.570667),
				level: 5,
			};
			this.map = new kakao.maps.Map(mapContainer, mapOptions);

			const marker = new kakao.maps.Marker({
				position: null,
			});

			marker.setMap(this.map);
			const root = this;
			kakao.maps.event.addListener(this.map, "click", function (event) {
				root.addMarker(event.latLng);
			});
		},

		searchPlaces() {
			const search = new kakao.maps.services.Places(); // 검색 객체
			search.keywordSearch(this.searchKeyword, this.searchCallback);
		},

		searchCallback(datas, status) {
			if (status === kakao.maps.services.Status.OK && datas.length > 0) {
				console.log(datas);
				let bounds = new kakao.maps.LatLngBounds();
				this.resetSearchResults();
				this.resetMarker();
				datas.forEach((data) => {
					console.log(data);
					const position = new kakao.maps.LatLng(data.y, data.x);
					this.addMarker(position);
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
			});

			this.markers.push(newMarker);
			this.setMarkers();
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
	},
};
</script>

<style>
* body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
#kakao_map {
	/* height: 100%; */
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

.button-group {
	display: flex;
	justify-content: center;
	gap: 15px;
	position: absolute;
	right: 20px;
	top: 100px;
	z-index: 2;
	background-color: white;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0px 1px 1px 2px rgba(0, 0, 0, 0.2);
}
#search_button {
	background-color: white;
	border: 1px solid black;
	padding: 3px;
	border-radius: 5px;
	font-size: 12;
}
#result_container {
	height: 100%;
	width: 30%;
	min-width: 300px;
	background-color: rgba(0, 0, 0, 0.2);
	box-shadow: 0px 1px 1px 2px rgba(0, 0, 0, 0.3);
	position: absolute;
	top: 0;
	z-index: 2;
	overflow: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
#result_container::-webkit-scrollbar {
	display: none;
}
#result_wrapper {
	width: 90%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	height: auto;
	padding: 10px;
}
#result {
	background-color: whitesmoke;
	width: 100%;
	height: 50px;
	border-radius: 5px;
	padding: 5px;
	font-weight: bold;
	font-size: 15px;
	text-align: center;
	display: flex;
	flex-direction: column;
	cursor: pointer;
}
#keyword_input {
	background-color: lightgrey;
	border-radius: 5px;
	padding: 5px;
}
</style>
