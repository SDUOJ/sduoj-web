import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { VBtn, VBottomNavigation, VIcon } from 'vuetify/lib/components';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

const opts = {
  components: {
    VBottomNavigation,
    VBtn,
    VIcon
  }
};

export default new Vuetify(opts)
