<template>
<v-tabs fixed @input="tabPush">
  <v-toolbar v-bind="$attrs">
    <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 172px'" class="ml-0 pl-3" v-if="!searchMode">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span class="hidden-xs-only" v-if="title.length">{{ title }}</span>
    </v-toolbar-title>
    <template v-else>
        <v-btn @click="searchMode=!searchMode"
          icon
          small>
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-text-field class="mt-2 mb-2" prepend-icon="search"
          :prepend-icon-cb="() => $emit('evSearch', search)"
          @keyup.enter="$emit('evSearch', search)"
          v-model.trim="search"
          solo
          :append-icon="search ? 'clear' : ''"
          :append-icon-cb="() => search = ''"
          hide-details
          light
          single-line
          style="min-width: 130px"></v-text-field>
      </template>
    <div class="d-flex align-center" style="margin-left: auto">
      <v-btn @click="searchMode=!searchMode" icon small v-if="!searchMode">
        <v-icon>search</v-icon>
      </v-btn>
      <slot></slot>
    </div>
    <v-tabs-bar color="transparent" slot="extension" v-if="items">
      <v-tabs-slider id="topnav-tabs-slider" :color="sliderColor" v-if="sliderColor"></v-tabs-slider>
      <v-tabs-item ripple v-for="(item, i) in items" :key="i" :href="`#${item.name}`" :active-class="`default-class ${activeColor}`">
        {{ item.title }}
      </v-tabs-item>
    </v-tabs-bar>
  </v-toolbar>
</v-tabs>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
import type from '@/store/type'

export default {
  props: {
    items: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    sliderColor: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchMode: false,
      search: ''
    }
  },
  computed: {
    drawer: {
      get() {
        return this.sideNavDrawer
      },
      set(value) {
        this.setSideNavDrawer(value)
      }
    },
    ...mapState({
      sideNavDrawer: type.SIDENAV_DRAWER
    })
  },
  methods: {
    ...mapMutations({
      setSideNavDrawer: type.SIDENAV_DRAWER
    }),
    tabPush(value) {
      if (value === 'HOME') {
        this.$router.push({
          name: 'home'
        })
        return
      }
      this.$router.push({
        name: 'home',
        query: {
          tag: value
        }
      })
    }
  }
}
</script>

<style>
#topnav-tabs-slider {
  height: 4px;
}
</style>
