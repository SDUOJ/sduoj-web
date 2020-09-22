<template>
   <div>
       <NavPath></NavPath>
       <div class="container">
       ProblemView
       </div>

    </div> 
</template>

<script>
import { mapMutations } from 'vuex';
import NavPath from '../../components/NavPath.vue';
export default {
  components: { NavPath },
  methods: {
    ...mapMutations(['updatePathComponents'])
  },
  mounted: function() {
    this.updatePathComponents([{
      name: 'Problem',
      url: '/problem'
    }])
  }
}
</script>

<style lang="less" scoped>

</style>