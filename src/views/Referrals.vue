<template>
	<skelton>
		<div class="columns is-gapless is-centered">
			<div class="column is-5 mb-5">
				<div class="referrals">
					<referral-header></referral-header>
					<referral-status
						class="has-narrow-margin-mobile mt-3"
					></referral-status>
					<referral-url-box
						class="has-narrow-margin-mobile mt-3"
					></referral-url-box>
					<referred-people
						:referrals="referrals"
						class="has-narrow-margin-mobile mt-3"
					></referred-people>
				</div>
			</div>
		</div>
	</skelton>
</template>

<script>
	import Skelton from '../components/Skelton.vue'
	import ReferralHeader from '../components/ReferralHeader.vue'
	import ReferralUrlBox from '../components/ReferralUrlBox.vue'
	import ReferredPeople from '../components/ReferredPeople.vue'
	import ReferralStatus from '../components/ReferralStatus.vue'

	export default {
		name: 'Referrals',
		props: ['referrals'],
		components: {
			Skelton,
			ReferralUrlBox,
			ReferredPeople,
			ReferralStatus,
			ReferralHeader,
		},
	}
</script>

<style>
	.referrals {
		margin-top: 48px;
	}
	@media screen and (max-width: 786px) {
		.referrals {
			margin-top: 0px !important;
		}
		.has-narrow-margin-mobile {
			margin-top: 12px !important;
		}
	}
</style>
