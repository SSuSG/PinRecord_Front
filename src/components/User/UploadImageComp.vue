<template>
	<div>
		<v-dialog v-model="dialog" width="400px">
			<template v-slot:activator="{ on: rank, attrs }">
				<v-btn v-bind="attrs" v-on="rank" icon darks>
					<v-icon>mdi-camera-flip-outline</v-icon>
				</v-btn>
			</template>
			<v-sheet color="white" elevation="1">
				<v-file-input
					prepend-icon="mdi-camera"
					v-model="image"
					@change="handleFileSelect"
					show-size
					label="File input"
				></v-file-input>
				<v-btn dark class="ma-2 white--text" @click="updateImage()">
					Upload
					<v-icon right dark> mdi-cloud-upload </v-icon>
				</v-btn>
				<v-btn dark @click="dialog = false">닫기</v-btn>
			</v-sheet>
		</v-dialog>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import swal from "sweetalert";

export default {
	name: "UploadImageComp",
	props: {
		userId: Number,
	},
	data() {
		return {
			dialog: false,
			image: "",
			base64Image: "",
		};
	},
	methods: {
		...mapActions("userStore", ["updateProfileImage"]),
		async updateImage() {
			var dto = {
				profileImage: null,
				userId: null,
			};
			const formData = new FormData();
			formData.append("profileImage", this.image);
			dto.profileImage = formData;
			dto.userId = this.userId;
			let res = await this.updateProfileImage(dto);
			if (res.data.statusCode !== 200) {
				alert(res.data.developerMessage);
			} else {
				swal("성공!", "프로필 이미지 변경에 성공하였습니다!", "success");
				this.$emit("update-profile-image", this.base64Image);
				this.dialog = false;
			}
		},
		handleFileSelect(event) {
			const file = this.image;
			const reader = new FileReader();

			// 파일 읽기가 완료되었을 때 호출되는 이벤트 핸들러
			reader.onload = (event) => {
				this.base64Image = event.target.result;
				this.base64Image = this.base64Image.split(",")[1];
				// base64Data를 사용하여 원하는 처리 수행
			};
			// 파일을 Base64로 인코딩하여 읽기 시작
			reader.readAsDataURL(file);
		},
	},
};
</script>

<style></style>
