import Vue from 'vue'
import Vuex from 'vuex'
import myModule from '@/store/module'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [
		createPersistedState({
			storage: window.sessionStorage
		})
	],
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		myModule
	}
})
