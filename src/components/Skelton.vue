<template>
	<div class="skelton">
		<div class="yg-container">
			<div class="columns is-gapless is-marginless is-centered">
				<div class="column is-10-tablet is-8-desktop">
					<div class="wrapper">
						<div
							class="columns is-gapless is-centered is-marginless"
						>
							<div class="column is-12">
								<nav-bar />
							</div>
						</div>

						<slot></slot>
					</div>
				</div>
			</div>
		</div>

		<yg-footer v-if="showFooter" class="mt-6"></yg-footer>
	</div>
</template>

<script>
	import NavBar from '../components/Navigation/NavBar.vue'
	import YgFooter from '../components/Footer/YgFooter.vue'

	export default {
		name: 'Skelton',
		props: {
			showFooter: {
				default: true,
			},
		},
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
	.yg-container {
		flex-grow: 1;
	}
	.skelton {
		/* display: flex; */
		flex-direction: column;
		min-height: 100vh;
	}
</style>
