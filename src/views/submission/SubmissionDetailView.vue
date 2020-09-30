<template>
  <div class="container">
    <Row>
      <Col span="18">
      123
      </Col>
      <Col span="6">
        <div class="btns">
          <Button style="width: 100%; display: block; margin: 15px 0;" v-if="!!submission.isPublic" type="success">Public Submission</Button>
          <Button style="width: 100%; display: block; margin: 15px 0;" v-else>Private Submission</Button>
        </div>
        <Card class="submission-box">
          <div slot="header" class="submission-box-header">Info</div>
              <div class="submission-info">
                <dl>
                  <dt>Submission ID</dt>
                  <dd>{{ submission.SubmissionId }}</dd>
                </dl>
                <dl>
                  <dt>Problem ID</dt>
                  <dd class="hover" @click="gotoProblem(submissionId.problemId)">{{ submission.problemId }}</dd>
                </dl>
                <dl>
                  <dt>Username</dt>
                  <dd class="timelimit">{{ submission.username }}</dd>
                </dl>
                <dl>
                  <dt>Total Time</dt>
                  <dd class="timelimit">{{ submission.time }}</dd>
                </dl>
                <dl>
                  <dt>Total Memory</dt>
                  <dd class="memlimit">{{ submission.memory }}</dd>
                </dl>
              </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import Card from '@/components/Card';

export default {
  components: { Card },
  data: function() {
    return {
      submission: {
        submissionId: '',
        problemId: '',
        username: '',
        time: '',
        memory: '',
        code: '',
        judgeResult: '',
        judgerLog: '',
        isPublic: 1
      }
    }
  },
  methods: {
    gotoProblem: function(problemId) {
      this.$router.push('/problem/' + problemId);
    }
  }
}
</script>

<style lang="less" scoped>
.btns {
  width: 100%;
}
.submission-box {
  margin: 5px 0 20px 0; 
  .problem-box-header {
    margin-left: 8px;
  }
}

.hover:hover {
  cursor: pointer;
}

.submission-info {
  user-select: none;
  dl {
    margin: 8px 0;
  }
  dt,dd {
    display:inline; 
    margin:0; 
    padding:0;
  } 
  dd {
    float: right;
  }
  dt {
    font-weight: bold;
  }
  dd::after{
    content:"\0A";
    white-space:pre;
  }
  .time::after {
    content:" ms\0A";
    white-space:pre; 
  }
  .mem::after {
    content:" KB\0A";
    white-space:pre; 
  }
}
</style>