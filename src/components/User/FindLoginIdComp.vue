<template>
	<v-dialog v-model="dialog" max-width="600">
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on" class="ma-2" text small color="#9E9E9E"> 아이디 찾기 </v-btn>
		</template>

		<v-stepper v-model="stage" vertical id="stepper">
			<div class="text-center">
				<img src="@/assets/ssafy.svg" class="img-fluid pa-3" alt="Logo" width="200" height="50" />
			</div>
			<v-sheet class="headline mb-2 text-center"> 아이디 찾기 </v-sheet>

			<v-stepper-step step="1" :complete="stage > 1"> 이메일을 통한 아이디 찾기 </v-stepper-step>

			<v-stepper-content step="1">
				<v-card class="mx-auto px-5 mb-5" max-width="500" min-height="150" outlined>
					<v-form ref="form" lazy-validation class="pa-5 ma-5">
						<v-text-field
							v-model="email"
							ref="email"
							:rules="valid.email"
							label="E-mail"
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

			<v-stepper-step step="2"> 아이디 확인 </v-stepper-step>
			<v-stepper-content step="2">
				<v-card-text class="mx-auto mb-5" max-width="300" outlined height="200px">
					<v-list-item three-line>
						<v-list-item-content>
							<v-list-item-title class="display-2">{{ loginId }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
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
	name: "FindLoginIdComp",
	data() {
		return {
			dialog: false,
			stage: 1,
			email: "",
			loginId: "",
			valid: {
				email: [
					(v) => !!v || "이메일 주소를 입력하세요.",
					(v) => /.+@.+\..+/.test(v) || "이메일 주소 형식이 맞지 않습니다.",
				],
			},
		};
	},
	computed: {
		formFirst() {
			let ok = false;
			if (this.email) {
				ok = true;
			}
			return ok;
		},
	},
	methods: {
		...mapActions("userStore", ["findLoginIdByEmail"]),
		async submit() {
			if (this.stage === 1 && this.$refs.email.validate()) {
				console.log(this.email);
				let res = await this.findLoginIdByEmail(this.email);
				this.stage = 2;
				console.log(res);
				if (res.data.statusCode !== 200) {
					swal("실패!", "일치하는 계정이 존재하지 않습니다.", "error");
					this.stage = 1;
				} else {
					this.loginId = res.data.data;
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
</style>
