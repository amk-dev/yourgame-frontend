<template>
	<div class="total-winnings-and-entry">
		<h2 class="total-winnings">
			<font-awesome-icon
				class="total-winnings-icon"
				icon="flag"
			></font-awesome-icon>
			Win 300 Rs
		</h2>
		<h4 class="entry-fee">Entry Fee - 10 Rs</h4>
	</div>
</template>

<script>
	export default {
		name: 'TotalWinningsAndEntry',
	}
</script>

<style>
	.total-winnings {
		/* background: #ffb800; */
		/* padding: 2px 8px; */
		display: inline-block;
		/* border-radius: 4px; */
	}
	.total-winnings-icon {
		color: #f57c00;
	}
</style>
