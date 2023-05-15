<template>
	<v-card class="d-flex flex-column scrollable-card" outlined>
		<v-tabs fixed-tabs background-color="indigo" dark v-model="tab">
			<v-tab href="#tab-1"> {{ userNickname }}'s 여행후기 </v-tab>
			<v-tab href="#tab-2"> {{ userNickname }}'s 찜 목록 </v-tab>

			<v-tabs-items v-model="tab">
				<v-tab-item :value="'tab-1'">
					<user-travel-list-comp :travelList="travelList" />
				</v-tab-item>
				<v-tab-item :value="'tab-2'">
					<user-travel-list-comp :travelList="zzimTravelList" />
				</v-tab-item>
			</v-tabs-items>
		</v-tabs>
	</v-card>
</template>

<script>
import UserTravelListComp from "./UserTravelListComp.vue";
export default {
	components: { UserTravelListComp },
	name: "UserTabsInfoComp",
	props: {
		userNickname: String,
		travelList: Array,
		zzimTravelList: Array,
	},
	data() {
		return {
			tab: null,
			text: "hello",
		};
	},
};
</script>

<style>
.scrollable-card {
	max-height: 800px; /* 최대 높이를 지정하거나 필요한 높이로 조정합니다 */
	overflow: auto; /* 스크롤이 필요한 경우 스크롤바를 표시합니다 */
}
</style>
