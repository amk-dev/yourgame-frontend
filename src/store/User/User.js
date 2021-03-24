/* eslint-disable no-console */
import { auth, authProviders } from '@/config.js'

import { addRefferal, isCreator } from '../../services/YourGameApi.js'
import { getIdToken } from '../../services/FirebaseAuth.js'

export default {
	state: {
		user: null,
		isSigningIn: false,
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
	},
	actions: {
		auth({ commit }) {
			return new Promise((resolve) => {
				auth.onAuthStateChanged(function (user) {
					console.log('auth state changed')
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
			return new Promise((resolve, reject) => {
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

						reject(error)
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
			} catch (e) {
				console.log(e)
				return false
			}
		},
		async addRefferal(context, refferedBy) {
			try {
				let idToken = await getIdToken()
				let result = await addRefferal(idToken, refferedBy)

				return result.data.success
			} catch (error) {
				throw error
			}
		},
	},
}
