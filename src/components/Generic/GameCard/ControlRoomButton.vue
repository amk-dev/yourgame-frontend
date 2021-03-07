<template>
	<router-link :to="controlRoomLink">
		<primary-button class="game-card-button">
			Go To Control Room
		</primary-button>
	</router-link>
</template>

<script>
	import PrimaryButton from './../Button/PrimaryButton.vue'

	export default {
		name: 'ControlRoomButton',
		props: ['controlRoomLink'],
		components: {
			PrimaryButton,
		},
	}
</script>

<style></style>
