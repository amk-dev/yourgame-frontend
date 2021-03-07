<template>
	<div class="winnings">
		<h3>Winnings</h3>

		<winnings-list class="mt-4" :winnings="winnings"></winnings-list>
	</div>
</template>

<script>
	import WinningsList from './WinningsList.vue'

	export default {
		name: 'Winnings',
		components: {
			WinningsList,
		},
		data: () => {
			return {
				winnings: [
					{ position: 1, money: 100 },
					{ position: 2, money: 75 },
					{ position: 3, money: 50 },
					{ position: 4, money: 25 },
					{ position: 5, money: 10 },
					{ position: 6, money: 10 },
					{ position: 7, money: 10 },
					{ position: 8, money: 10 },
					{ position: 9, money: 10 },
				],
			}
		},
	}
</script>

<style scoped>
	.winnings {
		background: #fff;
		padding: 24px;
		border-radius: 4px;
	}
	.winnings h3 {
		font-size: 18px;
		font-weight: 700;
	}
</style>
