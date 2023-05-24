<template>
	<v-dialog v-model="dialog" persistent max-width="600">
		<template v-slot:activator="{ on, attrs }">
			<button id="loginButton" v-bind="attrs" v-on="on" icon darks>
				<!-- <v-icon> mdi-account-arrow-right </v-icon> -->
				로그인
			</button>
		</template>

		<v-sheet min-height="500">
			<div class="text-center">
				<img src="@/assets/PinRecord.svg" class="img-fluid pa-3 my-5" alt="Logo" width="350" height="250" />
			</div>
			<v-sheet class="headline mb-2 text-center"> 로그인 </v-sheet>

			<v-card class="mx-auto px-5 ma-5" max-width="500" outlined>
				<v-form ref="form" lazy-validation class="pa-5 ma-5">
					<v-text-field
						v-model="form.loginId"
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
						@click:append="options.passwordShow = !options.passwordShow"
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
				<find-login-id-comp />
				<v-text style="color: #9e9e9e">|</v-text>
				<find-password-comp />
			</v-sheet>
		</v-sheet>
		<auth-comp :dialogVisible="myAuthDialog" :loginId="form.loginId" @close="myAuthDialogClose" />
		<first-auth-comp :dialogVisible="myFirstAuthDialog" :loginId="form.loginId" @close="myFirstAuthDialogClose" />
	</v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import FindLoginIdComp from "@/components/User/FindLoginIdComp.vue";
import FindPasswordComp from "@/components/User/FindPasswordComp.vue";
import AuthComp from "./AuthComp.vue";
import FirstAuthComp from "./FirstAuthComp.vue";

export default {
	components: { FindLoginIdComp, FindPasswordComp, AuthComp, FirstAuthComp },
	name: "LoginComp",
	data() {
		return {
			form: {
				loginId: "",
				password: "",
			},
			errorMessage: "",
			dialog: false,
			myAuthDialog: false,
			myFirstAuthDialog: false,
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
			if (loginResult === true) {
				this.dialog = false;
			} else if (loginResult === "lock") {
				this.myAuthDialog = true;
			} else if (loginResult === "noAuth") {
				this.myFirstAuthDialog = true;
			}
		},
		initForm() {
			this.loginId = "";
			this.password = "";
		},
		...mapActions("userStore", ["login"]),
		myAuthDialogClose() {
			this.myAuthDialog = false;
		},
		myFirstAuthDialogClose() {
			this.myFirstAuthDialog = false;
		},
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

<style scoped>
#loginButton {
	/* background-color: #3182f6; */
	color: #454545;
	font-weight: 600;
	border-radius: 5px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
}
#loginButton:hover {
	background-color: Gainsboro;
}
</style>
