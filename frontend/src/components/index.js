import axios from 'axios'
import GridContainer from './gridcontainer'
import ArticleContainer from './articlecontainer'

const components = {
  GridContainer,
  ArticleContainer
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
