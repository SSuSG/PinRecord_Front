<template>
	<div id="user_info">
		<v-tabs fixed-tabs background-color="#4169e1" :hide-slider="true" dark v-model="tab">
			<v-tab href="#tab-1" :ripple="false">
				<span id="tab_text">{{ userNickname }}'s 여행후기</span>
			</v-tab>
			<v-tab href="#tab-2" :ripple="false">
				<span id="tab_text"> {{ userNickname }}'s 찜 목록 </span>
			</v-tab>
			<v-tabs-items v-model="tab">
				<div id="tab_wrapper">
					<v-tab-item :value="'tab-1'">
						<user-travel-list-comp :travelList="travelList" />
					</v-tab-item>
					<v-tab-item :value="'tab-2'">
						<user-travel-list-comp :travelList="zzimTravelList" />
					</v-tab-item>
				</div>
			</v-tabs-items>
		</v-tabs>
	</div>
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
#user_info {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.scrollable-card {
	max-height: 800px; /* 최대 높이를 지정하거나 필요한 높이로 조정합니다 */
	overflow: auto; /* 스크롤이 필요한 경우 스크롤바를 표시합니다 */
}
#tab_text {
	letter-spacing: 2px;
	font-size: 15px;
	font-weight: 500;
}
#tab_wrapper {
	height: 490px;
	overflow: auto;
}
#tab_wrapper::-webkit-scrollbar {
	display: none;
}
</style>
