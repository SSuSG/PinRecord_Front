<template>
	<div>
		<div @click="open">{{ buttonName }}</div>
		<div class="black_bg" v-if="show === true" @click="close"></div>
		<div class="white_bg" v-if="show === true">
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: "ModalComponent",
	data() {
		return { show: false };
	},
	props: {
		buttonName: String,
	},
	methods: {
		close(e) {
			this.show = false;
		},
		open() {
			this.show = true;
		},
	},
};
</script>

<style>
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
	/* width: 800px; */
	/* height: 400px; */
	/* background: white; */
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 8px;
	padding: 20px;
	z-index: 100;
}
</style>
<!-- 사용법  -->
<!-- <modal-component buttonName="버튼이름">modal test</modal-component> -->
