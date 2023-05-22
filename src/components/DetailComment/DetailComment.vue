<template>
	<div>
		<div id="detail_comment">
			<CommentListWrapper>
				<CommentWrapper v-for="item in prop" :key="item.commentId">
					<div>
						<v-avatar color="grey" size="55px" style="position: relative" class="ma-3 pa-3">
							<img v-bind:src="'data:image/jpeg;base64,' + item.image" />
						</v-avatar>
						<span v-if="!isEdit || editCommentId !== item.commentId">
							{{ item.content }}
						</span>
					</div>
					<div v-if="!isEdit || editCommentId !== item.commentId">
						<span
							v-if="item.userId === loginUser.userId"
							style="cursor: pointer"
							@click="deleteComment(item.commentId)"
						>
							<DeleteButton>삭제</DeleteButton>
						</span>
						&nbsp;
						<span v-if="item.userId === loginUser.userId" style="cursor: pointer">
							<EditButton @click="toggleIsEdit(item.commentId)">수정</EditButton>
						</span>
					</div>
					<div v-if="isEdit && editCommentId === item.commentId">
						<EditInput type="text" :value="item.content" @input="changeComment" @keyup.enter="onEdit(item.commentId)" />
						&nbsp;
						<DeleteButton @click="cancelEdit">취소</DeleteButton>
						&nbsp;
						<EditButton @click="onEdit(item.commentId)">수정</EditButton>
					</div>
				</CommentWrapper>
			</CommentListWrapper>
		</div>
		<CommentInputWrapper>
			<CommentInput v-model="comment.content" @keyup.enter="onSubmit" />
			<SubmitButton @click="onSubmit">댓글 작성</SubmitButton>
		</CommentInputWrapper>
	</div>
</template>

<script>
import {
	CommentListWrapper,
	CommentWrapper,
	CommentInput,
	SubmitButton,
	CommentInputWrapper,
	EditButton,
	DeleteButton,
	EditInput,
} from "./style";
export default {
	name: "DetailComment",
	data() {
		return {
			comment: {
				content: "",
				travelId: null,
				userId: null,
			},
			isEdit: false,
			editCommentId: null,
			editContent: "",
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
		EditButton,
		DeleteButton,
		EditInput,
	},
	methods: {
		async onSubmit() {
			if (this.comment.content === "") {
				alert("댓글 내용을 입력해주세요.");
				return;
			}
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
				await this.$store.dispatch("detailStore/getDetail", this.postId);
			} else {
				return;
			}
		},
		toggleIsEdit(commentId) {
			this.isEdit = !this.isEdit;
			this.editCommentId = commentId;
		},
		async onEdit(commentId) {
			const editData = { commentId: commentId, content: this.editContent };
			if (confirm("댓글을 수정하겠습니까?")) {
				const response = await this.$store.dispatch("detailStore/editComment", editData);
				await this.$store.dispatch("detailStore/getDetail", this.postId);
			} else {
				return;
			}
			this.toggleIsEdit(commentId);
			this.editContent = "";
			this.editCommentId = null;
		},
		changeComment(text) {
			this.editContent = text;
		},
		cancelEdit() {
			this.isEdit = !this.isEdit;
			this.editCommentId = null;
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
