<template>
	<div id="review_input">
		<label>어디를 여행하셨나요?</label>
		<TextInput type="text" v-model="travelInfo.title" ref="cost" />
		<mention-comp />

		<div id="date_wrapper">
			<div id="input_wrapper">
				<label>시작일</label>
				<DateInput type="date" @change="changeStartDateFormat" />
			</div>
			<div id="input_wrapper">
				<label>종료일</label>
				<DateInput type="date" @change="changeEndDateFormat" />
			</div>
			<div id="input_wrapper">
				<label>비용</label>
				<TextInput type="number" v-model="travelInfo.cost" ref="cost" />
			</div>
		</div>

		<label>여행은 어떠셨나요?</label>
		<CommentInput type="text" v-model="travelInfo.content" ref="content" />
		<button @click="onSubmit()">작성하기</button>

		<PinContainer ref="pinScroll">
			<h3>장소를 추가해주세요!</h3>
			<PinData v-for="(data, index) in getPinList" :key="data.id">
				<PinDataInfo>
					{{ data.placeName }}
					<v-icon size="x-large" color="red darken-2" @click="removePin(data.id)">mdi-delete-forever</v-icon>
				</PinDataInfo>
				<v-icon size="x-large" color="blue darken-2" @click="doPhotoEvent(index)">mdi-camera</v-icon>
				<button @click="open(data.id)"># 태그입력</button>
				<modal-component
					v-if="showModal && data.id === selectedPin"
					buttonName="# Tag"
					:showModal="showModal"
					@open="open"
					@close="close"
				>
					<hash-tag :prop="data" @close="close"></hash-tag>
				</modal-component>
				<input
					type="file"
					accept="image/*"
					@change="onFileChange($event, index, data)"
					ref="getPinList"
					style="display: none"
					multiple
				/>
			</PinData>
		</PinContainer>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { DateInput, TextInput, CommentInput, PinContainer, PinData, PinDataInfo } from "./style";
import ModalComponent from "@/components/Modal/ModalComponent.vue";
import HashTag from "@/components/HashTag/HashTag.vue";
import MentionComp from "./MentionComp.vue";
export default {
	name: "ReviewInput",

	data() {
		return {
			travelInfo: {
				startDate: "",
				endDate: "",
				cost: "",
				content: "",
				state: "test",
				title: "",
				userId: 0,
			},
			selectedImages: [],
			selectedPin: "",
			showModal: false,
		};
	},
	components: {
		DateInput,
		TextInput,
		CommentInput,
		PinContainer,
		PinData,
		PinDataInfo,
		HashTag,
		ModalComponent,
		MentionComp,
	},
	created() {
		this.findFollowerByUserId(this.$store.getters["userStore/getLoginUserUserId"]);
	},

	methods: {
		...mapActions("travelStore", ["findFollowerByUserId"]),
		async onSubmit() {
			if (this.validate()) {
				const response = await this.$store.dispatch("travelStore/postTravel", {
					...this.travelInfo,
				});
				console.log("response:", response);
				if (response == 200) {
					alert("작성 완료");
				}
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
			// const fileList = this.$refs.getPinList[index].files;
			const imageList = this.$refs.getPinList[index].files;
			const dataId = data.id;

			let base64Images = [];

			[...imageList].forEach((file) => {
				const reader = new FileReader();
				let result;
				reader.onload = () => {
					result = reader.result;
					result = result.split(",")[1];
					base64Images.push({ image: result, uploadName: file.name });
				};
				reader.readAsDataURL(file);
			});

			this.$store.commit("travelStore/ADD_IMAGELIST_TO_PIN", { base64Images, dataId });

			// const imageList = new FormData();
			// [...fileList].forEach((file) => {
			// 	imageList.append(file.name, file);
			// });

			// this.$store.commit("travelStore/ADD_IMAGELIST_TO_PIN", { imageList, dataId });
		},

		changeStartDateFormat(event) {
			const date = new Date(event.target.value);
			this.travelInfo.startDate = date;
		},

		changeEndDateFormat(event) {
			const date = new Date(event.target.value);
			this.travelInfo.endDate = date;
		},
		getUserId() {
			return this.$store.getters["userStore/getLoginUserUserId"];
		},
		// 모달
		close(e) {
			this.showModal = false;
		},
		open(PinId) {
			this.selectedPin = PinId;
			this.showModal = true;
		},
		// 태그로 데이터 전덜
		copyData(data) {
			return { ...data };
		},
	},
	mounted() {
		this.travelInfo.userId = this.getUserId();
	},
	computed: {
		...mapGetters("travelStore", ["getPinList"]),
		...mapGetters("travelStore", ["getTagList"]),
	},
};
</script>

<style scoped>
#review_input {
	display: flex;
	flex-direction: column;
	width: 50%;
	padding: 20px;
	gap: 18px;
	background-color: whitesmoke;
	z-index: 2;
}
label {
	font-weight: bold;
	font-size: large;
}
#input_wrapper {
	display: flex;
	flex-direction: column;
}
#date_wrapper {
	display: flex;
	justify-content: center;
	gap: 30px;
}
</style>
