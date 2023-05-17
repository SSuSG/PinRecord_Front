<template>
	<v-dialog v-model="authDialog" max-width="500px">
		<v-sheet min-height="500">
			<div class="text-center">
				<img src="@/assets/ssafy.svg" class="img-fluid pa-3 my-5" alt="Logo" width="250" height="150" />
			</div>
			<v-sheet class="headline mb-2 text-center"> 계정잠금 해제 </v-sheet>

			<v-card class="mx-auto px-5 ma-5" max-width="500" outlined>
				<v-form ref="form" lazy-validation class="pa-5 ma-5">
					<v-text-field
						v-model="lockKey"
						:rules="valid.lockKey"
						label="인증번호"
						placeholder="인증번호를 입력해주세요."
						required
						maxlength="10"
					></v-text-field>

					<v-alert v-show="errorMessage" type="error" dense outlined>
						{{ errorMessage }}
					</v-alert>
				</v-form>
			</v-card>

			<v-sheet class="headline mb-2 text-center">
				<v-btn color="primary" @click="auth()" :disabled="!form1OK" class="mr-2">인증</v-btn>
				<v-btn color="grey darken-2" @click.stop="authDialog = false" outlined>창닫기</v-btn>
			</v-sheet>

			<br />
			<v-divider></v-divider>
		</v-sheet>
	</v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "AuthComp",
	props: {
		loginId: String,
		dialogVisible: Boolean,
	},
	data: function () {
		return {
			lockKey: "",
			errorMessage: "",
			valid: {
				lockKey: [(v) => !!v || "인증번호를 입력하세요."],
			},
		};
	},
	methods: {
		...mapActions("userStore", ["unlockAccount"]),
		async auth() {
			try {
				console.log("AuthComp.auth");
				var form = {
					lockKey: this.lockKey,
					loginId: this.loginId,
				};
				let res = await this.unlockAccount(form);
				console.log(res.data);
				if (res.data.statusCode !== 200) {
					alert(res.data.developerMessage);
					this.errorMessage = "인증에 실패했습니다. " + res.data.developerMessage;
				} else {
					alert("인증에 성공하였습니다. 임시비밀번호는 등록된 이메일로 발송되었습니다.");
					this.authDialog = false;
				}
			} catch (error) {
				console.log(error);
				this.errorMessage = "인증에 실패했습니다.";
			}
		},
	},
	computed: {
		authDialog: {
			get() {
				if (this.dialogVisible) {
					// Some dialog initialization code could be placed here
					// because it is called only when this.dialogVisible changes
				}

				return this.dialogVisible;
			},
			set(value) {
				if (!value) {
					this.$emit("close");
				}
			},
		},
		form1OK() {
			let ok = false;
			if (this.lockKey) {
				ok = true;
			}
			return ok;
		},
	},
};
</script>
