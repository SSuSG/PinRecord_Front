<template>
	<v-dialog v-model="dialog" width="1250">
		<template v-slot:activator="{ on, attrs }">
			<button id="loginButton" dark v-bind="attrs" v-on="on">도움말</button>
		</template>
		<v-card>
			<div id="title">PinRecord</div>
			<v-divider></v-divider>
			<v-tabs vertical :hide-slider="true">
				<v-tab class="text">
					<v-icon left> mdi-target </v-icon>
					목적&목표
				</v-tab>
				<v-tab class="text">
					<v-icon left> mdi-function </v-icon>
					주요기능 및 서비스
				</v-tab>

				<v-tab-item>
					<v-card flat>
						<v-card-text class="text">
							<p>
								집에서 혼자 갤러리 열어서 여행사진 보는거 외롭지 않으셨나요? <br />옛날사진이 무슨사진이고 여행에서
								어떤일이 있었는지 기억이 잘 나지 않으신가요?
							</p>

							<p>저희 서비스를 이용하시면 이런 걱정을 날려버릴수 있습니다!</p>

							<p>
								여행 후기, 사진, 지도 한 자리에! 환상적인 여행 경험을 친구들과 공유해보세요. <br />우리의 SNS 서비스는
								당신이 방문한 모든 멋진 장소를 편리하게 기록하고, 생생한 후기와 아름다운 사진을 게시할 수 있는 최고의
								공간입니다. <br />마치 여행 일기장과 사진첩, 지도가 하나로 어우러진 듯한 편리함을 느껴보세요.
							</p>

							<p>
								우리의 플랫폼에서는 여행 후기를 작성하여 친구들과 공유할 수 있을 뿐만 아니라, 각 여행지에 마커를
								찍어놓아 지도에서도 쉽게 확인할 수 있습니다.<br />
								그렇게 함께한 추억을 사진과 글로 담아 특별한 순간을 더욱 생생하게 기억할 수 있습니다.
							</p>

							<p>
								여행 다이어리를 한 곳에 모아 관리하고, 다른 여행자들과의 교류를 통해 새로운 여행 아이디어를 얻을 수도
								있습니다.<br />
								또한, 우리의 안내 서비스를 통해 다른 여행자들과의 소통과 도움을 받을 수 있습니다.
							</p>

							<p>
								지금 바로 가입하고 우리와 함께 멋진 여행 이야기를 시작해보세요.<br />
								여러분의 여행이 어떤 흔적을 남길지 기대됩니다!
							</p>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card flat>
						<v-card-text class="text">
							<p>
								저희 서비스는 다양한 기능을 통해 여행의 즐거움과 추억을 한 곳에서 만날 수 있게 해줍니다.<br />
								먼저 로그인과 회원가입을 통해 사용자 개인의 계정을 생성하고, 여행과 관련된 다양한 활동을 즐길 수
								있습니다.
							</p>
							<br />

							<p>
								1. 회원가입 시 이메일 인증 절차를 도입하여 보안성을 강화했습니다. <br />&nbsp;&nbsp;&nbsp;이메일 인증을
								통해 사용자의 신원을 확인하고, 더욱 안전한 사용 환경을 제공합니다.
							</p>

							<p>
								2. 아이디와 비밀번호 찾기 기능은 사용자의 편의를 위해 제공됩니다.<br />&nbsp;&nbsp;&nbsp;&nbsp;잊어버린
								아이디나 비밀번호를 간편하게 찾을 수 있어 불안함 없이 서비스를 이용할 수 있습니다.
							</p>

							<p>
								3. 비밀번호가 반복해서 잘못 입력될 경우, 계정 잠금 서비스가 작동합니다.<br />&nbsp;&nbsp;&nbsp; 이를
								통해 외부로부터의 무단 접근을 방지하고, 사용자의 개인정보를 보호합니다.
							</p>

							<p>
								4. 카카오 맵 API를 활용하여 여행 중인 장소를 손쉽게 저장할 수 있습니다. <br />&nbsp;&nbsp;&nbsp;&nbsp;각
								장소마다 태그, 글, 이미지 등 다양한 정보를 작성하여 여행 일지를 꾸밀 수 있습니다.
								<br />&nbsp;&nbsp;&nbsp;&nbsp;이렇게 작성된 게시글은 멘션 기능을 활용하여 친구들과 소중한 경험을 공유할
								수 있습니다.
							</p>

							<p>
								5. 여행 후기에는 찜 기능과 댓글을 사용하여 다른 사용자와 소통할 수 있습니다.<br />&nbsp;&nbsp;&nbsp;
								좋아하는 여행 후기를 찜하여 나중에 다시 볼 수 있으며, 댓글을 통해 소중한 의견을 나눌 수 있습니다.
								<br />&nbsp;&nbsp;&nbsp;&nbsp;또한, 사용자는 최신순, 찜순, 댓글순으로 여행 후기를 정렬하여 즐길 수
								있습니다.
							</p>

							<p>
								6. 팔로우 기능을 통해 친구들과 관계를 맺을 수 있습니다. <br />
								&nbsp;&nbsp;&nbsp;&nbsp;다른 사용자를 팔로우하여 그들의 여행 일지와 소식을 받아볼 수 있고, 서로의 경험을
								공유할 수 있습니다.
							</p>

							<p>
								7. 더 나아가, 태그와 장소를 바탕으로 여행 후기를 손쉽게 검색할 수 있는 기능을 제공합니다.<br />&nbsp;&nbsp;&nbsp;
								관심 있는 태그나 특정 장소를 검색하여 다양한 여행 경험을 찾아볼 수 있습니다.
							</p>
							<br />
							<p>
								저희 서비스는 여행에 대한 열정을 가진 사람들을 위한 특별한 공간입니다.<br />
								함께 소중한 순간을 기록하고, 친구들과 공유하여 더욱 풍요로운 여행 경험을 만들어보세요.
								<br />지금 바로 가입하여 새로운 여행의 시작을 함께해보세요!
							</p>
						</v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: "HelpComp",
	data() {
		return {
			dialog: false,
		};
	},
};
</script>

<style scoped>
@font-face {
	font-family: "LOTTERIACHAB";
	src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/LOTTERIACHAB.woff2") format("woff2");
	font-weight: normal;
	font-style: normal;
}
#title {
	font-family: "LOTTERIACHAB";
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 35px;
	color: royalblue;
	transition: 0.2s ease-in-out;
}
#title:hover {
	/* animation: vibrate 0.05s linear infinite; */
	color: rgb(0, 44, 177);
}
#loginButton {
	/* background-color: #3182f6; */
	color: #454545;
	font-weight: 600;
	border-radius: 5px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
}
#loginButton:hover {
	background-color: Gainsboro;
}
.text {
	font-size: 18px;
	font-weight: 800;
	text-align: start;
	word-break: keep-all;
}
</style>
