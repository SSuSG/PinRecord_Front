<template>
	<StyledHeader>
		<div>로고</div>
		<login-comp></login-comp>
	</StyledHeader>
</template>

<script>
import { StyledHeader } from "@/components/Header/style";
import LoginComp from "../User/LoginComp.vue";

export default {
	name: "HeaderComponent",
	components: {
		StyledHeader,
		LoginComp,
	},
};
</script>
<style></style>
