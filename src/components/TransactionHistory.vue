<template>
	<div class="transaction-history">
		<h2 class="transaction-history-title mb-4">Transaction History</h2>
		<ul>
			<transaction
				class="mt-2"
				v-for="transaction in transactions"
				:transaction="transaction"
				:key="transaction._id"
			></transaction>
		</ul>
	</div>
</template>

<script>
	import Transaction from './Transaction.vue'
	export default {
		name: 'TransactionHistory',
		props: ['transactions'],
		components: {
			Transaction,
		},
	}
</script>

<style>
	.transaction-history {
		background: #fff;
		padding: 24px;
	}
	.transaction-history-title {
		font-weight: 700;
	}
</style>
