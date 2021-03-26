<template>
	<skelton :showFooter="false">
		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-5">
				<div class="yourmoney">
					<div class="your-money-section">
						<your-funds
							:bonus="bonus"
							:winnings="winnings"
						></your-funds>

						<transaction-history
							:transactions="transactionHistory"
						></transaction-history>
					</div>
				</div>
			</div>
		</div>
	</skelton>
</template>

<script>
	import Skelton from '../components/Skelton.vue'
	import YourFunds from '../components/YourFunds.vue'
	import TransactionHistory from '../components/TransactionHistory.vue'

	export default {
		name: 'YourMoney',
		props: ['bonus', 'winnings', 'transactionHistory'],
		components: {
			YourFunds,
			Skelton,
			TransactionHistory,
		},
	}
</script>

<style>
	.wrapper {
		justify-content: flex-start;
		padding: 0px 24px;
	}
</style>
