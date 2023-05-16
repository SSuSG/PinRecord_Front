<template>
	<div id="map"></div>
</template>

<script>
export default {
	name: "UserPageMapComp",
	data() {
		return {
			mapContainer: null,
			mapOption: null,
			map: null,
			customOverlay: null,
			nowMarker: null,
			clusterer: null,
		};
	},
	props: {
		travelList: Array,
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
			this.mapContainer = document.getElementById("map"); // 지도를 표시할 div
			this.mapOption = {
				center: new kakao.maps.LatLng(35.766826, 127.9786567), // 지도의 중심좌표
				level: 13, // 지도의 확대 레벨
			};

			// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
			this.map = new kakao.maps.Map(this.mapContainer, this.mapOption);
			this.addClusterer();
		},
		addClusterer() {
			// 마커 이미지의 이미지 주소
			var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
			var imageSize = new kakao.maps.Size(24, 35);
			// 마커 이미지를 생성
			var normalImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

			// 마커 클러스터러를 생성합니다
			this.clusterer = new kakao.maps.MarkerClusterer({
				map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
				averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
				minLevel: 10, // 클러스터 할 최소 지도 레벨
			});

			setTimeout(() => {
				console.log(this.travelList);
				for (let i = 0; i < this.travelList.length; i++) {
					for (let j = 0; j < this.travelList[i].pinList.length; j++) {
						var x = this.travelList[i].pinList[j].x;
						var y = this.travelList[i].pinList[j].y;

						console.log(this.travelList[i].pinList[j]);
						// 마커가 표시될 위치입니다
						var markerPosition = new kakao.maps.LatLng(y, x);

						// 마커를 생성합니다
						var marker = new kakao.maps.Marker({
							map: this.map,
							position: markerPosition,
							title: this.travelList[i].pinList[j].place_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
							image: normalImage, // 마커 이미지
						});

						var basicInfo =
							`<div class="customoverlay">
                            <a href="` +
							this.travelList[i].pinList[j].placeUrl +
							`" target="_blank">
                            <span class="title">` +
							this.travelList[i].pinList[j].placeName +
							`</span>
                            </a>
                            </div>`;

						var customOverlay = new kakao.maps.CustomOverlay({
							clickable: true,
							content: basicInfo,
							position: markerPosition,
							xAnchor: 0.5,
							yAnchor: 1.9,
							zIndex: 3,
						});

						var content3 =
							'<div class="wrap">' +
							'    <div class="info">' +
							'        <div class="title">' +
							"            카카오 스페이스닷원" +
							'            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
							"        </div>" +
							'        <div class="body">' +
							'            <div class="img">' +
							'                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
							"           </div>" +
							'            <div class="desc">' +
							'                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
							'                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
							'                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
							"            </div>" +
							"        </div>" +
							"    </div>" +
							"</div>";

						var moreInfo =
							`<div class="store-card-item-map">
                            <div
                            class="thumbnail"
                            style="background-image: url('data:image/jpeg;base64,` +
							this.travelList[i].pinList[j].imageList[0].encodedBase64 +
							`');
                                        background-position:center;">
                            </div>
                            <div class="info">
                            <div class="left-side">
                                <div class="first-line">
                                    <div class="title">
                                        ` +
							this.travelList[i].pinList[j].placeName +
							`
                                    </div>
                                    <div class="subtitle">
                                        ` +
							this.travelList[i].pinList[j].categoryGroupName +
							`
                                    </div>          
                                </div>
                                <div class="address">
                                    ` +
							this.travelList[i].pinList[j].addressName +
							`
                                </div>
                            </div>
                            </div>
                        </div>`;

						var content2 =
							`<div class="wrap"> 
							    <div class="info"> 
							        <div class="title"> 
							            ` +
							this.travelList[i].pinList[j].placeName +
							`
							            <div class="close" onclick="resetMarker()" title="닫기"></div> 
							        </div>
							        <div class="body">
							            <div class="img"><img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">
                            </div> 
							            <div class="desc"> 
							                <div class="ellipsis">` +
							this.travelList[i].pinList[j].placeName +
							`</div> 
							                <div class="jibun ellipsis">` +
							this.travelList[i].pinList[j].addressName +
							`</div> 
							<div><a href="" target="_blank" class="link">` +
							this.travelList[i].pinList[j].placeUrl +
							`</a></div> 
							            </div> 
							        </div> 
							    </div> 
							</div>`;

						var customOverlayMore = new kakao.maps.CustomOverlay({
							clickable: true,
							content: content3,
							position: markerPosition,
							xAnchor: 0.5,
							yAnchor: 1.1,
							zIndex: 3,
						});
						kakao.maps.event.addListener(this.map, "click", this.resetMarker());
						kakao.maps.event.addListener(marker, "mouseover", this.makeOverListner(this.map, marker, customOverlay));
						kakao.maps.event.addListener(marker, "mouseout", this.makeOutListner(customOverlay));
						kakao.maps.event.addListener(marker, "click", this.makeClickListner(this.map, marker, customOverlayMore));
						this.clusterer.addMarker(marker);
						console.log(this.clusterer);
					}
				}
			}, 300);
		},
		makeOverListner(map, marker, customOverlay) {
			return () => {
				if (this.nowMarker) {
					// 선택되어 있는 마커가 있을 경우

					if (marker.getTitle() !== this.nowMarker.name) {
						// 선택되어 있는 마커와 새로 선택된 마커의 상호명이 다를 경우
						customOverlay.setMap(map); // 지도에 올림
					}
				} else {
					// 선택되어 있는 마커가 없을 경우
					customOverlay.setMap(map); // 지도에 올림
					// customOverlay.setVisible(true); // 지도에서 보이게 함
				}
			};
		},
		makeOutListner(customOverlay) {
			return () => {
				// customOverlay.setVisible(false);
				customOverlay.setMap(null);
			};
		},
		makeClickListner(map, marker, customOverlayMore) {
			return () => {
				if (this.nowMarker) {
					this.nowMarker.overlay.setMap(null);
					// this.selectedMarker.overlay.setMap(null); // 기존 ovelay 제거
				}
				const tempMarker = {
					name: marker.Gb,
					overlay: customOverlayMore,
				};
				this.nowMarker = tempMarker;
				customOverlayMore.setMap(map); // 지도에 올림

				map.panTo(marker.getPosition());
			};
		},
		resetMarker() {
			return () => {
				if (this.nowMarker) {
					this.nowMarker.overlay.setMap(null); // 기존 ovelay 제거
					if (this.nowMarker) {
						this.nowMarker = null;
					}
				}
			};
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

.wrap {
	position: absolute;
	left: 0;
	bottom: 40px;
	width: 288px;
	height: 132px;
	margin-left: -144px;
	text-align: left;
	overflow: hidden;
	font-size: 12px;
	font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
	line-height: 1.5;
}
.wrap * {
	padding: 0;
	margin: 0;
}
.wrap .info {
	width: 286px;
	height: 120px;
	border-radius: 5px;
	border-bottom: 2px solid #ccc;
	border-right: 1px solid #ccc;
	overflow: hidden;
	background: #fff;
}
.wrap .info:nth-child(1) {
	border: 0;
	box-shadow: 0px 1px 2px #888;
}
.info .title {
	padding: 5px 0 0 10px;
	height: 30px;
	background: #eee;
	border-bottom: 1px solid #ddd;
	font-size: 18px;
	font-weight: bold;
}
.info .close {
	position: absolute;
	top: 10px;
	right: 10px;
	color: #888;
	width: 17px;
	height: 17px;
	background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
	cursor: pointer;
}
.info .body {
	position: relative;
	overflow: hidden;
}
.info .desc {
	position: relative;
	margin: 13px 0 0 90px;
	height: 75px;
}
.desc .ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.desc .jibun {
	font-size: 11px;
	color: #888;
	margin-top: -2px;
}
.info .img {
	position: absolute;
	top: 6px;
	left: 5px;
	width: 73px;
	height: 71px;
	border: 1px solid #ddd;
	color: #888;
	overflow: hidden;
}
.info:after {
	content: "";
	position: absolute;
	margin-left: -12px;
	left: 50%;
	bottom: 0;
	width: 22px;
	height: 12px;
	background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
	color: #5085bb;
}

.customoverlay {
	position: relative;
	bottom: 2px;
	border-radius: 6px;
	border: 1px solid #ccc;
	border-bottom: 2px solid #ddd;
	float: left;
}
.customoverlay:nth-of-type(n) {
	border: 0;
	box-shadow: 0px 1px 2px #888;
}
.customoverlay a {
	display: block;
	text-decoration: none;
	color: #000;
	text-align: center;
	border-radius: 6px;
	font-size: 14px;
	font-weight: bold;
	overflow: hidden;
	background: #d95050;
	background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px
		center;
}
.customoverlay .title {
	display: block;
	text-align: center;
	background: #fff;
	margin-right: 35px;
	padding: 10px 15px;
	font-size: 14px;
	font-weight: bold;
}
.customoverlay:after {
	content: "";
	position: absolute;
	margin-left: -12px;
	left: 50%;
	bottom: -12px;
	width: 22px;
	height: 12px;
	background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
</style>
