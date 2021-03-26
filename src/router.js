import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/Home.vue')
const SignIn = () => import('./views/SignIn.vue')
const Games = () => import('./views/Games.vue')
const YourMoney = () => import('./views/YourMoney')
const GameControlRoom = () => import('./views/GameControlRoom.vue')
const Play = () => import('./views/Play.vue')
const Referrals = () => import('./views/Referrals.vue')

const PrivacyPolicy = () => import('./views/PrivacyPolicy.vue')
const TermsOfService = () => import('./views/TermsOfService.vue')
const ErrorPage = () => import('./views/ErrorPage.vue')
const Contest = () => import('./views/Contest.vue')

import store from './store'
import NProgress from 'nprogress'

import { captureException } from '@sentry/browser'

Vue.use(Router)

let router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
			meta: {
				public: true,
			},
		},
		{
			path: '/signin',
			name: 'SignIn',
			component: SignIn,
			meta: {
				guest: true,
			},
		},
		{
			path: '/games/all',
			name: 'AllGames',
			props: true,
			component: Games,
			meta: {
				public: true,
			},
		},
		{
			path: '/games/joined',
			name: 'JoinedGames',
			component: Games,
			props: true,
			meta: {
				private: true,
			},
		},
		{
			path: '/games/created',
			name: 'CreatedGames',
			props: true,
			component: Games,
			meta: {
				private: true,
				creator: true,
			},
		},
		{
			path: '/games/new',
			name: 'NewGame',
			props: true,
			component: Games,
			meta: {
				private: true,
				creator: true,
			},
		},
		{
			path: '/yourmoney',
			name: 'YourMoney',
			component: YourMoney,
			props: true,
			meta: {
				private: true,
			},
		},
		{
			path: '/referrals',
			name: 'Referrals',
			component: Referrals,
			props: true,
			meta: {
				private: true,
			},
		},
		{
			path: '/contest/:contestId',
			name: 'Contest',
			component: Contest,
			props: true,
			meta: {
				public: true,
			},
		},
		{
			path: '/contest/:contestId/control',
			name: 'GameControlRoom',
			component: GameControlRoom,
			meta: {
				private: true,
			},
		},
		{
			path: '/contest/:contestId/play',
			name: 'Play',
			component: Play,
			meta: {
				private: true,
			},
		},
		{
			path: '/privacy-policy',
			name: 'PrivacyPolicy',
			component: PrivacyPolicy,
			meta: {
				public: true,
			},
		},
		{
			path: '/terms-of-service',
			name: 'TermsOfService',
			component: TermsOfService,
			meta: {
				public: true,
			},
		},
		{
			path: '/something-went-wrong',
			name: 'SomethingWentWrong',
			component: ErrorPage,
			props: {
				type: 'something-went-wrong',
			},
		},
		{
			path: '*',
			name: 'PageNotFound',
			component: ErrorPage,
			props: {
				type: 'page-not-found',
			},
		},
	],
	scrollBehavior() {
		return {
			x: 0,
			y: 0,
		}
	},
})

router.beforeEach(async (to, from, next) => {
	NProgress.start()

	if (to.query.refId) {
		localStorage.setItem('refferedBy', to.query.refId)
	}

	const isAuthenticated = store.getters.isAuthenticated

	if (isGuestRoute(to)) {
		if (to.name == 'SignIn') {
			try {
				let result = await store.dispatch('checkForSignInErrors')

				if (result.user) {
					let redirectTo = to.query.redirect
					return redirectTo
						? next(redirectTo)
						: next({ name: 'AllGames' })
				}
			} catch (error) {
				captureException(error)
				return next({
					name: 'SomethingWentWrong',
				})
			}
		}

		if (isAuthenticated) {
			return next({
				name: 'Home',
			})
		}
	}

	if (isPrivateRoute(to)) {
		if (!isAuthenticated) {
			return next({
				path: '/signin',
				query: {
					redirect: to.fullPath,
				},
			})
		}
	}

	if (isCreatorRoute(to)) {
		try {
			let isCreator = await store.dispatch('isCreator')

			if (!isCreator) {
				return next({
					name: 'PageNotFound',
				})
			}
		} catch (error) {
			captureException(error)

			return next({
				name: 'SomethingWentWrong',
			})
		}
	}

	if (to.name == 'AllGames') {
		try {
			const allContests = await store.dispatch('populateAllContests')
			to.params.contests = allContests
			to.params.contestsTitle = 'All Games'
			to.params.context = 'all-games'
			return next()
		} catch (error) {
			captureException(error)
			return next('/something-went-wrong')
		}
	}

	if (to.name == 'JoinedGames') {
		try {
			const joinedContests = await store.dispatch(
				'populateJoinedContests'
			)
			to.params.contests = joinedContests
			to.params.contestsTitle = 'Joined Contests'
			to.params.context = 'joined-games'

			return next()
		} catch (error) {
			captureException(error)
			return next('/something-went-wrong')
		}
	}

	if (to.name == 'CreatedGames' || to.name == 'NewGame') {
		try {
			const createdContests = await store.dispatch(
				'populateCreatedContests'
			)
			to.params.contests = createdContests
			to.params.contestsTitle = 'Created Contests'
			to.params.creator = true
			to.params.context = 'created-games'

			if (to.name == 'NewGame') {
				to.params.showNewContestForm = true
			}

			return next()
		} catch (error) {
			captureException(error)
			return next('/something-went-wrong')
		}
	}

	if (to.name == 'Referrals') {
		try {
			let referrals = await store.dispatch('getReferrals')
			to.params.referrals = referrals
			return next()
		} catch (error) {
			return next('/something-went-wrong')
		}
	}

	if (to.name == 'YourMoney') {
		try {
			let requiredPromises = [
				store.dispatch('getBonusAndWinnings'),
				store.dispatch('getTransactionHistory'),
			]

			const [yourMoney, transactionHistory] = await Promise.all(
				requiredPromises
			)
			to.params.bonus = yourMoney.bonus
			to.params.winnings = yourMoney.winnings
			to.params.transactionHistory = transactionHistory

			return next()
		} catch (error) {
			return next('/something-went-wrong')
		}
	}

	return next()
})

router.afterEach(() => {
	NProgress.done()
})

function isGuestRoute(route) {
	return route.matched.some((routeRecord) => routeRecord.meta.guest)
}

function isPrivateRoute(route) {
	return route.matched.some((routeRecord) => routeRecord.meta.private)
}

function isCreatorRoute(route) {
	return route.matched.some((routeRecord) => routeRecord.meta.creator)
}

export default router
