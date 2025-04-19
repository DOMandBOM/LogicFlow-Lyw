import type { LogicFlow } from '@logicflow/core'

export interface TabItem {
  icon: string
  label: string
  type: string
  disIcon?: string
}

export interface FormState {
  processName: string
  processType: number | null
  processStatus: number
  processStatusType: number
  processCron: string | null
}

export interface ContextMenu {
  visible: boolean
  x: number
  y: number
}

export interface LogicFlowState {
  settingType: 'all' | string
  nodeData?: LogicFlow.NodeData | LogicFlow.EdgeData
}

export interface ComponentItem {
  label: string
  value: string
} 