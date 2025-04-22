<template>
  <div ref="containerRef" class="viewport"></div>
  <TeleportContainer :flow-id="flowId" />
</template>

<script setup lang="ts">
import LogicFlow, { BezierEdge } from '@logicflow/core'
import '@logicflow/core/es/index.css'
import { getTeleport, register } from '@logicflow/vue-node-registry'
import { nextTick, onMounted, ref } from 'vue'
import CustomNodeLine from './Model/CustomNodeLine'
import CustomNodeModel from './Model/CustomNodeModel'
import ProgressNode from './components/ProgressNode.vue'
import { commonData } from './utils/commonData'
// 假数据
const { tableData } = commonData()
// ref
const containerRef = ref<HTMLDivElement | null>(null)

const TeleportContainer = getTeleport()

const flowId = ref('')
const lf = ref<LogicFlow>()

onMounted(() => {
  if (containerRef.value) {
    lf.value = new LogicFlow({
      container: containerRef.value!,
      grid: true,
      nodeTextEdit: false,
      edgeTextEdit: false,
      zoom: {
        min: 0.2,
        max: 2,
        size: 0.1,
      },
    })
    register(
      {
        type: 'custom-vue-node',
        component: ProgressNode,
        model: CustomNodeModel,
      },
      lf.value,
    )

    lf.value?.register({
      type: 'CustomNodeLine',
      view: BezierEdge,
      model: CustomNodeLine,
    })


    lf.value?.graphModel.transformModel.zoom(0.5)

    lf.value.graphModel.setDefaultEdgeType('CustomNodeLine')

    initEvent(lf)

    lf.value.render({
      nodes: [],
      edges: [],
    })

    tableData.value.nodes.forEach((item: any, index: any) => {
      lf.value?.addNode({
        id: item.id,
        type: 'custom-vue-node',
        x: item.x,
        y: item.y,
        properties: {
          tableObject: {
            list: item.list,
            modeName: item.modeName,
            tableName: item.tableName,
            id: item.id,
          },
          width: 480,
          height: 280,
        },
      })
    })
    tableData.value.edges.forEach((item: any) => {
      lf.value?.addEdge({
        id: item.id,
        sourceNodeId: item.sourceNodeId,
        targetNodeId: item.targetNodeId,
        sourceAnchorId: item.sourceAnchorId,
        targetAnchorId: item.targetAnchorId,
        type: 'CustomNodeLine',
      })
    })

    lf.value?.translateCenter()
  }
})

// 编辑与移除事件结果
const sendStatus = (flag: boolean) => {
  lf.value?.graphModel.eventCenter.emit('node:axiosStatus', flag)
}

// 编辑与移除事件
const initEvent = (lf: any) => {
  lf.value.on('graph:rendered', ({ graphModel }: { graphModel: any }) => {
    flowId.value = graphModel.flowId!
  })
  lf.value?.graphModel.eventCenter.on('node:doEdit', (agrs: any) => {
    const { form, pojoList } = agrs
    console.log({ form, pojoList }, '编辑')
    sendStatus(true)
  })

  lf.value?.graphModel.eventCenter.on('node:doDel', (agrs: any) => {
    const {
      data: { modeName, tableName },
    } = agrs
    console.log({ modeName, tableName }, '移除')
    sendStatus(true)
  })
}
</script>

<style>
.viewport {
  height: calc(100vh - 120px);
}
</style>
