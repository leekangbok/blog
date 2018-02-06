<template>
<ArticleSummaryView :items="items"></ArticleSummaryView>
</template>

<script>
import store from '@/store'
import type from '@/store/type'
import ArticleSummaryView from './ArticleSummaryView'

export default {
  props: {},
  created() {
    this.items = this.$route.params.items
    // this.fetchArticles()
  },
  methods: {
    fetchArticles() {
      this[type.ARTICLE_ITEMS]({
          tag: 'PYTHON-FRAMEWORK'
        })
        .then(response => {
          this.items = response.items
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  watch: {
    // $route: 'fetchArticles'
  },
  data() {
    return {
      items: null
    }
  },
  components: {
    ArticleSummaryView
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch(type.ARTICLE_ITEMS, {
      tag: 'PYTHON-FRAMEWORK'
    }).then(response => {
      to.params['items'] = response.items
      next(vm => {})
    })
  }
}
</script>
