<template>
	<div class="referral-header">
		<div class="referral-header-text">
			<p>
				Its more fun with friends. Refer your friends and get upto 150
				Rs to play.
			</p>
		</div>

		<div
			class="referral-header-cta-buttons mt-4"
			v-if="context == 'all-games'"
		>
			<router-link to="/referrals">
				<primary-button class="game-card-button">
					Refer Now
				</primary-button>
			</router-link>
		</div>
	</div>
</template>

<script>
	import PrimaryButton from './Generic/Button/PrimaryButton.vue'
	export default {
		name: 'ReferralHeader',
		props: ['context'],
		components: {
			PrimaryButton,
		},
	}
</script>

<style>
	.referral-header {
		background: linear-gradient(to right, #f19a1a, #ffc73c);
		padding: 24px;
		border-radius: 4px;
		border-radius: 8px;
	}
	.referral-header-text {
		font-size: 24px;
		font-family: 'Lato', sans-serif;
		font-weight: 700;
		line-height: 130%;
	}

	.validity-text {
		font-size: 14px;
		font-weight: 400;
		line-height: 100%;
	}

	@media screen and (max-width: 786px) {
		.referral-header {
			padding: 24px;
		}
		.referral-header-text {
			max-width: 100%;
			font-size: 18px;
		}
	}
</style>
