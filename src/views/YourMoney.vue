<template>
	<div class="container">
		<div class="wrapper">
			<div class="columns is-gapless is-centered is-marginless">
				<div class="column is-10">
					<navbar></navbar>
				</div>
			</div>

			<div class="columns is-gapless is-centered is-marginless">
				<div class="column is-5">
					<div class="dashboard">
						<div class="dashboard-section">
							<your-funds></your-funds>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Navbar from '../components/Navigation/NavBar.vue'
	import YourFunds from '../components/YourFunds.vue'

	export default {
		name: 'Home',
		components: {
			Navbar,
			YourFunds,
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
