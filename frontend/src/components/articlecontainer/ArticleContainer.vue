<template>
<v-card>
  <v-card
    ripple flat
    :to="{name: 'article_view', params: {pk: item.pk, item}}">
    <v-card-title primary-title>
      <span class="headline deep-orange--text text--accent-3">{{ item.fields.title }}</span>
    </v-card-title>
    <v-card-text>
      <section v-html="articleText"></section>
    </v-card-text>
  </v-card>
  <v-card-actions>
      <div class="caption ma-2 pa-2">{{ item.fields.modify_date }}</div>
      <div class="caption ma-2 pa-2">{{ item.fields.author }}</div>
      <v-spacer></v-spacer>
      <v-badge left
        overlap>
        <span slot="badge">{{ item.fields.num_stars }}</span>
        <v-tooltip bottom>
        <v-btn small
          class="ma-0 pa-0"
          color="purple darken-1"
          flat
          icon
          @click.stop="doFavorite"
          slot="activator">
          <v-icon>favorite</v-icon>
        </v-btn>
        <span>좋아요!</span>
        </v-tooltip>
      </v-badge>
      <v-tooltip bottom>
      <v-btn flat
          class="caption"
          color="purple darken-1"
          @click.stop="doFavorite"
          slot="activator">
          <v-icon>reply</v-icon>
        </v-btn>
        <span>답글</span>
      </v-tooltip>
    </v-card-actions>
    <!-- <v-divider></v-divider>
    <v-card>
      <v-card-title>
        <span>abcdefg</span>
      </v-card-title>
    </v-card>
        <v-divider></v-divider>
    <v-card>
      <v-card-title>
        <span>abcdefg</span>
      </v-card-title>
    </v-card>
        <v-divider></v-divider>
    <v-card>
      <v-card-title>
        <span>abcdefg</span>
      </v-card-title>
    </v-card>
        <v-divider></v-divider>
    <v-card>
      <v-card-title>
        <span>abcdefg</span>
      </v-card-title>
    </v-card>
        <v-divider></v-divider>
    <v-card>
      <v-card-title>
        <span>abcdefg</span>
      </v-card-title>
    </v-card> -->
</v-card>
</template>

<script>
export default {
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
    }
  },
  methods: {
    doFavorite() {
      console.log('do favorite')
    }
  }
}
</script>
