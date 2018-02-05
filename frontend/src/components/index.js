import axios from 'axios'
import GridContainer from './gridcontainer'
import ArticleContainer from './articlecontainer'
import ReplyBtn from './replybtn'
import FavoriteBtn from './favoritebtn'
import ReplyForm from './replyform'
import ReplyContainer from './replycontainer'
import type from '@/store/type'
import {mapActions} from 'vuex'

const components = {
  GridContainer,
  ArticleContainer,
  ReplyBtn,
  FavoriteBtn,
  ReplyForm,
  ReplyContainer
}

function componentsInstall(Vue) {
  Object.keys(components).forEach(key => {
    Vue.component(`Iu${key}`, components[key])
  })
}

export default {
  install(Vue, options) {
    componentsInstall(Vue)

    Vue.prototype.$http = axios

    Vue.mixin({
      methods: {
        ...mapActions([type.ARTICLE_ITEMS, type.COMMENT_ITEMS]),
        fetchArticles({
          pk = '',
          query = '',
          tag = ''
        } = {}) {
          return new Promise((resolve, reject) => {
            this[type.ARTICLE_ITEMS]({pk, query, tag}).then(response => {
              console.log(response)
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        fetchComments({
          fk = '',
          pk = ''
        } = {}) {
          return new Promise((resolve, reject) => {
            this[type.COMMENT_ITEMS]({fk, pk}).then(response => {
              console.log(response)
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        }
      }
    })
  }
}
