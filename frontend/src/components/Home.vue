<template>
<ArticleSummaryView :items="items"></ArticleSummaryView>
</template>

<script>
import ArticleSummaryView from './ArticleSummaryView'

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
    this.fetchArticleData()
  },
  methods: {
    fetchArticleData() {
      this.fetchArticles({
        query: this.search,
        tag: this.tag
      }).then(response => {
        this.items = response.items
      }).catch(error => {
        console.log(error)
      })
    }
  },
  watch: {
    $route: 'fetchArticleData'
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
