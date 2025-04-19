import { BezierEdgeModel } from '@logicflow/core'
class CustomNodeLine extends BezierEdgeModel {
  getEdgeStyle() {
    const style = super.getEdgeStyle()
    style.stroke = '#4e88f3'
    // style.strokeDasharray = '3 3'   // 虚线
    style.strokeWidth = 1
    return style
  }
}
export default CustomNodeLine
