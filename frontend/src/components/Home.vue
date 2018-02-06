<template>
<ArticleSummaryView :items="items"></ArticleSummaryView>
</template>

<script>
import ArticleSummaryView from './ArticleSummaryView'
import type from '@/store/type'

export default {
  props: {
    search: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    }
  },
  created() {
    this.fetchArticles()
  },
  methods: {
    fetchArticles() {
      this[type.ARTICLE_ITEMS]({
          query: this.search,
          tag: this.tag
        })
        .then(response => {
          this.items = Array.from(response.items)
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
