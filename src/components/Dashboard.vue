<template>
	<div>
		<h1>Dashboard</h1>
		<h2>{{ userEmail }}</h2>
		<button @click="signout">Signout</button>
		<br />
		<br />
		<div>
			<h1>Create Contest</h1>
			<input
				type="text"
				v-model="contest.name"
				placeholder="Contest Name"
			/>
			<input
				type="text"
				v-model="contest.broadcastId"
				placeholder="Youtube Live ID"
			/>
			<button @click="createContestWithNameAndBroadCastId">
				Create Contest
			</button>

			<h2>My Contests</h2>
			<ul v-if="myContests.length > 0">
				<li v-for="contest in myContests" :key="contest._id">
					{{ contest._id }}
					<button
						@click="
							() => {
								startContestWithId(contest._id)
							}
						"
					>
						Start
					</button>
					<button
						@click="
							() => {
								getNextQuestionHelper(contest._id)
							}
						"
					>
						Next Question
					</button>
					<button
						@click="
							() => {
								updateLeaderboardHelper(contest._id)
							}
						"
					>
						Update Leaderboard
					</button>
				</li>
			</ul>
			<h2>All Contests</h2>
			<ul v-if="allContests.length > 0">
				<li v-for="contest in allContests" :key="contest._id">
					{{ contest._id }}
					<button
						@click="
							() => {
								joinContestWithId(contest._id)
							}
						"
					>
						Join
					</button>
				</li>
			</ul>
			<h2>Joined Contests</h2>
			<ul v-if="joinedContests.length > 0">
				<li v-for="contest in joinedContests" :key="contest._id">
					{{ contest.contestId }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	/* eslint-disable no-console */
	import {
		createContest,
		getAllContests,
		getJoinedContests,
		getMyContests,
		joinContest,
		startContest,
		updateLeaderboard,
		getNextQuestion,
	} from '../services/YourGameApi'
	import { getIdToken } from '../services/FirebaseAuth'
	import { mapActions } from 'vuex'

	export default {
		name: 'Dashboard',
		data: () => {
			return {
				contest: {
					name: 'Test Contest #1',
					broadcastId: 'owiD6Ze3vPg',
				},
				myContests: [],
				allContests: [],
				joinedContests: [],
			}
		},
		computed: {
			userEmail() {
				return this.$store.getters.email
			},
		},
		methods: {
			...mapActions(['signout']),
			async createContestWithNameAndBroadCastId() {
				const idToken = await getIdToken()
				const result = await createContest(
					idToken,
					this.contest.name,
					this.contest.broadcastId
				)
				console.log(result)
			},
			async joinContestWithId(contestId) {
				const idToken = await getIdToken()
				const result = await joinContest(idToken, contestId)
			},
			async startContestWithId(contestId) {
				const idToken = await getIdToken()
				const result = await startContest(idToken, contestId)

				console.log(result)
			},
			async updateLeaderboardHelper(contestId) {
				const idToken = await getIdToken()
				const result = await updateLeaderboard(idToken, contestId)

				console.log(result)
			},
			async getNextQuestionHelper(contestId) {
				const idToken = await getIdToken()
				const result = await getNextQuestion(idToken, contestId)
				console.log(result)
			},
		},
		async mounted() {
			const idToken = await getIdToken()
			this.myContests = await getMyContests(idToken)
			this.allContests = await getAllContests(idToken)
			this.joinedContests = await getJoinedContests(idToken)
		},
	}
</script>
