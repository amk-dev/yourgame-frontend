<template>
	<div class="game-card-wrapper">
		<div
			class="game-card"
			:class="{ 'is-contest-header': isContestHeader }"
		>
			<game-card-header
				:host-picture="contest.host_picture"
				:host-name="contest.host_display_name"
			></game-card-header>

			<div
				class="game-card-body"
				:class="{ 'is-contest-header': isContestHeader }"
			>
				<h3 class="game-card-description-title">Description</h3>
				<p class="game-card-description">
					Choose What Is On Your Screen As Fast As You Can. The
					Fastest Finger Wins.
				</p>
			</div>

			<game-card-footer
				@showConfirmJoiningCard="showConfirmJoining = true"
				:contest="contest"
				:is-contest-header="isContestHeader"
				:is-joined="contest.isJoined"
				:is-creator="contest.isCreator"
				:contest-id="contest._id"
				:contest-time="contestTime"
				:contest-date="contestDate"
			></game-card-footer>

			<yg-transition name="fade">
				<confirm-joining-card
					v-if="showConfirmJoining"
					:contest-id="contest._id"
					@showConfirmJoiningCard="showConfirmJoining = true"
					@hideConfirmJoiningCard="showConfirmJoining = false"
				></confirm-joining-card>
			</yg-transition>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import YgTransition from '../../Transitions/YgTransition.vue'
	import GameCardHeader from './GameCardHeader.vue'
	import GameCardFooter from './GameCardFooter.vue'
	import ConfirmJoiningCard from './ConfirmJoiningCard.vue'

	/* eslint-disable no-console */
	export default {
		name: 'GameCard',
		props: ['type', 'contest'],
		data: () => {
			return {
				showConfirmJoining: false,
			}
		},
		components: {
			YgTransition,
			GameCardHeader,
			GameCardFooter,
			ConfirmJoiningCard,
		},
		computed: {
			...mapGetters(['isJoiningContest', 'joiningContestFeedback']),
			isContestHeader() {
				return this.type == 'contest-header'
			},
			contestTime() {
				let date = new Date(this.contest.startTime)
				let hours = date.getHours()
				let minutes = date.getMinutes()

				let hourString = ''
				let ap = 'AM'

				if (hours >= 12) {
					ap = 'PM'
				}

				if (minutes < 10) {
					minutes = `0${minutes}`
				}

				hours = hours % 12 || 12

				if (hours < 10) {
					hours = `0${hours}`
				}

				hourString = `${hours}:${minutes} ${ap}`

				return hourString
			},
			contestDate() {
				let date = new Date(this.contest.startTime)

				let day = date.getDate()
				let month = date.getMonth()
				let year = date.getFullYear()

				if (day < 10) {
					day = `0${day}`
				}

				if (month < 10) {
					month = `0${month}`
				}

				return `${day}-${month}-${year}`
			},
		},
		mounted() {
			if (!this.contest.isJoined && this.$route.query.confirmJoin == 1) {
				this.showConfirmJoining = true
			}
		},
	}
</script>

<style>
	.game-card {
		background: linear-gradient(90deg, #02aab0, #00cdac);
		padding: 24px;
		color: #fff;
		border-radius: 8px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		position: relative;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
	}

	.game-card-body {
		flex-basis: 100%;
	}

	.game-card-body {
		margin-top: 24px;
		margin-bottom: 36px;
	}
	.game-card-description-title {
		font-weight: 700;
	}

	.game-card-button {
		font-size: 14px !important;
	}
	.is-contest-header .game-card-button {
		margin-left: 12px;
	}

	@media screen and (max-width: 768px) {
		.game-card {
			padding: 24px;
		}

		.game-card-description,
		.game-card-description-title {
			font-size: 14px;
		}

		.game-card-description {
			margin-top: 8px;
		}

		.game-card-body {
			margin-top: 12px;
			margin-bottom: 16px;
		}
		.game-card-button {
			margin: 0 !important;
			width: 100%;
		}
		.game-card-body:not(.is-contest-header) {
			display: none;
		}
	}
</style>
