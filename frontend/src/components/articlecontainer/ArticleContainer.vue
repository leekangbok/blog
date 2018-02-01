<script>
import { mapActions, mapGetters } from 'vuex'
import type from '@/store/type'

export default {
  render(createElement) {
    let cardDataObject = {
      props: {}
    }

    if (this.summary) {
      cardDataObject.props['ripple'] = true
      cardDataObject.props['to'] = {
        name: 'article_view',
        params: {
          pk: this.item.pk,
          item: this.item
        }
      }
    }

    let cardTitle = createElement(
      'v-card-title',
      {
        props: {
          'primary-title': true
        }
      },
      [
        createElement(
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

    let cardText = createElement('v-card-text', [
      createElement('section', {
        domProps: {
          innerHTML: this.articleText
        }
      })
    ])

    let cardActionOps = []

    if (!this.summary) {
      cardActionOps = [
        ...cardActionOps,
        createElement('iu-reply-btn', {
          on: {
            evClick: () => {
              console.log(this.item.fields.title)
            }
          }
        })
      ]
    }

    let cardActions = createElement('v-card-actions', [
      createElement(
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
      createElement(
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
      createElement('v-spacer'),
      createElement('iu-favorite-btn', {
        props: {
          numStars: this.item.fields.num_stars,
          clickable: !this.summary
        },
        on: {
          evClick: () => {
            console.log(this.item.fields.num_stars)
          }
        }
      }),
      ...cardActionOps
    ])
    return createElement('v-card', cardDataObject, [
      cardTitle,
      cardText,
      cardActions
    ])
  },
  props: {
    item: {
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
      console.log('do favorite')
    },
    ...mapActions([type.COMMENT_ITEMS]),
    fetchCommentData() {
      this[type.COMMENT_ITEMS]({ fk: this.item.pk })
        .then(resolve => {
          console.log(resolve)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {
    if (!this.summary) {
      this.fetchCommentData()
    }
  }
}
</script>
