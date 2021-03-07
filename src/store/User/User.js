/* eslint-disable no-console */
import { auth, authProviders } from '@/config.js'

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
				auth.onAuthStateChanged(function(user) {
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
		checkForSignInErrors({ commit }) {
			return new Promise((resolve, reject) => {
				auth.getRedirectResult()
					.then((result) => {
						console.log(result)
						resolve(result)
					})
					.catch((error) => {
						commit('SET_SIGNIN_ERROR', error)
						reject(error)
					})
			})
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
	},
}
