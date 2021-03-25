<template>
	<skelton :showFooter="false">
		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-5">
				<div class="dashboard">
					<div class="dashboard-section">
						<your-funds></your-funds>
					</div>
				</div>
			</div>
		</div>
	</skelton>
</template>

<script>
	import Skelton from '../components/Skelton.vue'
	import YourFunds from '../components/YourFunds.vue'

	export default {
		name: 'Home',
		components: {
			YourFunds,
			Skelton,
		},
	}
</script>

<style>
	.wrapper {
		justify-content: flex-start;
		padding: 0px 24px;
	}
	.dashboard {
		margin-top: 48px;
	}
	@media screen and (max-width: 768px) {
		.dashboard {
			margin-top: 0 !important;
		}
	}
</style>
