<template lang="html">
  <div>
  <iu-panel flat color="transparent">
    <v-card-actions class="ml-0 pl-0">
      <v-text-field color="purple" class="ml-0 pl-0" prepend-icon="search" v-model="query" hide-details single-line></v-text-field>
      <v-spacer></v-spacer>
       <v-tooltip top>
        <v-btn icon dark class="purple" slot="activator" @click.native.stop="dialog = true">
          <v-icon>add</v-icon>
        </v-btn>
        <span>글추가</span>
      </v-tooltip>
    </v-card-actions>
    <v-data-table
     v-bind:headers="headers"
     :items="items"
     class="elevation-1">
       <template slot="headerCell" slot-scope="props">
         <v-tooltip bottom>
           <span slot="activator">
             {{ props.header.text }}
           </span>
           <span>
             {{ props.header.text }}
           </span>
         </v-tooltip>
       </template>
       <template slot="items" slot-scope="props">
         <td>{{ props.item.seq }}</td>
         <td class="purple--text text--darken-4">
           <router-link :to="{ name: 'bbs_view', params: {pk: props.item.seq} }">{{ props.item.title }}</router-link>
         </td>
         <td class="text-xs-right">{{ props.item.author }}</td>
         <td class="text-xs-right">{{ props.item.created_date.replace('T', ' ') }}</td>
         <td class="text-xs-right">{{ props.item.num_stars }}</td>
       </template>
    </v-data-table>
  </iu-panel>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <iu-bbs-form @evCancel="dialog = false" @evSubmit="doSubmit"></iu-bbs-form>
  </v-dialog>
</div>
</template>

<script>
import _ from 'lodash'
import type from '@/store/type'

export default {
  created() {
    this.fetchBbs()
  },
  methods: {
    fetchBbs(args = {}) {
      this[type.BBS_ITEMS](args)
        .then(response => {
          this.items = Array.from(response.items, x => {
            return {
              ...x.fields,
              seq: x.pk,
              num_stars: 0
            }
          })
        })
    },
    doSubmit(value) {
      this[type.ADD_BBS_ITEM](value)
        .then(response => {
          this.dialog = false
          this.fetchBbs()
        })
    },
    filterItems: _.debounce(
      function() {
        this.fetchBbs({
          query: this.query
        })
      },
      500
    )
  },
  watch: {
    'query' (value) {
      this.filterItems()
    }
  },
  computed: {},
  data() {
    return {
      query: '',
      dialog: false,
      headers: [{
          text: '번호',
          value: 'seq',
          align: 'left',
          sortable: false
        },
        {
          text: '제목',
          value: 'title',
          align: 'left',
          sortable: false
        },
        {
          text: '글쓴이',
          value: 'author',
          sortable: false
        },
        {
          text: '날짜',
          value: 'created_date',
          sortable: false
        },
        {
          text: '조회수',
          value: 'num_stars',
          sortable: false
        }
      ],
      items: []
    }
  }
}
</script>

<style lang="css">
</style>
