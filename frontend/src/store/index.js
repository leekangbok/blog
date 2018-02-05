import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import type from './type'

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
    return new Promise((resolve, reject) => {
      axios.post(`/api/articles/comment/${fk}/add/`, qs.stringify({
        author,
        body,
        passwd
      })).then(response => {
        dispatch(type.COMMENT_ITEMS, {fk}).then(response => {
          resolve(response)
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  [type.UPDATE_ARTICLE_ITEM]({
    commit
  }, {item}) {
    let {
      author,
      passwd,
      body,
      title,
      tag,
      num_stars
    } = item.fields

    commit(type.LOADING, true)
    return new Promise((resolve, reject) => {
      axios.post(`/api/articles/article/${item.pk}/change/`, qs.stringify({
        author,
        passwd,
        body,
        title,
        tag,
        num_stars: num_stars + 1
      })).then(response => {
        commit(type.LOADING, false)
        resolve(response.data.items[0])
      }).catch(error => {
        console.log(error)
        reject(error)
      })
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
    return new Promise((resolve, reject) => {
      let url = '/api/articles/article/'
      if (pk) {
        url = `${url}${pk}/`
      }
      axios.get(url, {
        params: {
          query,
          offset,
          limit,
          tag
        }
      }).then(response => {
        for (let [index, item] of response.data.items.entries()) {
          item.flex = index === 0
            ? 8
            : 4
        }
        commit(type.LOADING, false)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  [type.COMMENT_ITEMS]({
    commit
  }, {
    fk = '',
    pk = ''
  } = {}) {
    commit(type.LOADING, true)
    return new Promise((resolve, reject) => {
      let urls = `/api/articles/comment/${fk}/`
      if (pk) {
        urls = `${urls}${pk}/`
      }
      axios.get(urls).then(response => {
        commit(type.COMMENT_ITEMS, response.data)
        commit(type.LOADING, false)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default new Vuex.Store({state, mutations, actions, getters, modules: {}})
