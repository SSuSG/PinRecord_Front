<template>
	<v-dialog v-model="dialog" persistent max-width="600">
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on" icon darks>
				<v-icon> mdi-account-arrow-right </v-icon>
			</v-btn>
		</template>

		<v-sheet min-height="500">
			<div class="text-center">
				<img src="../assets/ssafy.svg" class="img-fluid pa-3 my-5" alt="Logo" width="250" height="150" />
			</div>
			<v-sheet class="headline mb-2 text-center"> 로그인 </v-sheet>

			<v-card class="mx-auto px-5 ma-5" max-width="500" outlined>
				<v-form ref="form" lazy-validation class="pa-5 ma-5">
					<v-text-field
						v-model="form.loginId"
						:counter="20"
						:rules="valid.loginId"
						label="아이디"
						placeholder="6글자 이상, 영문 대/소문자 및 숫자"
						required
						maxlength="20"
					></v-text-field>

					<v-text-field
						v-model="form.password"
						:append-icon="options.passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
						:rules="valid.password"
						:type="options.passwordShow ? 'text' : 'password'"
						label="패스워드"
						placeholder="최소 8글자, 대/소문자 구분"
						counter
						required
						class="mb-5"
					/>

					<v-alert v-show="errorMessage" type="error" dense outlined>
						{{ errorMessage }}
					</v-alert>
				</v-form>
			</v-card>

			<v-sheet class="headline mb-2 text-center">
				<v-btn color="primary" @click="doLogin()" :disabled="!form1OK" class="mr-2">로그인</v-btn>
				<v-btn color="grey darken-2" @click="dialog = false" outlined>창닫기</v-btn>
			</v-sheet>

			<br />
			<v-divider></v-divider>
			<v-sheet>
				<!-- <find-id></find-id> -->
				<v-text style="color: #9e9e9e">|</v-text>
				<!-- <find-pw></find-pw> -->
			</v-sheet>
		</v-sheet>
	</v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "LoginComp",
	data() {
		return {
			form: {
				loginId: "",
				password: "",
			},
			errorMessage: "",
			dialog: false,
			counter: 5,
			options: {
				passwordShow: false,
			},
			valid: {
				loginId: [
					(v) => !!v || "아이디를 입력하세요.",
					(v) => (v && v.length <= 20 && v.length >= 6) || "아이디는 6글자 이상, 20글자 이하입니다.",
				],
				password: [
					(v) => !!v || "패스워드를 입력하세요.",
					(v) => (v && v.length >= 8) || "패스워드는 8글자 이상입니다.",
				],
			},
		};
	},
	methods: {
		async doLogin() {
			let loginResult = await this.login(this.form);
			if (loginResult) {
				this.dialog = false;
			}
		},
		initForm() {
			this.loginId = "";
			this.password = "";
		},
		...mapActions("userStore", ["login"]),
	},
	computed: {
		form1OK() {
			let ok = false;
			if (this.form.loginId && this.form.password) {
				ok = true;
			}
			return ok;
		},
	},
};
</script>
