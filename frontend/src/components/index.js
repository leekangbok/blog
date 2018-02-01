import axios from 'axios'
import GridContainer from './gridcontainer'
import ArticleContainer from './articlecontainer'
import ReplyBtn from './replybtn'
import FavoriteBtn from './favoritebtn'

const components = {
  GridContainer,
  ArticleContainer,
  ReplyBtn,
  FavoriteBtn
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
  }
}
