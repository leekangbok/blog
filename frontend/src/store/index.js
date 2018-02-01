import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import type from './type'

Vue.use(Vuex)

const state = {
  [type.SIDENAV_DRAWER]: null,
  [type.ARTICLE_ITEMS]: [],
  [type.COMMENT_ITEMS]: [],
  [type.LOADING]: false
}

const mutations = {
  [type.SIDENAV_DRAWER](state, value) {
    state[type.SIDENAV_DRAWER] = value
  },
  [type.LOADING](state, value) {
    state[type.LOADING] = value
  },
  [type.ARTICLE_ITEMS](state, value) {
    state[type.ARTICLE_ITEMS] = value
  },
  [type.COMMENT_ITEMS](state, value) {
    state[type.COMMENT_ITEMS] = value
  }
}

const getters = {
  [type.ARTICLE_ITEMS](state) {
    return state[type.ARTICLE_ITEMS]
  },
  [type.COMMENT_ITEMS](state) {
    return state[type.COMMENT_ITEMS]
  }
}

const actions = {
  [type.ARTICLE_ITEMS]({ commit }, { query = '', tag = '', offset = 0, limit = 99999 } = {}) {
    commit(type.LOADING, true)
    return new Promise((resolve, reject) => {
      axios
        .get('/api/articles/article/', {
          params: {
            query,
            offset,
            limit,
            tag
          }
        })
        .then(response => {
          for (let [index, item] of response.data.items.entries()) {
            item.flex = index === 0 ? 8 : 4
          }
          commit(type.ARTICLE_ITEMS, response.data)
          commit(type.LOADING, false)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  [type.COMMENT_ITEMS]({ commit }, { fk = '', pk = '' } = {}) {
    commit(type.LOADING, true)
    return new Promise((resolve, reject) => {
      let urls = `/api/articles/comment/${fk}/`
      if (pk) {
        urls = `${urls}${pk}/`
      }
      axios
        .get(urls)
        .then(response => {
          // console.log(response.data)
          commit(type.COMMENT_ITEMS, response.data)
          commit(type.LOADING, false)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})
