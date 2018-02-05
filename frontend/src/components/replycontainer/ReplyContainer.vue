<template>
<v-card>
  <div v-for="(item, index) in items" :key="item.fields.created_date">
    <v-divider></v-divider>
    <div v-if="modifyMode[index]">
      <iu-reply-form :item="item" @evCancel="$set(modifyMode, index, false)"></iu-reply-form>
    </div>
    <div v-else>
      <v-card-text v-html="item.fields.body.replace(/\n|\r\n|\r/g, '<br>\r\n')"></v-card-text>
      <v-card-actions>
        <div class="caption deep-purple--text ma-2 pa-2">{{ item.fields.created_date.replace('T', ' ') }}</div>
        <div class="caption ma-2 pa-2">{{ item.fields.author }}</div>
        <v-spacer></v-spacer>
        <v-btn small color="purple" dark @click.stop="$set(modifyMode, index, true)">수정</v-btn>
        <v-btn small>삭제</v-btn>
      </v-card-actions>
    </div>
  </div>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-text>
        <v-text-field label="비밀번호" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small color="purple" dark @click.native="dialog = false">확인</v-btn>
        <v-btn small @click.native="dialog = false">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-card>
</template>

<script>
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
      modifyMode: Array.from({
        length: this.items.length
      })
    }
  },
  methods: {}
}
</script>

<style>
</style>
