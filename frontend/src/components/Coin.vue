<template>
<ArticleSummaryView :items="items"></ArticleSummaryView>
</template>

<script>
import ArticleSummaryView from './ArticleSummaryView'
import type from '@/store/type'

export default {
  created() {
    this.fetchArticles()
  },
  methods: {
    fetchArticles() {
      this[type.ARTICLE_ITEMS]({
          tag: 'BITCOIN'
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
    $route: 'fetchArticles'
  },
  data() {
    return {
      items: []
    }
  },
  components: {
    ArticleSummaryView
  }
}
</script>
