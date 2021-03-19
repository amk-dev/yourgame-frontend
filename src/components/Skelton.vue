<template>
	<div class="skelton">
		<div class="container yg-container">
			<div class="wrapper">
				<div class="columns is-gapless is-centered is-marginless">
					<div class="column is-10">
						<nav-bar />
					</div>
				</div>

				<slot></slot>
			</div>
		</div>

		<yg-footer class="mt-6"></yg-footer>
	</div>
</template>

<script>
	import NavBar from '../components/Navigation/NavBar.vue'
	import YgFooter from '../components/Footer/YgFooter.vue'

	export default {
		name: 'Skelton',
		components: {
			NavBar,
			YgFooter,
		},
	}
</script>

<style scoped>
	.is-marginless {
		margin: 0 !important;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 0vh !important;
		position: relative;
		justify-content: flex-start;
		padding: 0 24px;
	}
</style>
