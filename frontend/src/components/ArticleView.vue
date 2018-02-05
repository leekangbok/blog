<template>
<v-layout justify-center>
  <v-flex md10>
    <iu-article-container :item="item" :comments="comments" @evFavorite="incFavorite" @evSubmitComment="submitComment" @evCommentUpdated="fetchArticleData"></iu-article-container>
  </v-flex>
</v-layout>
</template>

<script>
import {
  mapActions
} from 'vuex'
import type from '@/store/type'
import store from '@/store'

export default {
  props: ['pk'],
  data() {
    return {
      item: null,
      comments: []
    }
  },
  created() {
    this.item = this.$attrs.item
    this.comments = this.$attrs.comments
    // this.fetchArticleData()
  },
  methods: {
    ...mapActions([
      type.UPDATE_ARTICLE_ITEM,
      type.ADD_COMMENT_ITEM
    ]),
    fetchArticleData() {
      this.fetchArticles({
        pk: this.pk
      }).then(response => {
        this.item = response.items[0]
        this.fetchComments({
          fk: this.pk
        }).then(response => {
          this.comments = response.items
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    incFavorite() {
      this[type.UPDATE_ARTICLE_ITEM]({
          item: this.item
        })
        .then(resolve => {
          this.fetchArticleData()
        })
        .catch(error => {
          console.log(error)
        })
    },
    submitComment(value) {
      this[type.ADD_COMMENT_ITEM]({
        fk: this.item.pk,
        author: value.author,
        body: value.body,
        passwd: value.passwd
      }).then(resolve => {
        this.fetchArticleData()
      })
    }
  },
  watch: {
    // $route: 'fetchArticleData'
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch(type.ARTICLE_ITEMS, {
      pk: to.params.pk
    }).then(response => {
      to.params['item'] = response.items[0]
      store.dispatch(type.COMMENT_ITEMS, {
        fk: to.params.pk
      }).then(response => {
        to.params['comments'] = response.items
        next(vm => {})
      })
    })
  }
}
</script>
