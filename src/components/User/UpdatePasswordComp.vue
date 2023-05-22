<template>
	<v-dialog v-model="dialog" max-width="600">
		<template v-slot:activator="{ on, attrs }">
			<button id="changePWButton" v-bind="attrs" v-on="on" class="ma-2" text small>비밀번호 변경</button>
		</template>

		<v-stepper v-model="stage" vertical id="stepper">
			<div class="text-center">
				<img src="@/assets/ssafy.svg" class="img-fluid pa-3" alt="Logo" width="200" height="50" />
			</div>
			<v-sheet class="headline mb-2 text-center"> 비밀번호 변경 </v-sheet>

			<v-stepper-step step="1" :complete="stage > 1"> 비밀번호 변경하기 </v-stepper-step>

			<v-stepper-content step="1">
				<v-card class="mx-auto px-5 mb-5" max-width="500" min-height="150" outlined>
					<v-form ref="form" lazy-validation class="pa-5 ma-5">
						<v-text-field
							v-model="password"
							ref="password"
							:rules="valid.password"
							label="Password"
							placeholder=" "
							required
						></v-text-field>
						<v-text-field
							v-model="password2"
							ref="password"
							:rules="valid.password"
							label="Password 확인"
							placeholder=" "
							required
						></v-text-field>
					</v-form>
				</v-card>
				<v-sheet class="text-center">
					<v-btn color="primary" @click="submit" outlined :disabled="!formFirst" class="mr-2">확인</v-btn>
					<v-btn color="grey darken-1" @click="(dialog = false), (stage = 1)" outlined>취소</v-btn>
				</v-sheet>
			</v-stepper-content>

			<v-stepper-step step="2"> 비밀번호 변경 성공 </v-stepper-step>
			<v-stepper-content step="2">
				<v-card-text class="mx-auto mb-5" max-width="300" outlined height="200px">
					비밀번호 변경이 성공하였습니다!!
				</v-card-text>
				<v-btn color="grey darken-1" @click="(dialog = false), (stage = 1), clear" outlined>창 닫기</v-btn>
			</v-stepper-content>
		</v-stepper>
	</v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	name: "UpdatePasswordComp",
	data() {
		return {
			dialog: false,
			stage: 1,
			password: "",
			password2: "",
			valid: {
				password: [
					(v) => !!v || "패스워드를 입력하세요.",
					(v) => (v && v.length >= 8) || "패스워드는 8글자 이상입니다.",
				],
			},
		};
	},
	computed: {
		...mapGetters("userStore", ["getLoginUserLoginId"]),
		formFirst() {
			let ok = false;
			if (this.password && this.password2 && this.password === this.password2) {
				ok = true;
			}
			return ok;
		},
	},
	methods: {
		...mapActions("userStore", ["updatePassword"]),
		async submit() {
			if (this.stage === 1 && this.$refs.password.validate()) {
				var dto = {
					loginId: this.getLoginUserLoginId,
					newPassword: this.password,
				};
				console.log(dto);
				let res = await this.updatePassword(dto);
				this.stage = 2;
				console.log(res);
				if (res.data.statusCode !== 200) {
					alert(res.data.developerMessage);
					this.stage = 1;
				}
			}
		},
	},
};
</script>

<style scoped>
#stepper {
	font-family: "Noto Sans KR", sans-serif;
}
#changePWButton {
	/* background-color: #3182f6; */
	color: #454545;
	font-weight: 600;
	border-radius: 10px;
	padding: 5px 10px;
	transition: 0.2s ease-in-out;
}
#changePWButton:hover {
	background-color: Gainsboro;
}
</style>
