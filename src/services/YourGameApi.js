import axios from 'axios'

let baseURL = 'http://localhost:3000/'

if (process.env.VUE_APP_YOURGAME_API_URL) {
	baseURL = process.env.VUE_APP_YOURGAME_API_URL
}

const api = axios.create({
	baseURL: baseURL,
})

export async function createContest(
	firebaseIdToken,
	youtubeVideoId,
	contestTime
) {
	return api.post(
		'/contest/create',
		{
			youtubeVideoId,
			contestTime,
		},
		{
			headers: {
				Authorization: `Bearer ${firebaseIdToken}`,
			},
		}
	)
}

export async function getMyContests(firebaseIdToken) {
	let result = await api.get('/contest/mycontests', {
		headers: {
			Authorization: `Bearer ${firebaseIdToken}`,
		},
	})

	return result.data
}

export function getAllContests() {
	return api.get('/contest/all')
}

export function getContestById(contestId, firebaseIdToken = null) {
	let options = {}

	if (firebaseIdToken) {
		options = {
			headers: {
				Authorization: `Bearer ${firebaseIdToken}`,
			},
		}
	}

	return api.get(`/contest/${contestId}/details`, options)
}

export async function joinContest(firebaseIdToken, contestId) {
	return api.post(`/contest/${contestId}/join`, null, {
		headers: {
			Authorization: `Bearer ${firebaseIdToken}`,
		},
	})
}

export async function startContest(firebaseIdToken, contestId) {
	return api.post(
		`/contest/${contestId}/start`,
		{
			contestId: contestId,
		},
		{
			headers: {
				Authorization: `Bearer ${firebaseIdToken}`,
			},
		}
	)
}

export async function closeCurrentQuestion(firebaseIdToken, contestId) {
	return api.post(
		`/contest/${contestId}/closeCurrentQuestion`,
		{
			contestId: contestId,
		},
		{
			headers: {
				Authorization: `Bearer ${firebaseIdToken}`,
			},
		}
	)
}

export async function getNextQuestion(firebaseIdToken, contestId) {
	return api.get(`/contest/${contestId}/nextquestion`, {
		headers: {
			Authorization: `Bearer ${firebaseIdToken}`,
		},
	})
}

export async function getLeaderboard(contestId) {
	return api.get(`/contest/${contestId}/leaderboard`)
}

export async function getJoinedContests(firebaseIdToken) {
	return api.get('/contest/joinedcontests', {
		headers: {
			Authorization: `Bearer ${firebaseIdToken}`,
		},
	})
}

export async function getCreatedContests(firebaseIdToken) {
	return api.get('/contest/createdcontests', {
		headers: {
			Authorization: `Bearer ${firebaseIdToken}`,
		},
	})
}

export async function answerQuestion(firebaseIdToken, contestId, answer) {
	return api.post(
		`/contest/${contestId}/answer`,
		{ answer },
		{
			headers: {
				Authorization: `Bearer ${firebaseIdToken}`,
			},
		}
	)
}

export async function endContest(firebaseIdToken, contestId) {
	return api.post(`/contest/${contestId}/end`, null, {
		headers: {
			Authorization: `Bearer ${firebaseIdToken}`,
		},
	})
}

export async function isCreator(firebaseIdToken) {
	return api.get('/user/iscreator', {
		headers: {
			Authorization: `Bearer ${firebaseIdToken}`,
		},
	})
}

export async function addRefferal(firebaseIdToken, refferalId) {
	return api.post(
		'/user/refferal',
		{
			refferalId: refferalId,
		},
		{
			headers: {
				Authorization: `Bearer ${firebaseIdToken}`,
			},
		}
	)
}
