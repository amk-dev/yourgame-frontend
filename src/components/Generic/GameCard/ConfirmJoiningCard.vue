<template>
	<yg-modal>
		<div class="confirm-joining">
			<div class="confirm-joining-header">
				<h2>Confirm Joining Contest ?</h2>
			</div>

			<feedback-box
				class="mt-4"
				v-if="joiningContestFeedback"
				:feedback="joiningContestFeedback"
			></feedback-box>

			<div class="confirm-joining-body mt-5">
				<div class="confirm-joining-controls has-text-right">
					<white-button
						@click.native="hideConfirmJoiningCard"
						class="mr-2"
						:disabled="isJoiningContest"
						>Cancel</white-button
					>
					<primary-button
						@click.native="joinContest"
						:disabled="isJoiningContest"
					>
						{{ confirmButtonText }}
					</primary-button>
				</div>
			</div>
		</div>
	</yg-modal>
</template>

<script>
	import PrimaryButton from './../../Generic/Button/PrimaryButton.vue'
	import WhiteButton from './../../Generic/Button/WhiteButton.vue'
	import YgModal from './../../Generic/Modal/YgModal.vue'
	import FeedbackBox from './../../Generic/FeedbackBox/FeedbackBox.vue'
	import { mapGetters } from 'vuex'

	export default {
		name: 'ConfirmJoiningCard',
		props: ['contestId'],
		components: {
			PrimaryButton,
			WhiteButton,
			YgModal,
			FeedbackBox,
		},
		computed: {
			...mapGetters(['joiningContestFeedback', 'isJoiningContest']),
			confirmButtonText() {
				let buttonTexts = {
					error: 'Retry',
					info: 'Yes',
					success: 'Ok',
				}

				return this.joiningContestFeedback
					? buttonTexts[this.joiningContestFeedback.type]
					: 'Yes'
			},
		},
		methods: {
			showConfirmJoiningCard() {
				this.$store.dispatch('clearJoinContestFeedback')
				this.showConfirmJoining = true
				this.$emit('showConfirmJoiningCard')
			},
			hideConfirmJoiningCard() {
				this.showConfirmJoining = false
				this.$emit('hideConfirmJoiningCard')
			},
			joinContest() {
				if (this.confirmButtonText != 'Ok') {
					this.$store.dispatch('joinContestWithId', this.contestId)
				} else {
					this.hideConfirmJoiningCard()
				}
			},
		},
	}
</script>

<style>
	.confirm-joining-header h2 {
		font-size: 18px;
		font-weight: 700;
	}
</style>
