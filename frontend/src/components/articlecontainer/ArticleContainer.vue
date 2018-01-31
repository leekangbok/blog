<template>
  <v-card hover
    ripple
    :to="{name: 'article_view', params: {pk: item.title}}">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0 deep-orange--text text--accent-3">{{ item.title }}</h3>
        <div>{{ item.text.slice(0, 256).concat('.'.repeat(12)) }}</div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ['item']
}
</script>
