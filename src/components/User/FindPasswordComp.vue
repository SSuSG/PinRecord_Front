<template>
	<v-dialog v-model="dialog" max-width="600">
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on" class="ma-2" text small color="#9E9E9E"> 비밀번호 찾기 </v-btn>
		</template>

		<v-stepper v-model="stage" vertical id="stepper">
			<div class="text-center">
				<img src="@/assets/PinRecord.svg" class="img-fluid pa-3 my-5" alt="Logo" width="350" height="250" />
			</div>
			<v-sheet class="headline mb-2 text-center"> 비밀번호 찾기 </v-sheet>

			<v-stepper-step step="1" :complete="stage > 1"> 새로운 비밀번호 발급 </v-stepper-step>

			<v-stepper-content step="1">
				<v-card class="mx-auto px-5 mb-5" max-width="500" min-height="150" outlined>
					<v-form ref="form" lazy-validation class="pa-5 ma-5">
						<v-text-field
							v-model="form.email"
							ref="email"
							:rules="valid.email"
							label="E-mail"
							placeholder=" "
							required
						></v-text-field>
						<v-text-field
							v-model="form.loginId"
							ref="loginId"
							:rules="valid.loginId"
							label="아이디"
							placeholder="6글자 이상, 영문 대/소문자 및 숫자"
							required
							maxlength="20"
						></v-text-field>
						<v-text-field
							v-model="form.name"
							ref="name"
							:rules="valid.name"
							label="이름"
							placeholder="이름을 입력하세요"
							required
							maxlength="10"
						></v-text-field>
					</v-form>
				</v-card>
				<v-sheet class="text-center">
					<v-btn color="primary" @click="submit" outlined :disabled="!formOK" class="mr-2">확인</v-btn>
					<v-btn color="grey darken-1" @click="(dialog = false), (stage = 1)" outlined>취소</v-btn>
				</v-sheet>
			</v-stepper-content>

			<v-stepper-step step="2"> 비밀번호 재발급 </v-stepper-step>
			<v-stepper-content step="2">
				<v-card-text class="mx-auto mb-5" max-width="300" outlined height="200px">
					<v-list-item three-line>
						<v-list-item-content>
							<v-list-item-title>비밀번호 재발급 성공!</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<div class="text--primary px-3">
						<img src="@/assets/ssafy.svg" class="img-fluid mx-2" alt="Logo" width="100" height="50" /><br />
						비밀번호가 재발급 되었습니다. 이메일을 확인해주세요.<br />
					</div>
				</v-card-text>
				<v-btn color="grey darken-1" @click="(dialog = false), (stage = 1), clear" outlined>창 닫기</v-btn>
			</v-stepper-content>
		</v-stepper>
	</v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import swal from "sweetalert";
export default {
	name: "FindPasswordComp",
	data() {
		return {
			dialog: false,
			stage: 1,
			form: {
				loginId: null,
				email: null,
				name: null,
			},
			valid: {
				loginId: [
					(v) => !!v || "아이디를 입력하세요.",
					(v) => (v && v.length <= 20 && v.length >= 6) || "아이디는 6글자 이상, 20글자 이하입니다.",
				],
				email: [
					(v) => !!v || "이메일 주소를 입력하세요.",
					(v) => /.+@.+\..+/.test(v) || "이메일 주소 형식이 맞지 않습니다.",
				],
				name: [(v) => !!v || "이름을 입력하세요."],
			},
		};
	},
	methods: {
		...mapActions("userStore", ["findPasswordByLoginIdAndEmail"]),
		async submit() {
			if (
				this.stage === 1 &&
				this.$refs.email.validate() &&
				this.$refs.loginId.validate() &&
				this.$refs.name.validate()
			) {
				let res = await this.findPasswordByLoginIdAndEmail(this.form);
				if (res.data.statusCode !== 200) {
					swal("실패!", "일치하는 계정이 존재하지 않습니다.", "error");
				} else {
					this.stage = 2;
				}
			}
		},
	},
	computed: {
		formOK() {
			let ok = false;
			if (this.form.loginId && this.form.email && this.form.name) {
				ok = true;
			}
			return ok;
		},
	},
};
</script>

<style></style>
