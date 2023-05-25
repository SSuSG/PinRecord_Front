<template>
	<div>
		<!-- <div id="modal_button" @click="$emit('open')">{{ buttonName }}</div> -->
		<div class="black_bg" v-if="showModal === true" @click="$emit('close')"></div>
		<div class="white_bg" v-if="showModal === true">
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: "ModalComponent",
	data() {
		return {
			test: "asd",
		};
	},
	props: {
		buttonName: String,
		showModal: Boolean,
	},
};
</script>

<style>
#modal_button {
	display: inline;
	padding: 8px 10px;
	border-radius: 10px;
	cursor: pointer;
	font-size: 15px;
	background-color: lightcoral;
}
.black_bg {
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 99;
}
.white_bg {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 8px;
	padding: 20px;
	z-index: 100;
}
</style>
