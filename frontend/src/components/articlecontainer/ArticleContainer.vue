<script>
import { mapActions, mapGetters } from 'vuex'
import type from '@/store/type'

export default {
  render(createElement) {
    let data = {
      props: {}
    }

    if (this.summary) {
      data.props['ripple'] = true
      data.props['to'] = {
        name: 'article_view',
        params: {
          pk: this.item.pk,
          item: this.item
        }
      }
      data.props['hover'] = true
    }

    return createElement('v-card', data, [
      this.createTitle(),
      this.createText(),
      this.createActions(),
      ...this.createCommentTextbox(),
      ...this.createComments()
    ])
  },
  props: {
    article: {
      type: Object
    },
    summary: {
      type: Boolean
    }
  },
  computed: {
    articleText() {
      if (this.summary) {
        return this.item.fields.body.slice(0, 256).concat('.'.repeat(12))
      }
      return this.item.fields.body
    },
    ...mapGetters({
      comments: type.COMMENT_ITEMS
    })
  },
  methods: {
    doFavorite() {
      this[type.UPDATE_ARTICLE_ITEM]({ item: this.item })
        .then(resolve => {
          this.item = Object.assign({}, resolve)
          // this.$router.push({
          //   name: 'article_view',
          //   params: { pk: resolve.pk, item: resolve }
          // })
        })
        .catch(error => {
          console.log(error)
        })
    },
    ...mapActions([type.COMMENT_ITEMS, type.UPDATE_ARTICLE_ITEM]),
    fetchCommentData() {
      this[type.COMMENT_ITEMS]({ fk: this.item.pk })
        .then(resolve => {})
        .catch(error => {
          console.log(error)
        })
    },
    createCommentTextbox() {
      if (this.showCommentInput) {
        return [
          this.$createElement('v-card', [
            this.$createElement('v-card-text', [
              this.$createElement('v-text-field', {
                props: {
                  name: 'input-1',
                  label: 'label text',
                  textarea: true
                }
              })
            ]),
            this.$createElement('v-card-actions', [
              this.$createElement('v-btn', { props: { flat: true } }, '취소')
            ])
          ])
        ]
      }
      return []
    },
    createComments() {
      let comments = []

      if (!this.summary) {
        for (let comment of this.comments.items) {
          comments.push(
            this.$createElement('v-divider'),
            this.$createElement('v-card-text', comment.fields.body),
            this.$createElement('v-card-actions', [
              this.$createElement(
                'div',
                {
                  class: {
                    caption: true,
                    'ma-2': true,
                    'pa-2': true
                  }
                },
                this.item.fields.modify_date
              ),
              this.$createElement(
                'div',
                {
                  class: {
                    caption: true,
                    'ma-2': true,
                    'pa-2': true
                  }
                },
                this.item.fields.author
              )
            ])
          )
        }
      }

      return comments
    },
    createTitle() {
      return this.$createElement(
        'v-card-title',
        {
          props: {
            'primary-title': true
          }
        },
        [
          this.$createElement(
            'span',
            {
              class: {
                headline: true,
                'deep-orange--text': true,
                'text--accent-3': true
              }
            },
            this.item.fields.title
          )
        ]
      )
    },
    createText() {
      return this.$createElement('v-card-text', [
        this.$createElement('section', {
          domProps: {
            innerHTML: this.articleText
          }
        })
      ])
    },
    createActions() {
      return this.$createElement('v-card-actions', [
        this.$createElement(
          'div',
          {
            class: {
              caption: true,
              'ma-2': true,
              'pa-2': true
            }
          },
          this.item.fields.modify_date
        ),
        this.$createElement(
          'div',
          {
            class: {
              caption: true,
              'ma-2': true,
              'pa-2': true
            }
          },
          this.item.fields.author
        ),
        this.$createElement('v-spacer'),
        this.$createElement('iu-favorite-btn', {
          props: {
            numStars: this.item.fields.num_stars,
            clickable: !this.summary
          },
          on: {
            evClick: () => {
              this.doFavorite()
            }
          }
        }),
        ...this.createActionOps()
      ])
    },
    createActionOps() {
      let ops = []

      if (this.summary) {
        ops = [
          ...ops,
          this.$createElement(
            'v-icon',
            { props: { large: true, color: 'purple darken-1' } },
            'more_horiz'
          )
        ]
      } else {
        ops = [
          ...ops,
          this.$createElement('iu-reply-btn', {
            on: {
              evClick: () => {
                console.log(this.item.fields.title)
                this.showCommentInput = !this.showCommentInput
              }
            }
          })
        ]
      }
      return ops
    }
  },
  data() {
    return {
      item: null,
      showCommentInput: false
    }
  },
  created() {
    this.item = Object.assign({}, this.article)
    if (!this.summary) {
      this.fetchCommentData()
    }
  }
}
</script>
