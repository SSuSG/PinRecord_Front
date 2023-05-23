<template>
	<v-dialog width="700px" v-model="pinViewDialog" v-if="pin">
		<v-card class="mx-auto" max-width="900">
			<v-carousel hide-delimiters>
				<v-carousel-item
					v-for="(image, i) in pin.imageList"
					:key="i"
					v-bind:src="'data:image/jpeg;base64,' + image.image"
				></v-carousel-item>
			</v-carousel>

			<v-card-title>
				<v-spacer>{{ pin.placeName }}</v-spacer>
			</v-card-title>

			<v-card-subtitle>
				{{ pin.categoryName }}<br />
				{{ pin.addressName }}
			</v-card-subtitle>

			<v-card-actions>
				<v-btn color="black lighten-2" text> 더보기 </v-btn>

				<v-spacer></v-spacer>

				<v-btn icon @click="show = !show">
					<v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
				</v-btn>
				<v-btn icon @click.stop="pinViewDialog = false">
					<v-icon>mdi-close-circle</v-icon>
				</v-btn>
			</v-card-actions>

			<v-expand-transition>
				<div v-show="show">
					<v-divider></v-divider>
					<v-container>
						<v-row justify="center">
							<v-chip-group column justify="center">
								<v-chip v-for="tag in pin.tagList" :key="tag">
									<v-card-subtitle>
										{{ tag }}
									</v-card-subtitle>
								</v-chip>
							</v-chip-group>
						</v-row>
					</v-container>

					<v-divider></v-divider>

					<v-card-text>
						{{ pin.content }}
					</v-card-text>
				</div>
			</v-expand-transition>
		</v-card>
	</v-dialog>
</template>
<script>
export default {
	name: "PinComp",
	props: {
		pin: Object,
		dialogVisible: Boolean,
	},
	data() {
		return {
			show: false,
		};
	},
	computed: {
		pinViewDialog: {
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
	},
};
</script>
<style scoped></style>
