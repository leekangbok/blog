// import { load } from '@/util'
//
// export default {
//   title: '주식',
//   icon: 'bubble_chart',
//   path: '/stock',
//   name: 'stock',
//   component: load('components/Stock')
// }

export default {
  title: '주식',
  icon: 'bubble_chart',
  forward: 'home',
  query: {
    tag: 'STOCK'
  }
}
