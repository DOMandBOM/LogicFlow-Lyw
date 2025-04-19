<template>
  <div class="logic-flow-container">
    <NodePanel
      :idType="id"
      :lf="lf"
      :clearState="clearState"
      @changeFlag="changeFlag"
      ref="nodePanelRef"
    >
    </NodePanel>
    <div class="logic-flow-main">
      <div class="control">
        <div class="control-flex">
          <div class="control-btns">
            <div
              v-for="(item, index) in tabList"
              :key="index"
              class="control-item"
              @click="doClick(item.type)"
              :style="{ borderRight: index != tabList.length - 1 ? '1px solid #999999' : '' }"
            >
              <el-tooltip effect="dark" :content="item.label" placement="top">
                <img v-if="index == 0 && undoDisable" :src="item.disIcon" class="btn1" alt="" />
                <img v-else-if="index == 0" :src="item.icon" class="btn1" alt="" />
                <img v-if="index == 1 && redoDisable" :src="item.disIcon" class="btn2" alt="" />
                <img v-else-if="index == 1" :src="item.icon" class="btn2" alt="" />
                <img v-if="index == 2" :src="item.icon" class="btn3" alt="" />
                <img v-if="index == 4" :src="item.icon" class="btn3" alt="" />
                <img v-if="index == 5" :src="item.icon" class="btn3" alt="" />
                <img v-if="index == 3 || index == 6" :src="item.icon" class="btn4" alt="" />
              </el-tooltip>
            </div>
          </div>
          <el-button type="primary" @click="open" style="height: 38px">提交</el-button>
        </div>
      </div>
      <div class="logic-flow">
        <div style="height: 100%" ref="logicFlowRef"></div>
        <Setting
          class="logic-flow-setting"
          :data="nodeData!"
          :lf="lf"
          :type="state.settingType"
          :flag="flag"
        ></Setting>
      </div>
    </div>
    <el-drawer v-model="show" title="数据提交" width="500">
      <el-form label-width="150px" :model="form" ref="ruleFormRef" label-position="top">
        <el-form-item label="名称">
          <el-input v-model="form.processName" placeholder="请输入名称" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="submit()">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
export default { name: 'LogicFlow' }
</script>
<script lang="ts" setup>
import LogicFlow from '@logicflow/core'
import '@logicflow/core/lib/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import { nextTick, onMounted, provide, reactive, ref, shallowRef } from 'vue'
import NodePanel from './components/node-panel.vue'
import Setting from './components/setting.vue'
import { registeNode } from './index'

import { lywMessage, lywConfirm } from '@/utils/feedBack'

import { controlData } from './util/controlData'

const lf = shallowRef<LogicFlow>() // lf实例
const nodePanelRef = ref() // 侧边栏实例

// 清空数据
const clear = () => {
  lywConfirm('您确定要清空吗?', null, () => {
    nodePanelRef.value.id = null
    predecessorNodeId.value = null
    successorNodeId.value = null
    lf.value?.clearData()
    state.settingType = 'all'
  })
}

// 上方按钮功能
const { tabList, undoDisable, redoDisable, doClick } = controlData(lf, clear)

// 控制动态组件显示与隐藏
const flag = ref(false)

const id = ref<any>(null)

const changeFlag = (val: any) => {
  flag.value = val
}
const logicFlowRef = ref<HTMLDivElement>()
const nodeData = ref<LogicFlow.NodeData | LogicFlow.EdgeData>() // 节点数据
const state = reactive({
  settingType: 'all' as any,
})

const form = ref<any>({
  processName: '',
})

const show = ref(false)

const open = () => {
  if ((lf.value?.getGraphData() as any).nodes.length == 0)
    return lywMessage('渲染面板无数据，请拖拽数据后再提交', 'error')
  show.value = true
}
const clearState = () => {
  state.settingType = 'all'
}

const getSettingInfo = (data: LogicFlow.NodeData | LogicFlow.EdgeData) => {
  switch (data.type) {
    case 'dataSource':
      flag.value = true
      nodeData.value = data
      state.settingType = data.type
      break
    case 'dataProcessing':
      flag.value = true
      nodeData.value = data
      state.settingType = data.type
      break
    case 'metadataOutput':
      flag.value = true
      nodeData.value = data
      state.settingType = data.type
      break
    case 'indexOutput':
      flag.value = true
      nodeData.value = data
      state.settingType = data.type
      break
    case 'dataSetoutput':
      flag.value = true
      nodeData.value = data
      state.settingType = data.type
      break
    case 'dataOutput':
      flag.value = true
      nodeData.value = data
      state.settingType = data.type
      break
    case 'dataAudit':
      flag.value = true
      nodeData.value = data
      state.settingType = data.type
      break
    case 'pasteSource':
      flag.value = true
      nodeData.value = data
      state.settingType = data.type
      break
    case 'governanceOutput':
      flag.value = true
      nodeData.value = data
      state.settingType = data.type
      break
  }
}
const predecessorNodeId = ref<any>(null)
const successorNodeId = ref<any>(null)

//注册事件
const initEvent = (lf: any) => {
  lf.value?.on('blank:click', (e: any) => {
    state.settingType = 'all'
  })
  lf.value?.on('node:mousedown', ({ data }: { data: any }) => {
    const { id, x, y, type } = data
    const connectedEdges = lf.value?.getNodeEdges(id)
    // console.log(connectedEdges, 'connectedEdges')
    predecessorNodeId.value = null
    successorNodeId.value = null
    connectedEdges?.forEach((edge: any) => {
      if (edge.targetNodeId === id) {
        predecessorNodeId.value = edge.sourceNodeId // 前驱节点
      }
      if (edge.sourceNodeId === id) {
        successorNodeId.value = edge.targetNodeId // 后继节点
      }
    })
    lf.value?.selectElementById(data.id, false)
    getSettingInfo(data)
  })
  lf.value?.on('edge:click', ({ data }: { data: any }) => {
    lf.value?.selectElementById(data.id, false)
    getSettingInfo(data)
  })
  lf.value?.on('connection:not-allowed', (data: any) => {
    lywMessage(data.msg, 'error')
    return false
  })
  // lf.value?.on('anchor:dragend', ({ data, e, nodeModel }) => {
  //   nextTick(() => {
  //     if ((lf.value?.getGraphData() as any).edges.length == list.value.length) {
  //       (lf.value?.getGraphData() as any).edges.forEach((item: any) => {
  //         list.value.forEach((domain: any, index: any) => {
  //           if (item.sourceNodeId == domain.id) {
  //             list.value.splice(index, 1)
  //           }
  //         })
  //       })
  //     }

  //     (lf.value?.getGraphData() as any).edges.forEach((item: any) => {
  //       if (!list.value.some((domain: any) => domain.id === item.sourceNodeId)) {
  //         list.value.push({ id: item.sourceNodeId, edgeId: item.id })
  //       } else {
  //         if (!list.value.some((domain: any) => domain.edgeId === item.id)) {
  //           lf.value?.deleteEdge(item.id)
  //           lywMessage('仅支持连接一条线', 'error')
  //         }
  //       }
  //     })
  //   })

  //   // lywMessage(data.msg, 'error')
  //   // return false
  // })
  lf.value?.on('node:dnd-add', ({ data }: { data: any }) => {
    // 选中节点 更改信息
    lf.value?.selectElementById(data.id, false)
    getSettingInfo(data)
    lf.value?.container.focus() // 聚焦 能够使用键盘操作
  })
  lf.value?.on('node:delete', (node: any) => {
    state.settingType = 'all'
    if (predecessorNodeId.value && successorNodeId.value) {
      lf.value?.addEdge({
        type: 'dashedLine',
        sourceNodeId: predecessorNodeId.value,
        targetNodeId: successorNodeId.value,
      })
    }
  })

  lf.value?.on('history:change', ({ data }: { data: any }) => {
    undoDisable.value = !data.undoAble
    redoDisable.value = !data.redoAble
  })
}

const ruleFormRef = ref()

const submit = () => {
  console.log(lf.value?.getGraphData())
}
onMounted(() => {
  lf.value = new LogicFlow({
    container: logicFlowRef.value!,
    grid: {
      size: 20,
      visible: true,
      type: 'mesh',
      config: {
        color: '#e9e9e9',
        thickness: 1,
      },
    },
    edgeType: 'dashedLine',
    autoLayout: true,
    textEdit: false,
  })

  registeNode(lf)
  initEvent(lf)

  lf.value.render({
    nodes: [],
    edges: [],
  })
  lf.value.translateCenter() // 将图形移动到画布中央
})
</script>

<style lang="scss" scoped>
.logic-flow-container {
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  user-select: none; // 禁止文本选择
  -webkit-user-select: none; // Safari 支持
  -moz-user-select: none; // Firefox 支持
  -ms-user-select: none; // IE/Edge 支持

  .logic-flow-main {
    display: flex;
    width: 100%;
    height: calc(100% - 54px);
    position: relative;
    background-color: #fff;
    flex: 1;
    height: 100%;
    flex-direction: column;
    border-radius: 6px;

    .control {
      padding: 22px 24px;
      background: #ffffff;
      box-shadow: 0px 0px 5px 0px rgba(1, 36, 88, 0.09);
      border-radius: 6px;
      border-bottom: 1px solid #e9e9e9;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .control-flex {
        display: flex;

        .control-btns {
          background: #ffffff;
          border-radius: 6px;
          border: 1px solid #dcdfe6;
          padding: 8px 3px;
          display: flex;
          margin-right: 10px;

          .control-item {
            padding: 0 23px;
            cursor: pointer;

            .btn1 {
              width: 21px;
              height: 17px;
            }

            .btn2 {
              width: 20px;
              height: 16px;
            }

            .btn3 {
              width: 16px;
              height: 16px;
            }

            .btn4 {
              width: 17px;
              height: 16px;
            }
          }
        }
      }
    }

    .logic-flow {
      position: relative;
      flex: 1;
      height: 100%;

      .logic-flow-setting {
        width: 380px;
        flex-basis: 400px;
        flex-shrink: 0;
        border-left: 1px solid #ccc;
        position: absolute;
        right: 0;
        top: 0;
        // z-index: 999999;
        height: 100%;
        background-color: #fff;
      }
    }
  }
}
</style>
