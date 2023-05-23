<template>
	<v-app full-height="false">
		<header-component></header-component>
		<router-view :key="$route.fullPath" />
	</v-app>
</template>

<script>
import HeaderComponent from "./components/Header/HeaderComponent.vue";

export default {
	name: "app",
	components: { HeaderComponent },
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100vh;
	box-sizing: border-box;
}

@font-face {
	font-family: "SUITE-Regular";
	src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2") format("woff2");
	font-weight: 400;
	font-style: normal;
}
* {
	font-family: "SUITE-Regular";
}

nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
