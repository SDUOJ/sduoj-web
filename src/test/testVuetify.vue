<template>
  <div>
    <v-bottom-navigation
      :value="value"
      color="primary"
    >
      <v-btn>
        <span>Recents</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>

        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { VBtn, VBottomNavigation, VIcon } from 'vuetify/lib/components'
export default {
  components: { VBtn, VBottomNavigation, VIcon },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
