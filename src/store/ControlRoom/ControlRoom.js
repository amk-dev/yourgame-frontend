import { getIdToken } from '../../services/FirebaseAuth.js'
import {
	closeCurrentQuestion,
	getNextQuestion,
	startContest,
} from '../../services/YourGameApi.js'

export default {
	state: {
		currentQuestion: null,
		isStartingContest: false,
		isStartingContestFeedback: null,
		currentView: 'start',
		remainingTime: 15,
		questionCount: 10,
		isRightAnswer: {
			a: true,
			b: true,
			c: true,
			d: true,
		},
		contestEnded: false,
		isGettingNextQuestion: false,
	},
	getters: {
		isStartingContest(state) {
			return state.isStartingContest
		},
		isStartingContestFeedback(state) {
			return state.isStartingContestFeedback
		},
		currentQuestion(state) {
			return state.currentQuestion
		},
		showQuizView(state) {
			return state.currentView == 'quiz'
		},
		showStartView(state) {
			return state.currentView == 'start'
		},
		remainingTime(state) {
			return state.remainingTime
		},
		currentIcon(state) {
			return `./img/fontawesome/solid.svg#${state.currentQuestion.name}`
		},
		isRightAnswer(state) {
			return state.isRightAnswer
		},
		contestEnded(state) {
			return state.contestEnded
		},
		isGettingNextQuestion(state) {
			return state.isGettingNextQuestion
		},
		isRemainingTimeZero(state) {
			return state.remainingTime == 0
		},
		isQuestionsOver(state) {
			if (state.currentQuestion) {
				return (
					state.currentQuestion.questionNumber == state.questionCount
				)
			}

			return false
		},
	},
	mutations: {
		SET_IS_STARTING_CONTEST(state, isStartingContest) {
			state.isStartingContest = isStartingContest
		},
		SET_CURRENT_QUESTION(state, currentQuestion) {
			state.currentQuestion = currentQuestion
		},
		SET_IS_STARTING_CONTEST_FEEDBACK(state, feedback) {
			state.isStartingContestFeedback = feedback
		},
		SET_CURRENT_VIEW(state, view) {
			state.currentView = view
		},
		SET_REMAINING_TIME(state, remainingTime) {
			state.remainingTime = remainingTime
		},
		SET_CORRECT_ANSWER(state, correctAnswer) {
			state.isRightAnswer = {
				a: correctAnswer == 'a',
				b: correctAnswer == 'b',
				c: correctAnswer == 'c',
				d: correctAnswer == 'd',
			}
		},
		RESET_CORRECT_ANSWER(state) {
			state.isRightAnswer = {
				a: true,
				b: true,
				c: true,
				d: true,
			}
		},
		RESET_REMAINING_TIME(state) {
			state.remainingTime = 15
		},
		SET_IS_GETTING_NEXT_QUESTION(state, isGettingNextQuestion) {
			state.isGettingNextQuestion = isGettingNextQuestion
		},
	},
	actions: {
		startContest({ commit, dispatch }, contestId) {
			commit('SET_IS_STARTING_CONTEST', true)

			return new Promise(async (resolve, reject) => {
				try {
					const idToken = await getIdToken()
					let result = await startContest(idToken, contestId)

					commit('SET_CURRENT_QUESTION', result.data.question)
					commit('SET_CURRENT_VIEW', 'quiz')

					dispatch('startQuestionTimer', contestId)
					dispatch('pollLeaderboard', contestId)

					resolve(result.data)
				} catch (error) {
					// eslint-disable-next-line
					console.log(error)
					commit('SET_IS_STARTING_CONTEST_FEEDBACK', {
						type: 'error',
						message: 'Something Went Wrong',
					})
					reject(error)
				} finally {
					commit('SET_IS_STARTING_CONTEST', false)
				}
			})
		},
		closeCurrentQuestion({ commit }, contestId) {
			return new Promise(async (resolve, reject) => {
				try {
					let idToken = await getIdToken()

					let result = await closeCurrentQuestion(idToken, contestId)

					let question = result.data

					commit('SET_CORRECT_ANSWER', result.data.correct_answer)

					resolve(question)
				} catch (e) {
					reject(e)
				}
			})
		},
		startQuestionTimer({ commit, dispatch, getters }, contestId) {
			let interval = setInterval(() => {
				let remainingTime = getters.remainingTime - 1
				commit('SET_REMAINING_TIME', remainingTime)

				if (remainingTime == 0) {
					clearInterval(interval)
					dispatch('closeCurrentQuestion', contestId)
				}
			}, 1000)
		},
		pollLeaderboard({ dispatch, getters }, contestId) {
			let interval = setInterval(() => {
				if (!getters.contestEnded) {
					dispatch('getContestLeaderboard', contestId)
				} else {
					clearInterval(interval)
				}
			}, 3000)
		},
		getNextQuestion({ commit, dispatch }, contestId) {
			return new Promise(async (resolve, reject) => {
				try {
					commit('SET_IS_GETTING_NEXT_QUESTION', true)

					const idToken = await getIdToken()
					const result = await getNextQuestion(idToken, contestId)

					commit('SET_CURRENT_QUESTION', result.data.question)
					commit('RESET_CORRECT_ANSWER')
					commit('RESET_REMAINING_TIME')
					dispatch('startQuestionTimer', contestId)

					resolve(result.data)
				} catch (error) {
					commit('IS_GETTING_NEXT_QUESTION_FEEDBACK', {
						type: 'error',
						message: 'Something Went Wrong',
					})

					reject(error)
				} finally {
					commit('SET_IS_GETTING_NEXT_QUESTION', false)
				}
			})
		},
	},
}
