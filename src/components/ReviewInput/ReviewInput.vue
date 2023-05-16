<template>
	<div id="review_input">
		<div id="date_wrapper">
			<div id="cal_wrapper">
				<label>시작일</label>
				<DateInput type="date" v-model="travelInfo.startDate" />
			</div>
			<div id="cal_wrapper">
				<label>종료일</label>
				<DateInput type="date" v-model="travelInfo.endDate" />
			</div>
		</div>
		<label>비용</label>
		<TextInput type="number" v-model="travelInfo.cost" ref="cost" />
		<label>여행은 어떠셨나요?</label>
		<CommentInput type="text" v-model="travelInfo.comment" ref="comment" />
		<button @click="onSubmit()">작성하기</button>

		<PinContainer ref="pinScroll">
			<h3>장소를 추가해주세요!</h3>
			<PinData v-for="data in pinList" :key="data.id">
				<PinDataInfo>
					{{ data.place_name }}
					<v-icon size="x-large" color="red lighten-2" @click="removePin(data)">mdi-delete-forever</v-icon>
				</PinDataInfo>
				<v-icon size="x-large" color="" @click="addPhoto(data)">mdi-camera</v-icon>
				<input
					type="file"
					accept="image/*"
					@change="onFileChange"
					label="사진을 등록해주세요"
					ref="imageRef"
					style="display: none"
					multiple
				/>
			</PinData>
		</PinContainer>
	</div>
</template>

<script>
import { DateInput, TextInput, CommentInput, PinContainer, PinData, PinDataInfo } from "./style";
export default {
	name: "ReviewInput",

	data() {
		return {
			travelInfo: {
				startDate: "",
				endDate: "",
				cost: "",
				comment: "",
			},
		};
	},
	props: {
		pinList: [],
	},
	components: {
		DateInput,
		TextInput,
		CommentInput,
		PinContainer,
		PinData,
		PinDataInfo,
	},

	methods: {
		onSubmit() {
			if (this.validate()) {
				console.log({ ...this.travelInfo, pinList: this.pinList });
			}
		},
		validate() {
			if (this.travelInfo.startDate === "" || this.travelInfo.endDate === "") {
				alert("날짜를 입력해주세요.");
				return false;
			} else if (this.travelInfo.cost === "") {
				alert("여행비용을 입력해주세요.");
				this.$refs.cost.$el.focus();
				return false;
			} else if (this.travelInfo.comment === "") {
				alert("코멘트를 입력해주세요.");
				this.$refs.comment.$el.focus();
				return false;
			}
			return true;
		},
		removePin(data) {
			this.$emit("removePin", data.id);
		},
		addPhoto(data) {
			this.$refs.imageRef[0].click();
			// this.$emit("addImageList", { imageList: [data.place_name], id: data.id });
		},
		onFileChange() {},
	},
};
</script>

<style scoped>
#review_input {
	display: flex;
	flex-direction: column;
	width: 50%;
	padding: 20px;
	gap: 20px;
	background-color: whitesmoke;
	z-index: 2;
}
label {
	font-weight: bold;
	font-size: large;
}
#cal_wrapper {
	display: flex;
	flex-direction: column;
}
#date_wrapper {
	display: flex;
	justify-content: center;
	gap: 30px;
}
</style>
