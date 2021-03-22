<template>
	<div>
		<button @click="startSignin">Sign In With Google</button>
	</div>
</template>

<script>
	import { auth, authProviders } from './../config.js'
	import { sendAuthCode } from './../services/YourGameApi.js'

	/* eslint-disable */
	export default {
		name: 'GoogleSignIn',
		data: () => {
			return {
				isSignedIn: null,
				authcode: null,
			}
		},
		methods: {
			start: function () {
				gapi.load('auth2', () => {
					gapi.auth2.init({
						client_id:
							'294171086889-kjtfe3t75ss8mukd2k682ronqjd6a0eg.apps.googleusercontent.com',
						scope:
							'https://www.googleapis.com/auth/youtube.readonly',
						cookiepolicy: 'single_host_origin',
						redirect_uri: 'http://localhost/',
					})

					gapi.auth2
						.getAuthInstance()
						.isSignedIn.listen(this.signInChanged)
					// this.auth2.currentUser.listen(this.userChanged)
				})
			},
			isUserEqual(googleUser, firebaseUser) {
				if (firebaseUser) {
					let providerData = firebaseUser.providerData

					for (let i = 0; i < providerData.length; i++) {
						if (
							providerData[i].providerId ===
								authProviders.GoogleAuthProvider.PROVIDER_ID &&
							providerData[i].uid ===
								googleUser.getBasicProfile().getId()
						) {
							// We don't need to reauth the Firebase connection.
							return true
						}
					}
				}
				return false
			},
			signInChanged(isSignedIn) {
				if (isSignedIn) {
					if (this.authcode) {
						this.linkToFirebaseAndSignIn(
							gapi.auth2.getAuthInstance().currentUser.get()
						)
					}
				}
			},
			startSignin: function () {
				// no checks for if the user is signed in
				gapi.auth2
					.getAuthInstance()
					.grantOfflineAccess()
					.then(this.authCodeReceived)
			},
			authCodeReceived: function (res) {
				this.authcode = res.code
			},
			linkToFirebaseAndSignIn(user) {
				let unsubscribe = auth.onAuthStateChanged(
					async (firebaseUser) => {
						unsubscribe()
						if (!this.isUserEqual(user, firebaseUser)) {
							let credential = authProviders.GoogleAuthProvider.credential(
								user.getAuthResponse().id_token
							)
							auth.signInWithCredential(credential)
								.catch((error) => console.log(error))
								.then(async (data) => {
									await gapi.auth2.getAuthInstance().signOut()
									console.log('Google User Logged Out')

									let firebaseIdToken = await auth.currentUser.getIdToken()
									let result = await sendAuthCode(
										firebaseIdToken,
										this.authcode
									)

									this.authcode = null
								})
						} else {
							let firebaseIdToken = await auth.currentUser.getIdToken()
							let result = await sendAuthCode(
								firebaseIdToken,
								this.authcode
							)
						}
					}
				)
			},
		},
		mounted: async function () {
			if (document.getElementById('googleSignInScript') == null) {
				let script = document.createElement('script')
				script.setAttribute('id', 'googleSignInScript')
				script.onload = this.start

				script.src = 'https://apis.google.com/js/platform.js'

				document.head.appendChild(script)
			}
		},
	}
</script>
