export default {
	state: {
		notificationCount: 0,
		notifications: [],
	},
	getters: {
		notifications(state) {
			return state.notifications
		},
		notificationCount(state) {
			return state.notificationCount
		},
	},
	mutations: {
		ADD_NOTIFICATION(state, notification) {
			state.notifications.push(notification)
		},
		REMOVE_NOTIFICATION(state, notificationId) {
			state.notifications = state.notifications.filter((notification) => {
				return notification.id != notificationId
			})
		},
		INCREASE_NOTIFICATION_COUNT(state) {
			state.notificationCount++
		},
	},
	actions: {
		removeNotification({ commit }, notificationId) {
			commit('REMOVE_NOTIFICATION', notificationId)
		},
		addNotification({ commit, getters, dispatch }, notification) {
			notification.id = getters.notificationCount

			commit('ADD_NOTIFICATION', notification)
			commit('INCREASE_NOTIFICATION_COUNT')

			setTimeout(() => {
				dispatch('removeNotification', notification.id)
			}, 2000)
		},
	},
}
