<template>
	<div class="referral-url-box">
		<h3 class="referral-url-box-title">Your Referral URL</h3>

		<div class="referral-url mt-3" @click="copyReferralUrl">
			<input
				class="input"
				type="text"
				readonly
				:value="referralUrl"
				ref="referralUrl"
			/>
		</div>

		<p
			v-show="showCopiedText"
			class="copied-feedback-text mt-2 tag is-light is-success"
		>
			Copied
		</p>
	</div>
</template>

<script>
	// import WhiteBox from '../components/Generic/WhiteBox/WhiteBox.vue'
	// import PrimaryButton from '../components/Generic/Button/PrimaryButton.vue'

	import { mapGetters } from 'vuex'

	export default {
		name: 'ReferralUrlBox',
		components: {
			// WhiteBox,
			// PrimaryButton,
		},
		data: () => {
			return {
				showCopiedText: false,
			}
		},
		methods: {
			copyReferralUrl() {
				this.$refs.referralUrl.select()
				document.execCommand('copy')
				this.showCopiedText = true
			},
		},
		computed: {
			...mapGetters(['referralUrl']),
		},
	}
</script>

<style>
	.referral-url-box {
		padding: 24px;
		background: #fff;
	}
	.referral-url-box-title {
		font-weight: 700;
	}
	.referral-url {
		display: flex;
		align-items: center;
	}
	.copied-feedback-text {
		font-size: 12px;
	}
</style>
