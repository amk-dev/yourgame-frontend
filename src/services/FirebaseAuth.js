import { auth, authProviders } from '@/config.js'

export function signInWithEmailAndPassword(email, password) {
	return auth.signInWithEmailAndPassword(email, password)
}

export function createUserWithEmailAndPassword(email, password) {
	return auth.createUserWithEmailAndPassword(email, password)
}

export function updateProfile(updates) {
	return auth.currentUser.updateProfile(updates)
}

export function signInWithGoogle(youtube = false) {
	let provider = new authProviders.GoogleAuthProvider()
	if (youtube) {
		provider.addScope('https://www.googleapis.com/auth/youtube.readonly')
		provider.setCustomParameters({
			access_type: 'offline',
		})
	}
	return auth.signInWithPopup(provider)
}

export function getIdToken() {
	return auth.currentUser.getIdToken(false)
}

export function signout() {
	return auth.signOut()
}
