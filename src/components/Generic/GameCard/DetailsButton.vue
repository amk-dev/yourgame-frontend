<template>
	<router-link :to="contestLink" class="contest-details-button">
		<primary-button class="game-card-button ">
			Details
		</primary-button>
	</router-link>
</template>
<script>
	import PrimaryButton from './../Button/PrimaryButton.vue'

	export default {
		name: 'DetailsButton',
		props: ['contestLink'],
		components: {
			PrimaryButton,
		},
	}
</script>
