<template>
	<skelton>
		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-6-fullhd is-7-widescreen mb-5">
				<hero-content></hero-content>
				<!-- <contest-list
							title="Latest Games"
							class="mt-6"
						></contest-list> -->
			</div>
		</div>

		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-6-fullhd is-7-widescreen mt-5">
				<FAQ></FAQ>
			</div>
		</div>

		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-12-desktop is-12-tablet mt-6">
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
