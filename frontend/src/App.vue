<template>
<v-app id="app">
  <SideNav :items="sideMenus" fixed app logoImages="static/images/logo.png" logoImagesHeight="200" v-model="drawer">
  </SideNav>
  <TopNav app fixed extended dark color="purple" sliderColor="white" activeColor="purple darken-2" @evSearch="searchArticle" title="inOs" :items="topMenus">
    <v-btn icon small>
      <v-icon>comment</v-icon>
    </v-btn>
    <v-btn icon small>
      <v-icon>account_circle</v-icon>
    </v-btn>
    <v-btn icon small>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </TopNav>
  <v-content>
    <v-container fluid grid-list-lg>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-container>
  </v-content>
  <v-footer color="light-blue darken-4" dark class="white--text" app>
    <span>{{ foot }}</span>
    <v-spacer></v-spacer>
    <span>inOs&copy; 2018</span>
  </v-footer>
  <Loading :show="loading" :label="loadingLabel">
  </Loading>
</v-app>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'
import Loading from 'vue-full-loading'
import type from '@/store/type'
import SideNav from '@/components/SideNav'
import TopNav from '@/components/TopNav'
import {
  sideNavItems
} from '@/router'

export default {
  name: 'App',
  data() {
    return {
      sideMenus: sideNavItems,
      topMenus: [{
          title: '홈',
          name: 'HOME'
        },
        {
          title: '여행',
          name: 'TRIP'
        },
        {
          title: '팀',
          name: 'TEAM'
        },
        {
          title: 'BBS',
          name: 'BBS'
        }
      ],
      foot: `
      Sonrie, es un mal dia no una mala vida,
      Smile, it's been just a bad day,
      not a bad life
      `,
      loadingLabel: 'Loading...'
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
      sideNavDrawer: type.SIDENAV_DRAWER,
      loading: type.LOADING
    })
  },
  methods: {
    searchArticle(query) {
      this.$router.push({
        name: 'home',
        query: {
          search: query
        }
      })
    },
    ...mapMutations({
      setSideNavDrawer: type.SIDENAV_DRAWER
    }),
    ...mapActions([type.ARTICLE_ITEMS])
  },
  components: {
    SideNav,
    TopNav,
    Loading
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50 !important;
  font-size: 12px !important;
  text-transform: none !important;
  /* font-weight: bold; */
}

.route-fade-enter-active,
.route-fade-leave-active {
  transition: opacity 0.5s;
}

.route-fade-enter,
.route-fade-leave-active {
  opacity: 0;
}

.list__tile__title {
  font-size: 12px !important;
  /* font-weight: bold !important; */
}

.toolbar__title {
  font-size: 16px !important;
  /* font-weight: bold; */
}

.btn--small {
  font-size: 12px !important;
  /* height: 24px !important; */
}

.btn__content {
  margin-right: 0px !important;
  margin-left: 0px !important;
  padding-right: 0px !important;
  padding-left: 0px !important;
}

.btn {
  min-width: 0px !important;
  padding-left: 5px !important;
  padding-right: 5px !important;
}

.tabs__item {
  font-weight: bold !important;
}

a.tabs__item:hover {
  color: grey !important;
}
</style>
