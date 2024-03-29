import {
	createContest,
	getAllContests,
	getJoinedContests,
	getCreatedContests,
	getContestById,
	joinContest,
	getLeaderboard,
	streamContestStatus,
} from '../../services/YourGameApi.js'
import { getIdToken } from '../../services/FirebaseAuth.js'
import { captureException } from '@sentry/browser'

import router from '../../router.js'

const state = {
	// loading booleans
	isCreatingContest: false,
	isGettingContest: false,
	isJoiningContest: false,
	isPopulatingAllContests: false,
	isPopulatingCreatedContests: false,
	isGettingLeaderboard: false,
	// feedbacks
	createNewContestFeedback: null,
	activeContestFeedback: null,
	joiningContestFeedback: null,
	gettingLeaderboardFeedback: null,
	// other
	createContestError: null,
	allContests: null,
	joinedContests: null,
	createdContests: null,
	myContests: null,
	activeContest: null,
	activeContestError: false,
	leaderboard: [],
	contestStatusEventSource: null,
}
export const getters = {
	// getters for loading booleans
	isCreatingContest(state) {
		return state.isCreatingContest
	},
	isPopulatingCreatedContests(state) {
		return state.isPopulatingCreatedContests
	},
	isJoiningContest(state) {
		return state.isJoiningContest
	},
	// getters for feedbacks
	createNewContestFeedback(state) {
		return state.createNewContestFeedback
	},
	activeContestFeedback(state) {
		return state.activeContestFeedback
	},
	joiningContestFeedback(state) {
		return state.joiningContestFeedback
	},
	// getters for state items
	allContests(state) {
		return state.allContests
	},
	createdContests(state) {
		return state.createdContests
	},
	activeContest(state) {
		return state.activeContest
	},
	leaderboard(state) {
		return state.leaderboard
	},
	contestYoutubeLiveUrl(state) {
		if (state.activeContest) {
			return `https://www.youtube.com/embed/${state.activeContest.youtubeVideoId}?autoplay=0&modestbranding=1&controls=0&rel=0`
		}
		return false
	},
	contestStatusEventSource(state) {
		return state.contestStatusEventSource
	},
}
export const mutations = {
	// set loading booleans
	SET_IS_CREATING_CONTEST(state, isCreatingContest) {
		state.isCreatingContest = isCreatingContest
	},
	SET_IS_JOINING_CONTEST(state, isJoiningContest) {
		state.isJoiningContest = isJoiningContest
	},
	SET_IS_POPULATING_ALL_CONTESTS(state, isPopulatingAllContests) {
		state.isPopulatingAllContests = isPopulatingAllContests
	},
	SET_IS_POPULATING_JOINED_CONTESTS(state, isPopulatingJoinedContests) {
		state.isPopulatingJoinedContests = isPopulatingJoinedContests
	},
	SET_IS_POPULATING_CREATED_CONTESTS(state, isPopulatingCreatedContests) {
		state.isPopulatingCreatedContests = isPopulatingCreatedContests
	},
	SET_IS_GETTING_LEADERBOARD(state, isGettingLeaderboard) {
		state.isGettingLeaderboard = isGettingLeaderboard
	},
	// set feedbacks
	SET_CREATE_NEW_CONTEST_FEEDBACK(state, feedback) {
		state.createNewContestFeedback = feedback
	},
	SET_ACTIVE_CONTEST_FEEDBACK(state, feedback) {
		state.activeContestFeedback = feedback
	},
	SET_JOINING_CONTEST_FEEDBACK(state, feedback) {
		state.joiningContestFeedback = feedback
	},
	SET_GETTING_LEADERBOARD_FEEDBACK(state, feedback) {
		state.isGettingLeaderboard = feedback
	},
	SET_ALL_CONTESTS(state, allContests) {
		state.allContests = allContests
	},
	SET_JOINED_CONTESTS(state, joinedContests) {
		state.joinedContest = joinedContests
	},
	SET_CREATED_CONTESTS(state, createdContests) {
		state.createdContests = createdContests
	},
	SET_ACTIVE_CONTEST(state, contest) {
		state.activeContest = contest
	},
	SET_LEADERBOARD(state, leaderboard) {
		state.leaderboard = leaderboard
	},
	SET_ACTIVE_CONTEST_ERROR(state, isError) {
		state.activeContestError = isError
	},
	SET_IS_JOINED(state) {
		state.activeContest = {
			...state.activeContest,
			isJoined: true,
		}
	},
	SET_CONTEST_STATUS_EVENT_SOURCE(state, contestStatusEventSource) {
		state.contestStatusEventSource = contestStatusEventSource
	},
}
export const actions = {
	async createNewContest(
		{ commit },
		{ youtubeVideoId, contestDateAndTimeTimestamp }
	) {
		commit('SET_IS_CREATING_CONTEST', true)
		commit('SET_CREATE_NEW_CONTEST_FEEDBACK', {
			type: 'info',
			message: 'Creating New Contest',
		})

		try {
			let idToken = await getIdToken()

			let result = await createContest(
				idToken,
				youtubeVideoId,
				contestDateAndTimeTimestamp
			)

			commit('SET_CREATE_NEW_CONTEST_FEEDBACK', {
				type: 'success',
				message: 'Contest Created Successfully',
			})

			commit('SET_IS_CREATING_CONTEST', false)

			return result.data
		} catch (error) {
			commit('SET_CREATE_NEW_CONTEST_FEEDBACK', {
				type: 'error',
				message: 'Something Went Wrong',
			})

			commit('SET_IS_CREATING_CONTEST', false)

			captureException(error)
		}
	},
	resetContestFeedback({ commit }) {
		commit('SET_CREATE_NEW_CONTEST_FEEDBACK', null)
	},
	async populateAllContests({ commit }) {
		commit('SET_IS_POPULATING_ALL_CONTESTS', true)
		try {
			let result = await getAllContests()

			commit('SET_ALL_CONTESTS', result.data)
			commit('SET_IS_POPULATING_ALL_CONTESTS', false)
			return result.data
		} catch (error) {
			commit('SET_IS_POPULATING_ALL_CONTESTS', false)
			captureException(error)
			throw error
		}
	},
	async populateJoinedContests({ commit }) {
		commit('SET_IS_POPULATING_JOINED_CONTESTS', true)
		try {
			let idToken = await getIdToken()
			let result = await getJoinedContests(idToken)

			commit('SET_JOINED_CONTESTS', result.data)
			commit('SET_IS_POPULATING_JOINED_CONTESTS', false)

			return result.data
		} catch (error) {
			commit('SET_IS_POPULATING_JOINED_CONTESTS', false)
			captureException(error)
			throw error
		}
	},
	async populateCreatedContests({ commit }) {
		commit('SET_IS_POPULATING_CREATED_CONTESTS', true)
		try {
			let idToken = await getIdToken()
			let result = await getCreatedContests(idToken)

			commit('SET_CREATED_CONTESTS', result.data)
			commit('SET_IS_POPULATING_CREATED_CONTESTS', false)

			return result.data
		} catch (error) {
			commit('SET_IS_POPULATING_CREATED_CONTESTS', false)
			captureException(error)
			throw error
		}
	},
	async getSingleContest({ commit, getters }, contestId) {
		try {
			let idToken = null

			if (getters.isAuthenticated) {
				idToken = await getIdToken()
			}

			let result = await getContestById(contestId, idToken)

			commit('SET_ACTIVE_CONTEST', result.data)

			return result.data
		} catch (error) {
			commit('SET_ACTIVE_CONTEST_ERROR', true)
			captureException(error)
		}
	},
	async joinContestWithId({ commit }, contestId) {
		commit('SET_IS_JOINING_CONTEST', true)

		try {
			let idToken = await getIdToken()

			const result = await joinContest(idToken, contestId)

			commit('SET_JOINING_CONTEST_FEEDBACK', {
				type: 'success',
				message: 'Joined Contest Successfully',
			})
			commit('SET_IS_JOINED')

			commit('SET_IS_JOINING_CONTEST', false)

			return result.data
		} catch (error) {
			let errorFeedback = {
				type: 'error',
				message: 'Something Went Wrong. Please Try Again',
			}

			if (error.response) {
				if (error.response.data.message == 'not-enough-balance') {
					errorFeedback = {
						type: 'error',
						code: 'not-enough-balance',
						message:
							'You do not have enough balance to join. Refer your friends to play for free',
					}
				}
			}

			commit('SET_JOINING_CONTEST_FEEDBACK', errorFeedback)

			commit('SET_IS_JOINING_CONTEST', false)

			captureException(error)
		}
	},
	clearJoinContestFeedback({ commit }) {
		commit('SET_JOINING_CONTEST_FEEDBACK', null)
	},
	async getContestLeaderboard({ commit }, contestId) {
		commit('SET_IS_GETTING_LEADERBOARD', true)

		try {
			let result = await getLeaderboard(contestId)

			commit('SET_LEADERBOARD', result.data)

			commit('SET_GETTING_LEADERBOARD_FEEDBACK', {
				type: 'success',
				message: 'Leaderboard Fetched Succesfully',
			})

			commit('SET_IS_GETTING_LEADERBOARD', false)

			return result.data
		} catch (error) {
			commit('SET_IS_GETTING_LEADERBOARD', false)

			commit('SET_GETTING_LEADERBOARD_FEEDBACK', {
				type: 'error',
				message: 'Something Went Wrong',
			})

			captureException(error)
		}
	},
	watchContestStatus({ commit, getters }, contestId) {
		try {
			if (!getters.contestStatusEventSource) {
				let contestStatusEventSource = streamContestStatus(contestId)

				contestStatusEventSource.onmessage = function ({ data }) {
					data = JSON.parse(data)

					if (data.status == 'video-live') {
						router.push({
							name: 'Play',
							params: {
								contestId: contestId,
							},
						})
					} else if (data.status == 'ended') {
						router.push({
							name: 'Contest',
							params: {
								contestId: contestId,
							},
						})
					}
				}

				commit(
					'SET_CONTEST_STATUS_EVENT_SOURCE',
					contestStatusEventSource
				)
			}
		} catch (error) {
			captureException(error)
		}
	},
	async closeContestStream({ commit }) {
		this.contestStatusEventSource.close()
		commit('SET_CONTEST_STATUS_EVENT_SOURCE', null)
	},
}

export default {
	state,
	getters,
	mutations,
	actions,
}
