<template>
<iu-grid-container :items="items">
  <template slot-scope="props">
      <iu-article-container :item="props.item"
        summary>
      </iu-article-container>
    </template>
</iu-grid-container>
</template>

<script>
export default {
  props: {
    items: {
      typs: Array,
      default () {
        return []
      }
    }
  }
}
</script>
