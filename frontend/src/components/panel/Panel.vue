<script>
export default {
  props: {
    bgImg: {
      type: String,
      default: ''
    }
  },
  render(createElement) {
    let children = null

    if (this.bgImg) {
      children = [
        createElement(
          'v-card-media', {
            props: {
              src: this.bgImg
            }
          },
          this.$slots.default
        )
      ]
    } else {
      children = this.$slots.default
    }
    return createElement(
      'v-card', {
        props: this.$attrs
      },
      children
    )
  }
}
</script>
