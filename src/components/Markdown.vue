<template>
  <mavon-editor
    style="z-index: 0"
    :value="value"
    :subfield="false"
    :boxShadow="false"
    :toolbarsFlag="false"
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
  }
}
</script>

<style scoped>

</style>
