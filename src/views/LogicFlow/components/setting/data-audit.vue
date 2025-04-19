<!-- 稽核节点一号 -->
<template>
  <div class="flow-setting">
    <div class="setting-title">稽核节点一号</div>
    <div class="setting-item">

    </div>
  </div>
</template>

<script lang="ts">
export default { name: "FlowSetting" }
</script>
<script lang="ts" setup>
import LogicFlow from "@logicflow/core"
import { ref, watch, computed } from "vue"
import { lywMessage } from '@/utils/feedBack'

</script>

<style lang="scss" scoped>
.setting-title {
  padding: 10px 0;
  border-bottom: 1px solid #e9e9e9;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.setting-item {
  .setting-item-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #e9e9e9;
  }
}

.add {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border: 1px solid #289cf7;
  padding: 4px;
  border-radius: 12px;
  background-color: #289cf7;
  color: #fff;
}

.del {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border: 1px solid #f56c6c;
  padding: 4px;
  border-radius: 12px;
  background-color: #f56c6c;
  color: #fff
}

::v-deep .el-textarea__inner {
  resize: none !important;
}
</style>
