<template>
	<form @submit.prevent="" action="#" novalidate>
		<div class="field">
			<label class="label">Youtube Video URL</label>
			<div class="control">
				<input
					class="input"
					type="text"
					placeholder="Enter Your Scheduled Youtube Live Video ID"
					v-model="newContest.youtubeVideoId"
					required
				/>
			</div>

			<transition name="fade">
				<error-box
					v-if="youtubeVideoURLErrors"
					:errors="youtubeVideoURLErrors"
				></error-box>
			</transition>
		</div>

		<div class="field">
			<label class="label">Contest Date</label>
			<div class="control">
				<input
					class="input"
					type="date"
					v-model="newContest.contestDate"
					required
				/>
			</div>

			<transition name="fade">
				<error-box
					v-if="contestDateErrors"
					:errors="contestDateErrors"
				></error-box>
			</transition>
		</div>

		<div class="field">
			<label class="label">Contest Time</label>
			<div class="control">
				<input
					class="input"
					type="time"
					v-model="newContest.contestTime"
					required
				/>
			</div>

			<transition name="fade">
				<error-box
					v-if="contestTimeErrors"
					:errors="contestTimeErrors"
				></error-box>
			</transition>
		</div>

		<transition name="fade">
			<error-box v-if="generalErrors" :errors="generalErrors"></error-box>
		</transition>

		<transition name="fade">
			<div class="field" v-if="createNewContestFeedback">
				<div
					class="notification is-light"
					:class="{
						'is-success':
							createNewContestFeedback.type == 'success',
						'is-danger': createNewContestFeedback.type == 'error',
						'is-info': createNewContestFeedback.type == 'info',
					}"
				>
					{{ createNewContestFeedback.message }}
				</div>
			</div>
		</transition>

		<div class="field">
			<div class="control has-text-right mt-5">
				<default-button @click.native="emitCloseRequest" class="mr-2"
					>Cancel</default-button
				>
				<primary-button
					:disabled="isSubmitting"
					@click.native="validateTheForm"
					>Create</primary-button
				>
			</div>
		</div>

		<yg-transition name="fade">
			<YgModal
				class="confirm-new-contest-mode"
				v-if="confirmDialgoueVisible"
			>
				<div class="confirm-new-contest-modal-header">
					<h2 class="confirm-new-contest-modal-title">
						Confirm Creating New Contest
					</h2>
				</div>
				<div class="confirm-new-contest-modal-body mt-4 has-text-right">
					<div class="confirm-controls" v-if="!isCreatingContest">
						<default-button
							@click.native="hideConfirmDialgoue"
							class="mr-2"
							>Cancel</default-button
						>
						<primary-button @click.native="createContestHelper">
							Yes
						</primary-button>
					</div>
				</div>
			</YgModal>
		</yg-transition>
	</form>
</template>

<script>
	import PrimaryButton from './../Generic/Button/PrimaryButton.vue'
	import DefaultButton from './../Generic/Button/DefaultButton.vue'
	import YgModal from './../Generic/Modal/YgModal.vue'
	import ErrorBox from '../Generic/ErrorBox/ErrorBox.vue'
	import YgTransition from '../Transitions/YgTransition.vue'

	import { mapGetters } from 'vuex'

	// TODO:: Add Validations And Make Sure This Can Be Used By All Other Creators
	export default {
		name: 'NewContestForm',
		data: function () {
			return {
				newContest: {
					youtubeVideoId: null,
					contestDate: null,
					contestTime: null,
				},
				confirmDialgoueVisible: false,
				errors: null,
				isSubmitting: false,
			}
		},
		computed: {
			...mapGetters(['isCreatingContest', 'createNewContestFeedback']),
			youtubeVideoURLErrors() {
				if (this.errors) {
					let youtubeVideoURLErrors = this.errors.filter(
						(error) => error.field == 'youtubeVideoURL'
					)

					return youtubeVideoURLErrors.length > 0
						? youtubeVideoURLErrors
						: null
				}

				return null
			},
			contestDateErrors() {
				if (this.errors) {
					let contestDateErrors = this.errors.filter(
						(error) => error.field == 'contestDate'
					)

					return contestDateErrors.length > 0
						? contestDateErrors
						: null
				}

				return null
			},
			contestTimeErrors() {
				if (this.errors) {
					let contestTimeErrors = this.errors.filter(
						(error) => error.field == 'contestTime'
					)

					return contestTimeErrors.length > 0
						? contestTimeErrors
						: null
				}

				return null
			},
			generalErrors() {
				if (this.errors) {
					let generalErrors = this.errors.filter(
						(error) => error.field == 'general'
					)

					return generalErrors.length > 0 ? generalErrors : null
				}

				return null
			},
			contestDateAndTime() {
				if (
					this.newContest.contestDate &&
					this.newContest.contestTime
				) {
					let [year, month, day] = this.newContest.contestDate.split(
						'-'
					)
					let [hour, minute] = this.newContest.contestTime.split(':')

					let contestDateAndTime = new Date(
						year,
						month,
						day,
						hour,
						minute
					)

					return contestDateAndTime
				} else {
					return false
				}
			},
		},
		components: {
			DefaultButton,
			PrimaryButton,
			YgModal,
			ErrorBox,
			YgTransition,
		},
		methods: {
			emitCloseRequest() {
				this.$emit('closeModal')
			},
			showConfirmDialogue() {
				this.confirmDialgoueVisible = true
			},
			hideConfirmDialgoue() {
				this.confirmDialgoueVisible = false
			},
			validateTheForm() {
				this.errors = null

				let errors = []
				if (!this.newContest.youtubeVideoId) {
					errors.push({
						field: 'youtubeVideoURL',
						message: 'Please Enter Your Scheduled Youtube Video ID',
					})
				}

				if (!this.newContest.contestDate) {
					errors.push({
						field: 'contestDate',
						message: 'Please Provide A Contest Date',
					})
				}

				if (!this.newContest.contestTime) {
					errors.push({
						field: 'contestTime',
						message: 'Please Provide A Contest Time',
					})
				}

				if (this.contestDateAndTime) {
					if (this.contestDateAndTime <= new Date()) {
						errors.push({
							field: 'general',
							message: 'Please Provide Future Date',
						})
					}
				}

				if (errors.length > 0) {
					this.errors = errors
				} else {
					this.confirmDialgoueVisible = true
				}
			},
			async createContestHelper() {
				let contestDateAndTimeTimestamp = this.contestDateAndTime.getTime()

				this.confirmDialgoueVisible = false

				this.$store
					.dispatch('createNewContest', {
						youtubeVideoId: this.newContest.youtubeVideoId,
						contestDateAndTimeTimestamp,
					})
					.catch((error) => {
						// eslint-disable-next-line no-console
						console.log(error)
					})
			},
		},
		beforeDestroy() {
			this.$store.dispatch('resetContestFeedback')
		},
	}
</script>
<style>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
		transition-timing-function: ease-in-out;
		will-change: opacity;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
