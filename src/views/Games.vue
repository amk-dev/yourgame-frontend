<template>
	<skelton :showFooter="false">
		<div class="columns is-gapless is-centered is-marginless">
			<div class="column is-5">
				<div class="all-games">
					<div class="all-games-section">
						<referral-header
							v-if="isAllGames"
							context="all-games"
							class="mb-5"
						></referral-header>

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

						<new-contest v-if="showNewContestForm"></new-contest>
					</div>
				</div>
			</div>
		</div>
	</skelton>
</template>

<script>
	import ContestList from '../components/Contests/ContestList.vue'
	import ContestEmptyState from '../components/Contests/ContestEmptyState.vue'
	import NewContest from './NewContest.vue'
	import ReferralHeader from '../components/ReferralHeader.vue'
	import Skelton from '../components/Skelton.vue'

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
			Skelton,
			ContestList,
			ContestEmptyState,
			NewContest,
			ReferralHeader,
		},
		computed: {
			isAllGames() {
				return this.context == 'all-games'
			},
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
</style>
