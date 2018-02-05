<template>
<ArticleSummaryView :items="items"></ArticleSummaryView>
</template>

<script>
import ArticleSummaryView from './ArticleSummaryView'

export default {
  created() {
    this.fetchArticleData()
  },
  methods: {
    fetchArticleData() {
      this.fetchArticles({
        tag: 'JSCRIPT-FRAMEWORK'
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
