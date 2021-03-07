import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
	apiKey: 'AIzaSyA243BsBB-V-d8dWktWjY4bYq7AfGGGVpY',
	authDomain: 'yourgame-32b72.firebaseapp.com',
	projectId: 'yourgame-32b72',
	storageBucket: 'yourgame-32b72.appspot.com',
	messagingSenderId: '294171086889',
	appId: '1:294171086889:web:8556220d8d958701eb4c38',
	measurementId: 'G-JTSWZ5H0BX',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export const authProviders = {
	GoogleAuthProvider: firebase.auth.GoogleAuthProvider,
}
