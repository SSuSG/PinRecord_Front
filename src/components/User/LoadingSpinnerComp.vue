<template>
	<div class="spinner-container">
		<!-- <div class="spinner"></div> -->
		<img src="@/../public/images/spinner.gif" alt="" />
	</div>
</template>

<script>
export default {
	name: "LoadingSpinnerComp",
};
</script>

<style scoped>
.spinner-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	z-index: 99;
}
.spinner {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	border: 5px solid #e0e0e0;
	border-bottom: 5px solid #fe9616;
	animation: spin 1s linear infinite;
	position: relative;
}
@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
