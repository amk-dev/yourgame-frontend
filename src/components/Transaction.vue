<template>
	<li
		class="transaction"
		:class="{ 'is-debit': isDebit, 'is-credit': isCredit }"
	>
		<span class="transaction-amount">
			{{ amountWithSign }}
			<font-awesome-icon icon="rupee-sign"></font-awesome-icon>
		</span>
		<span class="transaction-description">
			{{ transactionDescription }}
		</span>
	</li>
</template>

<script>
	export default {
		name: 'Transaction',
		props: ['transaction'],
		computed: {
			transactionDescription() {
				let events = {
					referral: 'Referral Bonus',
					'joined-contest': 'Joined A Contest',
					winning: 'Won from a contest',
				}

				return events[this.transaction.event]
			},
			isDebit() {
				return this.transaction.amount < 0
			},
			isCredit() {
				return this.transaction.amount > 0
			},
			amountWithSign() {
				let sign = this.isCredit ? '+' : '-'
				let amount = String(this.transaction.amount)
				return amount.indexOf(sign) == -1 ? `${sign} ${amount}` : amount
			},
		},
	}
</script>

<style>
	.is-debit {
		background: #feecf0;
		color: #cc0f35;
	}
	.is-credit {
		background: #ebfffc;
		color: #00947e;
	}
	.transaction {
		padding: 12px;
		display: flex;
		justify-content: space-between;
		font-weight: 700;
	}
</style>
