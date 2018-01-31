import { load } from '@/util'

export default {
  title: '자바스크립트',
  icon: 'toc',
  children: [{
    path: '/jslang',
    name: 'jslang',
    title: '언어',
    component: load('components/JsLang')
  }, {
    path: '/jsframework',
    name: 'jsframework',
    title: '프레임워크',
    component: load('components/JsFramework')
  }]
}
