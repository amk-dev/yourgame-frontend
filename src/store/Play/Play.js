import { captureException } from '@sentry/browser'
import { getIdToken } from '../../services/FirebaseAuth.js'
import { answerQuestion } from '../../services/YourGameApi'

export default {
	state: {
		isAnsweringQuestion: false,
	},
	getters: {
		isAnsweringQuestion(state) {
			return state.isAnsweringQuestion
		},
	},
	mutations: {
		IS_ANSWERING_QUESTION(state, isAnsweringQuestion) {
			state.isAnsweringQuestion = isAnsweringQuestion
		},
	},
	actions: {
		async answerQuestion({ commit, dispatch }, { answer, contestId }) {
			commit('IS_ANSWERING_QUESTION', true)
			try {
				const idToken = await getIdToken()
				const result = await answerQuestion(idToken, contestId, answer)
				dispatch('addNotification', {
					type: 'info',
					message: 'Answer Submitted',
				})

				commit('IS_ANSWERING_QUESTION', false)

				return result.data
			} catch (error) {
				if (error.response) {
					let errorMessages = {
						'contest-not-started':
							'Contest Not Yet Started. Wait For The Contest To Start',
						'answering-not-open':
							'Answering Not Open. Please Wait For The Next Question',
						'question-already-answered':
							'You have already answered the current question. Wait for the next question',
					}

					let message = error.response.data.message

					if (errorMessages[message]) {
						dispatch('addNotification', {
							type: 'danger',
							message: errorMessages[message],
						})
					} else {
						dispatch('addNotification', {
							type: 'danger',
							message: 'Something Went Wrong.',
						})
					}
				}

				captureException(error)
			}
		},
	},
}
