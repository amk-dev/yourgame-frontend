<template>
	<skelton>
		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-5 mt-5 mb-5">
				<hero-content></hero-content>
				<!-- <contest-list
							title="Latest Games"
							class="mt-6"
						></contest-list> -->
			</div>
		</div>

		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-5 mt-5">
				<FAQ></FAQ>
			</div>
		</div>

		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-7 mt-6">
				<bottom-cta></bottom-cta>
			</div>
		</div>
	</skelton>
</template>

<script>
	import HeroContent from '../components/Hero/HeroContent.vue'
	import FAQ from '../components/FAQ/FAQ.vue'
	import BottomCta from '../components/BottomCTA/BottomCta.vue'
	import Skelton from '../components/Skelton.vue'

	export default {
		name: 'Home',
		components: {
			HeroContent,
			FAQ,
			BottomCta,
			Skelton,
		},
	}
</script>

<style></style>
