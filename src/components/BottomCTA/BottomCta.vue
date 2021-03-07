<template>
	<div class="bottom-cta section">
		<div class="columns is-centered">
			<div class="column is-6">
				<h1 class="bottom-cta-title">
					start having fun while winning real money
				</h1>
				<router-link to="/games/all">
					<primary-button class="mt-5"
						>See Upcoming Games</primary-button
					>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import PrimaryButton from '../Generic/Button/PrimaryButton.vue'
	export default {
		name: 'BottomCta',
		components: {
			PrimaryButton,
		},
	}
</script>

<style>
	.bottom-cta {
		/* background: #fff; */
		text-align: center;
	}
	.bottom-cta-title {
		font-size: 36px;
		font-weight: 700;
	}
</style>
