<template>
	<div class="columns is-centered">
		<div class="column is-10">
			<nav-bar class="play-navbar" />

			<div class="columns is-centered">
				<div class="column is-12">
					<div class="player-wrapper" ref="playerWrapper">
						<Player></Player>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NavBar from './../components/Navigation/NavBar.vue'
	import Player from './../components/Play/Player.vue'

	export default {
		name: 'Play',
		components: {
			NavBar,
			Player,
		},
		data: function() {
			return {
				isFullscreen: false,
				optionsVisible: false,
			}
		},
		methods: {
			goFullScreen() {
				if (this.isFullscreen) {
					document.exitFullscreen()
					this.isFullscreen = false
				} else {
					this.$refs.playerWrapper.requestFullscreen({
						navigationUI: 'hide',
					})
					this.isFullscreen = true
				}
			},
		},
	}
</script>

<style>
	body {
		background: #f2f6fc;
	}

	@media screen and (max-width: 768px) {
		.play-navbar {
			display: none;
		}
	}
</style>
