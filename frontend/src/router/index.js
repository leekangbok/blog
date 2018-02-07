import Vue from 'vue'
import Router from 'vue-router'
import {
  load
} from '@/util'
import BitCoin from '@/view/bitcoin'
import Cplus from '@/view/cplus'
import Jscript from '@/view/jscript'
import Py from '@/view/python'
import Stock from '@/view/stock'

Vue.use(Router)

export const sideNavItems = [BitCoin, Stock, Cplus, Jscript, Py]

const routes = [
  ...sideNavItems.reduce((accumulator, currentValue) => {
    if (currentValue.forward) {
      return accumulator
    }
    if (currentValue.children) {
      for (let child of currentValue.children) {
        if (!child.forward) {
          accumulator = [
            ...accumulator,
            child
          ]
        }
      }
      return accumulator
    }
    return [
      ...accumulator,
      currentValue
    ]
  }, []), {
    path: '/bbs_view/:pk',
    name: 'bbs_view',
    props: true,
    component: load('components/BbsView')
  }, {
    path: '/article_view/:pk',
    name: 'article_view',
    props: true,
    component: load('components/ArticleView')
  }, {
    path: '/bbs',
    name: 'bbs',
    component: load('components/Bbs')
  },
  {
    path: '/',
    name: 'home',
    props: ({
      query = {}
    }) => {
      return {
        search: query.search || '',
        tag: query.tag || ''
      }
    },
    component: load('components/Home')
  }, {
    path: '*',
    redirect: {
      name: 'home'
    }
  }
]

export default new Router({
  routes
})
