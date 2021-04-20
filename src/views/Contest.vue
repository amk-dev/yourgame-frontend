<template>
	<skelton :showFooter="false">
		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-10-fullhd is-10-widescreen">
				<div class="contest-wrapper mt-5 mb-4">
					<game-card
						v-if="contest"
						type="contest-header"
						:contest="contest"
					></game-card>
				</div>
			</div>
		</div>

		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-10-fullhd is-10-widescreen">
				<success-message
					v-if="contest.isJoined && contest.status == 'upcoming'"
					type="success"
				>
					You have successfully joined the contest. Come back at
					<strong>{{ contestTime }}</strong> on
					<strong>{{ contestDate }}</strong> to play. This page will
					refresh when the contest begins
				</success-message>

				<success-message
					v-if="contest.status == 'live' && !contest.isJoined"
					type="info"
					buttonTitle="Watch"
					:buttonLink="`https://youtu.be/${contest.youtubeVideoId}`"
				>
					The Contest Is Live Now. You haven't joined the contest. but
					you can watch the live show on Youtube
				</success-message>
			</div>
		</div>

		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-10-fullhd is-10-widescreen">
				<div class="contest-page-body">
					<div class="columns is-gapless is-marginless">
						<div class="column is-4">
							<div class="winnings">
								<winnings></winnings>
							</div>
						</div>
						<div
							class="column is-8 is-flex is-flex-direction-column"
						>
							<leaderboard
								class="ml-5 leaderboard fullheight-leaderboard is-flex-grow-1"
								:leaderboard="leaderboard"
							></leaderboard>
						</div>
					</div>
				</div>
			</div>
		</div>
	</skelton>
</template>

<script>
	import GameCard from './../components/Generic/GameCard/GameCard.vue'
	import Winnings from '../components/Contests/Winnings.vue'
	import Leaderboard from '../components/Contests/LeaderBoard.vue'
	import SuccessMessage from '../components/Contests/SuccessMessage.vue'

	import Skelton from '../components/Skelton.vue'

	export default {
		name: 'Contest',
		components: {
			GameCard,
			Winnings,
			Leaderboard,
			SuccessMessage,
			Skelton,
		},
		props: ['contest', 'leaderboard'],
		computed: {
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
	}
</script>
,

<style>
	.wrapper {
		justify-content: flex-start;
	}
	.dashboard {
		margin-top: 48px;
	}
	@media screen and (max-width: 786px) {
		.contest-wrapper.mt-6 {
			margin-top: 0 !important;
		}
		.leaderboard.ml-5 {
			margin-left: 0 !important;
			margin-top: 12px;
			margin-bottom: 12px;
		}
	}
</style>
