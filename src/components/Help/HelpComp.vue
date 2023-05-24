<template>
	<v-dialog v-model="dialog" width="1200">
		<template v-slot:activator="{ on, attrs }">
			<button id="loginButton" dark v-bind="attrs" v-on="on">도움말</button>
		</template>
		<v-card>
			<div id="title">PinRecord</div>
			<v-divider></v-divider>
			<v-tabs vertical>
				<v-tab>
					<v-icon left> mdi-target </v-icon>
					목적&목표
				</v-tab>
				<v-tab>
					<v-icon left> mdi-function </v-icon>
					주요기능 및 서비스
				</v-tab>
				<v-tab>
					<v-icon left> mdi-access-point </v-icon>
					Option 3
				</v-tab>

				<v-tab-item>
					<v-card flat>
						<v-card-text>
							<p>
								집에서 혼자 갤러리 열어서 여행사진 보는거 외롭지 않으셨나요? 옛날사진이 무슨사진이고 여행에서 어떤일이
								있었는지 기억이 잘 나지 않으신가요?
							</p>

							<p>저희 서비스를 이용하시면 이런 걱정을 날려버릴수 있습니다!</p>

							<p class="mb-0">
								방문했던 장소를 실제 지도에 핀을찍고 사진을 남기고 추억을 남기세요! 작성한 추억을 같이 공유하고싶은
								친구들과 공유할 수 있습니다!
							</p>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card flat>
						<v-card-text>
							<p>
								Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae
								iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non
								adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet,
								leo. Nunc sed turpis.
							</p>

							<p>
								Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus,
								vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu
								tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit
								amet ligula pharetra condimentum.
							</p>

							<p>
								Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam
								commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
							</p>

							<p>
								Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede.
								Duis leo. Fusce fermentum odio nec arcu.
							</p>

							<p class="mb-0">
								Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et,
								tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a,
								condimentum nec, nisi.
							</p>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card flat>
						<v-card-text>
							<p>
								Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit
								amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna,
								posuere eget, vestibulum et, tempor auctor, justo.
							</p>

							<p class="mb-0">
								Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor
								quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor
								in tellus interdum sagittis.
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
</style>
