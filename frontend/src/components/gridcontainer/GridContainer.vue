<template>
  <v-layout row
    wrap
    justify-center>
    <v-flex v-bind="{ [`sm${item.flex}`]: true, 'xs12': true }"
      v-for="(item, index) in items"
      :key="index">
      <slot :item="item"></slot>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['items'],
  created() {}
}
</script>
