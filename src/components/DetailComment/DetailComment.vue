<template>
	<div id="detail_comment">
		<CommentListWrapper>
			<CommentWrapper v-for="item in prop" :key="item.commentId">
				<div>
					<v-avatar color="grey" size="55px" style="position: relative" class="ma-3 pa-3">
						<img v-bind:src="'data:image/jpeg;base64,' + item.image" />
					</v-avatar>
					{{ item.content }}
				</div>
				<div>
					<span v-if="item.userId === loginUser.userId" style="cursor: pointer" @click="deleteComment(item.commentId)">
						<v-icon size="x-large" color="red darken-2">mdi-trash-can-outline</v-icon>
					</span>
					&nbsp;
					<span v-if="item.userId === loginUser.userId" style="cursor: pointer" @click="deleteComment(item.commentId)">
						<v-icon size="x-large" color="blue darken-2">mdi-file-edit</v-icon>
					</span>
				</div>
			</CommentWrapper>
		</CommentListWrapper>
		<CommentInputWrapper>
			<CommentInput v-model="comment.content" />
			<SubmitButton @click="onSubmit">댓글 작성</SubmitButton>
		</CommentInputWrapper>
	</div>
</template>

<script>
import { CommentListWrapper, CommentWrapper, CommentInput, SubmitButton, CommentInputWrapper } from "./style";
export default {
	name: "DetailComment",
	data() {
		return {
			comment: {
				content: "",
				travelId: null,
				userId: null,
			},
		};
	},
	props: {
		prop: null,
		loginUser: Object,
		postId: null,
	},
	components: {
		CommentListWrapper,
		CommentWrapper,
		CommentInput,
		SubmitButton,
		CommentInputWrapper,
	},
	methods: {
		async onSubmit() {
			const newComment = {
				content: this.comment.content,
				travelId: this.postId,
				userId: this.loginUser.userId,
			};

			const response = await this.$store.dispatch("detailStore/postComment", newComment);
			this.comment.content = "";
			await this.$store.dispatch("detailStore/getCommentList", this.postId);
		},
		async deleteComment(commentId) {
			if (confirm("댓글을 삭제하겠습니까?")) {
				const response = await this.$store.dispatch("detailStore/deleeteComment", commentId);
				await this.$store.dispatch("detailStore/getCommentList", this.postId);
			} else {
				return;
			}
		},
	},
};
</script>

<style>
#detail_comment {
	min-height: 350px;
	max-height: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
