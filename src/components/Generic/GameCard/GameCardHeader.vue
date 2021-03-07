<template>
	<header class="game-card-header">
		<h3 class="game-name">Whats On The Screen</h3>
		<div class="hosted-by">
			<span class="hosted-by-placeholder">
				Hosted By
			</span>
			<figure class="image is-24x24">
				<img class="is-rounded" :src="hostPicture" />
			</figure>
			<span class="host-name">{{ hostName }}</span>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'GameCardVue',
		props: ['hostPicture', 'hostName'],
	}
</script>

<style>
	.game-card-header {
		justify-content: space-between;
		align-items: center;
	}
	.game-card-header h3 {
		font-size: 18px;
		font-weight: 700;
	}
	.is-contest-header .game-card-header h3 {
		font-size: 24px;
	}
	.game-card-header,
	.game-card-body {
		flex-basis: 100%;
	}
	.game-card-header,
	.hosted-by {
		display: flex;
	}
	.hosted-by .hosted-by-placeholder {
		margin-right: 4px;
	}
	.hosted-by .host-name {
		margin-left: 4px;
	}

	@media screen and (max-width: 786px) {
		.game-card-header {
			display: block;
		}
		.hosted-by {
			font-size: 12px;
		}
	}
</style>
