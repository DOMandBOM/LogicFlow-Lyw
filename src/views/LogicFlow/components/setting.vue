<template>
  <div class="setting" v-if="component && props.flag">
    <component :is="component" :lf="props.lf" :data="props.data"></component>
  </div>
</template>

<script lang="ts">
export default { name: 'Setting' }
</script>
<script lang="ts" setup>
import LogicFlow from '@logicflow/core'
import { computed } from 'vue'
import dataAudit from './setting/data-audit.vue'
import dataOutput from './setting/data-output.vue'
import dataProcessing from './setting/data-processing.vue'
import dataSetoutput from './setting/data-setoutput.vue'
import dataSource from './setting/data-source.vue'
import governanceOutput from './setting/governance-output.vue'
import indexOutput from './setting/index-output.vue'
import metadataOutput from './setting/metadata-output.vue'
import pasteSource from './setting/paste-source.vue'

const props = defineProps<{
  lf?: LogicFlow
  data: LogicFlow.NodeData | LogicFlow.EdgeData
  type: any,
  flag: boolean
}>()

const component = computed(() => {
  let comp = null as any
  switch (props.type) {
    case 'all':
      comp = null
      break
    case 'dataSource':
      comp = dataSource
      break
    case 'dataProcessing':
      comp = dataProcessing
      break
    case 'metadataOutput':
      comp = metadataOutput
      break
    case 'indexOutput':
      comp = indexOutput
      break
    case 'dataSetoutput':
      comp = dataSetoutput
      break
    case 'dataOutput':
      comp = dataOutput
      break
    case 'dataAudit':
      comp = dataAudit
      break
    case 'pasteSource':
      comp = pasteSource
      break
    case 'governanceOutput':
      comp = governanceOutput
      break
    default:
      comp = null
      break
  }
  return comp
})
</script>

<style lang="scss" scoped>
.setting {
  padding: 0px 20px;
  box-sizing: border-box;
  overflow-y: scroll;
}
</style>
