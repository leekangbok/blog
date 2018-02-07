<template>
<v-form v-model="valid" ref="form" lazy-validation>
  <v-card class="ma-1 pa-1" hover>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field label="이름" v-model="author" :rules="authorRules" :counter="64" required></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field @focus="alert = false" :rules="passwdRules" label="비밀번호" v-model="passwd" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" :counter="64" required></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field @focus="alert = false" :rules="passwdRules" label="비밀번호확인" v-model="repasswd" :append-icon="e2 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'" :counter="64" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="글을 남겨주세요" v-model="body" :rules="bodyRules" :counter="2048" textarea required></v-text-field>
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
      <v-btn @click="submit" :disabled="!valid" color="purple white--text" small>
        {{ item.fields.body ? '수정' : '저장' }}
      </v-btn>
      <v-btn @click="clear" small>취소</v-btn>
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
          fields: {}
        }
      }
    },
    updateError: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    alert: {
      get() {
        return this.updateError || this.error
      },
      set(value) {
        this.error = value
        this.$emit('update:updateError', value)
      }
    }
  },
  data() {
    return {
      error: false,
      valid: true,
      author: this.item.fields.author || '',
      authorRules: [
        v => !!v || '이름이 필요합니다',
        v => (v && v.length <= 64) || '이름은 64자 보다 짧아야 합니다'
      ],
      body: this.item.fields.body || '',
      bodyRules: [
        v => !!v || '댓글을 적어주세요',
        v => (v && v.length <= 2048) || '댓글을 2048자 보다 짧아야 합니다'
      ],
      passwd: '',
      repasswd: '',
      passwdRules: [
        v => !!v || '비밀번호가 필요합니다',
        v => (v && v.length >= 8) || '비밀번호는 8자 보다 길어야 합니다.'
      ],
      e1: true,
      e2: true
    }
  },
  methods: {
    submit() {
      if (this.passwd !== this.repasswd) {
        this.alert = true
        return
      } else {
        this.alert = false
      }
      if (this.$refs.form.validate()) {
        this.$emit('evSubmit', {
          author: this.author,
          body: this.body,
          passwd: this.passwd,
          pk: this.item.pk,
          fk: this.item.fields.article
        })
      }
    },
    clear() {
      this.$refs.form.reset()
      this.$emit('evCancel')
      this.$emit('update:updateError', false)
    }
  }
}
</script>
