<template>
	<div id="review_input">
		<div id="date_wrapper">
			<div id="cal_wrapper">
				<label>시작일</label>
				<DateInput type="date" @change="changeStartDateFormat" />
			</div>
			<div id="cal_wrapper">
				<label>종료일</label>
				<DateInput type="date" @change="changeEndDateFormat" />
			</div>
		</div>
		<label>비용</label>
		<TextInput type="number" v-model="travelInfo.cost" ref="cost" />
		<label>여행은 어떠셨나요?</label>
		<CommentInput type="text" v-model="travelInfo.content" ref="content" />
		<button @click="onSubmit()">작성하기</button>

		<PinContainer ref="pinScroll">
			<h3>장소를 추가해주세요!</h3>
			<PinData v-for="(data, index) in getPinList" :key="data.id">
				<PinDataInfo>
					{{ data.place_name }}
					<v-icon size="x-large" color="red lighten-2" @click="removePin(data.id)">mdi-delete-forever</v-icon>
				</PinDataInfo>
				<v-icon size="x-large" color="" @click="doPhotoEvent(index)">mdi-camera</v-icon>
				<input
					type="file"
					accept="image/*"
					@change="onFileChange($event, index, data)"
					label="사진을 등록해주세요"
					ref="getPinList"
					style="display: none"
					multiple
				/>
			</PinData>
		</PinContainer>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { DateInput, TextInput, CommentInput, PinContainer, PinData, PinDataInfo } from "./style";
export default {
	name: "ReviewInput",

	data() {
		return {
			travelInfo: {
				startDate: "",
				endDate: "",
				cost: "",
				content: "",
			},
			selectedImages: [],
		};
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
			// console.log(this.$store.commit("travelStore/SET_POST_INPUT"));
			if (this.validate()) {
				const postData = { ...this.travelInfo, pinList: this.pinList };
				// this.$store.commit("travelStore/SET_POST_INPUT", postData);
				this.$store.dispatch("travelStore/postTravel", this.travelInfo);
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
			} else if (this.travelInfo.content === "") {
				alert("코멘트를 입력해주세요.");
				this.$refs.content.$el.focus();
				return false;
			}
			return true;
		},
		removePin(id) {
			this.$store.commit("travelStore/REMOVE_PIN_LIST", id);
		},
		doPhotoEvent(index) {
			this.$refs.getPinList[index].click();
		},
		onFileChange(event, index, data) {
			const imageList = this.$refs.getPinList[index].files;
			const dataId = data.id;
			let base64Images = [];

			[...imageList].forEach((file) => {
				const reader = new FileReader();
				let result;
				reader.onload = () => {
					result = reader.result;
					base64Images.push(result);
				};
				reader.readAsDataURL(file);
			});

			this.$store.commit("travelStore/ADD_IMAGELIST_TO_PIN", { base64Images, dataId });
		},
		changeStartDateFormat(event) {
			const date = new Date(event.target.value);
			this.travelInfo.startDate = date;
		},
		changeEndDateFormat(event) {
			const date = new Date(event.target.value);
			this.travelInfo.endDate = date;
		},
	},
	computed: {
		...mapGetters("travelStore", ["getPinList"]),
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
