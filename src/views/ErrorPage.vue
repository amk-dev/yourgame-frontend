<template>
	<skelton>
		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-4 mt-5 mb-5 has-text-centered">
				<image-with-text v-bind="imageAndText"></image-with-text>

				<router-link to="/">
					<primary-button class="mt-4">Go To Home</primary-button>
				</router-link>
			</div>
		</div>
	</skelton>
</template>

<script>
	import Skelton from '../components/Skelton.vue'
	import ImageWithText from '../components/ImageWithText.vue'
	import PrimaryButton from '../components/Generic/Button/PrimaryButton.vue'

	export default {
		name: 'ErrorPage',
		props: {
			type: {
				type: String,
				required: true,
			},
		},
		components: {
			Skelton,
			ImageWithText,
			PrimaryButton,
		},
		computed: {
			imageAndText() {
				let types = {
					'page-not-found': {
						img: '404',
						alt: 'Page Not Found',
						text: 'Page Not Found',
					},
					'something-went-wrong': {
						img: '500',
						alt: 'Something Went Wrong',
						text: 'Something Went Wrong',
					},
				}

				return types[this.type]
			},
		},
	}
</script>

<style></style>
