import {
	createContest,
	getAllContests,
	getJoinedContests,
	getCreatedContests,
	getContestById,
	joinContest,
	getLeaderboard,
} from '../../services/YourGameApi.js'
import { getIdToken } from '../../services/FirebaseAuth.js'

export default {
	state: {
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
	},
	getters: {
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
	},
	mutations: {
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
	},
	actions: {
		createNewContest(
			{ commit },
			{ youtubeVideoId, contestDateAndTimeTimestamp }
		) {
			return new Promise(async (resolve, reject) => {
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

					resolve(result.data)

					commit('SET_CREATE_NEW_CONTEST_FEEDBACK', {
						type: 'success',
						message: 'Contest Created Successfully',
					})
				} catch (error) {
					if (error.response) {
						reject(error.response)

						commit('SET_CREATE_NEW_CONTEST_FEEDBACK', {
							type: 'error',
							message: 'Error From The Server',
						})
					} else {
						reject({
							error: true,
							message: 'something-went-wrong',
						})

						commit('SET_CREATE_NEW_CONTEST_FEEDBACK', {
							type: 'error',
							message: 'Something Went Wrong',
						})
					}
				} finally {
					commit('SET_IS_CREATING_CONTEST', false)
				}
			})
		},
		resetContestFeedback({ commit }) {
			commit('SET_CREATE_NEW_CONTEST_FEEDBACK', null)
		},
		populateAllContests({ commit }) {
			return new Promise(async (resolve, reject) => {
				commit('SET_IS_POPULATING_ALL_CONTESTS', true)
				try {
					let result = await getAllContests()
					resolve(result.data)
					commit('SET_ALL_CONTESTS', result.data)
				} catch (error) {
					reject({
						error: true,
						message: 'something-went-wrong',
					})
				} finally {
					commit('SET_IS_POPULATING_ALL_CONTESTS', false)
				}
			})
		},
		populateJoinedContests({ commit }) {
			return new Promise(async (resolve, reject) => {
				commit('SET_IS_POPULATING_JOINED_CONTESTS', true)
				try {
					let idToken = await getIdToken()
					let result = await getJoinedContests(idToken)
					resolve(result.data)
					commit('SET_JOINED_CONTESTS', result.data)
				} catch (error) {
					reject({
						error: true,
						message: 'something-went-wrong',
					})
				} finally {
					commit('SET_IS_POPULATING_JOINED_CONTESTS', false)
				}
			})
		},
		populateCreatedContests({ commit }) {
			return new Promise(async (resolve, reject) => {
				commit('SET_IS_POPULATING_CREATED_CONTESTS', true)
				try {
					let idToken = await getIdToken()
					let result = await getCreatedContests(idToken)
					resolve(result.data)
					commit('SET_CREATED_CONTESTS', result.data)
				} catch (error) {
					reject({
						error: true,
						message: 'something-went-wrong',
					})
				} finally {
					commit('SET_IS_POPULATING_CREATED_CONTESTS', false)
				}
			})
		},
		getSingleContest({ commit, getters }, contestId) {
			return new Promise(async (resolve, reject) => {
				try {
					let idToken = null

					if (getters.isAuthenticated) {
						idToken = await getIdToken()
					}

					let result = await getContestById(contestId, idToken)
					resolve(result.data)
					commit('SET_ACTIVE_CONTEST', result.data)
				} catch (error) {
					// eslint-disable-next-line no-console
					console.log(error)

					reject({
						error: true,
						message: 'something-went-wrong',
					})
					commit('SET_ACTIVE_CONTEST_ERROR', true)
				}
			})
		},
		joinContestWithId({ commit }, contestId) {
			return new Promise(async (resolve, reject) => {
				commit('SET_IS_JOINING_CONTEST', true)

				try {
					let idToken = await getIdToken()

					const result = await joinContest(idToken, contestId)
					resolve(result.data)
					commit('SET_JOINING_CONTEST_FEEDBACK', {
						type: 'success',
						message: 'Joined Contest Successfully',
					})
					commit('SET_IS_JOINED')
				} catch (error) {
					reject(error)
					commit('SET_JOINING_CONTEST_FEEDBACK', {
						type: 'error',
						message: 'Something Went Wrong. Please Try Again',
					})
				} finally {
					commit('SET_IS_JOINING_CONTEST', false)
				}
			})
		},
		clearJoinContestFeedback({ commit }) {
			commit('SET_JOINING_CONTEST_FEEDBACK', null)
		},
		getContestLeaderboard({ commit }, contestId) {
			commit('SET_IS_GETTING_LEADERBOARD', true)

			return new Promise(async (resolve, reject) => {
				try {
					let result = await getLeaderboard(contestId)
					resolve(result.data)

					commit('SET_LEADERBOARD', result.data)

					commit('SET_GETTING_LEADERBOARD_FEEDBACK', {
						type: 'success',
						message: 'Leaderboard Fetched Succesfully',
					})
				} catch (e) {
					reject(e)
					commit('SET_GETTING_LEADERBOARD_FEEDBACK', {
						type: 'error',
						message: 'Something Went Wrong',
					})
				} finally {
					commit('SET_IS_GETTING_LEADERBOARD', false)
				}
			})
		},
	},
}
