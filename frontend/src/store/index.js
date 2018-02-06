import Vue from 'vue'
import Vuex from 'vuex'
import type from './type'
import api from './api'

Vue.use(Vuex)

const state = {
  [type.SIDENAV_DRAWER]: null,
  [type.ARTICLE_ITEMS]: {
    total: 0,
    curr_total: 0,
    items: []
  },
  [type.COMMENT_ITEMS]: {
    total: 0,
    curr_total: 0,
    items: []
  },
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
    console.log('set items')
    console.log(value)
    state[type.ARTICLE_ITEMS] = value
  },
  [type.COMMENT_ITEMS](state, value) {
    state[type.COMMENT_ITEMS] = value
  }
}

const getters = {
  [type.ARTICLE_ITEMS](state) {
    console.log('getter')
    console.log(state[type.ARTICLE_ITEMS])
    return state[type.ARTICLE_ITEMS]
  },
  [type.COMMENT_ITEMS](state) {
    return state[type.COMMENT_ITEMS]
  }
}

const actions = {
  [type.DELETE_COMMENT_ITEM]({
    commit
  }, {
    fk = '',
    pk = '',
    passwd = ''
  }) {
    commit(type.LOADING, true)
    return api.delete({
      url: `/api/articles/comment/${fk}/${pk}/delete/`,
      args: {
        params: {
          passwd
        }
      }
    }, {
      callback: (resolve, response) => {
        commit(type.LOADING, false)
        resolve(response)
      }
    })
  },
  [type.UPDATE_COMMENT_ITEM]({
    commit
  }, {
    fk = '',
    pk = '',
    author = '',
    body = '',
    passwd = ''
  }) {
    commit(type.LOADING, true)
    return api.post({
      url: `/api/articles/comment/${fk}/${pk}/change/`,
      args: {
        author,
        body,
        passwd
      }
    }, {
      callback: (resolve, response) => {
        commit(type.LOADING, false)
        resolve(response)
      }
    })
  },
  [type.ADD_COMMENT_ITEM]({
    dispatch,
    commit
  }, {
    fk = '',
    author = '',
    body = '',
    passwd = ''
  }) {
    commit(type.LOADING, true)
    return api.post({
      url: `/api/articles/comment/${fk}/add/`,
      args: {
        author,
        body,
        passwd
      }
    }, {
      callback: (resolve, response) => {
        dispatch(type.COMMENT_ITEMS, {
            fk
          })
          .then(response => {
            commit(type.LOADING, false)
            resolve(response)
          })
      }
    })
  },
  [type.COMMENT_ITEMS]({
    commit
  }, {
    fk = '',
    pk = ''
  } = {}) {
    commit(type.LOADING, true)
    return api.get({
      url: `/api/articles/comment/${fk}/${pk}/`
    }, {
      callback: (resolve, response) => {
        commit(type.LOADING, false)
        resolve(response)
      }
    })
  },
  [type.UPDATE_ARTICLE_ITEM]({
    commit
  }, {
    author,
    passwd,
    body,
    title,
    tag,
    num_stars,
    pk
  }) {
    commit(type.LOADING, true)
    return api.post({
      url: `/api/articles/article/${pk}/change/`,
      args: {
        author,
        passwd,
        body,
        title,
        tag,
        num_stars
      }
    }, {
      callback: (resolve, response) => {
        commit(type.LOADING, false)
        resolve(response)
      }
    })
  },
  [type.ARTICLE_ITEMS]({
    commit
  }, {
    pk = '',
    query = '',
    tag = '',
    offset = 0,
    limit = 99999
  } = {}) {
    commit(type.LOADING, true)
    return api.get({
      url: `/api/articles/article/${pk}/`,
      args: {
        params: {
          query,
          tag,
          offset,
          limit
        }
      }
    }, {
      callback: (resolve, response) => {
        commit(type.LOADING, false)
        for (let [index, item] of response.items.entries()) {
          item.flex = index === 0 ? 8 : 4
        }
        resolve(response)
      }
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
