<template>
	<v-card>
		<v-card flat>
			<v-card-title>
				<span class="text-h5">Comments</span>
			</v-card-title>
		</v-card>
		<v-card flat>
			<v-container fluid>
				<v-textarea
					clearable
					outlined
					clear-icon="mdi-close-circle"
					label="Comment"
					v-model="content"
					auto-grow
					hide-details
				></v-textarea>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="writeComment()"> 작성 </v-btn>
				</v-card-actions>
			</v-container>
		</v-card>
		<v-divider class="pa-0 ma-0"></v-divider>
		<v-card>
			<v-container max-height="3000px">
				<v-row dense>
					<div v-for="comment in commentList" :key="comment.commentId">
						<div class="d-flex flex-no-wrap">
							<v-card flat>
								<v-avatar color="grey" size="55px" style="position: relative" class="ma-3 pa-3">
									<img v-bind:src="'data:image/jpeg;base64,' + comment.image" />
								</v-avatar>
							</v-card>
							<v-card flat class="mx-4 my-0 pa-0" style="position: relative" width="300px">
								<v-row class="pa-0 ma-0">
									<v-text style="font-size: 20px; position: relative"> @{{ comment.nickname }} </v-text>
									<v-spacer></v-spacer>
									<v-btn v-if="comment.nickname === getLoginUserNickname && !comment.editing" @click="toUpdate(comment)"
										>수정</v-btn
									>
									<v-btn
										v-if="comment.nickname === getLoginUserNickname && comment.editing"
										@click="updateComment(comment)"
										>작성</v-btn
									>
									<v-btn v-if="comment.nickname === getLoginUserNickname">삭제</v-btn>
								</v-row>
								<v-row class="pa-0 ma-0 my-2">
									<v-text v-if="!comment.editing" style="position: relative">
										{{ comment.content }}
									</v-text>
									<v-text-field v-else>
										{{ comment.content }}
									</v-text-field>
								</v-row>
							</v-card>
						</div>
						<v-divider width="100%" class="mb-2"></v-divider>
					</div>
				</v-row>
			</v-container>
		</v-card>
	</v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "CommentComp",
	props: {
		commentList: Array,
	},
	data() {
		return {
			content: "",
		};
	},
	methods: {
		toUpdate(comment) {
			console.log(comment);
			comment.editing = true;
		},
		updateComment(comment) {
			console.log(comment);
		},
	},
	computed: {
		...mapGetters("userStore", ["getLoginUserNickname", "getLoginUserUserId"]),
	},
};
</script>

<style></style>
