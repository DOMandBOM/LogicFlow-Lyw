<template>
  <div class="box">
    <div class="box-title">页面标题</div>
    <div class="box-input">
      <el-input class="box-input-item" v-model="searchInfo" placeholder="请输入关键字" :suffix-icon="Search"></el-input>
      <el-tooltip class="box-item" effect="dark" content="重置" placement="top">
        <div class="icon-item">
          <el-icon @click="searchInfo = ''" size="20">
            <RefreshRight />
          </el-icon>
        </div>
      </el-tooltip>
    </div>
    <div class="tree">
      <template v-if="filteredTreeData.length > 0">
        <TreeNode ref="treeNodeRef" v-for="item in filteredTreeData" :key="item.id" :node="item"
          @customChange="dragNode" />
      </template>
      <div v-else class="empty-item">
        <el-empty :image-size="100" description="暂无搜索内容~" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'NodePanel' }
</script>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import LogicFlow from '@logicflow/core'
import { ref, computed, nextTick } from 'vue'
import chuli from '../images/father/chuli.png'
import jicha from '../images/father/jicha.png'
import moban from '../images/father/moban.png'
import shuchu from '../images/father/shuchu.png'
import shuru from '../images/father/shuru.png'
import mobanSon from '../images/son/moban.png'
import shujuchuli from '../images/son/shujuchuli.png'
import shujujihe from '../images/son/shujujihe.png'
import shujujishuchu from '../images/son/shujujishuchu.png'
import shujuyuanlaiyuan from '../images/son/shujuyuanlaiyuan.png'
import tieyuankushuchu from '../images/son/tieyuankushuchu.png'
import tieyuankushuru from '../images/son/tieyuankushuru.png'
import yuanshujushuchu from '../images/son/yuanshujushuchu.png'
import zhibiaoshuchu from '../images/son/zhibiaoshuchu.png'
import zhilikushuchu from '../images/son/zhilikushuchu.png'
import TreeNode from './TreeNode.vue'
import { lywMessage, lywConfirm } from '@/utils/feedBack'
const props = defineProps<{ lf?: LogicFlow, clearState: any, idType: any }>()

const emit = defineEmits(['changeFlag'])
const treeNodeRef = ref()
const searchInfo = ref('')  // 搜索


// 组件搜索，过滤后的树形数据
const filteredTreeData = computed(() => {
  // 如果搜索框为空，返回原始数据
  if (!searchInfo.value) {
    treeNodeRef.value?.forEach((item: any) => {
      item.isExpanded = false
    })
    return treeData.value
  }

  //递归过滤函数
  const filterNodes = (nodes: any) => {
    return nodes
      .map((node: any) => {
        // 过滤子节点
        const filteredChildren = node.children ? filterNodes(node.children) : []
        // 如果当前节点或其子节点匹配搜索条件，则保留
        if (
          node.label.toLowerCase().includes(searchInfo.value.toLowerCase()) ||
          filteredChildren.length > 0
        ) {
          return { ...node, children: filteredChildren }
        }
        return null
      })
      .filter((node: any) => node !== null)
  }
  nextTick(() => {
    treeNodeRef.value.forEach((item: any) => {
      item.isExpanded = true //isExpanded为是否展开
    })

  })
  return filterNodes(treeData.value)
})

const treeData = ref<any[]>([{
  id: 'mb',
  label: "模板",
  icon: moban,
  children: [
    { label: '模板一号', text: '模板一号', id: 'mb1', icon: mobanSon, isTemplate: true },
    { label: '模板二号', text: '模板二号', id: 'mb2', icon: mobanSon, isTemplate: true },
    { label: '数据集开发', text: '数据集开发', id: 'mb3', icon: mobanSon, isTemplate: true },
    { label: '数据质量稽核', text: '数据质量稽核', id: 'mb4', icon: mobanSon, isTemplate: true },
  ],
},
{
  id: 'sr',
  label: "输入",
  icon: shuru,
  children: [
    {
      id: 'sr1',
      label: "输入节点一号",
      text: "输入节点一号",
      type: 'dataSource',
      icon: shujuyuanlaiyuan
    },
    {
      id: 'sr2',
      label: "输入节点二号",
      text: "输入节点二号",
      type: 'pasteSource',
      icon: tieyuankushuru
    },
  ],
},
{
  id: 'sc',
  label: "输出",
  icon: shuchu,
  children: [
    {
      id: 'sc1',
      label: "输出节点一号",
      text: "输出节点一号",
      type: 'metadataOutput',
      icon: yuanshujushuchu
    },
    {
      id: 'sc2',
      label: "输出节点二号",
      text: "输出节点二号",
      type: 'indexOutput',
      icon: zhibiaoshuchu
    },
    {
      id: 'sc3',
      label: "输出节点三号",
      text: "输出节点三号",
      type: 'dataSetoutput',
      icon: shujujishuchu
    },
    {
      id: 'sc4',
      label: "输出节点四号",
      text: "输出节点四号",
      type: 'dataOutput',
      icon: tieyuankushuchu
    },
    {
      id: 'sc5',
      label: "输出节点四号",
      text: "输出节点四号",
      type: 'governanceOutput',
      icon: zhilikushuchu
    },
  ],
},
{
  id: 'cl',
  label: "处理",
  icon: chuli,
  children: [
    {
      id: 'cl1',
      label: "处理节点一号",
      text: "处理节点一号",
      type: 'dataProcessing',
      icon: shujuchuli
    },

  ],
},
{
  id: 'hj',
  label: "稽核",
  icon: jicha,
  children: [
    {
      id: 'hj1',
      label: "稽核节点一号",
      text: "稽核节点一号",
      type: 'dataAudit',
      icon: shujujihe
    },
  ],
},
])


// 这个id主要是存储模板id，如果是用户模板点击，点击相同的则不会提示确认框
const id = ref()

// 这个方法是从TreeNode.vue组件中调用，emits触发的自定义事件，主要是判断是模板，还是拖拽
const dragNode = (node: any) => {
  console.log(node, 'dddd');

  if (!node.isTemplate && !node.children) {
    props.lf?.dnd.startDrag({  // logicflow的拖拽方法
      type: node.type,
      text: node.text,
    })
  } else if (node.isTemplate) {
    emit('changeFlag', false)  // 这里是控制右侧抽屉，如果是模板则让他隐藏，
    if ((props.lf?.getGraphData() as any).nodes.length > 0 && !(id.value == node.id)) {   // props.lf?.getGraphData() as any).nodes.length ，获取节点长度，如果没有，则表示没有模板
      lywConfirm('选择该模板将会覆盖之前流程，你确定吗?', null, () => {
        changeTemplate(node)
        id.value = node.id
      })
    } else if (!id.value) {
      id.value = node.id
      changeTemplate(node)
    }
  }
}

// 模板的切换，这里自己定义他的x,y轴，怎么好看怎么摆。也可以让后端反给你
const changeTemplate = (node: any) => {
  let flowData: any = {}
  props.lf?.render({
    nodes: [],
    edges: [],
  })
  props.clearState()
  if (node.id == 'mb1') {
    flowData = {
      nodes: [
        { id: 'a1', x: 0, y: 200, text: '输入节点一号', type: "dataSource", },
        { id: 'a2', x: 150, y: 100, text: '输出节点四号', type: "dataOutput", },
        { id: 'a3', x: 300, y: 200, text: '处理节点一号', type: "dataProcessing", },
        { id: 'a4', x: 450, y: 100, text: '输出节点一号', type: "metadataOutput", },
      ],
      edges: [
        { sourceNodeId: 'a1', targetNodeId: 'a2', type: 'dashedLine' },
        { sourceNodeId: 'a2', targetNodeId: 'a3', type: 'dashedLine' },
        { sourceNodeId: 'a3', targetNodeId: 'a4', type: 'dashedLine' },
      ]
    }
  } else if (node.id == 'mb2') {
    flowData = {
      nodes: [
        { id: 'd1', x: 0, y: 200, text: '输入节点一号', type: "dataSource", },
        { id: 'd2', x: 150, y: 100, text: '输出节点四号', type: "dataOutput", },
        { id: 'd3', x: 300, y: 200, text: '处理节点一号', type: "dataProcessing", },
        { id: 'd4', x: 450, y: 300, text: '输出节点一号', type: "metadataOutput", },
        { id: 'e1', x: 600, y: 200, text: '处理节点一号', type: "dataProcessing", },
        { id: 'e2', x: 750, y: 100, text: '输出节点四号', type: "governanceOutput", },
        { id: 'e3', x: 900, y: 200, text: '处理节点一号', type: "dataProcessing", },
        { id: 'e4', x: 1050, y: 300, text: '输出节点二号', type: "indexOutput", },
      ],
      edges: [
        { sourceNodeId: 'd1', targetNodeId: 'd2', type: 'dashedLine' },
        { sourceNodeId: 'd2', targetNodeId: 'd3', type: 'dashedLine' },
        { sourceNodeId: 'd3', targetNodeId: 'd4', type: 'dashedLine' },
        { sourceNodeId: 'd4', targetNodeId: 'e1', type: 'dashedLine' },
        { sourceNodeId: 'e1', targetNodeId: 'e2', type: 'dashedLine' },
        { sourceNodeId: 'e2', targetNodeId: 'e3', type: 'dashedLine' },
        { sourceNodeId: 'e3', targetNodeId: 'e4', type: 'dashedLine' },
      ]
    }
  } else if (node.id == 'mb3') {
    flowData = {
      nodes: [
        { id: 'h1', x: 0, y: 200, text: '输入节点一号', type: "dataSource", },
        { id: 'h2', x: 150, y: 100, text: '输出节点四号', type: "dataOutput", },
        { id: 'h3', x: 300, y: 200, text: '处理节点一号', type: "dataProcessing", },
        { id: 'h4', x: 450, y: 300, text: '输出节点一号', type: "metadataOutput", },
        { id: 'i1', x: 600, y: 200, text: '处理节点一号', type: "dataProcessing", },
        { id: 'i2', x: 750, y: 100, text: '输出节点四号', type: "governanceOutput", },
        { id: 'i3', x: 900, y: 200, text: '处理节点一号', type: "dataProcessing", },
        { id: 'i4', x: 1050, y: 300, text: '输出节点二号', type: "indexOutput", },
        { id: 'i5', x: 1200, y: 200, text: '输出节点三号', type: "dataSetoutput", },
      ],
      edges: [
        { sourceNodeId: 'h1', targetNodeId: 'h2', type: 'dashedLine' },
        { sourceNodeId: 'h2', targetNodeId: 'h3', type: 'dashedLine' },
        { sourceNodeId: 'h3', targetNodeId: 'h4', type: 'dashedLine' },
        { sourceNodeId: 'h4', targetNodeId: 'i1', type: 'dashedLine' },
        { sourceNodeId: 'i1', targetNodeId: 'i2', type: 'dashedLine' },
        { sourceNodeId: 'i2', targetNodeId: 'i3', type: 'dashedLine' },
        { sourceNodeId: 'i3', targetNodeId: 'i4', type: 'dashedLine' },
        { sourceNodeId: 'i4', targetNodeId: 'i5', type: 'dashedLine' },
      ]
    }
  } else if (node.id == 'mb4') {
    flowData = {
      nodes: [
        { id: 'k1', x: 0, y: 100, text: '输入节点二号', type: "pasteSource", },
        { id: 'k2', x: 150, y: 100, text: '稽核节点一号', type: "dataAudit", },
      ],
      edges: [
        { sourceNodeId: 'k1', targetNodeId: 'k2', type: 'dashedLine' },
      ]
    }
  }
  props.lf?.clearData()

  // 添加所有节点
  flowData.nodes.forEach((node: any) => {
    props.lf?.addNode(node)
  })
  // 添加所有连接线
  flowData.edges.forEach((edge: any) => {
    props.lf?.addEdge(edge)
  })
  emit('changeFlag', true)

  nextTick(() => {
    props.lf?.translateCenter()
  })
}

defineExpose({
  id
})

</script>

<style lang="scss" scoped>
.box {
  background-color: #fff;
  width: 290px;
  height: 100%;
  padding: 22px 21px;
  margin-right: 14px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 0px rgba(1, 36, 88, 0.09);
}

.box-title {
  font-weight: bold;
  font-size: 20px;
  color: #333333;
  margin-bottom: 17px;
}

.box-input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.box-input-item {
  margin-right: 10px;
  height: 36px;
}

.icon-item {
  width: 36px;
  height: 36px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.tree {
  height: calc(100% - 90px);
  overflow-y: scroll;
}

.empty-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.no-select {
  user-select: none; // 禁止文本选择
  -webkit-user-select: none; // Safari 支持
  -moz-user-select: none; // Firefox 支持
  -ms-user-select: none; // IE/Edge 支持
}

::v-deep .el-tree-node {
  padding: 10px 0 0 !important;
}

::v-deep .el-tree-node:focus>.el-tree-node__content,
::v-deep .el-tree-node__content:hover {
  background-color: transparent !important;
}
</style>
