<template>
	<div id="review_input">
		<label>어디를 여행하셨나요? </label>
		<div id="date_wrapper">
			<v-select
				id="select"
				:items="si"
				item-text="name"
				item-value="code"
				label="특별/광역시, 도"
				solo
				@change="setSelectedSi"
				v-model="selectedSi"
				flat="true"
				outlined="true"
				loader-height="1"
				dense="true"
			></v-select>
			<v-select
				id="select"
				:items="gu"
				item-text="name"
				item-value="code"
				label="구/동"
				solo
				@change="setSelectedGu"
				v-model="selectedGu"
				no-data-text="시/도를 입력해주세요."
				flat="true"
				outlined="true"
				dense="true"
			></v-select>
			<TextInput type="text" placeholder="시/군/구" readonly /> -->
		</div>

		<TextInput type="text" v-model="travelInfo.title" placeholder="제목" ref="cost" />

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
			<div id="input_wrapper">
				<label>멘션</label>
				<mention-comp />
			</div>
		</div>

		<label>여행은 어떠셨나요?</label>
		<CommentInput type="text" placeholder="여행후기" v-model="travelInfo.content" ref="content" />
		<button @click="onSubmit()">작성하기</button>

		<PinContainer ref="pinScroll">
			<h3>장소를 추가해주세요!</h3>
			<PinData v-for="(data, index) in getPinList" :key="data.id">
				<PinDataInfo>
					{{ data.placeName }}
					<v-icon size="x-large" color="red darken-2" @click="removePin(data.id)">mdi-delete-forever</v-icon>
				</PinDataInfo>
				<ButtonContainer>
					<v-icon size="x-large" color="blue darken-2" @click="doPhotoEvent(index)">mdi-camera</v-icon>
					<button @click="open(data.id, true)"><v-icon color="blue darken-2">mdi-tag-plus</v-icon></button>
					<button @click="open(data.id, false)"><v-icon color="blue darken-2">mdi-text-box-plus</v-icon></button>
				</ButtonContainer>
				<HashTagContainer>
					<HashTagSpan v-for="(tag, index) in data.tagList" :key="index"> #{{ tag }} </HashTagSpan>
				</HashTagContainer>
				<modal-component
					v-if="showModal && data.id === selectedPin"
					buttonName="# Tag"
					:showModal="showModal"
					@open="open"
					@close="close"
				>
					<hash-tag :isTag="isTag" :prop="data" @close="close"></hash-tag>
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
import { getSido, getGu } from "@/apis/sido";
import swal from "sweetalert";
import {
	DateInput,
	TextInput,
	CommentInput,
	PinContainer,
	PinData,
	PinDataInfo,
	ButtonContainer,
	HashTagContainer,
	HashTagSpan,
} from "./style";
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
				city: "",
				title: "",
				userId: 0,
			},
			selectedImages: [],
			selectedPin: "",
			selectedTextPin: "",
			showModal: false,
			showTextModal: false,
			isTag: false,
			si: [],
			selectedSi: String,
			gu: [],
			selectedGu: String,
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
		ButtonContainer,
		HashTagContainer,
		HashTagSpan,
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
				if (response == 200) {
					swal("성공!", "작성에 성공 하였습니다.", "success");
					// this.$router.push("/");
					window.location.replace("/");
				} else {
					swal("실패!", "작성에 실패 하였습니다.", "error");
				}
			}
		},
		validate() {
			const start = new Date(this.travelInfo.startDate);
			const end = new Date(this.travelInfo.endDate);
			const dateCheck = start <= end;
			if (this.travelInfo.startDate === "" || this.travelInfo.endDate === "") {
				swal("주의!", "날짜를 입력해주세요.", "warning");
				return false;
			} else if (this.travelInfo.cost === "") {
				swal("주의!", "여행비용을 입력해주세요.", "warning");
				this.$refs.cost.$el.focus();
				return false;
			} else if (this.travelInfo.content === "") {
				swal("주의!", "코멘트를 입력해주세요.", "warning");
				this.$refs.content.$el.focus();
				return false;
			} else if (!dateCheck) {
				swal("주의!", "여행 시작일이 종료일 보다 빨라야 합니다.", "warning");
			} else if (this.$store.getters["travelStore/getPinList"].length < 1) {
				swal("주의!", "지도에서 위치를 입력해주세요.", "warning");
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
					result = result.split(",")[1];
					base64Images.push({ image: result, uploadName: file.name });
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
		getUserId() {
			return this.$store.getters["userStore/getLoginUserUserId"];
		},
		// 모달
		close(e) {
			this.showModal = false;
		},
		open(PinId, isTag) {
			this.isTag = isTag;
			this.selectedPin = PinId;
			this.showModal = true;
		},
		// 태그로 데이터 전덜
		copyData(data) {
			return { ...data };
		},

		// 모달
		closeText(e) {
			this.showTextModal = false;
		},
		openText(PinId) {
			console.log(PinId);
			this.selectedTextPin = PinId;
			this.showTextModal = true;
		},

		async setSi() {
			const response = await getSido();
			this.si = [...response];
		},

		async setGu(code) {
			const response = await getGu(code);
			const guArray = [...response];
			guArray.shift();
			const newGuArray = [];
			for (var i = 0; i < guArray.length; i++) {
				newGuArray.push(guArray[i].name.split(" ")[1]);
			}

			this.gu = newGuArray;
		},

		setSelectedSi(e) {
			const siCode = this.selectedSi[0] + this.selectedSi[1];
			for (let i = 0; i < this.si.length; i++) {
				if (this.si[i].code === this.selectedSi) {
					this.travelInfo.state = this.si[i].name;
					break;
				}
			}
			this.setGu(siCode);
		},

		setSelectedGu(e) {
			for (let i = 0; i < this.gu.length; i++) {
				if (this.gu[i].code === this.selectedGu) {
					const temp = this.gu[i].name.split(" ");
					this.travelInfo.state = temp[0];
					this.travelInfo.city = temp[1];
					console.log(this.travelInfo.state + " " + this.travelInfo.city);
					break;
				}
			}
			// this.searchTravelListByTag();
		},
	},
	mounted() {
		this.setSi();
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
