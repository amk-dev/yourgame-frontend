<template>
	<div class="heading-and-cta">
		<h1 class="yg-heading">
			Play simple games, Hosted by youtubers, and earn money everyday
		</h1>

		<div class="yg-cta mt-5">
			<primary-button v-if="!waitinglist" class="yg-start-button"
				>Sign In To Play</primary-button
			>
			<div class="field" v-if="waitinglist">
				<div class="control has-icons-left">
					<input
						class="input"
						type="email"
						placeholder="What's Your Email"
					/>

					<span class="icon is-left is-small">
						<font-awesome-icon icon="envelope"></font-awesome-icon>
					</span>
				</div>
			</div>
			<transparent-button>
				<font-awesome-icon icon="play-circle"></font-awesome-icon>
				<span class="ml-1">How To Play</span>
			</transparent-button>
		</div>
	</div>
</template>

<script>
	import PrimaryButton from './../Generic/Button/PrimaryButton.vue'
	import TransparentButton from './../Generic/Button/TransparentButton.vue'

	export default {
		name: 'HeroContent',
		props: ['waitinglist'],
		components: {
			PrimaryButton,
			TransparentButton,
		},
	}
</script>

<style>
	.yg-heading {
		font-size: 48px;
		font-weight: 700;
		line-height: 125%;
		color: #000;
	}
	.yg-start-button {
		margin-right: 24px;
	}

	@media screen and (max-width: 786px) {
		.yg-heading {
			font-size: 42px;
		}
	}
</style>
