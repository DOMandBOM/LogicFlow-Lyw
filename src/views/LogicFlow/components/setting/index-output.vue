<!-- 输出节点二号 -->
<template>
  <div class="flow-setting">
    <div class="setting-title">输出节点二号</div>
    <div class="setting-item">
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "FlowSetting" }
</script>
<script lang="ts" setup>
import LogicFlow from "@logicflow/core"
import { onMounted, ref, watch } from "vue"

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
</style>
