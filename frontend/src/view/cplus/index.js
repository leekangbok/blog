import { load } from '@/util'

export default {
  title: 'C plus+',
  icon: 'toc',
  children: [{
    path: '/cpluslang',
    name: 'cpluslang',
    title: '언어',
    component: load('components/CplusLang')
  }, {
    path: '/cplusframework',
    name: 'cplusframework',
    title: '프레임워크',
    component: load('components/CplusFramework')
  }]
}
