<template>
	<div
		class="game-card-footer"
		:class="{ 'is-contest-header': isContestHeader }"
	>
		<div class="game-card-left">
			<total-winnings-and-entry></total-winnings-and-entry>
		</div>

		<div class="game-card-middle">
			<contest-time-and-date
				:contest-date="contestDate"
				:contest-time="contestTime"
			></contest-time-and-date>
		</div>

		<div
			class="game-card-right"
			:class="{ 'is-contest-header': isContestHeader }"
		>
			<details-button
				:contest-link="contestLink"
				v-if="showDetailsButton"
			></details-button>
			<join-button
				@click.native="emitShowConfirmJoiningCard"
				v-if="showJoinButton"
			></join-button>

			<control-room-button
				:control-room-link="controlRoomLink"
				v-if="showControlRoomButton"
			></control-room-button>

			<joined-text v-if="showJoinedText"></joined-text>
		</div>
	</div>
</template>

<script>
	import ContestTimeAndDate from './ContestTimeAndDate.vue'
	import DetailsButton from './DetailsButton.vue'
	import JoinButton from './JoinButton.vue'
	import ControlRoomButton from './ControlRoomButton.vue'
	import JoinedText from './JoinedText.vue'
	import TotalWinningsAndEntry from './TotalWinningsAndEntry.vue'
	import { mapGetters } from 'vuex'

	export default {
		name: 'GameCardFooter',
		props: [
			'contestTime',
			'contestDate',
			'isContestHeader',
			'isJoined',
			'isCreator',
			'contestId',
		],
		components: {
			TotalWinningsAndEntry,
			ContestTimeAndDate,
			DetailsButton,
			JoinButton,
			ControlRoomButton,
			JoinedText,
		},
		methods: {
			emitShowConfirmJoiningCard() {
				if (this.isAuthenticated) {
					this.$emit('showConfirmJoiningCard')
				} else {
					// eslint-disable-next-line no-console
					console.log(this.$route)

					this.$router.push({
						path: '/signin',
						query: {
							redirect: `${this.$route.fullPath}?confirmJoin=1`,
						},
					})
				}
			},
		},
		computed: {
			...mapGetters(['isAuthenticated']),
			showDetailsButton() {
				return !this.isContestHeader && !this.isJoined
			},
			showJoinButton() {
				return this.isContestHeader && !this.isCreator && !this.isJoined
			},
			contestLink() {
				return `/contest/${this.contestId}`
			},
			controlRoomLink() {
				return `/contest/${this.contestId}/control`
			},
			showControlRoomButton() {
				return this.isContestHeader && this.isCreator
			},
			showJoinedText() {
				return this.isContestHeader && this.isJoined
			},
		},
	}
</script>

<style>
	.game-card-footer {
		background: #fff;
		color: #000;
		padding: 8px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		padding-left: 18px;
		padding-right: 18px;
	}

	.game-card-footer h2,
	.game-card-footer h3,
	.game-card-footer h4 {
		font-weight: bold;
	}
	.game-card-footer h2 {
		font-size: 18px;
	}
	.game-card-footer h3 {
		font-size: 14px;
	}
	.game-card-footer h4 {
		font-size: 12px;
	}
	.game-card-left,
	.game-card-middle {
		margin-right: 48px;
	}

	@media screen and (max-width: 786px) {
		.game-card-footer {
			width: 100%;
			flex-wrap: wrap;
		}
		.game-card-footer:not(.is-contest-header) {
			margin-top: 24px;
		}
		.game-card-right:not(.is-contest-header) {
			display: none;
		}
		.game-card-right.is-contest-header {
			flex-basis: 100%;
			margin-top: 12px;
		}
		.game-card-footer h2 {
			font-size: 14px;
		}
		.game-card-footer h3 {
			font-size: 12px;
		}
		.game-card-left,
		.game-card-middle {
			margin-right: 0;
		}
		.game-card-footer {
			right: 12px;
			left: 12px;
			justify-content: space-between;
		}
	}

	@media screen and (max-width: 320px) {
		/* .game-card-right {
			display: none;
		} */
	}
</style>
