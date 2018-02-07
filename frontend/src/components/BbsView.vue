<template lang="html">
<v-card>
  <v-card-title primary-title class="headline deep-orange--text text--accent-3">
    {{item.fields.title}}
  </v-card-title>
  <v-card-text v-html="item.fields.body"></v-card-text>
  <v-card-actions>
    <div class="caption blue--text ma-2 pa-2">{{ item.fields.created_date.replace('T', ' ') }}</div>
    <div class="body-1 ma-2 pa-2">{{ item.fields.author }}</div>
    <v-spacer></v-spacer>
    <v-tooltip top>
      <v-btn slot="activator" icon small flat color="purple">
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
  <iu-reply-container :item="comments"></iu-reply-container>
</v-card>
</template>

<script>
import type from '@/store/type'

export default {
  props: ['pk'],
  data() {
    return {
      item: {
        fields: {
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
    fetchBbs(args = {}) {
      this[type.BBS_ITEMS](args)
        .then(response => {
          console.log(response)
          this.item = response.items[0]
        })
    }
  }
}
</script>

<style lang="css">
</style>
