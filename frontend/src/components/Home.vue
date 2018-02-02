<template>
  <iu-grid-container :items="items.items">
    <template slot-scope="props">
      <iu-article-container :article="props.item"
        summary></iu-article-container>
    </template>
  </iu-grid-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import type from '@/store/type'

export default {
  props: {
    search: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.fetchArticleData()
  },
  methods: {
    ...mapActions([type.ARTICLE_ITEMS]),
    fetchArticleData() {
      if (!this.search) {
        this[type.ARTICLE_ITEMS]()
          .then(resolve => {})
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  computed: {
    ...mapGetters({
      items: type.ARTICLE_ITEMS
    })
  },
  watch: {
    $route: 'fetchArticleData'
  },
  data() {
    return {}
  }
}
</script>
