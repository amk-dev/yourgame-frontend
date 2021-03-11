<template>
	<div class="no-contests">
		<font-awesome-icon
			class="no-contests-icon"
			icon="gamepad"
		></font-awesome-icon>
		<h3 class="no-contests-feedback">
			{{ contestFeedback }}
		</h3>
		<router-link v-if="ctaDestination && ctaText" :to="ctaDestination">
			<primary-button class="mt-5">
				{{ ctaText }}
			</primary-button>
		</router-link>
	</div>
</template>

<script>
	import PrimaryButton from '../Generic/Button/PrimaryButton.vue'

	export default {
		name: 'ContestEmptyState',
		props: {
			contestFeedback: {
				type: String,
				required: true,
			},
			ctaDestination: {
				type: String,
			},
			ctaText: {
				type: String,
			},
		},
		components: {
			PrimaryButton,
		},
	}
</script>

<style></style>
