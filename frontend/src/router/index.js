import Vue from 'vue'
import Router from 'vue-router'
import {
  load
} from '@/util'
import BitCoin from '@/view/bitcoin'
import Cplus from '@/view/cplus'
import Jscript from '@/view/jscript'
import Py from '@/view/python'

Vue.use(Router)

export const sideNavItems = [BitCoin, Cplus, Jscript, Py]

const routes = [...sideNavItems.reduce((accumulator, currentValue) => {
  if (currentValue.children) {
    return [...accumulator, ...currentValue.children]
  }
  return [...accumulator, currentValue]
}, []), {
  path: '/article_view/:pk',
  name: 'article_view',
  props: true,
  component: load('components/ArticleView')
}, {
  path: '/',
  name: 'home',
  component: load('components/Home')
}, {
  path: '*',
  redirect: {
    name: 'home'
  }
}]

export default new Router({
  routes
})
