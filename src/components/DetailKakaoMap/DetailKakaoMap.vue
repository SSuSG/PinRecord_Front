<template>
	<div id="kakao_map">
		<div id="map"></div>
		<pin-comp :pin="pinData" :dialogVisible="pinDialog" @close="pinDialogClose" />
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import PinComp from "../DetailTravel/PinComp.vue";
export default {
	name: "DetailKakaoMap",
	data() {
		return {
			currentPosition: [37.50131674626866, 127.13954813425226],
			markers: [],
			infowindow: null,
			toogle: false,
			clickedMarkerData: 0,
			pinData: null,
			pinDialog: false,
		};
	},
	props: {
		pinList: Array,
	},
	components: { PinComp },

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
				map: this.map,
				position: null,
			});
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

		addMarkerEvent(marker, data) {
			kakao.maps.event.addListener(marker, "click", () => {
				this.moveMap(data);
				//PinComp 모달 띄우기
				this.openPinView(data);
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
			console.log(data);
			const content = `<div style="margin-bottom: 120px; background-color:whitesmoke; color:#238CFA; padding:5px; border-radius: 5px; font-weight:bold"; box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.9);>${data.placeName}</div>`;
			this.overlay.setPosition(position);
			this.overlay.setContent(content);
			this.overlay.setZIndex(3);
			this.overlay.setMap(this.map);
		},
		setLevel(movePosition) {
			this.map.setLevel(3, { animate: true }, { anchor: movePosition });
		},
		openPinView(pin) {
			console.log(pin);
			this.pinData = pin;
			this.pinDialog = true;
		},
		pinDialogClose() {
			this.pinDialog = false;
		},
	},
	watch: {
		pinList() {
			let bounds = new kakao.maps.LatLngBounds();
			this.pinList.forEach((pin) => {
				bounds.extend(new kakao.maps.LatLng(pin.y, pin.x));
				const position = new kakao.maps.LatLng(pin.y, pin.x);
				const marker = this.addMarker(position);
				this.addMarkerEvent(marker, pin);
			});
			this.map.setBounds(bounds);
			this.map.setLevel(3);
		},
	},
	computed: {
		...mapGetters("detailStore", ["getDetailPinList"]),
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
