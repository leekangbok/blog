import axios from 'axios'
import GridContainer from './gridcontainer'
import ArticleContainer from './articlecontainer'
import ReplyBtn from './replybtn'
import FavoriteBtn from './favoritebtn'
import ReplyForm from './replyform'
import ReplyContainer from './replycontainer'
import BbsForm from './bbsform'
import Panel from './panel'
import type from '@/store/type'
import {
  mapActions
} from 'vuex'

const components = {
  GridContainer,
  ArticleContainer,
  ReplyBtn,
  FavoriteBtn,
  ReplyForm,
  ReplyContainer,
  BbsForm,
  Panel
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
        ...mapActions([
          type.DELETE_COMMENT_ITEM,
          type.UPDATE_COMMENT_ITEM,
          type.ADD_COMMENT_ITEM,
          type.COMMENT_ITEMS,
          type.UPDATE_ARTICLE_ITEM,
          type.ARTICLE_ITEMS,
          type.BBS_ITEMS,
          type.UPDATE_BBS_ITEM,
          type.ADD_BBS_ITEM
        ])
      }
    })
  }
}
