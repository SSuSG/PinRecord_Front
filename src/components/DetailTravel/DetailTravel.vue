<template>
	<div id="detailTravel">
		<div id="writer_info">
			<div style="display: flex; justify-content: center; align-items: center; gap: 15px; cursor: pointer">
				<span>
					<v-icon size="x-large">mdi-account-search </v-icon>
				</span>
				<span @click="toUserPage(prop.userId)">
					{{ prop.writer }}
				</span>
			</div>
			<div id="zzim">
				<v-btn icon>
					<v-icon v-if="prop.userId === this.getLoginUserUserId" @click="deleteTravel">mdi-delete</v-icon>
				</v-btn>
				<v-btn icon v-if="zzim" @click="goZzim">
					<v-icon size="x-large" color="red">mdi-heart</v-icon>
				</v-btn>
				<v-btn icon v-if="!zzim" @click="goZzim">
					<v-icon size="x-large" color="red">mdi-heart-outline</v-icon>
				</v-btn>
				<span> {{ prop.zzimCnt }} </span>
			</div>
		</div>
		<div id="travel_info">
			<div class="info_wrapper">
				<span>
					<v-icon size="xlarge">mdi-airplane </v-icon>
				</span>
				<span>{{ prop.title }}</span>
			</div>
			<div class="info_wrapper">
				<span>
					<v-icon size="xlarge">mdi-map-marker-outline </v-icon>
				</span>
				<span>{{ prop.state }} {{ prop.city }}</span>
			</div>
			<div class="info_wrapper">
				<span>
					<v-icon size="xlarge">mdi-calendar-range </v-icon>
				</span>
				<span v-if="prop.startDate">{{ this.convertDate(prop.startDate) }}</span>
				<span v-if="prop.startDate">~</span>
				<span v-if="prop.endDate">{{ this.convertDate(prop.endDate) }}</span>
			</div>
			<div class="info_wrapper">
				<span>
					<v-icon size="xlarge">mdi-currency-krw</v-icon>
				</span>
				<span v-if="prop.cost">{{ numberWithCommas }}</span>
			</div>
			<div class="info_wrapper">
				<span>
					<v-icon size="xlarge" color="red-darken-2">mdi-comment-processing-outline </v-icon>
				</span>
				<span>{{ prop.content }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import swal from "sweetalert";

export default {
	name: "DetailTravel",
	data() {
		return {
			writerInfo: {
				userId: "",
				writer: "",
			},

			travelInfo: {
				city: "",
				state: "",
				title: "",
				content: "",
				cost: "",
				endDate: "",
				startDate: "",
				commentList: "",
				travelId: "",
				zzimCnt: "",
			},
		};
	},
	props: {
		prop: Object,
		zzim: Boolean,
	},
	methods: {
		...mapActions("zzimStore", ["doZzim"]),
		...mapActions("detailStore", ["deleteTravelDetail"]),
		toUserPage(userId) {
			// console.log(userId);
			this.$router.push("/user/" + userId);
		},
		convertDate(dateString) {
			const date = new Date(dateString);
			const year = date.getFullYear();
			const month = ("0" + (date.getMonth() + 1)).slice(-2);
			const day = ("0" + date.getDate()).slice(-2);
			const convertedDate = year + ". " + month + ". " + day;
			return convertedDate;
		},
		deleteTravel() {
			swal({
				title: "게시글을 삭제하겠습니까?",
				icon: "warging",
				buttons: true,
				dangerMode: true,
			}).then(async (willDelete) => {
				if (willDelete) {
					let res = await this.deleteTravelDetail(this.prop.travelId);
					console.log(res);
					if (res.data.statusCode === 200) {
						this.$router.push("/");
					} else {
						swal("실패!", res.data.developerMessage, "error");
					}
				}
			});

			// let res = this.deleteTravelDetail(this.prop.travelId);
			// console.log(res);
		},

		async goZzim() {
			var dto = {
				travelId: this.prop.travelId,
				userId: this.getLoginUserUserId,
			};

			let res = await this.doZzim(dto);
			console.log(res.data);
			if (res.data.statusCode === 200) {
				console.log(this.zzim);

				if (this.zzim) {
					swal("성공!", "찜을 취소 하였습니다!", "success");
					//emit함수 + prop 카운트 1 다운
					this.$emit("cancel-zzim");
				} else {
					swal("성공!", "찜 하였습니다!", "success");
					//emit함수 + prop 카운트 1 증가
					this.$emit("do-zzim");
				}
			} else {
				swal("실패!", res.data.developerMessage, "error");
			}
		},
	},

	watch: {
		prop() {
			this.writerInfo = {
				userId: this.prop.userId,
				writer: this.prop.writer,
			};
			this.travelInfo = {
				city: this.prop.city,
				commentList: this.prop.commentList,
				content: this.prop.content,
				cost: this.prop.cost,
				endDate: this.prop.endDate,
				startDate: this.prop.startDate,
				state: this.prop.state,
				title: this.prop.title,
				travelId: this.prop.travelId,
				zzimCnt: this.prop.zzimCnt,
			};
		},
	},
	computed: {
		...mapGetters("userStore", ["getLoginUserUserId"]),
		numberWithCommas() {
			return String(this.prop.cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
	},
};
</script>

<style lang="scss" scoped>
#detailTravel {
	width: 100%;
	background-color: whitesmoke;
}
#writer_info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 5px 10px 5px;
}
#travel_info {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

#zzim {
	color: #f50000;
	font-size: 15px;
	font-weight: 500;
	text-align: center;
}
.info_wrapper {
	padding: 5px;
	display: flex;
	gap: 15px;
	background-color: white;
	border-radius: 5px;
	font-size: 15px;
	font-weight: 500;
	color: #343434;
}
.info_wrapper > span {
	font-weight: bold;
}
</style>
