import { test, expect, describe } from '@jest/globals'
import { actions } from './../Contest.js'
import {
	createContest,
	getAllContests,
	getJoinedContests,
} from '../../../services/YourGameApi.js'
import { captureException } from '@sentry/browser'

import { testAction, expectedMutations } from './../../testutils/testutils.js'
import { getIdToken } from '../../../services/FirebaseAuth.js'

/* eslint-disable */
jest.mock('../../../services/FirebaseAuth.js')
jest.mock('../../../services/YourGameApi.js')
jest.mock('@sentry/browser', () => {
	return {
		captureException: jest.fn(),
	}
})
/* eslint-enable */

describe('create new contest', () => {
	test('creates new contest successfully', async () => {
		let payload = {
			youtubeVideoId: 'mockYoutubeVideoId',
			contestDateAndTimeTimestamp: 'mockContestDateAndTimeTimestamp',
		}

		createContest.mockResolvedValue({
			success: true,
		})

		await testAction(
			actions.createNewContest,
			payload,
			expectedMutations['create-new-contest']['success']
		)

		expect(createContest).toHaveBeenCalledWith(
			'mockedIdToken',
			'mockYoutubeVideoId',
			'mockContestDateAndTimeTimestamp'
		)

		expect.assertions(2)

		createContest.mockReset()
		captureException.mockReset()
	})
	test('capture errors successfully', async () => {
		let payload = {
			youtubeVideoId: 'mockYoutubeVideoId',
			contestDateAndTimeTimestamp: 'mockContestDateAndTimeTimestamp',
		}

		createContest.mockRejectedValue({
			error: true,
		})

		await testAction(
			actions.createNewContest,
			payload,
			expectedMutations['create-new-contest']['error']
		)

		expect(captureException).toHaveBeenCalledTimes(1)
		expect(captureException).toHaveBeenCalledWith({
			error: true,
		})

		expect.assertions(3)

		createContest.mockReset()
		captureException.mockReset()
	})
})

describe('populate all contests', () => {
	test('populate all contests successfully', async () => {
		let payload = null

		getAllContests.mockResolvedValue({
			data: [],
		})

		await testAction(
			actions.populateAllContests,
			payload,
			expectedMutations['populate-all-contests']['success']
		)

		expect(getAllContests).toHaveBeenCalledTimes(1)
		getAllContests.mockReset()
	})

	test('capture errors successfully', async () => {
		let payload = null

		getAllContests.mockRejectedValue({
			error: true,
		})

		await testAction(
			actions.populateAllContests,
			payload,
			expectedMutations['populate-all-contests']['error']
		)

		expect(captureException.mock.calls).toMatchObject([
			[
				{
					error: true,
				},
			],
		])

		getAllContests.mockReset()
	})
})

describe('populate joined contests', () => {
	test('populate joined contests successfully', async () => {
		let payload = null

		getJoinedContests.mockResolvedValue({
			data: [],
		})

		await testAction(
			actions.populateJoinedContests,
			payload,
			expectedMutations['populate-joined-contests']['success']
		)

		expect(getJoinedContests).toHaveBeenCalledTimes(1)
		getJoinedContests.mockReset()
		getIdToken.mockReset()
	})

	test('capture errors successfully', async () => {
		let payload = null

		getJoinedContests.mockRejectedValue({
			error: true,
		})

		await testAction(
			actions.populateJoinedContests,
			payload,
			expectedMutations['populate-joined-contests']['error']
		)

		expect(captureException.mock.calls).toMatchObject([
			[
				{
					error: true,
				},
			],
		])

		getAllContests.mockReset()
	})
})
