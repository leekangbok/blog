<template>
  <v-navigation-drawer v-bind="$attrs"
    :value="value"
    @input="value => $emit('input', value)">
    <v-card flat
      color="transparent">
      <v-card-media :src="logoImages"
        :height="`${logoImagesHeight}px`">
      </v-card-media>
      <v-divider></v-divider>
      <v-list>
        <template v-for="(item, i) in items">
          <v-list-group v-if="item.children"
            v-model="item.model"
            no-action
            :key="i">
            <v-list-tile slot="item">
              <v-list-tile-action>
                <v-icon :color="iconColor"
                  v-if="item.icon">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon :color="iconColor">keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children"
              :key="i"
              @click="$router.push(child.path)">
              <v-list-tile-action>
                <v-icon :color="iconColor"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else
            @click="$router.push(item.path)"
            :key="i">
            <v-list-tile-action>
              <v-icon :color="iconColor"
                v-if="item.icon">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ['items', 'value', 'iconColor', 'logoImages', 'logoImagesHeight']
}
</script>
