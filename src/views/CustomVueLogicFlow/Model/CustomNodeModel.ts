import { RectNodeModel } from '@logicflow/core'
class CustomNodeModel extends RectNodeModel {
  //移入放大锚点
  getAnchorStyle(anchorInfo: any) {
    const style = super.getAnchorStyle(anchorInfo)
    style.stroke = 'rgb(24, 125, 255)'
    style.fill = '#4E88F3'
    style.r = 3
    if (!style.hover) return style
    style.hover.r = 8
    style.hover.fill = 'rgb(24, 125, 255)'
    style.hover.stroke = 'rgb(24, 125, 255)'
    return style
  }

  getOutlineStyle() {
    const style = super.getOutlineStyle()
    return {
      ...style,
      stroke: 'transparent', // 将边框颜色设为透明
      strokeDasharray: '0', // 取消虚线效果
      strokeWidth: 0, // 完全隐藏边框
    }
  } 

  getNodeStyle() {
    const style = super.getNodeStyle()
    return {
      ...style, // fill: this.isSelected ? : '#fff', // 选中时浅蓝背景
      stroke: this.isSelected ? '#1890ff' : '#999', // 选中时蓝色，默认灰色
      strokeDasharray: this.isSelected ? '0' : '3,2', // 选中时实线，默认虚线
    }
  }
}
export default CustomNodeModel