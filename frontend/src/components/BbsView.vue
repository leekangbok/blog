<template lang="html">
<v-card>
  <v-card-title primary-title>
    <span class="headline deep-orange--text text--accent-3">{{item.fields.title}}</span>
  </v-card-title>
  <v-card-text>
    <section v-html="item.fields.body.replace(/\n|\r\n|\r/g, '<br>\r\n')"></section>
  </v-card-text>
  <v-card-actions>
    <div class="caption blue--text ma-2 pa-2">{{ item.fields.created_date.replace('T', ' ') }}</div>
    <div class="body-1 ma-2 pa-2">{{ item.fields.author }}</div>
    <v-spacer></v-spacer>
    <v-tooltip top>
      <v-btn slot="activator" icon small flat color="purple" @click.stop="showCommentInput = !showCommentInput">
        <v-icon>reply</v-icon>
      </v-btn>
      <span>댓글</span>
    </v-tooltip>
    <v-tooltip top>
      <v-btn slot="activator" icon small flat color="purple">
        <v-icon>mode_edit</v-icon>
      </v-btn>
      <span>수정</span>
    </v-tooltip>
    <v-tooltip top>
      <v-btn slot="activator" icon small flat color="red darken-4">
        <v-icon>delete</v-icon>
      </v-btn>
      <span>삭제</span>
    </v-tooltip>
  </v-card-actions>
  <iu-reply-form v-if="showCommentInput" @evSubmit="submitComment" @evCancel="showCommentInput = !showCommentInput"></iu-reply-form>
  <iu-reply-container :items="comments" :updateAction="updateAction" :deleteAction="deleteAction" @evCommentUpdated="fetchBbs({pk})"></iu-reply-container>
</v-card>
</template>

<script>
import type from '@/store/type'

export default {
  props: ['pk'],
  data() {
    return {
      updateAction: type.UPDATE_BBS_COMMENT_ITEM,
      deleteAction: type.DELETE_BBS_COMMENT_ITEM,
      showCommentInput: false,
      item: {
        fields: {
          body: '',
          created_date: ''
        }
      },
      comments: []
    }
  },
  created() {
    this.fetchBbs({
      pk: this.pk
    })
  },
  methods: {
    submitComment(value) {
      this[type.ADD_BBS_COMMENT_ITEM]({
          ...value,
          fk: this.item.pk
        })
        .then(response => {
          this.showCommentInput = false
          this.fetchBbs({
            pk: this.pk
          })
        })
    },
    fetchBbs(args = {}) {
      this[type.BBS_ITEMS](args)
        .then(response => {
          this.item = response.items[0]
          this[type.BBS_COMMENT_ITEMS]({
              fk: this.item.pk
            })
            .then(response => {
              this.comments = response.items
            })
        })
    }
  }
}
</script>

<style lang="css">
</style>
