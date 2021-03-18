<template>
	<div class="container">
		<div class="wrapper">
			<div class="columns is-gapless is-centered is-marginless">
				<div class="column is-10">
					<navbar></navbar>
				</div>
			</div>

			<div class="columns is-gapless is-centered is-marginless">
				<div class="column is-5">
					<div class="all-games">
						<div class="all-games-section">
							<contest-list
								v-if="haveContests"
								:contests="contests"
								:title="contestsTitle"
								:clickable="true"
								:type="this.creator ? 'creator' : 'user'"
							></contest-list>

							<contest-empty-state
								v-if="showAllGamesEmptyState"
								contest-feedback="No Contests Scheduled Right Now."
							></contest-empty-state>

							<contest-empty-state
								v-if="showJoinedGamesEmptyState"
								contest-feedback="You Have Not Joined Any Contests Yet."
								cta-destination="/games/all"
								cta-text="See Upcoming Games"
							></contest-empty-state>

							<contest-empty-state
								v-if="showCreatedGamesEmptyState"
								contest-feedback="No Games Created Yet. Create One Right Now"
								cta-destination="/games/new"
								cta-text="Create New Game"
							></contest-empty-state>

							<new-contest
								v-if="showNewContestForm"
							></new-contest>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Navbar from '../components/Navigation/NavBar.vue'
	import ContestList from '../components/Contests/ContestList.vue'
	import ContestEmptyState from '../components/Contests/ContestEmptyState.vue'
	import NewContest from './NewContest.vue'

	export default {
		name: 'Games',
		props: [
			'contests',
			'contestsTitle',
			'creator',
			'context',
			'showNewContestForm',
		],
		components: {
			Navbar,
			ContestList,
			ContestEmptyState,
			NewContest,
		},
		computed: {
			haveContests() {
				return this.contests ? !!this.contests.length : false
			},
			showAllGamesEmptyState() {
				return this.contests.length == 0 && this.context == 'all-games'
			},
			showJoinedGamesEmptyState() {
				return (
					this.contests.length == 0 && this.context == 'joined-games'
				)
			},
			showCreatedGamesEmptyState() {
				return (
					this.contests.length == 0 && this.context == 'created-games'
				)
			},
			pastGames() {
				return this.contests.filter(
					(contest) => contest.status == 'ended'
				)
			},
			liveGames() {
				return this.contests.filter(
					(contest) => contest.status == 'live'
				)
			},
			upcomingGames() {
				return this.contests.filter(
					(contest) => contest.status == 'upcoming'
				)
			},
		},
	}
</script>

<style>
	.wrapper {
		justify-content: flex-start;
		padding: 0px 24px;
	}
	.all-games {
		margin-top: 48px;
	}
	@media screen and (max-width: 768px) {
		.all-games {
			margin-top: 0 !important;
		}
	}
</style>
