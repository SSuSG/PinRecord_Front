<template>
	<div id="hashtag">
		<h3>{{ prop.placeName }}</h3>
		<vue-tags-input
			placeholder=" 태그를 입력하세요."
			v-model="tag"
			v-if="isTag"
			:tags="tags"
			@tags-changed="(newTags) => (tags = newTags)"
		/>
		<v-textarea v-else v-model="content"></v-textarea>
		<button v-if="isTag" id="submit_button" @click="submitTags(prop)">입력완료</button>
		<button v-if="!isTag" id="submit_button" @click="submitContent(prop)">입력완료</button>
	</div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
export default {
	name: "HashTag",
	components: {
		VueTagsInput,
	},
	data() {
		return {
			tag: "",
			tags: [],
			content: "",
		};
	},
	props: {
		prop: Object,
		isTag: Boolean,
	},

	mounted() {
		[...this.prop.tagList].forEach((e) => this.tags.push({ text: e }));
		this.content = this.prop.content;
	},

	methods: {
		submitTags(data) {
			const submitData = [];
			const dataId = data.id;
			this.tags.forEach((e) => {
				submitData.push(e.text);
			});
			this.$store.commit("travelStore/ADD_TAGS_TO_PIN", { submitData: submitData, dataId: dataId });
			this.$emit("close");
		},
		submitContent(data) {
			console.log(data);
			const submitData = this.content;
			const dataId = data.id;
			this.$store.commit("travelStore/ADD_CONTENT_TO_PIN", { submitData: submitData, dataId: dataId });
			this.$emit("close");
		},
	},
};
</script>

<style lang="css" scoped>
#hashtag {
	padding: 45px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	background-color: white;
	box-shadow: 0px 2px 2px 2px rgba(255, 255, 255, 0.1);
}
.vue-tags-input {
	background: white;
	padding: 5px;
	border-radius: 5px;
	min-width: 500px;
	font-weight: 500;
	letter-spacing: 1px;
}
#submit_button {
	padding: 5px 10px;
	border-radius: 10px;
	color: white;
	background-color: #5c6bc0;
	font-weight: 600;
	text-align: center;
}
</style>
