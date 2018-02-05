<template>
  <v-badge left
    overlap>
    <span slot="badge">{{ numStars }}</span>
    <v-tooltip bottom>
      <v-btn icon
        small
        flat
        color="purple darken-1"
        @click="onClick"
        slot="activator">
        <v-icon>thumb_up</v-icon>
      </v-btn>
      <span>좋아요!</span>
    </v-tooltip>
  </v-badge>
</template>

<script>
export default {
  props: {
    numStars: {
      type: Number,
      default: 0
    },
    clickable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClick(event) {
      if (this.clickable) {
        this.$emit('evClick')
      }
    }
  }
}
</script>
