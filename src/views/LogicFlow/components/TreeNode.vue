<template>
  <div class="tree-container">
    <!-- 父级节点 -->
    <div :class="['parent-node', { 'has-children': hasChildren }]" @click.stop="toggleChildren"
      @mouseover="isHovered = true" @mouseleave="isHovered = false">
      <!-- 图标和标签 -->
      <div class="node-content" :style="{ 'border-bottom': hasChildren ? '1px solid #DCDFE6' : '' }">
        <div v-if="hasChildren" class="node-content-box">
          <img :src="node.icon" alt="" class="node-content-box-img">
          <span class="label">{{ node.label }}</span>
        </div>
        <div v-else class="node-content-box1">
          <div class="node-content-box1-item">
            <img :src="node.icon" class="node-content-box1-item-img" alt="">
          </div>
          <span class="label">{{ node.label }}</span>
        </div>


        <span class="icon-wrapper" v-if="hasChildren">
          <transition name="icon-rotate">
            <span class="icon">
              <el-icon style="font-weight: 600;">
                <ArrowDownBold v-if="!isExpanded" />
                <ArrowUpBold v-else />
              </el-icon>
            </span>
          </transition>
        </span>
      </div>

      <!-- 子级容器 -->
      <transition name="expand" @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
        <div v-if="isExpanded && hasChildren" class="children-container">
          <TreeNode ref="a" v-for="child in node.children" :key="child.id" :node="child" :level="level + 1"
            @mousedown="change(child)" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  node: {    // 该项数据，在外部会通过v-for传递每一项的数据，如果存在子集，则递归调用该组件
    type: Object as () => any,
    required: true
  },
  level: {    // 层级，刚进来默认为第0级，
    type: Number,
    default: 0
  },
})

const emit = defineEmits(['customChange'])

// 点击触发子集
const change = (val: any) => {
  emit('customChange', val)
}

const isExpanded = ref(false)
const isHovered = ref(false)

// 是否存在子集
const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0
})

// 展开子集
const toggleChildren = () => {
  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value
  }
}

// 动画钩子
const onEnter = (el: HTMLElement) => {
  el.style.height = '0'
  setTimeout(() => {
    el.style.height = `${el.scrollHeight}px`
  }, 10)
}

const onAfterEnter = (el: HTMLElement) => {
  el.style.height = 'auto'
}

const onLeave = (el: HTMLElement) => {
  el.style.height = `${el.scrollHeight}px`
  setTimeout(() => {
    el.style.height = '0'
  }, 10)
}
defineExpose({
  isExpanded
})
</script>

<style scoped>
/* 基础样式 */
.tree-container {
  --primary-color: #409eff;
  --hover-bg: #f5f7fa;
  --text-color: #606266;
  --icon-color: #909399;
  /* --border-color: #ebeef5; */
  --transition-time: 0.3s;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.parent-node {
  position: relative;
  transition: background-color var(--transition-time) ease;
}

/* 节点内容样式 */
.node-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 2px;
  /* border-radius: 4px; */
  cursor: pointer;
  transition: all var(--transition-time) ease;
}

.node-content-box {
  padding: 5px 3px;
  display: flex;
  align-items: center;
}

.node-content-box1 {
  padding: 2px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.node-content-box1-item {
  display: flex;
  border: 2px solid #e3e3e3;
  border-radius: 5px;
  margin-right: 10px;
  padding: 6px;
}

.node-content-box1-item-img {
  width: 20px;
  height: 20px;
}



.node-content-box-img {
  width: 22px;
  height: 22px;
  margin-right: 15px;
}

.node-content:hover {
  background: #e7f2f9;
}

/* 图标系统 */
.icon-wrapper {
  display: inline-flex;
  margin-right: 8px;
  width: 18px;
  justify-content: center;
}

.icon {
  color: var(--icon-color);
  transition: transform var(--transition-time) ease;
  font-size: 0.9em;
}

.leaf-icon {
  color: #c0c4cc;
  font-size: 1.2em;
  vertical-align: middle;
}

/* 标签样式 */
.label {
  color: var(--text-color);
  user-select: none;
  font-size: 16px;
  font-weight: 600;
}

/* 子级容器动画 */
.children-container {
  overflow: hidden;
  /* padding-left: 24px; */
  /* 统一缩进 */
  /* border-left: 1px dashed var(--border-color); */
  transition: height var(--transition-time) ease;
}

/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: height var(--transition-time) ease;
}

/* 图标旋转动画 */
.icon-rotate-enter-active,
.icon-rotate-leave-active {
  transition: transform var(--transition-time) ease;
}

.icon-rotate-enter-from,
.icon-rotate-leave-to {
  transform: rotate(-90deg);
}

/* 层级线样式 */
.children-container::before {
  content: "";
  position: absolute;
  left: 12px;
  top: 28px;
  bottom: 0;
  width: 1px;
  background: var(--border-color);
}
</style>