<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return null
      }
    },
    comments: {
      type: Array,
      default () {
        return []
      }
    },
    summary: {
      type: Boolean,
      default: false
    }
  },
  render(createElement) {
    if (!this.item) {
      return createElement('v-card')
    }

    let data = {
      props: {}
    }

    if (this.summary) {
      data.props['ripple'] = true
      data.props['to'] = {
        name: 'article_view',
        params: {
          pk: this.item.pk
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
  computed: {
    articleText() {
      if (this.summary) {
        return this.item.fields.body.slice(0, 256).concat('.'.repeat(12))
      }
      return this.item.fields.body
    }
  },
  methods: {
    createCommentTextbox() {
      if (this.showCommentInput) {
        return [this.$createElement('iu-reply-form', {
          on: {
            evSubmit: value => {
              this.$emit('evSubmitComment', value)
              this.showCommentInput = !this.showCommentInput
            },
            evCancel: () => {
              this.showCommentInput = !this.showCommentInput
            }
          }
        })]
      }
      return []
    },
    createComments() {
      if (!this.summary) {
        return [this.$createElement('iu-reply-container', {
          props: {
            items: this.comments
          }
        })]
      }
      return []
    },
    createTitle() {
      return this.$createElement(
        'v-card-title', {
          props: {
            'primary-title': true
          }
        }, [
          this.$createElement(
            'span', {
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
          'div', {
            class: {
              caption: true,
                'blue--text': true,
                'ma-2': true,
                'pa-2': true
            }
          },
          this.item.fields.created_date.replace('T', ' ')
        ),
        this.$createElement(
          'div', {
            class: {
              'body-1': true,
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
              this.$emit('evFavorite')
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
            'v-icon', {
              props: {
                large: true,
                color: 'purple darken-1'
              }
            },
            'more_horiz'
          )
        ]
      } else {
        ops = [
          ...ops,
          this.$createElement('iu-reply-btn', {
            on: {
              evClick: () => {
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
      showCommentInput: false
    }
  },
  created() {}
}
</script>
