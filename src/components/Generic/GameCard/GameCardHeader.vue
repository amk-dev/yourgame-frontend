<template>
	<header class="game-card-header">
		<h3 class="game-name">
			<span>Whats On The Screen</span>
			<span class="game-status">
				<span class="tag is-success ml-2" v-if="isUpcoming"
					>Upcoming</span
				>
				<span class="tag is-danger ml-2" v-if="isLive">Live</span>
				<span class="tag is-info ml-2" v-if="isEnded">Ended</span>
			</span>
		</h3>
		<div class="hosted-by">
			<span class="hosted-by-placeholder"> Hosted By </span>
			<figure class="image is-24x24">
				<img
					class="is-rounded"
					:src="hostPicture"
					referrerpolicy="no-referrer"
				/>
			</figure>
			<span class="host-name">{{ hostName }}</span>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'GameCardVue',
		props: ['hostPicture', 'hostName', 'status'],
		computed: {
			isUpcoming() {
				return this.status == 'upcoming'
			},
			isLive() {
				return this.status == 'live'
			},
			isEnded() {
				return this.status == 'ended'
			},
		},
	}
</script>

<style>
	.game-card-header {
		justify-content: space-between;
		align-items: baseline;
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

	.game-status {
		display: block;
	}

	.game-status .tag {
		margin-left: 0 !important;
		margin-top: 12px;
	}

	.game-name {
		line-height: 100%;
	}

	@media screen and (max-width: 786px) {
		.game-card-header {
			display: block;
		}
		.hosted-by {
			font-size: 12px;
		}
		.game-name {
			line-height: 100%;
		}
		.game-name .tag {
			margin-left: 0px !important;
			margin-bottom: 12px;
			margin-top: 12px;
		}
	}
</style>
