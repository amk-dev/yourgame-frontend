<template>
	<div class="success-message notification is-light is-success mb-4">
		<div class="text">
			You have successfully joined the contest. Visit Contest Playground
			At
			<strong>{{ contestTime }}</strong> on
			<strong>{{ contestDate }}</strong> to play.
		</div>

		<router-link :to="playLink">
			<div class="playground-button">
				<primary-button class="is-fullwidth"
					>Go To Playground</primary-button
				>
			</div>
		</router-link>
	</div>
</template>

<script>
	import PrimaryButton from './../Generic/Button/PrimaryButton.vue'

	export default {
		name: 'SuccessMessage',
		props: ['playLink', 'contestTime', 'contestDate'],
		components: {
			PrimaryButton,
		},
	}
</script>

<style>
	.success-message {
		display: flex;
	}
	.playground-button {
		margin-left: 12px;
	}

	@media screen and (max-width: 786px) {
		.success-message {
			display: block;
		}
		.playground-button {
			margin-left: 0;
			margin-top: 18px;
		}
	}
</style>
