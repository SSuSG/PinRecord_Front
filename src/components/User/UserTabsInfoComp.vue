<template>
	<v-card class="d-flex flex-column scrollable-card" outlined>
		<v-tabs fixed-tabs background-color="indigo" dark v-model="tab">
			<v-tab href="#tab-1"> {{ userNickname }}'s 여행후기 </v-tab>
			<v-tab href="#tab-2"> {{ userNickname }}'s 찜 목록 </v-tab>

			<v-tabs-items v-model="tab">
				<v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i">
					<v-card center>
						<v-row v-for="n in 3" :key="n" align-content="center">
							<v-col cols="12" md="1"></v-col>
							<v-col cols="12" md="10">
								<v-card class="mx-auto my-12" max-width="700">
									<v-row>
										<v-col cols="12" md="6">
											<v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
										</v-col>
										<v-col cols="12" md="6">
											<v-card-title>Cafe Badilico</v-card-title>

											<v-card-text>
												<v-row align="center" class="mx-0">
													<v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

													<div class="grey--text ms-4">4.5 (413)</div>
												</v-row>

												<div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

												<div>
													Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio
													seating.
												</div>
											</v-card-text>
										</v-col>
									</v-row>
								</v-card>
							</v-col>
						</v-row>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</v-tabs>
	</v-card>
</template>

<script>
export default {
	name: "UserTabsInfoComp",
	props: {
		userNickname: String,
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
