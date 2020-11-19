<template>
  <mavon-editor
    style="z-index: 0; min-height: 0"
    :value="value"
    :subfield="false"
    :boxShadow="false"
    :toolbarsFlag="false"
    :imageClick="doNothing"
    defaultOpen="preview" />
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'Markdown',
  components: {
    mavonEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    doNothing: function() {}
  }
}
</script>

<style scoped>

</style>
