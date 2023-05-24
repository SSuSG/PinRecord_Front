<template>
	<div>
		<div id="detail_comment">
			<CommentListWrapper v-if="prop">
				<CommentWrapper v-for="item in prop" :key="item.commentId">
					<AvatarWrapper>
						<v-avatar v-if="item.image" color="grey" size="50px" style="position: relative">
							<img v-if="item.image" v-bind:src="'data:image/jpeg;base64,' + item.image" />
						</v-avatar>
						<v-avatar v-else color="grey" size="50px" style="position: relative">
							<img src="@/assets/default.png" />
						</v-avatar>
						<span style="font-size: 15px">{{ item.nickname }}</span>
					</AvatarWrapper>
					<CommentContent v-if="!isEdit || editCommentId !== item.commentId"> {{ item.content }} </CommentContent>
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
import swal from "sweetalert";
import { mapGetters } from "vuex";
import {
	CommentListWrapper,
	CommentWrapper,
	CommentInput,
	SubmitButton,
	CommentInputWrapper,
	EditButton,
	DeleteButton,
	EditInput,
	AvatarWrapper,
	CommentContent,
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
		AvatarWrapper,
		CommentContent,
	},
	methods: {
		async onSubmit() {
			if (!this.getIsLogin) {
				swal("실패!", "로그인 먼저 해주세요!", "error");
				return;
			}

			if (this.comment.content === "") {
				swal("주의!", "댓글 내용을 입력해주세요.", "warning");
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
		deleteComment(commentId) {
			swal({
				title: "댓글을 삭제하겠습니까?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			}).then(async (willDelete) => {
				if (willDelete) {
					const response = await this.$store.dispatch("detailStore/deleteComment", commentId);
					console.log(response);
					this.$store.dispatch("detailStore/getCommentList", this.postId);
				}
			});
		},
		toggleIsEdit(commentId) {
			this.isEdit = !this.isEdit;
			this.editCommentId = commentId;
		},
		async onEdit(commentId) {
			const editData = { commentId: commentId, content: this.editContent };
			swal({
				title: "댓글을 수정하겠습니까?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			}).then(async (willDelete) => {
				if (willDelete) {
					this.$store.dispatch("detailStore/editComment", editData);
					const response = await this.$store.dispatch("detailStore/getCommentList", this.postId);
				}
			});

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
	mounted() {},
	computed: {
		...mapGetters("userStore", ["getIsLogin"]),
	},
	watch: {
		prop() {
			console.log("prop 변함", this.prop);
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
