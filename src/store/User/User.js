import { auth, authProviders } from '@/config.js'

import {
	addRefferal,
	getReferrals,
	isCreator,
} from '../../services/YourGameApi.js'
import { getIdToken } from '../../services/FirebaseAuth.js'
import { captureException } from '@sentry/browser'

export default {
	state: {
		user: null,
		referrals: null,
		isSigningIn: false,
		isGettingReferrals: false,
		signInError: null,
	},

	getters: {
		isAuthenticated(state) {
			return !!state.user
		},
		displayName(state) {
			return state.user.displayName
		},
		email(state) {
			return state.user.email
		},
		profilePictureURL(state) {
			return state.user.photoURL
		},
		isSigningIn(state) {
			return state.isSigningIn
		},
		signInError(state) {
			return state.signInError
		},
		referralUrl(state) {
			return `http://localhost:8080?refid=${state.user.uid}`
		},
		referrals(state) {
			return state.referrals
		},
	},

	mutations: {
		SET_USER(state, user) {
			state.user = user
		},
		SET_IS_SIGNING_IN(state, isSigningIn) {
			state.isSigningIn = isSigningIn
		},
		SET_SIGNIN_ERROR(state, error) {
			state.signInError = error
		},
		IS_GETTING_REFERRALS(state, isGettingReferrals) {
			state.isGettingReferrals = isGettingReferrals
		},
		SET_REFERRALS(state, referrals) {
			state.referrals = referrals
		},
	},
	actions: {
		auth({ commit }) {
			return new Promise((resolve) => {
				auth.onAuthStateChanged(function (user) {
					commit('SET_USER', user)

					resolve()
				})
			})
		},
		signinWithGoogle({ commit }) {
			commit('SET_IS_SIGNING_IN', true)

			let provider = new authProviders.GoogleAuthProvider()

			auth.signInWithRedirect(provider)
		},
		checkForSignInErrors({ commit, dispatch }) {
			return new Promise((resolve) => {
				auth.getRedirectResult()
					.then((result) => {
						if (
							result.user &&
							result.additionalUserInfo.isNewUser
						) {
							const refferedBy = localStorage.getItem(
								'refferedBy'
							)

							localStorage.removeItem('refferedBy')

							if (refferedBy) {
								dispatch('addRefferal', refferedBy)
							} else {
								dispatch('addRefferal', null)
							}
						}

						resolve(result)
					})
					.catch((error) => {
						if (error.code == 'auth/web-storage-unsupported') {
							commit('SET_SIGNIN_ERROR', {
								message:
									'Current Browser Is Not Supported. Please Make Sure Cookies Are Enabled',
								type: 'error',
							})
						} else {
							commit('SET_SIGNIN_ERROR', {
								message: 'Signin Failed. Something Went Wrong',
								type: 'error',
							})
						}

						captureException(error)
					})
			})
		},
		async isCreator() {
			let idToken = await getIdToken()
			let result = await isCreator(idToken)
			return result.data.isCreator
		},
		async signout() {
			try {
				await auth.signOut()
				return true
			} catch (error) {
				captureException(error)
				return false
			}
		},
		async addRefferal(context, refferedBy) {
			try {
				let idToken = await getIdToken()
				let result = await addRefferal(idToken, refferedBy)

				return result.data.success
			} catch (error) {
				captureException(error)
			}
		},
		async getReferrals({ commit }) {
			try {
				commit('IS_GETTING_REFERRALS', true)

				const idToken = await getIdToken()
				const result = await getReferrals(idToken)

				const referrals = result.data

				commit('SET_REFERRALS', referrals)
				commit('IS_GETTING_REFERRALS', false)

				return referrals
			} catch (error) {
				captureException(error)
				commit('IS_GETTING_REFERRALS', false)
				throw error
			}
		},
	},
}
