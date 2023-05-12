<template>
	<div id="map"></div>
</template>

<script>
export default {
	name: "UserPageMapComp",
	data() {
		return {
			map: null,
		};
	},
	mounted() {
		if (window.kakao && window.kakao.maps) {
			this.initMap();
		} else {
			const script = document.createElement("script");
			script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=71c44e5dd378b91b173e4197d7181df4";
			script.onload = () => kakao.maps.load(this.initMap);
			document.head.appendChild(script);
		}
	},
	methods: {
		initMap() {
			var mapContainer = document.getElementById("map"), // 지도를 표시할 div
				mapOption = {
					center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
					level: 3, // 지도의 확대 레벨
				};

			// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
			this.map = new kakao.maps.Map(mapContainer, mapOption);
		},
	},
};
</script>

<style>
#map {
	width: 95%;
	height: 850px;
}
@media (min-width: 768px) {
	.map {
		height: 600px;
	}
}
</style>
