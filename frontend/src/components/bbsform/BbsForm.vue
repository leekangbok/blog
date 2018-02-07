<template lang="html">
<v-form v-model="valid" ref="form" lazy-validation>
<v-card>
  <v-card-text>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field label="이름" :rules="authorRules" v-model="author" hint="자신을 표현할 수 있는 단어를 적어주세요" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="제목" :rules="titleRules" v-model="title" hint="내용을 요약해서 적어주세요" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="내용" :rules="bodyRules" v-model="body" hint="자유롭게 작성하세요" :counter="2048" textarea required></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field @focus="alert = false" label="비밀번호" :rules="passwdRules" v-model="passwd" type="password" required></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field @focus="alert = false" label="비밀번호확인" :rules="passwdRules" v-model="repasswd" type="password" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-alert color="error" outline icon="warning" :value="alert" transition="scale-transition">
            비밀번호가 일치하지 않습니다.
          </v-alert>
        </v-flex>
      </v-layout>
    </v-container>
    <small>*필수입력</small>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn small @click.native="clear">취소</v-btn>
    <v-btn small color="purple white--text" @click.native="submit" :disabled="!valid">{{ item.title ? '수정' : '저장' }}</v-btn>
  </v-card-actions>
</v-card>
</v-form>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {
          author: '',
          title: '',
          body: ''
        }
      }
    }
  },
  methods: {
    submit() {
      if (this.passwd !== this.repasswd) {
        this.alert = true
        return
      }
      this.$emit('evSubmit', {
        author: this.author,
        title: this.title,
        body: this.body,
        passwd: this.passwd
      })
    },
    clear() {
      this.$refs.form.reset()
      this.$emit('evCancel')
      this.$emit('update:updateError', false)
    }
  },
  data() {
    return {
      alert: false,
      valid: true,
      author: this.item.author || '',
      title: this.item.title || '',
      body: this.item.body || '',
      passwd: '',
      repasswd: '',
      authorRules: [
        v => !!v || '이름이 필요합니다',
        v => (v && v.length <= 64) || '이름은 64자 보다 짧아야 합니다'
      ],
      titleRules: [
        v => !!v || '제목이 필요합니다',
        v => (v && v.length <= 128) || '제목은 6128자 보다 짧아야 합니다'
      ],
      bodyRules: [
        v => !!v || '댓글을 적어주세요',
        v => (v && v.length <= 2048) || '댓글을 2048자 보다 짧아야 합니다'
      ],
      passwdRules: [
        v => !!v || '비밀번호가 필요합니다',
        v => (v && v.length >= 8) || '비밀번호는 8자 보다 길어야 합니다.'
      ]
    }
  }
}
</script>

<style lang="css">
</style>
