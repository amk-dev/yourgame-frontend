<template>
	<div class="container">
		<div class="wrapper">
			<div class="columns is-gapless is-centered is-marginless">
				<div class="column is-10">
					<navbar></navbar>
				</div>
			</div>

			<div class="columns is-gapless is-centered is-marginless">
				<div class="column is-7">
					<div class="contest-wrapper mt-6 mb-4">
						<game-card
							v-if="contest"
							type="contest-header"
							:contest="contest"
						></game-card>
					</div>
				</div>
			</div>

			<div class="columns is-gapless is-centered is-marginless">
				<div class="column is-7">
					<success-message v-if="contest.isJoined"></success-message>
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
		</div>
	</div>
</template>

<script>
	/* eslint-disable no-console */
	import Navbar from './../components/Navigation/NavBar.vue'
	import GameCard from './../components/Generic/GameCard/GameCard.vue'
	import Winnings from '../components/Contests/Winnings.vue'
	import Leaderboard from '../components/Contests/LeaderBoard.vue'
	import SuccessMessage from '../components/Contests/SuccessMessage.vue'

	import store from '../store/index.js'

	export default {
		name: 'Contest',
		components: {
			Navbar,
			GameCard,
			Winnings,
			Leaderboard,
			SuccessMessage,
		},
		beforeRouteEnter(to, from, next) {
			getContestDetails(to, next)
		},
		beforeRouteUpdate(to, from, next) {
			getContestDetails(to, next)
		},
		props: ['contest', 'leaderboard'],
	}

	function getContestDetails(to, next) {
		let contestId = to.params.contestId

		let singleContest = store.dispatch('getSingleContest', contestId)
		let leaderboard = store.dispatch('getContestLeaderboard', contestId)

		Promise.all([singleContest, leaderboard]).then((results) => {
			// eslint-disable-next-line
			to.params.contest = results[0]
			to.params.leaderboard = results[1]
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
