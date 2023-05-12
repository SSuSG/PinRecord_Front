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
	</div>
</template>

<script>
import { DateInput, TextInput, CommentInput } from "./style";
export default {
	name: "ReviewInput",

	components: {
		DateInput,
		TextInput,
		CommentInput,
	},

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

	mounted() {},

	methods: {
		onSubmit() {
			if (this.validate()) {
				console.log({ ...this.travelInfo });
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
	},

	computed: {},
};
</script>

<style scoped>
#review_input {
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 100%;
	min-height: 100vh;
	padding: 20px;
	gap: 20px;
	background-color: whitesmoke;
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
