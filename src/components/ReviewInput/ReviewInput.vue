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
		<TextInput type="text" v-model="travelInfo.cost" />
		<label>여행은 어떠셨나요?</label>
		<CommentInput type="text" v-model="travelInfo.comment" />
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
			console.log({ ...this.travelInfo });
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
