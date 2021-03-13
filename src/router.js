/* eslint-disable no-console */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignIn from './views/SignIn.vue'
import Games from './views/Games.vue'
import YourMoney from './views/YourMoney'
import GameControlRoom from './views/GameControlRoom.vue'
import Play from './views/Play.vue'

import PrivacyPolicy from './views/PrivacyPolicy.vue'
import TermsOfService from './views/TermsOfService.vue'
import ErrorPage from './views/ErrorPage.vue'
import Contest from './views/Contest.vue'

import store from './store'
import NProgress from 'nprogress'

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
			props: true,
			component: Games,
			beforeEnter(to, from, next) {
				store
					.dispatch('populateAllContests')
					.then((allContests) => {
						to.params.contests = allContests
						to.params.contestsTitle = 'All Games'
						to.params.context = 'all-games'
						next()
					})
					.catch((error) => {
						// eslint-disable-next-line
						console.log(error)
						next('/something-went-wrong')
					})
			},
			meta: {
				public: true,
			},
		},
		{
			path: '/games/joined',
			component: Games,
			props: true,
			beforeEnter(to, from, next) {
				store
					.dispatch('populateJoinedContests')
					.then((joinedContests) => {
						to.params.contests = joinedContests
						to.params.contestsTitle = 'Joined Contests'
						to.params.context = 'joined-games'
						next()
					})
					.catch((error) => {
						// TODO:: Redirect To A 404 Page
						// eslint-disable-next-line
						console.log(error)
					})
			},
			meta: {
				private: true,
			},
		},
		{
			path: '/games/created',
			props: true,
			component: Games,
			beforeEnter(to, from, next) {
				store
					.dispatch('populateCreatedContests')
					.then((createdContests) => {
						to.params.contests = createdContests
						to.params.contestsTitle = 'Created Contests'
						to.params.creator = true
						to.params.context = 'created-games'
						next()
					})
					.catch((error) => {
						// eslint-disable-next-line
						console.log(error)
						next('/something-went-wrong')
					})
			},
			meta: {
				private: true,
			},
		},
		{
			path: '/games/new',
			props: true,
			component: Games,
			beforeEnter(to, from, next) {
				store
					.dispatch('populateCreatedContests')
					.then((createdContests) => {
						to.params.contests = createdContests
						to.params.contestsTitle = 'Created Contests'
						to.params.creator = true
						to.params.context = 'created-games'
						to.params.showNewContestForm = true
						next()
					})
					.catch((error) => {
						// eslint-disable-next-line
						console.log(error)
						next('/something-went-wrong')
					})
			},
			meta: {
				private: true,
			},
		},
		{
			path: '/yourmoney',
			name: 'yourmoney',
			component: YourMoney,
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

router.beforeEach((to, from, next) => {
	NProgress.start()

	if (to.matched.some((record) => record.meta.guest)) {
		if (store.getters.isAuthenticated) {
			console.log(to.query)
			if (to.query.redirect) {
				next(to.query.redirect)
			} else {
				next('/')
			}
		} else {
			next()
		}
	} else if (to.matched.some((record) => record.meta.private)) {
		store.getters.isAuthenticated
			? next()
			: next({
					path: '/signin',
					query: {
						redirect: to.fullPath,
					},
			  })
	} else {
		next()
	}
})

router.afterEach(() => {
	NProgress.done()
})

export default router
