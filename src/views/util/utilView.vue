<template>
  <Row style="background:#eee;padding:20px">
    <Col span="8">
      <Card :bordered="false">
        <p slot="title" @click="TurnModalVisible">Export the contest comprehensive report</p>
        <p @click="TurnModalVisible">根据群组id与该群组的比赛id导出符合配置的综合报表</p>
      </Card>
    </Col>

    <Modal v-model="ContestComprehensiveReportVisible">
      <UtilForm name="zzz"></UtilForm>
    </Modal>
  </Row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UtilForm from '@/components/form/util/UtilForm.vue';
// import { getModalTurnFunction } from '@/types/globals';

@Component({
  components: { UtilForm }
})
export default class utilView extends Vue {
  ContestComprehensiveReportVisible: Boolean = false
  // TurnModalVisible: () => (void) = getModalTurnFunction(this.ContestComprehensiveReportVisible)
  TurnModalVisible() { this.ContestComprehensiveReportVisible = !this.ContestComprehensiveReportVisible }
}
</script>
