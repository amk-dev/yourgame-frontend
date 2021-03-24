import { expect } from '@jest/globals'

export async function testAction(action, payload, expectedMutations) {
	let actualMutations = []

	const commit = (type, payload) => {
		actualMutations.push({
			type,
			payload,
		})
	}

	await action({ commit: commit }, payload)

	expect(actualMutations).toMatchObject(expectedMutations)
}

export const expectedMutations = {
	'create-new-contest': {
		success: [
			{
				type: 'SET_IS_CREATING_CONTEST',
				payload: true,
			},
			{
				type: 'SET_CREATE_NEW_CONTEST_FEEDBACK',
				payload: {
					type: 'info',
					message: 'Creating New Contest',
				},
			},
			{
				type: 'SET_CREATE_NEW_CONTEST_FEEDBACK',
				payload: {
					type: 'success',
					message: 'Contest Created Successfully',
				},
			},
			{
				type: 'SET_IS_CREATING_CONTEST',
				payload: false,
			},
		],
		error: [
			{
				type: 'SET_IS_CREATING_CONTEST',
				payload: true,
			},
			{
				type: 'SET_CREATE_NEW_CONTEST_FEEDBACK',
				payload: {
					type: 'info',
					message: 'Creating New Contest',
				},
			},
			{
				type: 'SET_CREATE_NEW_CONTEST_FEEDBACK',
				payload: {
					type: 'error',
					message: 'Something Went Wrong',
				},
			},
			{
				type: 'SET_IS_CREATING_CONTEST',
				payload: false,
			},
		],
	},
	'populate-all-contests': {
		success: [
			{ type: 'SET_IS_POPULATING_ALL_CONTESTS', payload: true },
			{ type: 'SET_ALL_CONTESTS', payload: [] },
			{ type: 'SET_IS_POPULATING_ALL_CONTESTS', payload: false },
		],
		error: [
			{ type: 'SET_IS_POPULATING_ALL_CONTESTS', payload: true },
			{ type: 'SET_IS_POPULATING_ALL_CONTESTS', payload: false },
		],
	},
	'populate-joined-contests': {
		success: [
			{ type: 'SET_IS_POPULATING_JOINED_CONTESTS', payload: true },
			{ type: 'SET_JOINED_CONTESTS', payload: [] },
			{ type: 'SET_IS_POPULATING_JOINED_CONTESTS', payload: false },
		],
		error: [
			{ type: 'SET_IS_POPULATING_JOINED_CONTESTS', payload: true },
			{ type: 'SET_IS_POPULATING_JOINED_CONTESTS', payload: false },
		],
	},
}
