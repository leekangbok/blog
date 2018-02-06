<template>
<v-card>
  <div v-for="(item, index) in items" :key="item.fields.created_date">
    <v-divider></v-divider>
    <div v-if="modifyMode[index]">
      <iu-reply-form :updateError.sync="updateError" :item="item" @evSubmit="(value) => updateComment(item, index, value)" @evCancel="$set(modifyMode, index, false)"></iu-reply-form>
    </div>
    <div v-else>
      <v-card-text v-html="item.fields.body.replace(/\n|\r\n|\r/g, '<br>\r\n')"></v-card-text>
      <v-card-actions>
        <div class="caption deep-purple--text ma-2 pa-2">{{ item.fields.created_date.replace('T', ' ') }}</div>
        <div class="caption ma-2 pa-2">{{ item.fields.author }}</div>
        <v-spacer></v-spacer>
        <v-btn small color="purple" dark @click.stop="$set(modifyMode, index, true)">수정</v-btn>
        <v-btn small @click.stop="setDeleteComment(item)">삭제</v-btn>
      </v-card-actions>
    </div>
  </div>
  <v-dialog v-model="dialog" max-width="390">
    <v-card>
      <v-card-text>
        <v-text-field v-model="passwd" label="비밀번호" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" required></v-text-field>
        <v-alert color="error" outline icon="warning" :value="!!errmsg" transition="scale-transition">
          {{ errmsg }}
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small color="purple" dark @click.native="deleteCommentConfirm">확인</v-btn>
        <v-btn small @click.native="dialog = false">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-card>
</template>

<script>
import type from '@/store/type'

export default {
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      dialog: false,
      modifyMode: [],
      updateError: false,
      passwd: '',
      deletedItem: null,
      errmsg: '',
      e1: true
    }
  },
  created() {},
  methods: {
    updateComment(item, index, value) {
      this[type.UPDATE_COMMENT_ITEM](value)
        .then(response => {
          if (response.items.length === 0 || response.result === 'failure') {
            this.updateError = true
          } else {
            this.modifyMode[index] = false
            this.$emit('evCommentUpdated')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteCommentConfirm() {
      if (!this.deletedItem) {
        return
      }
      if (!this.passwd) {
        this.errmsg = '비밀번호를 입력해주세요'
        return
      }
      this[type.DELETE_COMMENT_ITEM]({
          fk: this.deletedItem.fields.article,
          pk: this.deletedItem.pk,
          passwd: this.passwd
        })
        .then(response => {
          if (response.result === 'failure') {
            this.errmsg = '비밀번호가 일치하지 않습니다'
            return
          }
          this.dialog = false
          this.$emit('evCommentUpdated')
        })
        .catch(error => {
          console.log(error)
        })
    },
    setDeleteComment(item) {
      this.errmsg = ''
      this.passwd = ''
      this.deletedItem = item
      this.dialog = true
    }
  }
}
</script>
