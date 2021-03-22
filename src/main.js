import Vue from 'vue'
import App from './App.vue'

import router from './router.js'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faRupeeSign,
	faCube,
	faPlayCircle,
	faCheckCircle,
	faSquareFull,
	faUndo,
	faRocket,
	faMoneyBill,
	faGrinHearts,
	faBars,
	faEnvelope,
	faTrophy,
	faExpand,
	faTimes,
	faTimesCircle,
	faPlus,
	faChevronDown,
	faChevronRight,
	faCaretDown,
	faListOl,
	faFlag,
	faGamepad,
} from '@fortawesome/free-solid-svg-icons'
import {
	faClock,
	faCalendar,
	faCopyright,
} from '@fortawesome/free-regular-svg-icons'
import {
	faInstagram,
	faTwitter,
	faGoogle,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faRupeeSign)
library.add(faFlag)
library.add(faGoogle)
library.add(faListOl)
library.add(faCaretDown)
library.add(faCube)
library.add(faPlayCircle)
library.add(faCheckCircle)
library.add(faSquareFull)
library.add(faUndo)
library.add(faRocket)
library.add(faMoneyBill)
library.add(faGrinHearts)
library.add(faBars)
library.add(faClock)
library.add(faCalendar)
library.add(faEnvelope)
library.add(faTrophy)
library.add(faExpand)
library.add(faTimes)
library.add(faTimesCircle)
library.add(faPlus)
library.add(faChevronDown)
library.add(faChevronRight)
library.add(faInstagram)
library.add(faTwitter)
library.add(faCopyright)
library.add(faGamepad)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import './../node_modules/bulma/css/bulma.css'
import 'nprogress/nprogress.css'

import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })
NProgress.start()

Vue.config.productionTip = false

store.dispatch('auth').then(() => {
	new Vue({
		router,
		store,
		render: (h) => h(App),
	}).$mount('#app')
})
