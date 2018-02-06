<template>
<v-tooltip bottom>
  <v-btn icon small flat color="purple darken-1" @click.stop="$emit('evClick')" slot="activator">
    <v-icon>reply</v-icon>
  </v-btn>
  <span>댓글</span>
</v-tooltip>
</template>
