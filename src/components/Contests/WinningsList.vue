<template>
	<ul class="winnings-list">
		<winnings-item
			v-for="winning in winnings"
			:key="winning.position"
			:position="winning.position"
			:money="winning.money"
		></winnings-item>
	</ul>
</template>

<script>
	import WinningsItem from './WinningsItem.vue'

	export default {
		components: { WinningsItem },
		name: 'WinningsList',
		props: ['winnings'],
	}
</script>

<style></style>
