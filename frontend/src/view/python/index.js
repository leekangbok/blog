import { load } from '@/util'

export default {
  title: '파이썬',
  icon: 'toc',
  children: [{
    path: '/pylang',
    name: 'pylang',
    title: '언어',
    component: load('components/PyLang')
  }, {
    path: '/pyframework',
    name: 'pyframework',
    title: '프레임워크',
    component: load('components/PyFramework')
  }]
}
