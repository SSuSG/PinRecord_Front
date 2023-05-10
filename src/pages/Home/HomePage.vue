<template>
	<div>
		<header-component />
		<grid-component></grid-component>
	</div>
</template>

<script>
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import GridComponent from "@/components/Grid/GridComponent.vue";
export default {
	name: "HomePage",

	data() {
		return {};
	},
	components: {
		HeaderComponent,
		GridComponent,
	},
	mounted() {},

	methods: {},
};
</script>

<style lang="scss" scoped></style>
