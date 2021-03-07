<template>
	<div class="yg-player" ref="ygPlayer">
		<player-video
			:optionsVisible="optionsVisible"
			@hideOptionsClicked="hideOptions"
		></player-video>
		<!-- <player-footer
			class="mt-4"
			@showOptionsClicked="showOptions"
		></player-footer> -->
	</div>
</template>

<script>
	import PlayerVideo from './PlayerVideo.vue'

	export default {
		name: 'Player',
		data: function() {
			return {
				optionsVisible: true,
				notificationCount: 0,
				notifications: [],
			}
		},
		methods: {
			hideOptions() {
				this.optionsVisible = false
			},
			showOptions() {
				this.optionsVisible = true
			},
		},
		components: {
			PlayerVideo,
		},
	}
</script>

<style>
	.is-floating {
		background: linear-gradient(90deg, #02aab0, #00cdac);
		color: #fff;
		padding: 8px 12px;
		border-radius: 4px;
		position: relative;
		font-weight: 700;
	}
</style>
