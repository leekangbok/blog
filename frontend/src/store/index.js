import Vue from 'vue'
import Vuex from 'vuex'
import type from './type'

Vue.use(Vuex)

const state = {
  [type.SIDENAV_DRAWER]: null
}

const mutations = {
  [type.SIDENAV_DRAWER](state, value) {
    state[type.SIDENAV_DRAWER] = value
  }
}

const getters = {}

const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})
