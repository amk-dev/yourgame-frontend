import Vue from 'vue'
import Vuex from 'vuex'

// modules
import User from './User/User.js'
import Contest from './Contest/Contest.js'
import ControlRoom from './ControlRoom/ControlRoom.js'
import Play from './Play/Play.js'
import Notifications from './Notifications/Notifications.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		User,
		Contest,
		ControlRoom,
		Play,
		Notifications,
	},
})
