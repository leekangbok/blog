<template>
  <iu-grid-container :items="items.items">
    <template slot-scope="props">
      <iu-article-container :item="props.item" summary></iu-article-container>
    </template>
  </iu-grid-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import type from '@/store/type'

export default {
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions([type.ARTICLE_ITEMS]),
    fetchData() {
      this[type.ARTICLE_ITEMS]({ tag: 'BITCOIN' })
        .then(resolve => {
          console.log(resolve)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    ...mapGetters({
      items: type.ARTICLE_ITEMS
    })
  },
  watch: {
    $route: 'fetchData'
  }
}
</script>
