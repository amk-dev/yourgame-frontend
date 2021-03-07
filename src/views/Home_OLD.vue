<template>
	<div class="container">
		<div class="wrapper">
			<div class="columns is-gapless is-centered is-marginless">
				<div class="column is-10">
					<nav-bar />
				</div>
			</div>

			<div
				class="columns is-gapless is-centered is-marginless is-flex-grow-1 is-align-items-center"
			>
				<div class="column is-10 hero-column">
					<div
						class="columns is-gapless is-marginless is-justify-content-space-between"
					>
						<div
							class="column is-6 is-flex is-flex-direction-column is-justify-content-center"
						>
							<hero-content></hero-content>
						</div>
						<div
							class="column is-4 is-flex is-flex-direction-column is-justify-content-center"
						>
							<hero-media></hero-media>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NavBar from '../components/Navigation/NavBar.vue'
	import HeroContent from '../components/Hero/HeroContent.vue'
	import HeroMedia from '../components/Hero/HeroMedia.vue'

	export default {
		name: 'Home',
		components: {
			NavBar,
			HeroContent,
			HeroMedia,
		},
	}
</script>

<style>
	.is-marginless {
		margin: 0 !important;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
		justify-content: flex-start;
	}
	.container {
		min-height: 100vh;
	}

	.is-fixed-top {
		position: absolute;
		width: 100%;
		top: 0;
	}
	.hero-column {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
