<template>
	<skelton :showFooter="false">
		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-7">
				<div class="contest-wrapper mt-5 mb-4">
					<game-card
						v-if="activeContest"
						type="contest-header"
						:contest="activeContest"
					></game-card>
				</div>
			</div>
		</div>

		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-7">
				<success-message
					v-if="
						activeContest.isJoined &&
						activeContest.status == 'upcoming'
					"
					type="success"
					button-title="Go To Playground"
					:button-link="`/contest/${$route.params.contestId}/play`"
				>
					You have successfully joined the contest. Visit Contest
					Playground At
					<strong>{{ contestTime }}</strong> on
					<strong>{{ contestDate }}</strong> to play.
				</success-message>

				<success-message
					v-if="
						activeContest.isJoined && activeContest.status == 'live'
					"
					type="success"
					button-title="Go To Playground"
					:button-link="`/contest/${$route.params.contestId}/play`"
				>
					The Contest Is Live. Go to the Playground to play.
				</success-message>

				<success-message
					v-if="
						activeContest.status == 'live' &&
						!activeContest.isJoined
					"
					type="info"
					buttonTitle="Watch"
					:buttonLink="`https://youtu.be/${activeContest.youtubeVideoId}`"
				>
					The Contest Is Live Now. You haven't joined the contest. but
					you can watch the live show on Youtube
				</success-message>
			</div>
		</div>

		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-7">
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

	import store from '../store/index.js'
	import { mapGetters } from 'vuex'
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
		beforeRouteEnter(to, from, next) {
			getContestDetails(to, next)
		},
		beforeRouteUpdate(to, from, next) {
			getContestDetails(to, next)
		},
		computed: {
			...mapGetters(['activeContest', 'leaderboard']),
			contestTime() {
				let date = new Date(this.activeContest.startTime)
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
				let date = new Date(this.activeContest.startTime)

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

	function getContestDetails(to, next) {
		let contestId = to.params.contestId

		let singleContest = store.dispatch('getSingleContest', contestId)
		let leaderboard = store.dispatch('getContestLeaderboard', contestId)

		Promise.all([singleContest, leaderboard]).then(() => {
			next()
		})
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
